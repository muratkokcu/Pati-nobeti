import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScreenLoading } from '@/components/screen';
import { useRuntime } from '@/state/runtime-context';
import { getPendingInvite } from '@/data/pending-invite';

export default function Index() {
  const { mode, session, households, isBooting, configurationError } = useRuntime();
  const [pendingToken, setPendingToken] = useState<string | null | undefined>(undefined);
  useEffect(() => { if (mode === 'production' && session) void getPendingInvite().then(setPendingToken); }, [mode, session]);
  if (configurationError) return <Redirect href="/auth" />;
  if (isBooting) return <ScreenLoading />;
  if (mode === 'production' && !session) return <Redirect href="/auth" />;
  if (mode === 'production' && session && pendingToken === undefined) return <ScreenLoading />;
  if (mode === 'production' && pendingToken) return <Redirect href={`/invite/${pendingToken}`} />;
  if (mode === 'production' && households.length === 0) return <Redirect href="/onboarding" />;
  return <Redirect href="/(tabs)" />;
}
