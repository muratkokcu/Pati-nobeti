import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { BodyStrongText, MetaText } from './typography';
import { useAppTheme } from '@/design/theme';
import { layout, personColorAt, personColorIndex, radius, scaled, spacing, typography } from '@/design/tokens';

export type PersonBadgeSize = 'sm' | 'md' | 'lg';

type Props = {
  name: string;
  /** Renk kaynağı. Hane genelinde çakışmasız atama için `assignPersonColors` sonucunu `colorIndex` ile geçir. */
  memberId?: string;
  colorIndex?: number;
  initials?: string;
  size?: PersonBadgeSize;
  showName?: boolean;
  detail?: string;
  /** Renk körlüğü/gri ton provası: kimlik yalnız baş harf ve isimle taşınır. */
  monochrome?: boolean;
  style?: StyleProp<ViewStyle>;
};

const INITIAL_SIZE: Record<PersonBadgeSize, number> = { sm: 11, md: 13, lg: 16 };

/** İki kelimeye kadar baş harf; Türkçe büyütme (i → İ) kullanılır. */
export function personInitials(name: string, fallback?: string) {
  if (fallback) return fallback.toLocaleUpperCase('tr-TR').slice(0, 2);
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const letters = parts.length === 1 ? parts[0].slice(0, 2) : `${parts[0][0]}${parts[parts.length - 1][0]}`;
  return letters.toLocaleUpperCase('tr-TR');
}

/**
 * Kimlik taşıyıcısı: renk + baş harf + isim. Renk kaldırıldığında da okunur kalır —
 * baş harf daireye, isim satıra her zaman yazılır.
 */
export function PersonBadge({ name, memberId, colorIndex, initials, size = 'md', showName = true, detail, monochrome = false, style }: Props) {
  const theme = useAppTheme();
  const index = colorIndex ?? (memberId ? personColorIndex(memberId) : personColorIndex(name));
  const person = personColorAt(theme, index);
  // K-19: yazı ölçeği büyüdüğünde daire de büyür; baş harf kırpılmaz.
  const diameter = scaled(layout.avatar[size]);
  const fill = monochrome ? theme.sunken : person.fill;
  const onFill = monochrome ? theme.ink : person.onFill;
  return (
    <View accessibilityLabel={detail ? `${name}, ${detail}` : name} accessible style={[styles.root, style]}>
      <View style={[styles.avatar, { backgroundColor: fill, borderRadius: diameter / 2, height: diameter, width: diameter }]}>
        <Text style={[styles.initials, { color: onFill, fontSize: INITIAL_SIZE[size] }]}>{personInitials(name, initials)}</Text>
      </View>
      {showName ? (
        <View style={styles.copy}>
          <BodyStrongText>{name}</BodyStrongText>
          {detail ? <MetaText>{detail}</MetaText> : null}
        </View>
      ) : null}
    </View>
  );
}

/** Çakışan kayıtlarda iki avatar yan yana: "ikiniz de ilgilendiniz". */
export function PersonBadgeStack({ people, size = 'sm', monochrome = false, ringColor }: { people: { colorIndex?: number; id?: string; initials?: string; name: string }[]; size?: PersonBadgeSize; monochrome?: boolean; ringColor?: string }) {
  const theme = useAppTheme();
  const diameter = scaled(layout.avatar[size]);
  return (
    <View accessibilityLabel={people.map((person) => person.name).join(' ve ')} accessible style={styles.stack}>
      {people.map((person, order) => (
        <View key={`${person.id ?? person.name}-${order}`} style={[styles.stacked, { borderColor: ringColor ?? theme.surface, borderRadius: (diameter + 4) / 2, marginLeft: order === 0 ? 0 : -diameter / 3 }]}>
          <PersonBadge colorIndex={person.colorIndex} initials={person.initials} memberId={person.id} monochrome={monochrome} name={person.name} showName={false} size={size} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm },
  avatar: { alignItems: 'center', justifyContent: 'center' },
  initials: { fontWeight: typography.bodyStrong.fontWeight, letterSpacing: 0.2 },
  copy: { flexShrink: 1, gap: spacing.xxs },
  stack: { alignItems: 'center', flexDirection: 'row' },
  stacked: { borderRadius: radius.pill, borderWidth: 2 },
});
