import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import { PersonBadgeStack } from './person-badge';
import { BodyStrongText, DisplayText, MetaText } from './typography';
import { useAppTheme } from '@/design/theme';
import { layout, radius, spacing, typography } from '@/design/tokens';
import { standingEvents } from '@/domain/care';
import { DEMO_PET_PHOTO } from '@/domain/types';
import type { HouseholdMember, Pet, TaskOccurrence } from '@/domain/types';

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
 * Ekranın açılışı hayvanın kendisidir: fotoğraf kenardan kenara, ekranın üst üçte birini
 * kaplar. Metin fotoğrafın üstünde yüzmez; alttaki koyu panelin içinde durur (K-11).
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

  return (
    <View style={[styles.root, { backgroundColor: theme.heroPrimary }]}>
      {photo ? (
        <Image accessibilityIgnoresInvertColors contentFit="cover" contentPosition={{ left: '50%', top: '30%' }} source={photo} style={StyleSheet.absoluteFill} transition={220} />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.fallback]}>
          <Ionicons color={theme.onHeroPrimaryMuted} name="paw-outline" size={layout.icon.xl * 2} />
          <MetaText style={{ color: theme.onHeroPrimaryMuted }}>{`${pet.name} için fotoğraf eklenmedi`}</MetaText>
        </View>
      )}

      <View style={styles.bottom}>
        <View style={[styles.panel, { backgroundColor: theme.photoPanel }]}>
          <View style={styles.panelHead}>
            <DisplayText numberOfLines={1} style={[styles.name, { color: theme.onPhotoPanel }]}>{pet.name}</DisplayText>
            {total > 0 ? <DayTrack occurrences={occurrences} /> : null}
          </View>
          <BodyStrongText numberOfLines={2} style={{ color: theme.onPhotoPanelMuted }}>{summary}</BodyStrongText>
          {members.length > 0 ? (
            <View style={styles.people}>
              <PersonBadgeStack
                people={members.map((member) => ({ colorIndex: colorIndexFor(member.id), id: member.id, initials: member.initials, name: member.name }))}
                ringColor={theme.photoPanel}
                size="sm"
              />
              <MetaText numberOfLines={2} style={[styles.peopleNames, { color: theme.onPhotoPanelMuted }]}>
                {members.length === 1 ? 'bakımı yalnız siz kaydediyorsunuz' : members.map((member) => member.name).join(' ve ')}
              </MetaText>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

/** Günün her bakımı için bir dilim: kaydedilen dolu, bekleyen boş. */
function DayTrack({ occurrences }: { occurrences: TaskOccurrence[] }) {
  const theme = useAppTheme();
  return (
    <View aria-hidden pointerEvents="none" style={styles.track}>
      {occurrences.map((occurrence) => {
        const filled = standingEvents(occurrence.events).length > 0;
        return <View key={occurrence.id} style={[styles.segment, { backgroundColor: filled ? theme.onPhotoPanel : 'transparent', borderColor: theme.onPhotoPanelMuted }]} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { height: layout.heroHeight, justifyContent: 'flex-end', overflow: 'hidden' },
  fallback: { alignItems: 'center', gap: spacing.sm, justifyContent: 'center' },
  bottom: { paddingBottom: spacing.xxl + spacing.md, paddingHorizontal: spacing.md },
  panel: { borderRadius: radius.xl, gap: spacing.xs, padding: layout.cardPadding },
  panelHead: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, justifyContent: 'space-between' },
  name: { flexShrink: 1 },
  track: { flexDirection: 'row', gap: spacing.xs, width: 72 },
  segment: { borderRadius: radius.pill, borderWidth: 1, flex: 1, minHeight: 6 },
  people: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.xxs },
  peopleNames: { ...typography.meta, flexShrink: 1 },
});
