import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BodyText, MetaText, TitleText } from './typography';
import { palette, radius, spacing, touchTarget } from '@/design/tokens';
import { conflictNotice, conflictReason, eventSentence, getOccurrenceState } from '@/domain/care';
import type { TaskOccurrence } from '@/domain/types';

const clock = (value: string) => new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(new Date(value));

export function TaskRow({ occurrence, onPress }: { occurrence: TaskOccurrence; onPress: () => void }) {
  const state = getOccurrenceState(occurrence);
  const reason = conflictReason(occurrence.events);
  const time = clock(occurrence.scheduledAt);
  const accent = state === 'conflict' || state === 'overdue' ? palette.overdue : occurrence.events.length > 0 ? palette.primary : palette.brass;
  const accessibilitySummary = reason
    ? conflictNotice(reason)
    : occurrence.events.length === 0
      ? (state === 'overdue' ? 'Planlanan saat geçti, bugün kayıt yok' : 'Bugün kayıt yok')
      : occurrence.events.map(eventSentence).join(' ');
  return (
    <View style={styles.row}>
      <View style={styles.rail}><Text style={styles.time}>{time}</Text><View style={[styles.node, { borderColor: accent }]} /><View style={styles.line} /></View>
      <Pressable accessibilityHint="Bu bakımın kayıtlarını açar" accessibilityLabel={`${occurrence.title}, ${time}. ${accessibilitySummary}`} accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.content, pressed && styles.contentPressed]}>
        <TitleText style={styles.title}>{occurrence.title}</TitleText>
        {reason && <BodyText style={styles.conflict}>{conflictNotice(reason)}</BodyText>}
        {occurrence.events.length === 0
          ? <MetaText>{state === 'overdue' ? `Planlanan ${time} geçti · bugün kayıt yok` : 'Bugün için kayıt yok'}</MetaText>
          : occurrence.events.map((event) => <BodyText key={event.id} style={styles.entry}>{eventSentence(event)}</BodyText>)}
        {occurrence.events.some((event) => event.syncState === 'queued') && <MetaText style={styles.queued}>Bu cihazda kayıtlı · paylaşılmayı bekliyor</MetaText>}
        {occurrence.events.some((event) => event.syncState === 'local') && <MetaText style={styles.queued}>Demo kaydı · yalnız bu cihazda</MetaText>}
        {occurrence.events.some((event) => event.syncState === 'failed') && <MetaText style={styles.failed}>Paylaşılamadı · bağlantı geldiğinde yeniden denenecek</MetaText>}
        {occurrence.events.length > 0 && occurrence.events.every((event) => event.syncState === 'synced') && <MetaText style={styles.synced}>Haneyle paylaşıldı</MetaText>}
        <View style={styles.action}><Text style={styles.actionText}>{occurrence.events.length > 0 ? 'Kayıtları aç' : 'Durum kaydet'}</Text><Ionicons color={palette.white} name="arrow-forward" size={17} /></View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', minHeight: 176 }, rail: { alignItems: 'center', width: 62 },
  time: { color: palette.ink, fontSize: 14, fontVariant: ['tabular-nums'], fontWeight: '700', marginBottom: spacing.sm },
  node: { backgroundColor: palette.surface, borderRadius: 8, borderWidth: 3, height: 16, width: 16 }, line: { backgroundColor: palette.line, flex: 1, marginVertical: spacing.xs, width: 2 },
  content: { flex: 1, paddingBottom: spacing.xl, paddingLeft: spacing.md }, contentPressed: { opacity: 0.82 }, title: { marginBottom: spacing.xs },
  conflict: { color: palette.overdue, fontWeight: '600', marginBottom: spacing.xs }, entry: { marginTop: 2 }, queued: { color: '#74450F', marginTop: spacing.sm }, failed: { color: palette.overdue, marginTop: spacing.sm }, synced: { color: palette.primary, marginTop: spacing.sm },
  action: { alignItems: 'center', alignSelf: 'flex-start', backgroundColor: palette.primary, borderRadius: radius.md, flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg, minHeight: touchTarget, paddingHorizontal: spacing.lg },
  actionText: { color: palette.white, fontSize: 15, fontWeight: '700' },
});
