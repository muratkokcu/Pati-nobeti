import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { EventLine } from './event-line';
import { StatusChip } from './status-chip';
import { MetaText, TitleText } from './typography';
import { layout, palette, radius, spacing, touchTarget, typography } from '@/design/tokens';
import { careStatusOf } from '@/design/status-language';
import { conflictNotice, conflictReason, eventSentence, formatClock, getOccurrenceState } from '@/domain/care';
import type { TaskOccurrence } from '@/domain/types';

export function TaskRow({ occurrence, onPress }: { occurrence: TaskOccurrence; onPress: () => void }) {
  const state = getOccurrenceState(occurrence);
  const status = careStatusOf(occurrence);
  const reason = conflictReason(occurrence.events);
  const time = formatClock(occurrence.scheduledAt);
  const accent = palette.statusAccent[status];
  const accessibilitySummary = reason
    ? conflictNotice(reason)
    : occurrence.events.length === 0
      ? (state === 'overdue' ? 'Planlanan saat geçti, bugün kayıt yok' : 'Bugün kayıt yok')
      : occurrence.events.map(eventSentence).join(' ');
  return (
    <View style={styles.row}>
      <View style={styles.rail}><Text style={styles.time}>{time}</Text><View style={[styles.node, { borderColor: accent }]} /><View style={styles.line} /></View>
      <Pressable accessibilityHint="Bu bakımın kayıtlarını açar" accessibilityLabel={`${occurrence.title}, ${time}. ${accessibilitySummary}`} accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.content, pressed && styles.contentPressed]}>
        <View style={styles.heading}><TitleText style={styles.title}>{occurrence.title}</TitleText><StatusChip size="sm" status={status} /></View>
        {reason && <Text style={styles.conflict}>{conflictNotice(reason)}</Text>}
        {occurrence.events.length === 0
          ? <MetaText>{state === 'overdue' ? `Planlanan ${time} geçti · bugün kayıt yok` : 'Bugün için kayıt yok'}</MetaText>
          : occurrence.events.map((event) => <EventLine event={event} key={event.id} style={styles.entry} />)}
        {occurrence.events.some((event) => event.syncState === 'queued') && <MetaText style={styles.queued}>Bu cihazda kayıtlı · paylaşılmayı bekliyor</MetaText>}
        {occurrence.events.some((event) => event.syncState === 'local') && <MetaText style={styles.queued}>Demo kaydı · yalnız bu cihazda</MetaText>}
        {occurrence.events.some((event) => event.syncState === 'failed') && <MetaText style={styles.failed}>Paylaşılamadı · bağlantı geldiğinde yeniden denenecek</MetaText>}
        {occurrence.events.length > 0 && occurrence.events.every((event) => event.syncState === 'synced') && <MetaText style={styles.synced}>Haneyle paylaşıldı</MetaText>}
        <View style={styles.action}><Text style={styles.actionText}>{occurrence.events.length > 0 ? 'Kayıtları aç' : 'Durum kaydet'}</Text><Ionicons color={palette.white} name="arrow-forward" size={layout.icon.md} /></View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', minHeight: touchTarget * 2 },
  rail: { alignItems: 'center', width: layout.railWidth },
  time: { ...typography.clock, color: palette.ink, marginBottom: spacing.sm },
  node: { backgroundColor: palette.surface, borderRadius: layout.nodeSize / 2, borderWidth: layout.nodeBorder, height: layout.nodeSize, width: layout.nodeSize },
  line: { backgroundColor: palette.line, flex: 1, marginVertical: spacing.xs, width: layout.railLine },
  content: { borderRadius: radius.md, flex: 1, gap: spacing.xs, marginBottom: spacing.lg, padding: layout.cardPaddingTight },
  contentPressed: { backgroundColor: palette.surfacePressed },
  heading: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  title: { flexShrink: 1 },
  conflict: { ...typography.metaStrong, color: palette.overdue },
  entry: { marginTop: spacing.xxs },
  queued: { color: palette.brassInk, marginTop: spacing.xs },
  failed: { color: palette.overdue, marginTop: spacing.xs },
  synced: { color: palette.primary, marginTop: spacing.xs },
  action: { alignItems: 'center', alignSelf: 'flex-start', backgroundColor: palette.primary, borderRadius: radius.md, flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md, minHeight: touchTarget, paddingHorizontal: spacing.lg },
  actionText: { ...typography.bodyStrong, color: palette.white },
});
