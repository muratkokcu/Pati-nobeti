import { buildCurrentOccurrences, buildDayOccurrences, dayKeyInTimeZone, localDayKey, normalizeOccurrences, notificationResponseKey, occurrencesOn, rollForward, scheduledAtForTimeZone, todayOccurrenceForPlan } from './schedule';
import { createDemoSnapshot } from '@/data/seed';

const yesterday = () => { const date = new Date(); date.setDate(date.getDate() - 1); return date; };

describe('daily occurrences', () => {
  it('builds one occurrence per plan time and skips paused plans', () => {
    const occurrences = buildDayOccurrences([
      { id: 'plan-a', petId: 'pet', title: 'Sabah', instruction: '', times: ['08:00', '20:00'], timezone: 'UTC', isPaused: false },
      { id: 'plan-b', petId: 'pet', title: 'Duraklatılmış', instruction: '', times: ['12:00'], timezone: 'UTC', isPaused: true },
    ], '2026-09-18');
    expect(occurrences.map((occurrence) => occurrence.id)).toEqual(['occ-plan-a-2026-09-18-0800', 'occ-plan-a-2026-09-18-2000']);
  });

  it('does not carry yesterday forward, it creates today instead', () => {
    const snapshot = createDemoSnapshot(yesterday());
    expect(occurrencesOn(snapshot).length).toBe(0);
    const rolled = rollForward(snapshot);
    expect(occurrencesOn(rolled).length).toBe(2);
    expect(rolled.occurrences.length).toBe(4);
    expect(occurrencesOn(rolled).every((occurrence) => occurrence.events.length === 0)).toBe(true);
  });

  it('keeps yesterday records in the ledger', () => {
    const snapshot = rollForward(createDemoSnapshot(yesterday()));
    const past = occurrencesOn(snapshot, localDayKey(yesterday()));
    expect(past.flatMap((occurrence) => occurrence.events).map((event) => event.actorName)).toEqual(['Deniz']);
  });

  it('moves records from the old occurrence ids onto the daily ones without losing any', () => {
    const today = createDemoSnapshot();
    const legacy = { ...today, occurrences: today.occurrences.map((occurrence, index) => ({ ...occurrence, id: index === 0 ? 'occ-morning' : 'occ-evening' })) };
    const migrated = normalizeOccurrences(legacy);
    expect(migrated.occurrences.map((occurrence) => occurrence.id)).toEqual(today.occurrences.map((occurrence) => occurrence.id));
    expect(migrated.occurrences.flatMap((occurrence) => occurrence.events).length).toBe(1);
    expect(migrated.occurrences[0].events[0].occurrenceId).toBe(today.occurrences[0].id);
  });

  it('merges a legacy occurrence into an existing daily one instead of showing both', () => {
    const today = createDemoSnapshot();
    const duplicated = { ...today, occurrences: [...today.occurrences, { ...today.occurrences[0], id: 'occ-morning' }] };
    const migrated = normalizeOccurrences(duplicated);
    expect(migrated.occurrences.length).toBe(2);
    expect(migrated.occurrences[0].events.length).toBe(2);
  });

  it('is idempotent within the same day', () => {
    const snapshot = createDemoSnapshot();
    expect(rollForward(snapshot)).toBe(snapshot);
  });

  it('resolves a reminder plan against the day it is opened', () => {
    const snapshot = createDemoSnapshot(new Date(2026, 8, 18, 9));
    const tomorrow = new Date(2026, 8, 19, 9);
    const rolled = rollForward(snapshot, tomorrow);
    expect(todayOccurrenceForPlan(rolled, 'plan-evening', tomorrow)?.id).toContain('2026-09-19');
  });

  it('treats deliveries from the same repeating request as separate responses', () => {
    expect(notificationResponseKey('daily', 1, 'default')).not.toBe(notificationResponseKey('daily', 2, 'default'));
  });

  it('uses the plan timezone for a shared occurrence id and absolute schedule', () => {
    const instant = new Date('2026-09-18T22:30:00.000Z');
    expect(dayKeyInTimeZone(instant, 'Europe/Istanbul')).toBe('2026-09-19');
    expect(dayKeyInTimeZone(instant, 'America/Los_Angeles')).toBe('2026-09-18');
    const plan = { id: 'plan', petId: 'pet', title: 'Bakım', instruction: '', times: ['08:00'], timezone: 'Europe/Istanbul', isPaused: false };
    expect(buildCurrentOccurrences([plan], instant)[0].id).toBe('occ-plan-2026-09-19-0800');
    expect(scheduledAtForTimeZone('2026-09-19', '08:00', 'Europe/Istanbul')).toBe('2026-09-19T05:00:00.000Z');
  });
});
