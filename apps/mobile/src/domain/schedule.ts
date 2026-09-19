import type { AppSnapshot, CarePlan, TaskOccurrence } from './types';

export function localDayKey(date: Date = new Date()) {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function dayKeyInTimeZone(date: Date, timezone: string) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? '';
  return `${value('year')}-${value('month')}-${value('day')}`;
}

export function occurrenceIdFor(planId: string, dayKey: string, time: string) {
  return `occ-${planId}-${dayKey}-${time.replace(':', '')}`;
}

export function scheduledAtFor(dayKey: string, time: string) {
  const [year, month, day] = dayKey.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  return new Date(year, month - 1, day, hour, minute, 0, 0).toISOString();
}

export function scheduledAtForTimeZone(dayKey: string, time: string, timezone: string) {
  const [year, month, day] = dayKey.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const targetAsUtc = Date.UTC(year, month - 1, day, hour, minute);
  let candidate = targetAsUtc;
  for (let pass = 0; pass < 2; pass += 1) {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date(candidate));
    const value = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value ?? 0);
    const representedAsUtc = Date.UTC(value('year'), value('month') - 1, value('day'), value('hour'), value('minute'));
    candidate += targetAsUtc - representedAsUtc;
  }
  return new Date(candidate).toISOString();
}

export function buildDayOccurrences(plans: CarePlan[], dayKey: string): TaskOccurrence[] {
  return plans
    .filter((plan) => !plan.isPaused)
    .flatMap((plan) => plan.times.map((time) => ({
      id: occurrenceIdFor(plan.id, dayKey, time), planId: plan.id, petId: plan.petId,
      title: plan.title, instruction: plan.instruction, scheduledAt: scheduledAtForTimeZone(dayKey, time, plan.timezone), events: [],
    })))
    .sort((left, right) => left.scheduledAt.localeCompare(right.scheduledAt));
}

export function buildCurrentOccurrences(plans: CarePlan[], now = new Date()) {
  return plans.flatMap((plan) => buildDayOccurrences([plan], dayKeyInTimeZone(now, plan.timezone))).sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
}

// Eski sürümden kalan kayıtlar günlük kimlik düzenine taşınır; hiçbir kayıt atılmaz.
export function normalizeOccurrences(snapshot: AppSnapshot): AppSnapshot {
  const byId = new Map<string, TaskOccurrence>();
  let changed = false;
  for (const occurrence of snapshot.occurrences) {
    const scheduled = new Date(occurrence.scheduledAt);
    const time = `${`${scheduled.getHours()}`.padStart(2, '0')}:${`${scheduled.getMinutes()}`.padStart(2, '0')}`;
    const id = occurrenceIdFor(occurrence.planId, localDayKey(scheduled), time);
    const events = occurrence.events.map((event) => event.occurrenceId === id ? event : { ...event, occurrenceId: id });
    const known = byId.get(id);
    if (id !== occurrence.id || known) changed = true;
    if (known) known.events = [...known.events, ...events].sort((left, right) => left.recordedAt.localeCompare(right.recordedAt));
    else byId.set(id, { ...occurrence, id, events });
  }
  return changed ? { ...snapshot, occurrences: [...byId.values()].sort((left, right) => left.scheduledAt.localeCompare(right.scheduledAt)) } : snapshot;
}

// Gün dönünce bugünün görevleri üretilir; geçmiş günler geçmişte kalsın diye silinmez.
export function rollForward(snapshot: AppSnapshot, now = new Date()): AppSnapshot {
  const known = new Set(snapshot.occurrences.map((occurrence) => occurrence.id));
  const missing = buildCurrentOccurrences(snapshot.plans, now).filter((occurrence) => !known.has(occurrence.id));
  return missing.length === 0 ? snapshot : { ...snapshot, occurrences: [...snapshot.occurrences, ...missing] };
}

export function occurrencesOn(snapshot: AppSnapshot, dayKey = localDayKey()) {
  return snapshot.occurrences
    .filter((occurrence) => localDayKey(new Date(occurrence.scheduledAt)) === dayKey)
    .sort((left, right) => left.scheduledAt.localeCompare(right.scheduledAt));
}

export function todayOccurrenceForPlan(snapshot: AppSnapshot, planId: string, now = new Date()) {
  const expected = new Set(buildCurrentOccurrences(snapshot.plans, now).map((occurrence) => occurrence.id));
  return snapshot.occurrences.find((occurrence) => occurrence.planId === planId && expected.has(occurrence.id));
}

export function currentOccurrences(snapshot: AppSnapshot, now = new Date()) {
  const expected = new Set(buildCurrentOccurrences(snapshot.plans, now).map((occurrence) => occurrence.id));
  return snapshot.occurrences.filter((occurrence) => expected.has(occurrence.id)).sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
}

export function notificationResponseKey(requestId: string, deliveredAt: number, actionId: string) {
  return `${requestId}:${deliveredAt}:${actionId}`;
}
