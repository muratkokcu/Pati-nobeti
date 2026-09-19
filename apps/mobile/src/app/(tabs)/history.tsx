import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { EventLine } from '@/components/event-line';
import { Screen, ScreenLoading } from '@/components/screen';
import { StatusChip } from '@/components/status-chip';
import { BodyText, DisplayText, MetaText } from '@/components/typography';
import { assignPersonColors, layout, palette, radius, spacing, typography } from '@/design/tokens';
import { localDayKey } from '@/domain/schedule';
import type { CareEvent, CareOutcome, TaskOccurrence } from '@/domain/types';
import { useApp } from '@/state/app-context';

type Entry = { occurrence: TaskOccurrence; event: CareEvent };
type Filter = 'all' | CareOutcome;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Tümü' },
  { key: 'done', label: 'Yapıldı' },
  { key: 'skipped', label: 'Atlandı' },
  { key: 'uncertain', label: 'Emin değilim' },
];

const dayTitle = (dayKey: string, today: string, yesterday: string) => {
  if (dayKey === today) return 'Bugün';
  if (dayKey === yesterday) return 'Dün';
  const [year, month, day] = dayKey.split('-').map(Number);
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', timeZone: 'UTC', weekday: 'long' }).format(new Date(Date.UTC(year, month - 1, day, 12)));
};

const syncNote = (event: CareEvent) => {
  if (event.syncState === 'failed') return { text: 'Paylaşılamadı · bağlantı geldiğinde yeniden denenecek', color: palette.overdue };
  if (event.syncState === 'queued') return { text: 'Bu cihazda · paylaşılmayı bekliyor', color: palette.brassInk };
  if (event.syncState === 'local') return { text: 'Demo kaydı · yalnız bu cihazda', color: palette.brassInk };
  return null;
};

export default function HistoryScreen() {
  const { snapshot, isLoading } = useApp();
  const [filter, setFilter] = useState<Filter>('all');
  const colors = useMemo(() => assignPersonColors(snapshot?.members.map((member) => member.id) ?? []), [snapshot?.members]);
  if (isLoading || !snapshot) return <ScreenLoading />;

  const entries: Entry[] = snapshot.occurrences
    .flatMap((occurrence) => occurrence.events.map((event) => ({ occurrence, event })))
    .filter((entry) => filter === 'all' || entry.event.outcome === filter)
    .sort((left, right) => right.event.recordedAt.localeCompare(left.event.recordedAt));

  const today = localDayKey();
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = localDayKey(yesterdayDate);

  const days: { key: string; entries: Entry[] }[] = [];
  for (const entry of entries) {
    const key = localDayKey(new Date(entry.event.recordedAt));
    const current = days[days.length - 1];
    if (current?.key === key) current.entries.push(entry);
    else days.push({ key, entries: [entry] });
  }

  const total = snapshot.occurrences.flatMap((occurrence) => occurrence.events).length;

  return <Screen>
    <DisplayText style={styles.heading}>Bakım geçmişi</DisplayText>
    <MetaText style={styles.intro}>
      {total === 0 ? 'Kimin ne zaman kaydettiği burada birikir.' : `${total} kayıt · ${snapshot.isDemo ? 'yerel demo' : 'haneyle paylaşılıyor'} · tıbbi doğrulama değildir`}
    </MetaText>

    <View accessibilityRole="tablist" style={styles.filters}>
      {FILTERS.map((option) => {
        const active = filter === option.key;
        return (
          <Pressable
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            key={option.key}
            onPress={() => setFilter(option.key)}
            style={({ pressed }) => [styles.filter, active ? styles.filterActive : styles.filterIdle, pressed && styles.filterPressed]}
          >
            <Text style={[styles.filterText, active && styles.filterTextActive]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>

    {days.length === 0 ? (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>{filter === 'all' ? 'Henüz kayıt yok' : 'Bu durumda kayıt yok'}</Text>
        <BodyText style={styles.emptyBody}>
          {filter === 'all'
            ? 'Bugün sekmesinden bir bakım kaydettiğinizde burada kimin, ne zaman eklediği görünür.'
            : 'Başka bir durum seçerek tüm kayıtlara dönebilirsiniz.'}
        </BodyText>
      </View>
    ) : days.map((day) => (
      <View key={day.key} style={styles.day}>
        <View style={styles.dayHead}>
          <Text style={styles.dayTitle}>{dayTitle(day.key, today, yesterday)}</Text>
          <MetaText>{day.entries.length} kayıt</MetaText>
        </View>
        <View style={styles.dayCard}>
          {day.entries.map(({ occurrence, event }, index) => {
            const note = syncNote(event);
            return (
              <View key={event.id} style={[styles.entry, index > 0 && styles.entryDivided]}>
                <View style={styles.entryHead}>
                  <Text style={styles.entryTitle}>{occurrence.title}</Text>
                  <StatusChip size="sm" status={event.outcome} />
                </View>
                <EventLine colorIndex={colors[event.actorId]} event={event} />
                {event.kind === 'resolution' ? <MetaText style={styles.resolution}>Netleştirme · önceki kayıtlar silinmedi</MetaText> : null}
                {note ? <MetaText style={{ color: note.color }}>{note.text}</MetaText> : null}
              </View>
            );
          })}
        </View>
      </View>
    ))}
  </Screen>;
}

const styles = StyleSheet.create({
  heading: { marginTop: spacing.xl },
  intro: { marginTop: spacing.xs },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: layout.blockGap },
  filter: { borderRadius: radius.pill, borderWidth: 1, justifyContent: 'center', minHeight: 36, paddingHorizontal: spacing.md },
  filterIdle: { backgroundColor: palette.surface, borderColor: palette.line },
  filterActive: { backgroundColor: palette.primary, borderColor: palette.primary },
  filterPressed: { backgroundColor: palette.surfacePressed },
  filterText: { ...typography.metaStrong, color: palette.ink },
  filterTextActive: { color: palette.white },
  day: { marginTop: layout.sectionGap },
  dayHead: { alignItems: 'baseline', flexDirection: 'row', gap: spacing.sm, justifyContent: 'space-between', marginBottom: spacing.sm },
  dayTitle: { ...typography.title, color: palette.ink },
  dayCard: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.lg, borderWidth: 1, overflow: 'hidden' },
  entry: { gap: spacing.xs, padding: layout.cardPadding },
  entryDivided: { borderTopColor: palette.line, borderTopWidth: layout.hairline },
  entryHead: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, justifyContent: 'space-between' },
  entryTitle: { ...typography.bodyStrong, color: palette.ink, flexShrink: 1 },
  resolution: { color: palette.uncertain },
  empty: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.lg, borderWidth: 1, gap: spacing.xs, marginTop: layout.sectionGap, padding: layout.cardPaddingLoose },
  emptyTitle: { ...typography.title, color: palette.ink },
  emptyBody: { color: palette.muted },
});
