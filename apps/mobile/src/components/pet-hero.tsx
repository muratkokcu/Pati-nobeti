import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { PersonBadgeStack } from './person-badge';
import { BodyText, DisplayText, MetaText } from './typography';
import { useAppTheme } from '@/design/theme';
import { layout, radius, spacing, typography } from '@/design/tokens';
import { DEMO_PET_PHOTO } from '@/domain/types';
import type { HouseholdMember, Pet, TaskOccurrence } from '@/domain/types';
import { standingEvents } from '@/domain/care';

/** Demo hanesinin paketlenmiş fotoğrafı. Kaynak ve lisans: assets/images/pets/KAYNAK.md */
const DEMO_PHOTO = require('@/assets/images/pets/luna.jpg');

function photoSource(photoUri?: string) {
  if (!photoUri) return null;
  return photoUri === DEMO_PET_PHOTO ? DEMO_PHOTO : { uri: photoUri };
}

type Props = {
  pet: Pet;
  occurrences: TaskOccurrence[];
  members: HouseholdMember[];
  colorIndexFor: (memberId: string) => number;
};

/**
 * Günün tek bakışlık özeti: hayvanın kendisi, bugünün sayacı, bakım verenler.
 * Metin fotoğrafın üstünde durmaz; renk bloğunun içinde durur (K-11).
 */
export function PetHero({ pet, occurrences, members, colorIndexFor }: Props) {
  const theme = useAppTheme();
  const photo = photoSource(pet.photoUri);
  const recorded = occurrences.filter((occurrence) => standingEvents(occurrence.events).length > 0).length;
  const total = occurrences.length;
  const summary = total === 0
    ? 'Bugün için planlanmış bakım yok'
    : recorded === total
      ? `Bugünün ${total} bakımı da kaydedildi`
      : `Bugün ${recorded} / ${total} kaydedildi`;
  const photoWidth = layout.heroPhoto;

  return (
    <View style={[styles.root, { backgroundColor: theme.heroPrimary }]}>
      <RailTexture />

      <View style={[styles.photoFrame, { backgroundColor: theme.photoPanel, borderRadius: radius.xl, width: photoWidth }]}>
        {photo ? (
          <Image accessibilityIgnoresInvertColors contentFit="cover" source={photo} style={styles.photo} transition={180} />
        ) : (
          <View style={styles.photoFallback}>
            <Ionicons color={theme.onPhotoPanelMuted} name="paw-outline" size={layout.icon.xl} />
            <MetaText style={{ color: theme.onPhotoPanelMuted }}>Fotoğraf yok</MetaText>
          </View>
        )}
      </View>

      <View style={styles.copy}>
        <DisplayText numberOfLines={2} style={{ color: theme.onHeroPrimary }}>{pet.name}</DisplayText>
        <BodyText numberOfLines={2} style={{ color: theme.onHeroPrimaryMuted }}>{summary}</BodyText>
        {total > 0 ? <DayTrack occurrences={occurrences} /> : null}
        {members.length > 0 ? (
          <View style={styles.people}>
            <PersonBadgeStack ringColor={theme.onHeroPrimary} people={members.map((member) => ({ colorIndex: colorIndexFor(member.id), id: member.id, initials: member.initials, name: member.name }))} size="sm" />
            <MetaText numberOfLines={2} style={[styles.peopleNames, { color: theme.onHeroPrimaryMuted }]}>
              {members.length === 1 ? 'yalnız siz bakıyorsunuz' : members.map((member) => member.name).join(' ve ')}
            </MetaText>
          </View>
        ) : null}
      </View>
    </View>
  );
}

/**
 * "Ortak Hat" dokusu: markanın zaman hattı motifi, hero zemininde sessiz bir katman olarak.
 * İkon değil çizgi-ve-düğüm; kenara kadar akar, metnin altına binmez.
 */
function RailTexture() {
  const theme = useAppTheme();
  return (
    <View aria-hidden pointerEvents="none" style={styles.texture}>
      {[0, 1, 2, 3, 4].map((row) => (
        <View key={row} style={styles.textureRow}>
          <View style={[styles.textureNode, { borderColor: theme.onHeroPrimary }]} />
          <View style={[styles.textureLine, { backgroundColor: theme.onHeroPrimary, width: 56 + row * 22 }]} />
        </View>
      ))}
    </View>
  );
}

/** Günün her bakımı için bir dilim: kaydedilen dolu, bekleyen boş. Sayının görsel karşılığı. */
function DayTrack({ occurrences }: { occurrences: TaskOccurrence[] }) {
  const theme = useAppTheme();
  return (
    <View aria-hidden pointerEvents="none" style={styles.track}>
      {occurrences.map((occurrence) => {
        const filled = standingEvents(occurrence.events).length > 0;
        return <View key={occurrence.id} style={[styles.segment, { backgroundColor: filled ? theme.onHeroPrimary : 'transparent', borderColor: theme.onHeroPrimaryMuted }]} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { borderRadius: radius.xxl, flexDirection: 'row', gap: spacing.lg, minHeight: layout.heroMinHeight, overflow: 'hidden', padding: layout.cardPaddingLoose },
  texture: { gap: spacing.sm, opacity: 0.14, position: 'absolute', right: -24, top: -6, transform: [{ rotate: '-14deg' }] },
  textureRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.xs },
  textureNode: { borderRadius: radius.pill, borderWidth: 1.5, height: 7, width: 7 },
  textureLine: { borderRadius: radius.pill, height: 1.5 },
  photoFrame: { aspectRatio: 4 / 5, overflow: 'hidden' },
  photo: { flex: 1 },
  photoFallback: { alignItems: 'center', flex: 1, gap: spacing.xs, justifyContent: 'center' },
  copy: { flex: 1, gap: spacing.xs, justifyContent: 'center', minWidth: 0 },
  track: { flexDirection: 'row', gap: spacing.xs, marginTop: spacing.xs },
  segment: { borderRadius: radius.pill, borderWidth: 1, flex: 1, maxWidth: 48, minHeight: 6 },
  people: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xs },
  peopleNames: { ...typography.meta, flexShrink: 1 },
});
