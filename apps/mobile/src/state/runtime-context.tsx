import type { Session, SupabaseClient } from '@supabase/supabase-js';
import * as Linking from 'expo-linking';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Database } from '@/data/database.types';
import { SupabaseCareGateway, type HouseholdSummary } from '@/data/remote-gateway';
import { getConfiguredSupabaseClient } from '@/data/supabase-client';
import { clearCachedHouseholds, readCachedHouseholds, writeCachedHouseholds } from '@/data/runtime-household-cache';

type RuntimeContextValue = {
  mode: 'demo' | 'production';
  client: SupabaseClient<Database> | null;
  gateway: SupabaseCareGateway | null;
  session: Session | null;
  households: HouseholdSummary[];
  activeHouseholdId: string | null;
  isBooting: boolean;
  configurationError: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshHouseholds: (preferredId?: string) => Promise<void>;
};

const RuntimeContext = createContext<RuntimeContextValue | null>(null);

export function RuntimeProvider({ children }: { children: React.ReactNode }) {
  const configured = useMemo(() => {
    try { return { client: getConfiguredSupabaseClient(), error: null }; }
    catch (error) { return { client: null, error: error instanceof Error ? error.message : 'Supabase yapılandırması okunamadı.' }; }
  }, []);
  const client = configured.client;
  const gateway = useMemo(() => client ? new SupabaseCareGateway(client) : null, [client]);
  const [session, setSession] = useState<Session | null>(null);
  const [households, setHouseholds] = useState<HouseholdSummary[]>([]);
  const [activeHouseholdId, setActiveHouseholdId] = useState<string | null>(null);
  const [isBooting, setIsBooting] = useState(Boolean(client));

  const refreshHouseholds = useCallback(async (preferredId?: string) => {
    if (!gateway) return;
    const next = await gateway.listHouseholds();
    const { data } = await client?.auth.getUser() ?? { data: { user: null } };
    if (data.user) await writeCachedHouseholds(data.user.id, next);
    setHouseholds(next);
    setActiveHouseholdId((current) => {
      const candidate = preferredId ?? current;
      return candidate && next.some((item) => item.id === candidate) ? candidate : (next[0]?.id ?? null);
    });
  }, [client, gateway]);

  useEffect(() => {
    if (!client) return;
    let active = true;
    void client.auth.getSession().then(async ({ data, error }) => {
      if (!active) return;
      if (error) throw error;
      setSession(data.session);
      if (data.session) {
        const cached = await readCachedHouseholds(data.session.user.id);
        if (!active) return;
        if (cached.length > 0) { setHouseholds(cached); setActiveHouseholdId(cached[0].id); }
        await refreshHouseholds().catch(() => undefined);
      }
    }).catch(() => { if (active) setSession(null); }).finally(() => { if (active) setIsBooting(false); });
    const { data: listener } = client.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      if (!nextSession) { setHouseholds([]); setActiveHouseholdId(null); }
      else setTimeout(() => { if (active) void refreshHouseholds(); }, 0);
    });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, [client, refreshHouseholds]);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!client) throw new Error('Gerçek hesap modu yapılandırılmamış.');
    const { error } = await client.auth.signInWithPassword({ email: email.trim(), password });
    if (error) throw error;
  }, [client]);
  const signUp = useCallback(async (email: string, password: string) => {
    if (!client) throw new Error('Gerçek hesap modu yapılandırılmamış.');
    const { data, error } = await client.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: Linking.createURL('/auth/callback') } });
    if (error) throw error;
    return Boolean(data.session);
  }, [client]);
  const requestPasswordReset = useCallback(async (email: string) => {
    if (!client) throw new Error('Gerçek hesap modu yapılandırılmamış.');
    const redirectTo = Linking.createURL('/auth/callback', { queryParams: { next: '/auth/reset' } });
    const { error } = await client.auth.resetPasswordForEmail(email.trim(), { redirectTo });
    if (error) throw error;
  }, [client]);
  const updatePassword = useCallback(async (password: string) => {
    if (!client) throw new Error('Gerçek hesap modu yapılandırılmamış.');
    const { error } = await client.auth.updateUser({ password });
    if (error) throw error;
  }, [client]);
  const signOut = useCallback(async () => {
    if (!client) return;
    if (session) await clearCachedHouseholds(session.user.id);
    const { error } = await client.auth.signOut();
    if (error) throw error;
  }, [client, session]);
  const value = useMemo<RuntimeContextValue>(() => ({
    mode: client ? 'production' : 'demo', client, gateway, session, households, activeHouseholdId,
    isBooting, configurationError: configured.error, signIn, signUp, requestPasswordReset, updatePassword, signOut, refreshHouseholds,
  }), [client, gateway, session, households, activeHouseholdId, isBooting, configured.error, signIn, signUp, requestPasswordReset, updatePassword, signOut, refreshHouseholds]);
  return <RuntimeContext.Provider value={value}>{children}</RuntimeContext.Provider>;
}

export function useRuntime() {
  const value = useContext(RuntimeContext);
  if (!value) throw new Error('useRuntime must be used inside RuntimeProvider');
  return value;
}
