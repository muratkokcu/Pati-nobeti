import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PersonBadgeStack } from '@/components/person-badge';
import { Screen } from '@/components/screen';
import { BodyText, DisplayText, MetaText } from '@/components/typography';
import { layout, palette, radius, spacing, touchTarget, typography } from '@/design/tokens';
import { useRuntime } from '@/state/runtime-context';

/** Ücretsizde kalanlar, kıyaslama kararı 11 gereği ürünün varlık sebebini kapsar. */
const FREE = [
  'Sınırsız bakım veren — ikinci kişi hiçbir zaman ücretli değil',
  'Bir evcil hayvan, sınırsız günlük kayıt',
  'Son 30 günün ortak geçmişi ve çakışma uyarıları',
  'Kayıt düzeltme ve netleştirme',
];
const PLUS = [
  'Veterinere gönderilebilen isimsiz 30 günlük özet',
  'Sınırsız geçmiş arşivi',
  'Birden fazla evcil hayvan',
  'Kaçırılan bakım bildirimi',
];

export default function PaywallScreen() {
  const runtime = useRuntime();
  useEffect(() => { if (runtime.gateway && runtime.activeHouseholdId) void runtime.gateway.trackEvent('paywall_viewed', runtime.activeHouseholdId).catch(() => undefined); }, [runtime.gateway, runtime.activeHouseholdId]);
  const registerInterest = async () => {
    if (runtime.gateway && runtime.activeHouseholdId) await runtime.gateway.trackEvent('paywall_interest', runtime.activeHouseholdId, { offer: 'monthly_79_99_try' }).catch(() => undefined);
    router.back();
  };

  return <Screen>
    <DisplayText style={styles.heading}>İkinci bakım veren her zaman ücretsiz</DisplayText>
    <BodyText style={styles.intro}>Plus, hanenin kaydını dışarı çıkarmak ve büyütmek isteyenler için. Ortak bakımın kendisi ücretsiz kalır.</BodyText>

    {/* Ürünün kendisinden bir kesit: satılan şeyin gerçek görüntüsü */}
    <View style={styles.preview}>
      <View style={styles.previewHead}>
        <Text style={styles.previewTitle}>Son 30 gün · Luna</Text>
        <MetaText>örnek</MetaText>
      </View>
      <View style={styles.previewRow}>
        <Text style={styles.previewNumber}>58</Text>
        <View style={styles.previewCopy}><Text style={styles.previewLabel}>bakım kaydedildi</Text><MetaText>60 planlanan bakımın</MetaText></View>
      </View>
      <View style={styles.previewRow}>
        <Text style={styles.previewNumber}>2</Text>
        <View style={styles.previewCopy}><Text style={styles.previewLabel}>gün kayıt girilmedi</Text><MetaText>atlanmış sayılmaz, ayrı gösterilir</MetaText></View>
      </View>
      <View style={styles.previewFoot}>
        <PersonBadgeStack people={[{ colorIndex: 0, initials: 'B1', name: 'Bakım veren 1' }, { colorIndex: 1, initials: 'B2', name: 'Bakım veren 2' }]} ringColor={palette.raised} size="sm" />
        <MetaText style={styles.previewFootText}>Dışarı çıkan özette isim geçmez; kişiler rolüyle görünür.</MetaText>
      </View>
    </View>

    <View style={styles.columns}>
      <View style={styles.column}>
        <Text style={styles.columnTitle}>Ücretsiz</Text>
        {FREE.map((item) => (
          <View key={item} style={styles.item}>
            <Ionicons color={palette.statusInk.done} name="checkmark-circle" size={layout.icon.md} />
            <BodyText style={styles.itemText}>{item}</BodyText>
          </View>
        ))}
      </View>
      <View style={[styles.column, styles.columnPlus]}>
        <Text style={styles.columnTitle}>Plus ile gelenler</Text>
        {PLUS.map((item) => (
          <View key={item} style={styles.item}>
            <Ionicons color={palette.brassInk} name="add-circle" size={layout.icon.md} />
            <BodyText style={styles.itemText}>{item}</BodyText>
          </View>
        ))}
      </View>
    </View>

    <View style={styles.offer}>
      <View style={styles.priceRow}>
        <Text style={styles.amount}>₺79,99</Text>
        <MetaText style={styles.period}>/ ay · denenen fiyat</MetaText>
      </View>
      <Pressable accessibilityRole="button" onPress={() => void registerInterest()} style={({ pressed }) => [styles.primary, pressed && styles.pressed]}>
        <Text style={styles.primaryText}>Bu paket ilgimi çeker</Text>
      </Pressable>
      <MetaText>Bu sürümde satın alma kapalı: ödeme alınmaz, abonelik başlatılmaz. Düğme yalnızca fiyat ilgisini ölçer; fiyat ve paket doğrulama sonucuna göre değişebilir.</MetaText>
    </View>
  </Screen>;
}

const styles = StyleSheet.create({
  heading: { marginTop: spacing.xl },
  intro: { color: palette.muted, marginTop: spacing.sm },
  preview: { backgroundColor: palette.raised, borderColor: palette.line, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, marginTop: layout.sectionGap, padding: layout.cardPaddingLoose },
  previewHead: { alignItems: 'baseline', flexDirection: 'row', gap: spacing.sm, justifyContent: 'space-between' },
  previewTitle: { ...typography.bodyStrong, color: palette.ink },
  previewRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.md },
  previewNumber: { ...typography.clockLead, color: palette.ink, fontSize: 26, minWidth: 40 },
  previewCopy: { flex: 1 },
  previewLabel: { ...typography.bodyStrong, color: palette.ink },
  previewFoot: { alignItems: 'center', borderTopColor: palette.line, borderTopWidth: layout.hairline, flexDirection: 'row', gap: spacing.sm, paddingTop: spacing.md },
  previewFootText: { flex: 1 },
  columns: { gap: spacing.md, marginTop: layout.sectionGap },
  column: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: layout.cardPaddingLoose },
  columnPlus: { backgroundColor: palette.brassSoft, borderColor: palette.brass },
  columnTitle: { ...typography.title, color: palette.ink },
  item: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.sm },
  itemText: { flex: 1 },
  offer: { gap: spacing.md, marginTop: layout.sectionGap },
  priceRow: { alignItems: 'baseline', flexDirection: 'row', gap: spacing.sm },
  amount: { ...typography.display, color: palette.ink },
  period: { flexShrink: 1 },
  primary: { alignItems: 'center', backgroundColor: palette.primary, borderRadius: radius.md, justifyContent: 'center', minHeight: touchTarget },
  primaryText: { ...typography.bodyStrong, color: palette.white },
  pressed: { backgroundColor: palette.primaryPressed },
});
