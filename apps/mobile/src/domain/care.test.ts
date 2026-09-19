import { clockSuffix, conflictNotice, conflictReason, eventSentence, getOccurrenceState, hasConflict, outcomeLabel } from './care';
import type { CareEvent, TaskOccurrence } from './types';

const base: TaskOccurrence = { id: 'occ', planId: 'plan', petId: 'pet', title: 'Bakım', instruction: 'Plan', scheduledAt: '2026-09-18T10:00:00.000Z', events: [] };
const event = (outcome: CareEvent['outcome'], overrides: Partial<CareEvent> = {}): CareEvent => ({ id: `${outcome}-${overrides.actorName ?? 'deniz'}-${overrides.kind ?? 'record'}`, occurrenceId: 'occ', outcome, actorId: 'member', actorName: 'Deniz', recordedAt: '2026-09-18T10:05:00.000Z', syncState: 'synced', kind: 'record', ...overrides });

describe('care timeline rules', () => {
  it('marks a task due twenty minutes before its time', () => expect(getOccurrenceState(base, new Date('2026-09-18T09:45:00.000Z'))).toBe('due'));
  it('marks a task overdue after the grace period', () => expect(getOccurrenceState(base, new Date('2026-09-18T10:11:00.000Z'))).toBe('overdue'));
  it('shows conflicting outcomes instead of silently overwriting', () => {
    const events = [event('done'), event('uncertain')];
    expect(hasConflict(events)).toBe(true);
    expect(getOccurrenceState({ ...base, events })).toBe('conflict');
  });
  it('treats a second done record as a conflict, not a newer truth', () => {
    const events = [event('done'), event('done', { actorName: 'Murat', id: 'done-murat' })];
    expect(conflictReason(events)).toBe('duplicate-done');
    expect(conflictNotice('duplicate-done')).toBe('Bu bakım iki kez “yapıldı” olarak kaydedildi.');
  });
  it('clears the conflict once someone records which one stands', () => {
    const events = [event('done'), event('skipped'), event('done', { kind: 'resolution', actorName: 'Murat', id: 'resolution' })];
    expect(hasConflict(events)).toBe(false);
    expect(getOccurrenceState({ ...base, events })).toBe('recorded');
  });
  it('conflicts again when a new record disagrees with the resolution', () => {
    const events = [event('done'), event('skipped'), event('done', { kind: 'resolution', id: 'resolution' }), event('skipped', { id: 'later', actorName: 'Murat' })];
    expect(conflictReason(events)).toBe('disagreement');
  });
  it('keeps record language explicit', () => expect(outcomeLabel('done')).toBe('“yapıldı”'));
  it('names the actor and the kind of entry', () => {
    expect(eventSentence(event('done'))).toContain('Deniz');
    expect(eventSentence(event('done', { kind: 'resolution' }))).toContain('netleştirdi');
  });
  it('picks the Turkish locative suffix by how the clock is read', () => {
    expect(clockSuffix(new Date(2026, 8, 18, 8, 12))).toBe('de');
    expect(clockSuffix(new Date(2026, 8, 18, 18, 59))).toBe('da');
    expect(clockSuffix(new Date(2026, 8, 18, 20, 30))).toBe('da');
    expect(clockSuffix(new Date(2026, 8, 18, 8, 0))).toBe('de');
  });
});
