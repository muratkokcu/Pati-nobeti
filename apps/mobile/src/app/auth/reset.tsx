import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '@/components/screen';
import { BodyText, DisplayText } from '@/components/typography';
import { layout, opacity, palette, radius, spacing, touchTarget, typography } from '@/design/tokens';
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
  root: { paddingTop: layout.headerOffset }, intro: { color: palette.muted, marginBottom: spacing.xxl, marginTop: spacing.md },
  label: { ...typography.metaStrong, color: palette.ink, marginBottom: spacing.sm },
  input: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.md, borderWidth: 1, ...typography.body, color: palette.ink, marginBottom: spacing.lg, minHeight: layout.fieldHeight, paddingHorizontal: spacing.lg },
  feedback: { ...typography.body, color: palette.overdue, marginBottom: spacing.md },
  primary: { alignItems: 'center', backgroundColor: palette.primary, borderRadius: radius.md, justifyContent: 'center', minHeight: touchTarget + 4 },
  primaryText: { ...typography.bodyStrong, color: palette.white }, disabled: { opacity: opacity.disabled },
  secondary: { alignItems: 'center', justifyContent: 'center', marginTop: spacing.sm, minHeight: touchTarget }, secondaryText: { ...typography.bodyStrong, color: palette.primary },
});
