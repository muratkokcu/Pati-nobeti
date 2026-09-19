import { router, useLocalSearchParams, type Href } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ScreenLoading } from '@/components/screen';
import { palette, radius, spacing, touchTarget } from '@/design/tokens';
import { getPendingInvite } from '@/data/pending-invite';
import { useRuntime } from '@/state/runtime-context';

export default function AuthCallbackScreen() {
  const { code, error_description: errorDescription, next } = useLocalSearchParams<{ code?: string; error_description?: string; next?: string }>();
  const { client } = useRuntime();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    void Promise.resolve().then(async () => {
      if (!client) { if (active) setError('Hesap servisi yapılandırılmamış.'); return; }
      if (errorDescription) { if (active) setError('E-posta bağlantısı kullanılamadı veya süresi doldu.'); return; }
      if (!code) { if (active) setError('Doğrulama kodu bulunamadı.'); return; }
      const { error: exchangeError } = await client.auth.exchangeCodeForSession(code);
      if (!active) return;
      if (exchangeError) { setError('E-posta doğrulaması tamamlanamadı. Bağlantıyı yeniden açmayı dene.'); return; }
      if (next === '/auth/reset') { router.replace(next as Href); return; }
      const token = await getPendingInvite();
      router.replace(token ? `/invite/${token}` : '/');
    });
    return () => { active = false; };
  }, [client, code, errorDescription, next]);
  if (!error) return <ScreenLoading />;
  return <View style={styles.root}><Text accessibilityRole="header" style={styles.title}>Doğrulama tamamlanamadı</Text><Text accessibilityRole="alert" style={styles.body}>{error}</Text><Pressable accessibilityRole="button" onPress={() => router.replace('/auth')} style={styles.button}><Text style={styles.buttonText}>Girişe dön</Text></Pressable></View>;
}

const styles = StyleSheet.create({ root: { backgroundColor: palette.canvas, flex: 1, justifyContent: 'center', padding: spacing.xl }, title: { color: palette.ink, fontSize: 27, fontWeight: '800' }, body: { color: palette.overdue, fontSize: 16, lineHeight: 23, marginTop: spacing.md }, button: { alignItems: 'center', backgroundColor: palette.primary, borderRadius: radius.md, justifyContent: 'center', marginTop: spacing.xl, minHeight: touchTarget }, buttonText: { color: palette.white, fontSize: 16, fontWeight: '700' } });
