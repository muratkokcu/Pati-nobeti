import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, RefreshControl, StyleSheet, Switch, Text, View } from 'react-native';
import { DemoBanner } from '@/components/demo-banner';
import { Screen, ScreenLoading } from '@/components/screen';
import { TaskRow } from '@/components/task-row';
import { BodyText, DisplayText, MetaText } from '@/components/typography';
import { palette, radius, spacing } from '@/design/tokens';
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
  if (isLoading || !snapshot) return <ScreenLoading />;
  const planTimezone = snapshot.plans[0]?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateKey = dayKeyInTimeZone(new Date(), planTimezone);
  const date = `${new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', weekday: 'long', timeZone: 'UTC' }).format(new Date(`${dateKey}T12:00:00.000Z`))} · ${planTimezone}`;
  const today = currentOccurrences(snapshot);
  const currentMember = snapshot.members.find((member) => member.id === runtime.session?.user.id);
  const canSeeOffer = snapshot.isDemo || (snapshot.members.length >= 2 && currentMember?.role === 'owner');
  const refresh = async () => { setRefreshing(true); try { await refreshSnapshot(); } finally { setRefreshing(false); } };
  return <Screen refreshControl={<RefreshControl colors={[palette.primary]} onRefresh={() => void refresh()} refreshing={refreshing} tintColor={palette.primary} />}>
    <View style={styles.kicker}><View style={styles.avatar}><Text style={styles.avatarText}>{snapshot.pet.name[0]?.toLocaleUpperCase('tr-TR')}</Text></View><MetaText>{snapshot.pet.name} · ortak bakım kaydı</MetaText></View>
    <DisplayText>Bugünün nöbeti</DisplayText><BodyText style={styles.date}>{date}</BodyText>{snapshot.isDemo ? <DemoBanner /> : null}
    <View style={styles.connectivity}><View style={styles.connectivityCopy}><Text style={styles.connectionTitle}>{snapshot.isDemo ? snapshot.isOffline ? 'Çevrimdışı prova' : 'Bu cihaz çevrimiçi' : snapshot.isOffline ? 'Yerel görünüm açık' : 'Ortak hane bağlantısı açık'}</Text><MetaText>{snapshot.isDemo ? snapshot.isOffline ? 'Yeni kayıtlar paylaşılmak üzere sıraya alınır.' : 'Demo kayıtları yalnızca bu cihazda tutulur.' : snapshot.isOffline ? 'Yeni kayıtlar bu cihazda kaydedildi; bağlantıda aynı kimlikle paylaşılır.' : 'Yeni hane kayıtları otomatik gelir; aşağı çekerek de yenileyebilirsin.'}</MetaText></View>{snapshot.isDemo ? <Switch accessibilityLabel={snapshot.isOffline ? 'Çevrimdışı provayı kapat' : 'Çevrimdışı provayı aç'} onValueChange={setOffline} trackColor={{ false: palette.line, true: palette.brass }} value={snapshot.isOffline} /> : null}</View>
    <View accessibilityLabel="Bugünkü bakım zaman çizelgesi" style={styles.timeline}>{today.length === 0 ? <View style={styles.empty}><Text style={styles.connectionTitle}>Bugün için planlanmış bakım yok</Text><MetaText>Planlar sekmesindeki bakımlar her gün bugüne taşınır.</MetaText></View> : today.map((item) => <TaskRow key={item.id} occurrence={item} onPress={() => router.push(`/record/${item.id}`)} />)}</View>
    {canSeeOffer ? <Pressable accessibilityRole="button" onPress={() => router.push('/paywall')} style={styles.plusCard}><MetaText style={styles.plusEyebrow}>İKİNCİ BAKIM VEREN SONRASI</MetaText><Text style={styles.plusTitle}>Hanenin bakım geçmişini birlikte görün</Text><BodyText>Plus önizlemesini incele →</BodyText></Pressable> : null}
  </Screen>;
}
const styles = StyleSheet.create({
  kicker: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md, marginTop: spacing.lg }, avatar: { alignItems: 'center', backgroundColor: palette.brassSoft, borderRadius: 20, height: 34, justifyContent: 'center', width: 34 }, avatarText: { color: '#74450F', fontSize: 16, fontWeight: '800' }, date: { color: palette.muted, marginTop: spacing.xs, textTransform: 'capitalize' },
  connectivity: { alignItems: 'center', backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.md, borderWidth: 1, flexDirection: 'row', gap: spacing.md, justifyContent: 'space-between', marginBottom: spacing.xl, padding: spacing.lg }, connectivityCopy: { flex: 1, gap: 2 }, connectionTitle: { color: palette.ink, fontSize: 15, fontWeight: '700' }, timeline: { marginTop: spacing.sm }, empty: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.md, borderWidth: 1, gap: spacing.xs, marginBottom: spacing.xl, padding: spacing.lg },
  plusCard: { backgroundColor: palette.brassSoft, borderRadius: radius.lg, gap: spacing.sm, padding: spacing.xl }, plusEyebrow: { color: '#74450F' }, plusTitle: { color: palette.ink, fontSize: 22, fontWeight: '700', lineHeight: 28 },
});
