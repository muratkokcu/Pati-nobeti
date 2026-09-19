import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { palette, radius, spacing } from '@/design/tokens';

export function DemoBanner() {
  return <View accessibilityRole="text" style={styles.banner}><Ionicons color={palette.primary} name="flask-outline" size={17} /><Text style={styles.text}>Yerel demo · Yerel hatırlatıcı kullanılabilir; push, ödeme ve uzak eşitleme kapalı</Text></View>;
}
const styles = StyleSheet.create({
  banner: { alignItems: 'center', alignSelf: 'flex-start', backgroundColor: palette.primarySoft, borderRadius: radius.sm, flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.xl, marginTop: spacing.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  text: { color: palette.primary, flexShrink: 1, fontSize: 12, fontWeight: '700', lineHeight: 17 },
});
