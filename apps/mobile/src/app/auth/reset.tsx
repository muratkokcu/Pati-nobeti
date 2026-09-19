import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '@/components/screen';
import { BodyText, DisplayText } from '@/components/typography';
import { palette, radius, spacing, touchTarget } from '@/design/tokens';
import { useRuntime } from '@/state/runtime-context';

export default function ResetPasswordScreen() {
  const { session, updatePassword } = useRuntime();
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const submit = async () => {
    if (!session) { setFeedback('Parola bağlantısı geçersiz veya süresi dolmuş. Yeni bağlantı iste.'); return; }
    if (password.length < 8) { setFeedback('Yeni parola en az 8 karakter olmalı.'); return; }
    if (password !== confirmation) { setFeedback('Parolalar eşleşmiyor.'); return; }
    setPending(true); setFeedback(null);
    try {
      await updatePassword(password);
      router.replace('/');
    } catch { setFeedback('Parola yenilenemedi. Yeni bağlantı isteyip yeniden dene.'); }
    finally { setPending(false); }
  };

  return <Screen keyboardShouldPersistTaps="handled"><View style={styles.root}>
    <DisplayText>Yeni parolanı belirle.</DisplayText>
    <BodyText style={styles.intro}>Bu ekran yalnız e-postandaki tek kullanımlık bağlantıdan açılır.</BodyText>
    <Text nativeID="new-password-label" style={styles.label}>Yeni parola</Text>
    <TextInput accessibilityLabelledBy="new-password-label" autoCapitalize="none" autoComplete="new-password" editable={!pending} onChangeText={setPassword} placeholder="En az 8 karakter" placeholderTextColor={palette.muted} secureTextEntry style={styles.input} value={password} />
    <Text nativeID="confirm-password-label" style={styles.label}>Yeni parolayı tekrar yaz</Text>
    <TextInput accessibilityLabelledBy="confirm-password-label" autoCapitalize="none" autoComplete="new-password" editable={!pending} onChangeText={setConfirmation} placeholder="Parolanı doğrula" placeholderTextColor={palette.muted} secureTextEntry style={styles.input} value={confirmation} />
    {feedback ? <Text accessibilityLiveRegion="polite" style={styles.feedback}>{feedback}</Text> : null}
    <Pressable accessibilityRole="button" accessibilityState={{ disabled: pending }} disabled={pending} onPress={() => void submit()} style={[styles.primary, pending && styles.disabled]}><Text style={styles.primaryText}>{pending ? 'Yenileniyor…' : 'Parolayı yenile'}</Text></Pressable>
    {!session ? <Pressable accessibilityRole="button" onPress={() => router.replace('/auth')} style={styles.secondary}><Text style={styles.secondaryText}>Yeni bağlantı iste</Text></Pressable> : null}
  </View></Screen>;
}

const styles = StyleSheet.create({
  root: { paddingTop: 72 }, intro: { color: palette.muted, marginBottom: spacing.xxl, marginTop: spacing.md },
  label: { color: palette.ink, fontSize: 14, fontWeight: '700', marginBottom: spacing.sm },
  input: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.md, borderWidth: 1, color: palette.ink, fontSize: 16, marginBottom: spacing.lg, minHeight: 52, paddingHorizontal: spacing.lg },
  feedback: { color: palette.overdue, fontSize: 14, fontWeight: '600', lineHeight: 20, marginBottom: spacing.md },
  primary: { alignItems: 'center', backgroundColor: palette.primary, borderRadius: radius.md, justifyContent: 'center', minHeight: touchTarget + 4 },
  primaryText: { color: palette.white, fontSize: 16, fontWeight: '700' }, disabled: { opacity: 0.48 },
  secondary: { alignItems: 'center', justifyContent: 'center', marginTop: spacing.sm, minHeight: touchTarget }, secondaryText: { color: palette.primary, fontSize: 15, fontWeight: '700' },
});
