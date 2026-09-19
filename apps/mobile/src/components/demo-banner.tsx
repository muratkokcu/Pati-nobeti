import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { layout, palette, radius, spacing, typography } from '@/design/tokens';

export function DemoBanner() {
  return <View accessibilityRole="text" style={styles.banner}><Ionicons color={palette.primary} name="flask-outline" size={layout.icon.md} /><Text style={styles.text}>Yerel demo · Yerel hatırlatıcı kullanılabilir; push, ödeme ve uzak eşitleme kapalı</Text></View>;
}
const styles = StyleSheet.create({
  banner: { alignItems: 'center', alignSelf: 'flex-start', backgroundColor: palette.primarySoft, borderRadius: radius.sm, flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl, marginTop: spacing.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  text: { ...typography.meta, color: palette.primary, flexShrink: 1 },
});
