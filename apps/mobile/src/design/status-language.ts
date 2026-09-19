import type { ComponentProps } from 'react';
import type Ionicons from '@expo/vector-icons/Ionicons';
import { getOccurrenceState, standingEvents } from '@/domain/care';
import type { CareEvent, CareOutcome, TaskOccurrence } from '@/domain/types';
import type { StatusKey } from '@/design/tokens';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

/**
 * Durum dili — tek kaynak (K-24 sabit sözlüğü).
 *
 * Her durum üç işaret taşır: ikon + Türkçe etiket + renk (K-23). Renk tek başına hiçbir şey
 * anlatmaz; ölçüldü ki gri tonda durum renkleri birbirinden ayrılmıyor (ör. yapıldı ↔ çakışma
 * ΔE 0,4). Bu yüzden ikon ve etiket kaldırılamaz.
 *
 * K-25: silüetler ayrışır. Üç daire (tik / çizgi / soru) içleriyle; "yaklaşıyor" boş halka,
 * "şimdi" dolu iç halka, "geçti" saat, "iki farklı kayıt var" çatallanan çizgi — son ikisi
 * tamamen farklı geometridedir.
 */
export const STATUS_LANGUAGE: Record<StatusKey, { icon: IoniconName; label: string; sentence: string }> = {
  upcoming: { icon: 'time-outline', label: 'Yaklaşıyor', sentence: 'Planlanan saat henüz gelmedi' },
  due: { icon: 'radio-button-on', label: 'Şimdi', sentence: 'Planlanan saat geldi' },
  overdue: { icon: 'alarm', label: 'Geçti', sentence: 'Planlanan saat geçti, kayıt yok' },
  done: { icon: 'checkmark-circle', label: 'Yapıldı', sentence: 'Yapıldı olarak kaydedildi' },
  skipped: { icon: 'remove-circle', label: 'Atlandı', sentence: 'Atlandı olarak kaydedildi' },
  uncertain: { icon: 'help-circle', label: 'Emin değilim', sentence: 'Emin değilim olarak kaydedildi' },
  conflict: { icon: 'git-compare', label: 'İki farklı kayıt var', sentence: 'Aynı bakım için iki farklı kayıt var' },
};

export function statusLabel(status: StatusKey) {
  return STATUS_LANGUAGE[status].label;
}

/** Kayıt cümlesinde geçen fiil kökü: tırnaksız, cümle içinde akan hâli. */
export function outcomeWord(outcome: CareOutcome): string {
  if (outcome === 'done') return 'yapıldı';
  if (outcome === 'skipped') return 'atlandı';
  return 'emin değilim';
}

export function eventVerb(event: CareEvent): string {
  return event.kind === 'resolution' ? 'olarak netleştirdi' : 'kaydetti';
}

/** Ekranda gösterilecek durum. Yedi durumun hepsi bu tek eşlemeden gelir. */
export function careStatusOf(occurrence: TaskOccurrence, now = new Date()): StatusKey {
  const state = getOccurrenceState(occurrence, now);
  if (state === 'conflict') return 'conflict';
  if (state === 'overdue') return 'overdue';
  if (state === 'due') return 'due';
  if (state === 'upcoming') return 'upcoming';
  // Netleştirmeden sonra geçerli olan kayıt gösterilir; öncekiler geçmişte durur.
  const standing = standingEvents(occurrence.events);
  const last = standing[standing.length - 1];
  return last ? last.outcome : 'upcoming';
}
