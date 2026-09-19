import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BodyText, MetaText, TitleText } from '@/components/typography';
import { conflictReason, eventSentence, outcomeAccessibleLabel, resolutionAccessibleLabel } from '@/domain/care';
import type { CareEventKind, CareOutcome } from '@/domain/types';
import { palette, radius, spacing, touchTarget } from '@/design/tokens';
import { useApp } from '@/state/app-context';

const choices: { outcome: CareOutcome; title: string; description: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { outcome: 'done', title: 'Yapıldı', description: '“Yapıldı” olarak kullanıcı kaydı ekle.', icon: 'checkmark-circle-outline' },
  { outcome: 'skipped', title: 'Atlandı', description: 'Bu zaman için uygulanmadığını kaydet.', icon: 'remove-circle-outline' },
  { outcome: 'uncertain', title: 'Emin değilim', description: 'Durum net değilse bunu görünür kıl.', icon: 'help-circle-outline' },
];

export default function RecordScreen() {
  const { occurrenceId } = useLocalSearchParams<{ occurrenceId: string }>();
  const { snapshot, recordCare, undoCare } = useApp();
  const [saving, setSaving] = useState<CareOutcome | null>(null);
  const [adding, setAdding] = useState(false);
  const [addedEventId, setAddedEventId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const occurrence = snapshot?.occurrences.find((item) => item.id === occurrenceId);
  if (!occurrence) return <View style={styles.root}><TitleText>Kayıt bulunamadı</TitleText></View>;
  const reason = conflictReason(occurrence.events);
  const recorded = occurrence.events.length > 0;
  const addedEvent = occurrence.events.find((event) => event.id === addedEventId);
  async function submit(outcome: CareOutcome, kind: CareEventKind = 'record') {
    setSaving(outcome); setError(null);
    try { setAddedEventId(await recordCare(occurrenceId, outcome, kind)); }
    catch { setError('Kayıt eklenemedi. Verin değişmedi; yeniden deneyebilirsin.'); }
    finally { setSaving(null); }
  }
  async function undo() {
    if (!addedEventId) return;
    try { await undoCare(addedEventId); setAddedEventId(null); setAdding(false); }
    catch { setError('Geri alma tamamlanamadı. Yeniden deneyebilirsin.'); }
  }
  return <ScrollView contentContainerStyle={styles.root}>
    <MetaText>{new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(new Date(occurrence.scheduledAt))} PLANI</MetaText>
    <TitleText style={styles.title}>{occurrence.title}</TitleText>
    <BodyText style={styles.instruction}>{occurrence.instruction}</BodyText>

    {addedEventId && <View accessibilityRole="alert" style={styles.success}><Text style={styles.successTitle}>{snapshot?.isDemo ? 'Kayıt bu cihaza eklendi' : addedEvent?.syncState === 'synced' ? 'Kayıt haneyle paylaşıldı' : 'Kayıt bu cihazda kaydedildi'}</Text><BodyText>{snapshot?.isDemo ? 'Uzak eşitleme bu demoda kapalıdır.' : addedEvent?.syncState === 'synced' ? 'Kim, neyi ve ne zaman kaydetti bilgisi ortak hatta eklendi.' : 'Bağlantı uygun olduğunda aynı kayıt kimliğiyle yeniden paylaşılacak.'}</BodyText><View style={styles.successActions}>{(snapshot?.isDemo || (addedEvent && addedEvent.syncState !== 'synced')) ? <Pressable accessibilityRole="button" onPress={undo} style={styles.undo}><Text style={styles.undoText}>Geri al</Text></Pressable> : null}<Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.done}><Text style={styles.doneText}>Tamam</Text></Pressable></View></View>}

    {error && <View accessibilityRole="alert" style={styles.error}><BodyText style={styles.errorText}>{error}</BodyText></View>}

    {recorded && <View style={styles.ledger}>
      <Text style={styles.ledgerTitle}>{reason ? 'Bu bakım için birden fazla kayıt var' : 'Bu bakım bugün kaydedildi'}</Text>
      {occurrence.events.map((event) => <BodyText key={event.id} style={styles.ledgerEntry}>{eventSentence(event)}</BodyText>)}
    </View>}

    {!addedEventId && recorded && reason && <View style={styles.resolve}>
      <Text style={styles.resolveTitle}>Hangisi geçerli?</Text>
      <MetaText>Seçtiğin durum yeni bir kayıt olarak eklenir; önceki kayıtlar geçmişte durmaya devam eder.</MetaText>
      {choices.map((choice) => <Pressable accessibilityLabel={resolutionAccessibleLabel(choice.outcome)} accessibilityRole="button" disabled={saving !== null} key={choice.outcome} onPress={() => submit(choice.outcome, 'resolution')} style={({ pressed }) => [styles.resolveChoice, saving && styles.disabled, pressed && styles.pressed]}>
        <Text style={styles.resolveChoiceText}>{saving === choice.outcome ? 'Kaydediliyor…' : `${choice.title} olarak netleştir`}</Text>
      </Pressable>)}
    </View>}

    {!addedEventId && recorded && !adding && <View style={styles.exit}>
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={({ pressed }) => [styles.primary, pressed && styles.pressed]}><Text style={styles.primaryText}>Tamam</Text></Pressable>
      <Pressable accessibilityRole="button" onPress={() => setAdding(true)} style={({ pressed }) => [styles.secondary, pressed && styles.pressed]}><Text style={styles.secondaryText}>Yine de kayıt ekle</Text></Pressable>
    </View>}

    {!addedEventId && (!recorded || adding) && <>
      <View style={styles.notice}><Ionicons color={palette.primary} name="information-circle-outline" size={21} /><BodyText style={styles.noticeText}>Bu işlem bir bakım kaydı ekler; tıbbi doğrulama sayılmaz.</BodyText></View>
      <View style={styles.choices}>{choices.map((choice) => <Pressable accessibilityLabel={outcomeAccessibleLabel(choice.outcome)} accessibilityRole="button" disabled={saving !== null} key={choice.outcome} onPress={() => submit(choice.outcome)} style={({ pressed }) => [styles.choice, saving && styles.disabled, pressed && styles.pressed]}>
        <Ionicons color={palette.primary} name={choice.icon} size={29} />
        <View style={styles.choiceCopy}><Text style={styles.choiceTitle}>{saving === choice.outcome ? 'Kaydediliyor…' : choice.title}</Text><BodyText>{choice.description}</BodyText></View>
        <Ionicons color={palette.muted} name="chevron-forward" size={20} />
      </Pressable>)}</View>
    </>}
  </ScrollView>;
}
const styles = StyleSheet.create({
  root: { backgroundColor: palette.canvas, flexGrow: 1, padding: spacing.xl }, title: { fontSize: 28, lineHeight: 34, marginTop: spacing.sm }, instruction: { color: palette.muted, marginTop: spacing.sm },
  success: { backgroundColor: palette.primarySoft, borderRadius: radius.lg, gap: spacing.sm, marginTop: spacing.xl, padding: spacing.lg }, successTitle: { color: palette.primary, fontSize: 18, fontWeight: '800' }, successActions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }, undo: { alignItems: 'center', borderColor: palette.primary, borderRadius: radius.md, borderWidth: 1, flex: 1, justifyContent: 'center', minHeight: touchTarget }, undoText: { color: palette.primary, fontWeight: '700' }, done: { alignItems: 'center', backgroundColor: palette.primary, borderRadius: radius.md, flex: 1, justifyContent: 'center', minHeight: touchTarget }, doneText: { color: palette.white, fontWeight: '700' },
  error: { backgroundColor: palette.overdueSoft, borderRadius: radius.md, marginTop: spacing.lg, padding: spacing.md }, errorText: { color: palette.overdue, fontWeight: '600' },
  ledger: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.lg, borderWidth: 1, gap: spacing.xs, marginTop: spacing.xl, padding: spacing.lg },
  ledgerTitle: { color: palette.ink, fontSize: 17, fontWeight: '700', marginBottom: spacing.xs }, ledgerEntry: { color: palette.ink },
  resolve: { backgroundColor: palette.uncertainSoft, borderRadius: radius.lg, gap: spacing.sm, marginTop: spacing.lg, padding: spacing.lg }, resolveTitle: { color: palette.ink, fontSize: 17, fontWeight: '700' },
  resolveChoice: { alignItems: 'center', backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.md, borderWidth: 1, justifyContent: 'center', minHeight: touchTarget, paddingHorizontal: spacing.lg },
  resolveChoiceText: { color: palette.ink, fontSize: 15, fontWeight: '700' },
  exit: { gap: spacing.md, marginTop: spacing.xl },
  primary: { alignItems: 'center', backgroundColor: palette.primary, borderRadius: radius.md, justifyContent: 'center', minHeight: touchTarget + 10, paddingHorizontal: spacing.lg }, primaryText: { color: palette.white, fontSize: 18, fontWeight: '700' },
  secondary: { alignItems: 'center', borderColor: palette.line, borderRadius: radius.md, borderWidth: 1, justifyContent: 'center', minHeight: touchTarget, paddingHorizontal: spacing.lg }, secondaryText: { color: palette.muted, fontSize: 15, fontWeight: '700' },
  notice: { backgroundColor: palette.primarySoft, borderRadius: radius.md, flexDirection: 'row', gap: spacing.sm, marginVertical: spacing.xl, padding: spacing.md }, noticeText: { flex: 1 },
  choices: { gap: spacing.md }, choice: { alignItems: 'center', backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.lg, borderWidth: 1, flexDirection: 'row', gap: spacing.md, minHeight: touchTarget + 28, padding: spacing.lg },
  pressed: { opacity: 0.72 }, disabled: { opacity: 0.48 }, choiceCopy: { flex: 1, gap: 2 }, choiceTitle: { color: palette.ink, fontSize: 17, fontWeight: '700' },
});
