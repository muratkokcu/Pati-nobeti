import { Redirect, router } from 'expo-router';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen, ScreenLoading } from '@/components/screen';
import { BodyText, DisplayText, MetaText, TitleText } from '@/components/typography';
import type { Pet } from '@/domain/types';
import { layout, opacity, palette, radius, spacing, touchTarget, typography } from '@/design/tokens';
import { useRuntime } from '@/state/runtime-context';

export default function OnboardingScreen() {
  const { mode, session, gateway, households, isBooting, refreshHouseholds } = useRuntime();
  const [step, setStep] = useState(1);
  const [displayName, setDisplayName] = useState('');
  const [householdName, setHouseholdName] = useState('');
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState<Pet['species']>('cat');
  const [planTitle, setPlanTitle] = useState('Günlük bakım');
  const [instruction, setInstruction] = useState('');
  const [time, setTime] = useState('08:00');
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [creationAttempted, setCreationAttempted] = useState(false);
  const [createdHouseholdId, setCreatedHouseholdId] = useState<string | null>(null);
  if (isBooting) return <ScreenLoading />;
  if (mode === 'demo') return <Redirect href="/(tabs)" />;
  if (!session) return <Redirect href="/auth" />;
  if (households.length > 0) return <Redirect href="/(tabs)" />;
  const next = () => {
    const valid = step === 1 ? displayName.trim().length >= 2 : householdName.trim().length > 0 && petName.trim().length > 0;
    if (!valid) { setFeedback(step === 1 ? 'Hanede görünecek adını gir.' : 'Hane ve evcil hayvan adını gir.'); return; }
    setFeedback(null); setStep((value) => Math.min(3, value + 1));
  };
  const submit = async () => {
    if (!gateway) return;
    if (!planTitle.trim() || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) { setFeedback('Plan adı ve 24 saat biçiminde geçerli bir saat gir.'); return; }
    setPending(true); setFeedback(null);
    const operationKey = `onboarding-operation:${session.user.id}`;
    let householdId = createdHouseholdId;
    try {
      if (!householdId) {
        setCreationAttempted(true);
        await gateway.setProfile(displayName);
        let operationId = await SecureStore.getItemAsync(operationKey);
        if (!operationId) { operationId = Crypto.randomUUID(); await SecureStore.setItemAsync(operationKey, operationId, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY }); }
        householdId = await gateway.createHouseholdWithPlan({
          operationId, householdName, petName, species, planTitle, planInstruction: instruction, times: [time],
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Istanbul',
        });
        setCreatedHouseholdId(householdId);
        void gateway.trackEvent('owner_created', householdId).catch(() => undefined);
      }
      await refreshHouseholds(householdId);
      await SecureStore.deleteItemAsync(operationKey);
      router.replace('/(tabs)/household');
    } catch {
      setFeedback(householdId
        ? 'Hane kuruldu; güncel görünüm alınamadı. Bağlantı geldiğinde “Haneye git” ile yeniden dene.'
        : 'Kurulum sonucu doğrulanamadı. Aynı işlem kimliğiyle güvenle kontrol etmek için yeniden dene.');
    }
    finally { setPending(false); }
  };
  return <Screen keyboardShouldPersistTaps="handled">
    <View style={styles.root}>
      <MetaText>{step} / 3</MetaText>
      <DisplayText style={styles.heading}>{step === 1 ? 'Hanede nasıl görünmek istersiniz?' : step === 2 ? 'Bakımı kimin için paylaşacaksınız?' : 'İlk bakım saatini ekleyin.'}</DisplayText>
      <BodyText style={styles.intro}>{step === 1 ? 'Kayıtlarda bu ad görünür; e-posta adresiniz diğer üyelere gösterilmez.' : step === 2 ? 'Hane, aynı evcil hayvanın bakımını paylaşan kişileri bir araya getirir.' : 'Veterinerinizin verdiği veya kendi bakım planınızdaki adı ve saati aynen girin. PatiNöbeti tıbbi öneri üretmez.'}</BodyText>
      <View style={styles.form}>
        {step === 1 ? <Field label="Görünen ad" value={displayName} onChangeText={setDisplayName} placeholder="Örn. Murat" /> : null}
        {step === 2 ? <>
          <Field label="Hane adı" value={householdName} onChangeText={setHouseholdName} placeholder="Örn. Luna’nın hanesi" />
          <Field label="Evcil hayvanın adı" value={petName} onChangeText={setPetName} placeholder="Örn. Luna" />
          <Text style={styles.label}>Tür</Text><View style={styles.species}>{([['cat', 'Kedi'], ['dog', 'Köpek'], ['other', 'Diğer']] as const).map(([value, label]) => <Pressable key={value} accessibilityRole="radio" accessibilityState={{ checked: species === value }} onPress={() => setSpecies(value)} style={[styles.speciesChoice, species === value && styles.speciesSelected]}><Text style={[styles.speciesText, species === value && styles.speciesTextSelected]}>{label}</Text></Pressable>)}</View>
        </> : null}
        {step === 3 ? <>
          <Field label="Bakım planı" value={planTitle} onChangeText={setPlanTitle} placeholder="Örn. Sabah ilacı" />
          <Field label="Saat" value={time} onChangeText={setTime} placeholder="08:00" inputMode="numeric" />
          <Field label="Uygulama notu (isteğe bağlı)" value={instruction} onChangeText={setInstruction} placeholder="Veterinerin verdiği talimatı yaz" multiline />
        </> : null}
      </View>
      {feedback ? <Text accessibilityLiveRegion="polite" style={styles.feedback}>{feedback}</Text> : null}
      <View style={styles.actions}>
        {step > 1 ? <Pressable accessibilityRole="button" disabled={pending} onPress={() => { setFeedback(null); setStep((value) => value - 1); }} style={styles.secondary}><Text style={styles.secondaryText}>Geri</Text></Pressable> : null}
        <Pressable accessibilityRole="button" accessibilityState={{ disabled: pending }} disabled={pending} onPress={() => step < 3 ? next() : void submit()} style={({ pressed }) => [styles.primary, pressed && styles.pressedPrimary, pending && styles.disabled]}><Text style={styles.primaryText}>{pending ? 'Kurulum kontrol ediliyor…' : step < 3 ? 'Devam et' : createdHouseholdId ? 'Haneye git' : creationAttempted ? 'Kurulumu kontrol et' : 'Haneyi kur'}</Text></Pressable>
      </View>
      {step === 3 ? <View style={styles.promise}><TitleText>Sonraki değer anı</TitleText><BodyText style={styles.promiseBody}>Hane kurulduktan sonra ikinci bakım vereni davet et. Ortak kayıt hattı, iki kişi katıldığında asıl değerini gösterir.</BodyText></View> : null}
    </View>
  </Screen>;
}

