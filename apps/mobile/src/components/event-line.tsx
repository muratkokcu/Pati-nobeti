import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { eventSentence, formatClock } from '@/domain/care';
import type { CareEvent } from '@/domain/types';
import { eventVerb, outcomeWord } from '@/design/status-language';
import { useAppTheme } from '@/design/theme';
import { layout, personColorAt, personColorIndex, spacing, typography } from '@/design/tokens';

type Props = {
  event: CareEvent;
  /** Hane genelinde çakışmasız kişi rengi; verilmezse üye id'sinden türetilir. */
  colorIndex?: number;
  monochrome?: boolean;
  numberOfLines?: number;
  /** Satırda plan saati zaten varsa kayıt saatini tekrarlama. */
  showTime?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Kalıcı imza satırı: SAAT → KİŞİ → FİİL, tek satırda.
 * "08:12 · Deniz yapıldı ekledi" — ayırıcı noktanın kendisi kişinin rengidir,
 * yani renk kaybolduğunda bile cümle aynı şekilde okunur.
 */
export function EventLine({ event, colorIndex, monochrome = false, numberOfLines, showTime = true, style }: Props) {
  const theme = useAppTheme();
  const index = colorIndex ?? personColorIndex(event.actorId);
  const person = personColorAt(theme, index);
  const statusColor = theme.status[event.outcome].fg;
  return (
    <View accessibilityLabel={eventSentence(event)} accessible style={[styles.root, style]}>
      {showTime ? <Text style={[styles.time, { color: theme.ink }]}>{formatClock(event.recordedAt)}</Text> : null}
      <View style={[styles.dot, { backgroundColor: monochrome ? theme.muted : person.fill }]} />
      <Text numberOfLines={numberOfLines} style={[styles.sentence, { color: theme.ink }]}>
        <Text style={styles.actor}>{event.actorName}</Text>
        <Text>{' '}</Text>
        <Text style={[styles.outcome, { color: monochrome ? theme.ink : statusColor }]}>{`“${outcomeWord(event.outcome)}”`}</Text>
        <Text>{` ${eventVerb(event)}`}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.sm, minHeight: 22 },
  time: { ...typography.clock, paddingTop: 2 },
  dot: { borderRadius: layout.dot / 2, height: layout.dot, marginTop: 6, width: layout.dot },
  sentence: { ...typography.body, flexShrink: 1 },
  actor: typography.bodyStrong,
  outcome: { fontWeight: typography.bodyStrong.fontWeight },
});
