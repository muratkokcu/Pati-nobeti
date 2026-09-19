import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, RefreshControl, StyleSheet, Switch, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PetHero } from '@/components/pet-hero';
import { WeekTrack } from '@/components/week-track';
import { Screen, ScreenLoading } from '@/components/screen';
import { TaskCard } from '@/components/task-card';
import { BodyText, MetaText } from '@/components/typography';
import { assignPersonColors, layout, palette, radius, spacing, typography } from '@/design/tokens';
import { standingEvents } from '@/domain/care';
import { currentOccurrences, dayKeyInTimeZone } from '@/domain/schedule';
import { useApp } from '@/state/app-context';
import { useRuntime } from '@/state/runtime-context';

export default function TodayScreen() {
  const { snapshot, isLoading, setOffline, refreshSnapshot } = useApp();
  const runtime = useRuntime();
  const [refreshing, setRefreshing] = useState(false);
  const trackedSharedView = useRef<string | null>(null);
  useEffect(() => {
    if (snapshot && !snapshot.isDemo && snapshot.householdId && snapshot.members.length >= 2 && runtime.gateway && trackedSharedView.current !== snapshot.householdId) {
      trackedSharedView.current = snapshot.householdId;
      void runtime.gateway.trackEvent('shared_state_viewed', snapshot.householdId).catch(() => { trackedSharedView.current = null; });
    }
  }, [snapshot, runtime.gateway]);
  const colors = useMemo(() => assignPersonColors(snapshot?.members.map((member) => member.id) ?? []), [snapshot?.members]);
  if (isLoading || !snapshot) return <ScreenLoading />;

  const planTimezone = snapshot.plans[0]?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateKey = dayKeyInTimeZone(new Date(), planTimezone);
  const date = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', weekday: 'long', timeZone: 'UTC' }).format(new Date(`${dateKey}T12:00:00.000Z`));
  const today = currentOccurrences(snapshot);
  const focus = today.find((occurrence) => standingEvents(occurrence.events).length === 0) ?? null;
  const rest = today.filter((occurrence) => occurrence.id !== focus?.id);
  const currentMember = snapshot.members.find((member) => member.id === runtime.session?.user.id);
  const canSeeOffer = snapshot.isDemo || (snapshot.members.length >= 2 && currentMember?.role === 'owner');
  const connection = snapshot.isDemo
    ? snapshot.isOffline ? 'Çevrimdışı prova açık' : 'Yerel demo'
    : snapshot.isOffline ? 'Yerel görünüm · bağlantıda paylaşılır' : 'Hane bağlantısı açık';
  const refresh = async () => { setRefreshing(true); try { await refreshSnapshot(); } finally { setRefreshing(false); } };

  return <Screen refreshControl={<RefreshControl colors={[palette.primary]} onRefresh={() => void refresh()} refreshing={refreshing} tintColor={palette.primary} />}>
    <PetHero colorIndexFor={(memberId) => colors[memberId] ?? 0} members={snapshot.members} occurrences={today} pet={snapshot.pet} />

    <View style={styles.status}>
      <View style={styles.statusRow}>
        <MetaText numberOfLines={1} style={styles.statusCopy}>{connection}</MetaText>
      {snapshot.isDemo ? (
        <View style={styles.toggle}>
          <MetaText style={styles.toggleLabel}>Çevrimdışı prova</MetaText>
          <Switch hitSlop={{ bottom: 14, left: 14, right: 14, top: 14 }} accessibilityLabel={snapshot.isOffline ? 'Çevrimdışı provayı kapat' : 'Çevrimdışı provayı aç'} onValueChange={setOffline} trackColor={{ false: palette.line, true: palette.brass }} value={snapshot.isOffline} />
        </View>
      ) : null}
      </View>
      <MetaText numberOfLines={1} style={styles.date}>{date} · {planTimezone}</MetaText>
    </View>

    <WeekTrack snapshot={snapshot} />

    {today.length === 0 ? (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Bugün için planlanmış bakım yok</Text>
        <BodyText style={styles.emptyBody}>Planlar sekmesinde kurduğunuz bakımlar her sabah bugüne taşınır.</BodyText>
      </View>
    ) : (
      <View accessibilityLabel="Bugünkü bakım zaman çizelgesi" style={styles.timeline}>
        {focus ? <TaskCard colorIndexFor={(memberId) => colors[memberId] ?? 0} occurrence={focus} onPress={() => router.push(`/record/${focus.id}`)} variant="now" /> : null}
        {rest.map((occurrence) => (
          <TaskCard colorIndexFor={(memberId) => colors[memberId] ?? 0} key={occurrence.id} occurrence={occurrence} onPress={() => router.push(`/record/${occurrence.id}`)} variant="next" />
        ))}
      </View>
    )}

    {canSeeOffer ? (
      <Pressable accessibilityRole="button" onPress={() => router.push('/paywall')} style={({ pressed }) => [styles.offer, pressed && styles.offerPressed]}>
        <View style={styles.offerCopy}>
          <Text style={styles.offerTitle}>Hanenin bakım geçmişini birlikte görün</Text>
          <MetaText style={styles.offerMeta}>Plus önizlemesi · ikinci bakım veren her zaman ücretsiz</MetaText>
        </View>
        <Ionicons color={palette.brass} name="arrow-forward" size={layout.icon.lg} />
      </Pressable>
    ) : null}
  </Screen>;
}

const styles = StyleSheet.create({
  status: { gap: spacing.xxs, marginTop: layout.blockGap },
  statusRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, justifyContent: 'space-between', minHeight: layout.rowMinHeight },
  statusCopy: { flex: 1 },
  date: { textTransform: 'capitalize' },
  timeline: { gap: layout.rowGap, marginTop: layout.sectionGap },
  empty: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.lg, borderWidth: 1, gap: spacing.xs, marginTop: layout.sectionGap, padding: layout.cardPaddingLoose },
  emptyTitle: { ...typography.title, color: palette.ink },
  emptyBody: { color: palette.muted },
  offer: { alignItems: 'center', backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.lg, borderWidth: 1, flexDirection: 'row', gap: spacing.md, marginTop: layout.sectionGap, padding: layout.cardPadding },
  offerPressed: { backgroundColor: palette.sunken },
  offerCopy: { flex: 1, gap: spacing.xxs },
  offerTitle: { ...typography.bodyStrong, color: palette.ink },
  offerMeta: { color: palette.muted },
  toggle: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm },
  toggleLabel: { color: palette.muted },
});
