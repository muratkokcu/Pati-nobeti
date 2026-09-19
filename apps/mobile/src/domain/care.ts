import type { CareEvent, CareOutcome, TaskOccurrence } from './types';

export type OccurrenceDisplayState = 'upcoming' | 'due' | 'overdue' | 'recorded' | 'conflict';
export type ConflictReason = 'duplicate-done' | 'disagreement';

export function getOccurrenceState(occurrence: TaskOccurrence, now = new Date()): OccurrenceDisplayState {
  if (hasConflict(occurrence.events)) return 'conflict';
  if (occurrence.events.length > 0) return 'recorded';
  const deltaMinutes = (new Date(occurrence.scheduledAt).getTime() - now.getTime()) / 60_000;
  if (deltaMinutes < -10) return 'overdue';
  if (deltaMinutes <= 20) return 'due';
  return 'upcoming';
}

// Kayıt silinmez: bir netleştirmeden önceki kayıtlar geçmişte durur, ekranda netleştirme geçerlidir.
export function standingEvents(events: CareEvent[]) {
  let last = -1;
  events.forEach((event, index) => { if (event.kind === 'resolution') last = index; });
  return last === -1 ? events : events.slice(last);
}

export function conflictReason(events: CareEvent[]): ConflictReason | null {
  const standing = standingEvents(events);
  if (standing.length < 2) return null;
  if (standing.filter((event) => event.outcome === 'done').length > 1) return 'duplicate-done';
  if (new Set(standing.map((event) => event.outcome)).size > 1) return 'disagreement';
  return null;
}

export function hasConflict(events: CareEvent[]) {
  return conflictReason(events) !== null;
}

export function conflictNotice(reason: ConflictReason) {
  return reason === 'duplicate-done' ? 'Bu bakım iki kez “yapıldı” olarak kaydedildi.' : 'Aynı bakım için farklı kayıtlar var.';
}

export function outcomeLabel(outcome: CareOutcome) {
  if (outcome === 'done') return '“yapıldı”';
  if (outcome === 'skipped') return '“atlandı”';
  return '“emin değilim”';
}

// Saat ekini okunuşa göre seçer: 08:12’de ama 18:59’da.
const LOCATIVE: Record<number, string> = { 0: 'da', 1: 'de', 2: 'de', 3: 'te', 4: 'te', 5: 'te', 6: 'da', 7: 'de', 8: 'de', 9: 'da', 10: 'da', 20: 'de', 30: 'da', 40: 'ta', 50: 'de' };

export function clockSuffix(date: Date) {
  const minute = date.getMinutes();
  const spoken = minute === 0 ? date.getHours() : minute;
  return spoken % 10 === 0 ? LOCATIVE[spoken] ?? 'da' : LOCATIVE[spoken % 10];
}

export function eventSentence(event: CareEvent) {
  const recordedAt = new Date(event.recordedAt);
  const time = new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(recordedAt);
  const verb = event.kind === 'resolution' ? 'olarak netleştirdi.' : 'ekledi.';
  return `${event.actorName}, ${time}’${clockSuffix(recordedAt)} ${outcomeLabel(event.outcome)} ${verb}`;
}

export function outcomeAccessibleLabel(outcome: CareOutcome) {
  if (outcome === 'done') return 'Yapıldı olarak kaydet';
  if (outcome === 'skipped') return 'Atlandı olarak kaydet';
  return 'Emin değilim olarak kaydet';
}

export function resolutionAccessibleLabel(outcome: CareOutcome) {
  if (outcome === 'done') return 'Yapıldı olarak netleştir';
  if (outcome === 'skipped') return 'Atlandı olarak netleştir';
  return 'Emin değilim olarak netleştir';
}
