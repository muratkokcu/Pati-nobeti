import { StyleSheet, View } from 'react-native';
import { DemoBanner } from '@/components/demo-banner';
import { Screen, ScreenLoading } from '@/components/screen';
import { StatusLabel } from '@/components/status-label';
import { BodyText, DisplayText, MetaText, TitleText } from '@/components/typography';
import { palette, radius, spacing } from '@/design/tokens';
import { useApp } from '@/state/app-context';

export default function HistoryScreen() {
  const { snapshot, isLoading } = useApp();
  if (isLoading || !snapshot) return <ScreenLoading />;
  const events = snapshot.occurrences.flatMap((occurrence) => occurrence.events.map((event) => ({ occurrence, event }))).sort((a, b) => b.event.recordedAt.localeCompare(a.event.recordedAt));
  return <Screen><DisplayText style={styles.heading}>Bakım geçmişi</DisplayText><BodyText style={styles.intro}>Bu bir uygulama içi kayıttır; tıbbi doğrulama veya kanıt değildir.</BodyText>{snapshot.isDemo ? <DemoBanner /> : null}{events.length === 0 ? <View style={styles.empty}><TitleText>Henüz kayıt yok</TitleText><BodyText>Bir bakım durumu kaydedildiğinde burada kimin, ne zaman eklediği görünür.</BodyText></View> : events.map(({ occurrence, event }) => <View key={event.id} style={styles.card}><View style={styles.top}><TitleText>{occurrence.title}</TitleText><StatusLabel outcome={event.outcome} /></View><MetaText>{new Intl.DateTimeFormat('tr-TR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(event.recordedAt))} · {event.actorName}</MetaText>{event.kind === 'resolution' && <MetaText style={styles.resolution}>Netleştirme kaydı · önceki kayıtlar silinmedi</MetaText>}{event.syncState === 'queued' && <MetaText style={styles.queued}>Bu cihazda · paylaşılmayı bekliyor</MetaText>}{event.syncState === 'failed' && <MetaText style={styles.failed}>Paylaşılamadı · bağlantı geldiğinde yeniden denenecek</MetaText>}{event.syncState === 'synced' && <MetaText style={styles.synced}>Haneyle paylaşıldı</MetaText>}</View>)}</Screen>;
}
const styles = StyleSheet.create({ heading: { marginTop: spacing.xl }, intro: { color: palette.muted, marginTop: spacing.sm }, card: { backgroundColor: palette.surface, borderBottomColor: palette.line, borderBottomWidth: 1, gap: spacing.md, padding: spacing.lg }, top: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, justifyContent: 'space-between' }, queued: { color: '#74450F' }, failed: { color: palette.overdue }, synced: { color: palette.primary }, resolution: { color: palette.uncertain }, empty: { backgroundColor: palette.surface, borderRadius: radius.lg, gap: spacing.sm, padding: spacing.xl } });
