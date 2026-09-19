import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { STATUS_LANGUAGE } from '@/design/status-language';
import { useAppTheme } from '@/design/theme';
import { layout, radius, spacing, typography, type StatusKey } from '@/design/tokens';

type Props = {
  status: StatusKey;
  /** Bağlama göre etiket ("Yapıldı" yerine "Yapıldı kaydı" gibi); varsayılan durum dilinden gelir. */
  label?: string;
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
};

/**
 * Durum üçlüsü: ikon + Türkçe etiket + renk. Renk tek başına anlam taşımaz;
 * ikon ve etiket kaldırılamaz, 1 px kenar çip'i her yüzeyde görünür tutar.
 */
export function StatusChip({ status, label, size = 'md', style }: Props) {
  const theme = useAppTheme();
  const language = STATUS_LANGUAGE[status];
  const colors = theme.status[status];
  const text = label ?? language.label;
  const small = size === 'sm';
  return (
    <View
      accessibilityLabel={label ?? language.sentence}
      accessible
      style={[styles.root, { backgroundColor: colors.bg, borderColor: colors.border, paddingHorizontal: small ? spacing.sm - 2 : spacing.sm, paddingVertical: small ? 3 : 5 }, style]}
    >
      <Ionicons color={colors.fg} name={language.icon} size={small ? layout.icon.xs : layout.icon.sm} />
      <Text style={[small ? styles.labelSmall : styles.label, { color: colors.fg }]}>{text}</Text>
    </View>
  );
}

/** Kişi rengiyle karışmasın diye durum noktası her zaman çip'in kenar rengini kullanır. */
export function StatusDot({ status, size = layout.dot }: { status: StatusKey; size?: number }) {
  const theme = useAppTheme();
  return <View style={{ backgroundColor: theme.status[status].accent, borderRadius: size / 2, height: size, width: size }} />;
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', alignSelf: 'flex-start', borderRadius: radius.sm, borderWidth: layout.hairline, flexDirection: 'row', gap: spacing.xs, maxWidth: '100%' },
  label: typography.metaStrong,
  labelSmall: typography.label,
});
