import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { MetaText } from './typography';
import { useAppTheme } from '@/design/theme';
import { layout, radius, spacing, typography } from '@/design/tokens';

export type Tile = { icon: keyof typeof Ionicons.glyphMap; value: string; unit?: string; label: string };

/** Günün üç sayısı: okunacak veri, dekorasyon değil. */
export function StatTiles({ tiles }: { tiles: Tile[] }) {
  const theme = useAppTheme();
  return (
    <View style={styles.row}>
      {tiles.map((tile) => (
        <View key={tile.label} style={[styles.tile, { backgroundColor: theme.surface, borderColor: theme.line }]}>
          <View style={[styles.icon, { backgroundColor: theme.primarySoft }]}>
            <Ionicons color={theme.onPrimarySoft} name={tile.icon} size={layout.icon.md} />
          </View>
          <View style={styles.value}>
            <Text style={[styles.number, { color: theme.ink }]}>{tile.value}</Text>
            {tile.unit ? <MetaText style={styles.unit}>{tile.unit}</MetaText> : null}
          </View>
          <MetaText numberOfLines={2}>{tile.label}</MetaText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm, marginTop: layout.blockGap },
  tile: { borderRadius: radius.lg, borderWidth: 1, flex: 1, gap: spacing.xs, padding: layout.cardPadding },
  icon: { alignItems: 'center', borderRadius: radius.pill, height: 30, justifyContent: 'center', width: 30 },
  value: { alignItems: 'baseline', flexDirection: 'row', gap: spacing.xxs },
  number: { fontSize: 22, fontVariant: ['tabular-nums'], fontWeight: typography.title.fontWeight, letterSpacing: -0.3, lineHeight: 26 },
  unit: { lineHeight: 18 },
});
