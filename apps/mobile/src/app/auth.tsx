import { Redirect, router, useLocalSearchParams, type Href } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '@/components/screen';
import { BodyText, DisplayText, MetaText } from '@/components/typography';
import { palette, radius, spacing, touchTarget } from '@/design/tokens';
import { useRuntime } from '@/state/runtime-context';
import { getPendingInvite } from '@/data/pending-invite';

export default function AuthScreen() {
  const { next } = useLocalSearchParams<{ next?: string }>();
  const { mode, session, signIn, signUp, requestPasswordReset, configurationError } = useRuntime();
  const [intent, setIntent] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  useEffect(() => {
    if (session) void getPendingInvite().then((token) => router.replace((next?.startsWith('/') ? next : token ? `/invite/${token}` : '/onboarding') as Href));
  }, [session, next]);
  if (mode === 'demo' && !configurationError) return <Redirect href="/(tabs)" />;
  const submit = async () => {
    if (!email.includes('@') || password.length < 8) { setFeedback('Geçerli bir e-posta ve en az 8 karakterli parola gir.'); return; }
    setPending(true); setFeedback(null);
    try {
      if (intent === 'sign-in') await signIn(email, password);
      else if (!await signUp(email, password)) setFeedback('E-postana gönderilen doğrulama bağlantısını açtıktan sonra giriş yapabilirsin.');
    } catch { setFeedback(intent === 'sign-in' ? 'Giriş bilgileri doğrulanamadı. Bilgilerini kontrol edip yeniden dene.' : 'Hesap oluşturulamadı. E-posta adresini kontrol edip yeniden dene.'); }
    finally { setPending(false); }
  };
  const resetPassword = async () => {
    if (!email.includes('@')) { setFeedback('Parola bağlantısı için geçerli e-posta adresini gir.'); return; }
    setPending(true); setFeedback(null);
    try {
      await requestPasswordReset(email);
      setFeedback('E-posta adresi kayıtlıysa parola yenileme bağlantısı gönderildi.');
    } catch { setFeedback('Parola yenileme bağlantısı gönderilemedi. Bağlantını kontrol edip yeniden dene.'); }
    finally { setPending(false); }
  };
  return <Screen keyboardShouldPersistTaps="handled">
    <View style={styles.root}>
      <DisplayText>Bakımı birlikte netleştir.</DisplayText>
      <BodyText style={styles.intro}>PatiNöbeti, hanendeki bakım kayıtlarını kim ve ne zaman ekledi bilgisiyle ortak bir hatta toplar.</BodyText>
      {configurationError ? <View accessibilityRole="alert" style={styles.error}><Text style={styles.errorText}>{configurationError}</Text><MetaText>Uygulama gerçek hesap moduna geçmedi. Ortam değişkenlerini birlikte ve doğru biçimde yapılandır.</MetaText></View> : null}
      <View accessibilityRole="tablist" style={styles.switcher}>
        <Pressable accessibilityRole="tab" accessibilityState={{ selected: intent === 'sign-in' }} onPress={() => { setIntent('sign-in'); setFeedback(null); }} style={[styles.switch, intent === 'sign-in' && styles.switchActive]}><Text style={[styles.switchText, intent === 'sign-in' && styles.switchTextActive]}>Giriş yap</Text></Pressable>
        <Pressable accessibilityRole="tab" accessibilityState={{ selected: intent === 'sign-up' }} onPress={() => { setIntent('sign-up'); setFeedback(null); }} style={[styles.switch, intent === 'sign-up' && styles.switchActive]}><Text style={[styles.switchText, intent === 'sign-up' && styles.switchTextActive]}>Hesap oluştur</Text></Pressable>
      </View>
      <Text nativeID="email-label" style={styles.label}>E-posta</Text>
      <TextInput accessibilityLabelledBy="email-label" autoCapitalize="none" autoComplete="email" editable={!pending && !configurationError} inputMode="email" onChangeText={setEmail} placeholder="ad@ornek.com" placeholderTextColor={palette.muted} style={styles.input} value={email} />
      <Text nativeID="password-label" style={styles.label}>Parola</Text>
      <TextInput accessibilityLabelledBy="password-label" autoCapitalize="none" autoComplete={intent === 'sign-in' ? 'current-password' : 'new-password'} editable={!pending && !configurationError} onChangeText={setPassword} placeholder="En az 8 karakter" placeholderTextColor={palette.muted} secureTextEntry style={styles.input} value={password} />
      {feedback ? <Text accessibilityLiveRegion="polite" style={styles.feedback}>{feedback}</Text> : null}
      <Pressable accessibilityRole="button" accessibilityState={{ disabled: pending || Boolean(configurationError) }} disabled={pending || Boolean(configurationError)} onPress={() => void submit()} style={({ pressed }) => [styles.primary, pressed && styles.pressed, (pending || configurationError) && styles.disabled]}><Text style={styles.primaryText}>{pending ? 'İşleniyor…' : intent === 'sign-in' ? 'Giriş yap' : 'Hesap oluştur'}</Text></Pressable>
      {intent === 'sign-in' ? <Pressable accessibilityRole="button" accessibilityState={{ disabled: pending || Boolean(configurationError) }} disabled={pending || Boolean(configurationError)} onPress={() => void resetPassword()} style={styles.resetAction}><Text style={styles.resetText}>Parolamı unuttum</Text></Pressable> : null}
      <MetaText style={styles.disclosure}>Bu giriş yalnızca Supabase ortamı açıkça yapılandırıldığında görünür. Yerel demo kayıtları gerçek haneye aktarılmaz.</MetaText>
    </View>
  </Screen>;
}

const styles = StyleSheet.create({
  root: { paddingTop: 72 }, intro: { color: palette.muted, marginTop: spacing.md, maxWidth: 520 },
  error: { backgroundColor: palette.overdueSoft, borderRadius: radius.md, gap: spacing.sm, marginTop: spacing.xl, padding: spacing.lg }, errorText: { color: palette.overdue, fontSize: 15, fontWeight: '700', lineHeight: 21 },
  switcher: { borderBottomColor: palette.line, borderBottomWidth: 1, flexDirection: 'row', marginBottom: spacing.xl, marginTop: spacing.xxl },
  switch: { alignItems: 'center', flex: 1, justifyContent: 'center', minHeight: touchTarget }, switchActive: { borderBottomColor: palette.primary, borderBottomWidth: 3 },
  switchText: { color: palette.muted, fontSize: 15, fontWeight: '700' }, switchTextActive: { color: palette.primary },
  label: { color: palette.ink, fontSize: 14, fontWeight: '700', marginBottom: spacing.sm },
  input: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.md, borderWidth: 1, color: palette.ink, fontSize: 16, marginBottom: spacing.lg, minHeight: 52, paddingHorizontal: spacing.lg },
  feedback: { color: palette.overdue, fontSize: 14, fontWeight: '600', lineHeight: 20, marginBottom: spacing.md },
  primary: { alignItems: 'center', backgroundColor: palette.primary, borderRadius: radius.md, justifyContent: 'center', minHeight: touchTarget + 4, paddingHorizontal: spacing.lg },
  primaryText: { color: palette.white, fontSize: 16, fontWeight: '700' }, pressed: { opacity: 0.78 }, disabled: { opacity: 0.48 }, disclosure: { marginTop: spacing.lg },
  resetAction: { alignItems: 'center', justifyContent: 'center', marginTop: spacing.sm, minHeight: touchTarget }, resetText: { color: palette.primary, fontSize: 15, fontWeight: '700' },
});
