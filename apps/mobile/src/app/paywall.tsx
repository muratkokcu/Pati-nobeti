import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BodyText, MetaText, TitleText } from '@/components/typography';
import { Screen } from '@/components/screen';
import { layout, palette, radius, spacing, touchTarget, typography } from '@/design/tokens';
import { useRuntime } from '@/state/runtime-context';

const benefits = ['Planlanan: sınırsız ortak bakım geçmişi', 'Planlanan: paylaşılabilir bakım özeti', 'Planlanan: gelişmiş hatırlatma seçenekleri'];
export default function PaywallScreen() {
  const runtime = useRuntime();
  useEffect(() => { if (runtime.gateway && runtime.activeHouseholdId) void runtime.gateway.trackEvent('paywall_viewed', runtime.activeHouseholdId).catch(() => undefined); }, [runtime.gateway, runtime.activeHouseholdId]);
  const registerInterest = async () => {
    if (runtime.gateway && runtime.activeHouseholdId) await runtime.gateway.trackEvent('paywall_interest', runtime.activeHouseholdId, { offer: 'monthly_79_99_try' }).catch(() => undefined);
    router.back();
  };
  return <Screen><View style={styles.root}><View style={styles.mark}><Ionicons color={palette.primary} name="git-merge-outline" size={layout.icon.lg} /></View><MetaText>Plus önizlemesi</MetaText><TitleText style={styles.title}>Bakım hattı herkes için net kalsın</TitleText><BodyText style={styles.body}>Bu ekran yalnızca ürün teklifini doğrulamak için var. Ödeme alınmaz ve abonelik başlatılmaz.</BodyText><View style={styles.benefits}>{benefits.map((benefit) => <View key={benefit} style={styles.benefit}><Ionicons color={palette.primary} name="checkmark" size={layout.icon.md} /><BodyText style={styles.benefitText}>{benefit}</BodyText></View>)}</View><View style={styles.price}><MetaText>Planlanan fiyat testi</MetaText><Text style={styles.amount}>₺79,99 <Text style={styles.period}>/ ay</Text></Text></View><Pressable accessibilityRole="button" onPress={() => void registerInterest()} style={styles.primary}><Text style={styles.primaryText}>İlgileniyorum</Text></Pressable><MetaText style={styles.disclosure}>Fiyat, paket ve özellikler doğrulama sonucuna göre değişebilir. Bu sürümde satın alma kapalıdır.</MetaText></View></Screen>;
}
const styles = StyleSheet.create({ root: { paddingTop: spacing.xl }, mark: { alignItems: 'center', backgroundColor: palette.primarySoft, borderRadius: radius.pill, height: layout.avatar.lg, justifyContent: 'center', marginBottom: spacing.xl, width: layout.avatar.lg }, title: { ...typography.display, marginTop: spacing.sm }, body: { color: palette.muted, marginTop: spacing.md }, benefits: { gap: spacing.md, marginVertical: spacing.xl }, benefit: { alignItems: 'center', flexDirection: 'row', gap: spacing.md }, benefitText: { flex: 1 }, price: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.lg, borderWidth: 1, gap: spacing.xs, marginBottom: spacing.xl, padding: spacing.lg }, amount: { ...typography.clockLead, color: palette.ink }, period: { ...typography.body, color: palette.muted }, primary: { alignItems: 'center', backgroundColor: palette.primary, borderRadius: radius.md, justifyContent: 'center', minHeight: touchTarget }, primaryText: { ...typography.bodyStrong, color: palette.white }, disclosure: { marginTop: spacing.lg, textAlign: 'center' } });
