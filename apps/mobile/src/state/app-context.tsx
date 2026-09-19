import * as Haptics from 'expo-haptics';
import { useSQLiteContext } from 'expo-sqlite';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, Pressable, StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { DemoSQLiteRepository, purgeProductionDataForUser, ScopedWorkCoordinator, type ScopeLease } from '@/data/repository';
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
  const scopeIdentity = runtime.session?.user.id && runtime.activeHouseholdId ? `production:${runtime.session.user.id}:${runtime.activeHouseholdId}` : null;
  const [workCoordinator] = useState(() => new ScopedWorkCoordinator());
  const scopeLease = useMemo(() => workCoordinator.activate(scopeIdentity), [scopeIdentity, workCoordinator]);
  const productionRepository = useMemo(() => {
    if (!scopeIdentity) return null;
    return new DemoSQLiteRepository(db, { snapshotKey: scopeIdentity, scopeKey: scopeIdentity, queueAllWrites: true, normalizeStored: false });
  }, [db, scopeIdentity]);
  const [snapshot, setSnapshot] = useState<AppSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const syncInFlight = useRef<{ lease: ScopeLease; task: Promise<void> } | null>(null);
  const pullInFlight = useRef<{ lease: ScopeLease; task: Promise<AppSnapshot | null> } | null>(null);
  const previousUserId = useRef(runtime.session?.user.id ?? null);

  useEffect(() => {
    const currentUserId = runtime.session?.user.id ?? null;
    const staleUserId = previousUserId.current;
    previousUserId.current = currentUserId;
    if (!staleUserId || staleUserId === currentUserId) return;
    // The screen-level purge happens before auth sign-out. This second, barred
    // purge closes the race with work that was already in flight at that time.
    void workCoordinator
      .settleScopePrefix(`production:${staleUserId}:`)
      .then(() => purgeProductionDataForUser(db, staleUserId))
      .catch(() => undefined);
  }, [db, runtime.session?.user.id, workCoordinator]);

  const pullProductionSnapshot = useCallback(() => {
    if (!runtime.gateway || !runtime.activeHouseholdId || !productionRepository || !scopeLease.scope) return Promise.resolve(null);
    const activePull = pullInFlight.current;
    if (activePull && activePull.lease.generation === scopeLease.generation) return activePull.task;
    const rawTask = (async () => {
      const remote = await runtime.gateway!.fetchSnapshot(runtime.activeHouseholdId!);
      if (!workCoordinator.isCurrent(scopeLease)) return null;
      const hydrated = await productionRepository.hydrateSnapshot(remote);
      return workCoordinator.isCurrent(scopeLease) ? hydrated : null;
    })();
    const task = workCoordinator.track(scopeLease, rawTask);
    pullInFlight.current = { lease: scopeLease, task };
    void task.finally(() => { if (pullInFlight.current?.task === task) pullInFlight.current = null; }).catch(() => undefined);
    return task;
  }, [productionRepository, runtime.gateway, runtime.activeHouseholdId, scopeLease, workCoordinator]);

  const loadSnapshot = useCallback(async () => {
    if (runtime.mode === 'demo') return repository.getSnapshot();
    if (!runtime.session || !runtime.gateway || !runtime.activeHouseholdId || !productionRepository) return null;
    try { return await pullProductionSnapshot(); }
    catch {
      if (!workCoordinator.isCurrent(scopeLease)) return null;
      const cached = await productionRepository.getSnapshot();
      return workCoordinator.isCurrent(scopeLease) ? { ...cached, isOffline: true } : null;
    }
  }, [repository, productionRepository, runtime.mode, runtime.session, runtime.gateway, runtime.activeHouseholdId, pullProductionSnapshot, scopeLease, workCoordinator]);
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
  const refreshSnapshot = useCallback(async () => {
    const next = await loadSnapshot();
    if (runtime.mode === 'demo' || workCoordinator.isCurrent(scopeLease)) setSnapshot(next);
  }, [loadSnapshot, runtime.mode, scopeLease, workCoordinator]);
  const syncProduction = useCallback(async () => {
    const activeSync = syncInFlight.current;
    if (activeSync && activeSync.lease.generation === scopeLease.generation) return activeSync.task;
    const rawTask = (async () => {
      if (!productionRepository || !runtime.gateway || !runtime.activeHouseholdId) return;
      let cached: AppSnapshot;
      try { cached = await productionRepository.getSnapshot(); }
      catch { return; }
      if (!workCoordinator.isCurrent(scopeLease)) return;
      await drainCareOutbox(productionRepository, runtime.gateway, async (_command, occurrenceId) => {
        const occurrence = cached.occurrences.find((item) => item.id === occurrenceId);
        if (!occurrence) throw new Error('Eşitlenecek bakım saati yerel cache içinde bulunamadı.');
        return { householdId: runtime.activeHouseholdId!, planId: occurrence.planId, occurrenceKey: occurrenceId };
      });
      if (!workCoordinator.isCurrent(scopeLease)) return;
      setSnapshot(await productionRepository.getSnapshot());
      try {
        const pulled = await pullProductionSnapshot();
        if (pulled && workCoordinator.isCurrent(scopeLease)) setSnapshot(pulled);
      }
      catch { /* Yerel ACK/failed durumu görünür kalır; pull daha sonra yinelenir. */ }
    })();
    const task = workCoordinator.track(scopeLease, rawTask);
    syncInFlight.current = { lease: scopeLease, task };
    try { await task; } finally { if (syncInFlight.current?.task === task) syncInFlight.current = null; }
  }, [productionRepository, runtime.gateway, runtime.activeHouseholdId, pullProductionSnapshot, scopeLease, workCoordinator]);
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
      event = await workCoordinator.track(scopeLease, productionRepository.recordCare({ occurrenceId, outcome, actorId: runtime.session.user.id, actorName: actor?.name ?? 'Ben', kind }));
      if (workCoordinator.isCurrent(scopeLease)) {
        setSnapshot(await productionRepository.getSnapshot());
        void syncProduction().catch(() => undefined);
      }
    } else {
      event = await repository.recordCare({ occurrenceId, outcome, actorId: 'member-murat', actorName: 'Murat', kind });
      setSnapshot(await repository.getSnapshot());
    }
    await Haptics.selectionAsync();
    return event.id;
  }, [repository, productionRepository, runtime, snapshot, syncProduction, scopeLease, workCoordinator]);
  const undoCare = useCallback(async (eventId: string) => {
    const target = runtime.mode === 'production' ? productionRepository : repository;
    if (!target) throw new Error('Yerel kayıt deposu hazır değil.');
    if (runtime.mode === 'production') {
      await workCoordinator.track(scopeLease, target.undoCare(eventId));
      if (workCoordinator.isCurrent(scopeLease)) setSnapshot(await target.getSnapshot());
    } else { await target.undoCare(eventId); setSnapshot(await target.getSnapshot()); }
  }, [repository, productionRepository, runtime.mode, scopeLease, workCoordinator]);
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
