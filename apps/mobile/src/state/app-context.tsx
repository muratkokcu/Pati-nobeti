import * as Haptics from 'expo-haptics';
import { useSQLiteContext } from 'expo-sqlite';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, Pressable, StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { DemoSQLiteRepository } from '@/data/repository';
import { drainCareOutbox } from '@/data/sync-engine';
import type { AppSnapshot, CareEvent, CareEventKind, CareOutcome } from '@/domain/types';
import { palette, radius, spacing, touchTarget } from '@/design/tokens';
import { useRuntime } from './runtime-context';

type AppContextValue = {
  snapshot: AppSnapshot | null;
  isLoading: boolean;
  recordCare: (occurrenceId: string, outcome: CareOutcome, kind?: CareEventKind) => Promise<string>;
  undoCare: (eventId: string) => Promise<void>;
  refreshSnapshot: () => Promise<void>;
  resetDemo: () => Promise<void>;
  setOffline: (value: boolean) => Promise<void>;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const db = useSQLiteContext();
  const repository = useMemo(() => new DemoSQLiteRepository(db), [db]);
  const runtime = useRuntime();
  const productionRepository = useMemo(() => {
    const userId = runtime.session?.user.id;
    const householdId = runtime.activeHouseholdId;
    if (!userId || !householdId) return null;
    const scope = `production:${userId}:${householdId}`;
    return new DemoSQLiteRepository(db, { snapshotKey: scope, scopeKey: scope, queueAllWrites: true, normalizeStored: false });
  }, [db, runtime.session?.user.id, runtime.activeHouseholdId]);
  const [snapshot, setSnapshot] = useState<AppSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const syncInFlight = useRef<Promise<void> | null>(null);

  const loadSnapshot = useCallback(async () => {
    if (runtime.mode === 'demo') return repository.getSnapshot();
    if (!runtime.session || !runtime.gateway || !runtime.activeHouseholdId || !productionRepository) return null;
    try { return await productionRepository.hydrateSnapshot(await runtime.gateway.fetchSnapshot(runtime.activeHouseholdId)); }
    catch {
      const cached = await productionRepository.getSnapshot();
      return { ...cached, isOffline: true };
    }
  }, [repository, productionRepository, runtime.mode, runtime.session, runtime.gateway, runtime.activeHouseholdId]);
  const retryLoad = useCallback(async () => {
    setIsLoading(true); setLoadError(false);
    try { setSnapshot(await loadSnapshot()); }
    catch { setLoadError(true); }
    finally { setIsLoading(false); }
  }, [loadSnapshot]);
  useEffect(() => {
    let active = true;
    void Promise.resolve()
      .then(() => { if (active) { setIsLoading(true); setLoadError(false); } })
      .then(loadSnapshot)
      .then((next) => { if (active) setSnapshot(next); })
      .catch(() => { if (active) setLoadError(true); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [loadSnapshot]);
  const refreshSnapshot = useCallback(async () => { setSnapshot(await loadSnapshot()); }, [loadSnapshot]);
  const syncProduction = useCallback(async () => {
    if (syncInFlight.current) return syncInFlight.current;
    const task = (async () => {
      if (!productionRepository || !runtime.gateway || !runtime.activeHouseholdId) return;
      let cached: AppSnapshot;
      try { cached = await productionRepository.getSnapshot(); }
      catch { return; }
      await drainCareOutbox(productionRepository, runtime.gateway, async (_command, occurrenceId) => {
        const occurrence = cached.occurrences.find((item) => item.id === occurrenceId);
        if (!occurrence) throw new Error('Eşitlenecek bakım saati yerel cache içinde bulunamadı.');
        return { householdId: runtime.activeHouseholdId!, planId: occurrence.planId, occurrenceKey: occurrenceId };
      });
      setSnapshot(await productionRepository.getSnapshot());
      try { setSnapshot(await productionRepository.hydrateSnapshot(await runtime.gateway.fetchSnapshot(runtime.activeHouseholdId))); }
      catch { /* Yerel ACK/failed durumu görünür kalır; pull daha sonra yinelenir. */ }
    })();
    syncInFlight.current = task;
    try { await task; } finally { if (syncInFlight.current === task) syncInFlight.current = null; }
  }, [productionRepository, runtime.gateway, runtime.activeHouseholdId]);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') void (runtime.mode === 'production' ? syncProduction() : refreshSnapshot()).catch(() => setLoadError(true));
    });
    return () => subscription.remove();
  }, [refreshSnapshot, runtime.mode, syncProduction]);
  useEffect(() => {
    if (runtime.mode !== 'production') return;
    const unsubscribe = NetInfo.addEventListener((state) => { if (state.isConnected) void syncProduction().catch(() => undefined); });
    return unsubscribe;
  }, [runtime.mode, syncProduction]);
  useEffect(() => {
    if (runtime.mode !== 'production') return;
    const timer = setInterval(() => { if (AppState.currentState === 'active') void syncProduction().catch(() => undefined); }, 15_000);
    return () => clearInterval(timer);
  }, [runtime.mode, syncProduction]);
  useEffect(() => {
    if (runtime.mode !== 'production' || !runtime.client || !runtime.activeHouseholdId) return;
    const channel = runtime.client
      .channel(`care-events:${runtime.activeHouseholdId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'care_events', filter: `household_id=eq.${runtime.activeHouseholdId}` }, () => {
        void refreshSnapshot().catch(() => undefined);
      })
      .subscribe();
    return () => { void runtime.client?.removeChannel(channel); };
  }, [runtime.mode, runtime.client, runtime.activeHouseholdId, refreshSnapshot]);
  const recordCare = useCallback(async (occurrenceId: string, outcome: CareOutcome, kind: CareEventKind = 'record') => {
    let event: CareEvent;
    if (runtime.mode === 'production') {
      if (!snapshot || !runtime.session || !runtime.gateway || !runtime.activeHouseholdId || !productionRepository) throw new Error('Ortak hane hazır değil.');
      const occurrence = snapshot.occurrences.find((item) => item.id === occurrenceId);
      if (!occurrence) throw new Error('Bakım saati bulunamadı.');
      const actor = snapshot.members.find((member) => member.id === runtime.session?.user.id);
      event = await productionRepository.recordCare({ occurrenceId, outcome, actorId: runtime.session.user.id, actorName: actor?.name ?? 'Ben', kind });
      setSnapshot(await productionRepository.getSnapshot());
      void syncProduction().catch(() => undefined);
    } else {
      event = await repository.recordCare({ occurrenceId, outcome, actorId: 'member-murat', actorName: 'Murat', kind });
      setSnapshot(await repository.getSnapshot());
    }
    await Haptics.selectionAsync();
    return event.id;
  }, [repository, productionRepository, runtime, snapshot, syncProduction]);
  const undoCare = useCallback(async (eventId: string) => {
    const target = runtime.mode === 'production' ? productionRepository : repository;
    if (!target) throw new Error('Yerel kayıt deposu hazır değil.');
    await target.undoCare(eventId); setSnapshot(await target.getSnapshot());
  }, [repository, productionRepository, runtime.mode]);
  const resetDemo = useCallback(async () => { if (runtime.mode === 'demo') setSnapshot(await repository.resetDemo()); }, [repository, runtime.mode]);
  const setOffline = useCallback(async (value: boolean) => { if (runtime.mode === 'demo') setSnapshot(await repository.setOffline(value)); }, [repository, runtime.mode]);
  const value = useMemo(() => ({ snapshot, isLoading, recordCare, undoCare, refreshSnapshot, resetDemo, setOffline }), [snapshot, isLoading, recordCare, undoCare, refreshSnapshot, resetDemo, setOffline]);
  if (loadError) return <View style={styles.errorRoot}><Text accessibilityRole="header" style={styles.errorTitle}>{runtime.mode === 'demo' ? 'Yerel veri açılamadı' : 'Ortak hane yüklenemedi'}</Text><Text style={styles.errorBody}>Kayıtların değiştirilmedi. Bağlantını kontrol edip yeniden deneyebilirsin.</Text><Pressable accessibilityRole="button" onPress={retryLoad} style={styles.retry}><Text style={styles.retryText}>Yeniden dene</Text></Pressable></View>;
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const styles = StyleSheet.create({ errorRoot: { alignItems: 'stretch', backgroundColor: palette.canvas, flex: 1, justifyContent: 'center', padding: spacing.xl }, errorTitle: { color: palette.ink, fontSize: 27, fontWeight: '800' }, errorBody: { color: palette.muted, fontSize: 16, lineHeight: 23, marginTop: spacing.sm }, retry: { alignItems: 'center', backgroundColor: palette.primary, borderRadius: radius.md, justifyContent: 'center', marginTop: spacing.xl, minHeight: touchTarget }, retryText: { color: palette.white, fontSize: 16, fontWeight: '700' } });

export function useApp() {
  const value = useContext(AppContext);
  if (!value) throw new Error('useApp must be used inside AppProvider');
  return value;
}