function Field({ label, ...props }: { label: string } & React.ComponentProps<typeof TextInput>) {
  return <View><Text style={styles.label}>{label}</Text><TextInput placeholderTextColor={palette.muted} style={[styles.input, props.multiline && styles.multiline]} {...props} /></View>;
}

const styles = StyleSheet.create({
  root: { paddingTop: layout.headerOffset }, heading: { marginTop: spacing.sm }, intro: { color: palette.muted, marginTop: spacing.md, maxWidth: layout.measure }, form: { gap: spacing.lg, marginTop: spacing.xxl },
  label: { ...typography.metaStrong, color: palette.ink, marginBottom: spacing.sm }, input: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.md, borderWidth: 1, ...typography.body, color: palette.ink, minHeight: layout.fieldHeight, paddingHorizontal: spacing.lg, paddingVertical: spacing.md }, multiline: { minHeight: 96, textAlignVertical: 'top' },
  species: { flexDirection: 'row', gap: spacing.sm }, speciesChoice: { alignItems: 'center', borderColor: palette.line, borderRadius: radius.md, borderWidth: 1, flex: 1, justifyContent: 'center', minHeight: touchTarget }, speciesSelected: { backgroundColor: palette.primarySoft, borderColor: palette.primary }, speciesText: { ...typography.metaStrong, color: palette.muted }, speciesTextSelected: { color: palette.primary },
  feedback: { ...typography.body, color: palette.overdue, marginTop: spacing.lg }, actions: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl },
  primary: { alignItems: 'center', backgroundColor: palette.primary, borderRadius: radius.md, flex: 1, justifyContent: 'center', minHeight: touchTarget + 4, paddingHorizontal: spacing.lg }, primaryText: { ...typography.bodyStrong, color: palette.white },
  secondary: { alignItems: 'center', borderColor: palette.primary, borderRadius: radius.md, borderWidth: 1, justifyContent: 'center', minHeight: touchTarget + 4, paddingHorizontal: spacing.xl }, secondaryText: { ...typography.bodyStrong, color: palette.primary }, pressedPrimary: { backgroundColor: palette.primaryPressed }, disabled: { opacity: opacity.disabled },
  promise: { backgroundColor: palette.primarySoft, borderRadius: radius.lg, gap: spacing.sm, marginTop: spacing.xxl, padding: spacing.lg }, promiseBody: { color: palette.primary },
});
