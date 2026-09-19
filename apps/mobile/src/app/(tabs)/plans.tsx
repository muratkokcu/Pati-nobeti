import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DemoBanner } from '@/components/demo-banner';
import { Screen, ScreenLoading } from '@/components/screen';
import { BodyText, DisplayText, MetaText, TitleText } from '@/components/typography';
import { palette, radius, spacing, touchTarget } from '@/design/tokens';
import { useApp } from '@/state/app-context';
import { scheduleDemoReminder } from '@/services/reminders';

export default function PlansScreen() {
  const { snapshot, isLoading } = useApp();
  const [reminderState, setReminderState] = useState<'idle' | 'scheduled' | 'denied' | 'timezone'>('idle');
  if (isLoading || !snapshot) return <ScreenLoading />;
  const currentSnapshot = snapshot;
  const reminderPlan = currentSnapshot.plans.find((item) => item.id === 'plan-evening') ?? currentSnapshot.plans[0];
  async function setReminder() {
    const deviceTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!currentSnapshot.isDemo && reminderPlan.timezone !== deviceTimezone) { setReminderState('timezone'); return; }
    const [hour, minute] = reminderPlan.times[0].split(':').map(Number);
    const result = await scheduleDemoReminder(reminderPlan.id, hour, minute);
    setReminderState(result.ok ? 'scheduled' : 'denied');
  }
  const reminderTime = reminderPlan?.times[0] ?? '08:00';
  return <Screen><DisplayText style={styles.heading}>Bakım planları</DisplayText><BodyText style={styles.intro}>Ne yapılacağını değil, ne zaman kayıt beklendiğini birlikte görün.</BodyText>{snapshot.isDemo ? <DemoBanner /> : null}{snapshot.plans.map((plan) => <View key={plan.id} style={styles.card}><View style={styles.time}><Text style={styles.timeText}>{plan.times[0]}</Text></View><View style={styles.copy}><TitleText>{plan.title}</TitleText><BodyText>{plan.instruction}</BodyText><MetaText style={styles.state}>Her gün · {plan.timezone} · aktif</MetaText></View></View>)}<Pressable accessibilityRole="button" onPress={setReminder} style={styles.reminder}><Text style={styles.reminderText}>{reminderState === 'scheduled' ? `${reminderTime} hatırlatıcısı kuruldu` : `${reminderTime} için yerel hatırlatıcı kur`}</Text></Pressable>{reminderState === 'denied' && <MetaText style={styles.denied}>Bildirim izni verilmedi. Cihaz ayarlarından daha sonra açabilirsin.</MetaText>}{reminderState === 'timezone' && <MetaText style={styles.denied}>Cihaz saat dilimi planın saat diliminden farklı. Yanlış saatte uyarmamak için yerel hatırlatıcı kurulmadı.</MetaText>}</Screen>;
}
const styles = StyleSheet.create({ heading: { marginTop: spacing.xl }, intro: { color: palette.muted, marginTop: spacing.sm }, card: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.lg, borderWidth: 1, flexDirection: 'row', gap: spacing.lg, marginBottom: spacing.md, padding: spacing.lg }, time: { alignItems: 'center', backgroundColor: palette.primarySoft, borderRadius: radius.sm, height: 48, justifyContent: 'center', width: 62 }, timeText: { color: palette.primary, fontSize: 15, fontWeight: '800' }, copy: { flex: 1, gap: spacing.xs }, state: { color: palette.primary, marginTop: spacing.sm }, reminder: { alignItems: 'center', borderColor: palette.primary, borderRadius: radius.md, borderWidth: 1, justifyContent: 'center', marginTop: spacing.md, minHeight: touchTarget, paddingHorizontal: spacing.md }, reminderText: { color: palette.primary, fontSize: 15, fontWeight: '700' }, denied: { color: palette.overdue, marginTop: spacing.sm } });
