import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { palette, radius, spacing } from '@/design/tokens';
import type { CareOutcome } from '@/domain/types';

const config = {
  done: { label: 'Yapıldı kaydı', icon: 'checkmark' as const, bg: palette.primarySoft, fg: palette.primary },
  skipped: { label: 'Atlandı kaydı', icon: 'remove' as const, bg: palette.brassSoft, fg: '#74450F' },
  uncertain: { label: 'Emin değilim', icon: 'help' as const, bg: palette.uncertainSoft, fg: palette.uncertain },
};
export function StatusLabel({ outcome }: { outcome: CareOutcome }) {
  const item = config[outcome];
  return <View style={[styles.root, { backgroundColor: item.bg }]}><Ionicons color={item.fg} name={item.icon} size={14} /><Text style={[styles.label, { color: item.fg }]}>{item.label}</Text></View>;
}
const styles = StyleSheet.create({ root: { alignItems: 'center', alignSelf: 'flex-start', borderRadius: radius.sm, flexDirection: 'row', gap: spacing.xs, paddingHorizontal: 9, paddingVertical: 6 }, label: { fontSize: 12, fontWeight: '700' } });

