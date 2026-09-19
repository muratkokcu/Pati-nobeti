import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { EventLine } from './event-line';
import { StatusChip } from './status-chip';
import { BodyStrongText, ClockLeadText, ClockText, MetaText, TitleText } from './typography';
import { conflictNotice, conflictReason, formatClock, standingEvents } from '@/domain/care';
import type { CareEvent, TaskOccurrence } from '@/domain/types';
import { careStatusOf, outcomeWord } from '@/design/status-language';
import { useAppTheme } from '@/design/theme';
import { layout, radius, spacing, typography } from '@/design/tokens';

type Props = {
  occurrence: TaskOccurrence;
  /** "şimdi" tek ve büyüktür; "sıradaki" sıkışık satırdır. */
  variant: 'now' | 'next';
  onPress: () => void;
  colorIndexFor?: (memberId: string) => number;
  style?: StyleProp<ViewStyle>;
};

/** Eşitleme durumu satırı: kaydın nerede durduğunu kayıttan ayrı ama yanında söyler. */
function syncNote(events: CareEvent[]): { text: string; tone: 'muted' | 'overdue' | 'conflict' } | null {
  if (events.length === 0) return null;
  if (events.some((event) => event.syncState === 'failed')) return { text: 'Paylaşılamadı · bağlantı geldiğinde yeniden denenecek', tone: 'conflict' };
  if (events.some((event) => event.syncState === 'queued')) return { text: 'Bu cihazda kayıtlı · paylaşılmayı bekliyor', tone: 'overdue' };
  if (events.some((event) => event.syncState === 'local')) return { text: 'Demo kaydı · yalnız bu cihazda', tone: 'overdue' };
  return { text: 'Haneyle paylaşıldı', tone: 'muted' };
}

export function TaskCard({ occurrence, variant, onPress, colorIndexFor, style }: Props) {
  const theme = useAppTheme();
  const status = careStatusOf(occurrence);
  const time = formatClock(occurrence.scheduledAt);
  const standing = standingEvents(occurrence.events);
  const reason = conflictReason(occurrence.events);
  const last = standing[standing.length - 1];
  const summary = reason
    ? conflictNotice(reason)
    : last
      ? `${last.actorName} “${outcomeWord(last.outcome)}” kaydetti`
      : status === 'overdue'
        ? `Planlanan ${time} geçti · kayıt yok`
        : 'Henüz kayıt yok';
  const actionLabel = standing.length > 0 ? 'Kayıtları aç' : 'Durum kaydet';

  if (variant === 'next') {
    return (
      <Pressable
        accessibilityHint="Bu bakımın kayıtlarını açar"
        accessibilityLabel={`${time} ${occurrence.title}. ${summary}`}
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.nextRow, { backgroundColor: theme.surface, borderColor: theme.line }, pressed && { backgroundColor: theme.surfacePressed }, style]}
      >
        <ClockText style={styles.nextTime}>{time}</ClockText>
        <View style={styles.nextCopy}>
          <BodyStrongText>{occurrence.title}</BodyStrongText>
          {last && !reason
            ? <EventLine colorIndex={colorIndexFor?.(last.actorId)} event={last} numberOfLines={1} showTime={false} />
            : <MetaText>{summary}</MetaText>}
        </View>
        {last && !reason ? null : <StatusChip size="sm" status={status} />}
        <Ionicons color={theme.muted} name="chevron-forward" size={layout.icon.md} />
      </Pressable>
    );
  }

  const note = syncNote(standing);
  const noteColor = note?.tone === 'conflict' ? theme.status.conflict.fg : note?.tone === 'overdue' ? theme.status.overdue.fg : theme.muted;
  return (
    <View style={[styles.nowCard, { backgroundColor: theme.raised, borderColor: theme.lineStrong }, style]}>
      <View style={styles.nowHeader}>
        <ClockLeadText>{time}</ClockLeadText>
        <StatusChip status={status} />
      </View>
      <TitleText style={styles.nowTitle}>{occurrence.title}</TitleText>
      {occurrence.instruction ? <MetaText>{occurrence.instruction}</MetaText> : null}
      {reason ? <Text style={[styles.conflict, { color: theme.status.conflict.fg }]}>{conflictNotice(reason)}</Text> : null}
      <View style={styles.nowEvents}>
        {standing.length === 0
          ? <MetaText>{status === 'overdue' ? `Planlanan ${time} geçti · kayıt yok` : 'Bugün için kayıt yok'}</MetaText>
          : standing.slice(-3).map((event) => <EventLine colorIndex={colorIndexFor?.(event.actorId)} event={event} key={event.id} />)}
      </View>
      {note ? <Text style={[styles.note, { color: noteColor }]}>{note.text}</Text> : null}
      <Pressable
        accessibilityHint="Bu bakımın kayıtlarını açar"
        accessibilityLabel={`${occurrence.title}, ${time}. ${actionLabel}`}
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.action, pressed ? { backgroundColor: theme.primaryPressed } : { backgroundColor: theme.primary }]}
      >
        <Text style={[styles.actionText, { color: theme.onPrimary }]}>{actionLabel}</Text>
        <Ionicons color={theme.onPrimary} name="arrow-forward" size={layout.icon.md} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  nowCard: { borderRadius: radius.lg, borderWidth: layout.hairline, gap: spacing.sm, padding: layout.cardPaddingLoose },
  nowHeader: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, justifyContent: 'space-between' },
  nowTitle: { marginTop: -spacing.xxs },
  nowEvents: { gap: spacing.xs, marginTop: spacing.xxs },
  conflict: { ...typography.metaStrong, marginTop: spacing.xxs },
  note: { ...typography.meta },
  action: { alignItems: 'center', borderRadius: radius.md, flexDirection: 'row', gap: spacing.sm, justifyContent: 'center', marginTop: spacing.sm, minHeight: layout.rowMinHeight, paddingHorizontal: spacing.lg },
  actionText: { ...typography.bodyStrong },
  nextRow: { alignItems: 'center', borderRadius: radius.md, borderWidth: layout.hairline, flexDirection: 'row', gap: spacing.md, minHeight: layout.rowMinHeight, paddingHorizontal: layout.cardPaddingTight, paddingVertical: spacing.sm },
  nextTime: { minWidth: 42 },
  nextCopy: { flex: 1, gap: spacing.xxs },
});
