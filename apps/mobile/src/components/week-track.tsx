import { StyleSheet, View } from 'react-native';
import { MetaText } from './typography';
import { useAppTheme } from '@/design/theme';
import { layout, radius, spacing } from '@/design/tokens';
import { standingEvents } from '@/domain/care';
import { localDayKey } from '@/domain/schedule';
import type { AppSnapshot } from '@/domain/types';

const DAY_LETTER = ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'] as const;

type DayCell = { key: string; label: string; planned: number; recorded: number; isToday: boolean };

/** Son yedi günün kaydı: seri sayacı değil, günlerin kendisi (kıyaslama kararı 7). */
export function WeekTrack({ snapshot }: { snapshot: AppSnapshot }) {
  const theme = useAppTheme();
  const today = new Date();
  const days: DayCell[] = Array.from({ length: 7 }, (_, offset) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - offset));
    const key = localDayKey(date);
    const planned = snapshot.occurrences.filter((occurrence) => localDayKey(new Date(occurrence.scheduledAt)) === key);
    return {
      key,
      label: DAY_LETTER[date.getDay()],
      planned: planned.length,
      recorded: planned.filter((occurrence) => standingEvents(occurrence.events).length > 0).length,
      isToday: offset === 6,
    };
  });
  const total = days.reduce((sum, day) => sum + day.planned, 0);
  if (total === 0) return null;
  const recorded = days.reduce((sum, day) => sum + day.recorded, 0);

  return (
    <View style={[styles.root, { backgroundColor: theme.surface, borderColor: theme.line }]}>
      <View style={styles.head}>
        <MetaText style={{ color: theme.ink }}>Son 7 gün</MetaText>
        <MetaText>{recorded} / {total} bakım kaydedildi</MetaText>
      </View>
      <View accessibilityLabel={`Son yedi günde ${total} bakımın ${recorded} tanesi kaydedildi`} accessible style={styles.row}>
        {days.map((day) => {
          const full = day.planned > 0 && day.recorded === day.planned;
          const partial = day.recorded > 0 && !full;
          const missed = day.planned > 0 && day.recorded === 0;
          const fill = full ? theme.status.done.accent : partial ? theme.status.overdue.accent : 'transparent';
          const border = missed ? theme.status.overdue.border : full || partial ? fill : theme.line;
          return (
            <View key={day.key} style={styles.cell}>
              <View style={[styles.dot, { backgroundColor: fill, borderColor: border }, day.isToday && { borderColor: theme.ink, borderWidth: 2 }]} />
              <MetaText style={styles.letter}>{day.label}</MetaText>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, marginTop: layout.sectionGap, padding: layout.cardPadding },
  head: { alignItems: 'baseline', flexDirection: 'row', gap: spacing.sm, justifyContent: 'space-between' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  cell: { alignItems: 'center', gap: spacing.xs },
  dot: { borderRadius: radius.pill, borderWidth: 1.5, height: layout.dot + 4, width: layout.dot + 4 },
  letter: { lineHeight: 14 },
});
