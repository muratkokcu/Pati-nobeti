import { buildCurrentOccurrences, scheduledAtForTimeZone } from '@/domain/schedule';
import type { AppSnapshot, CareEvent, CarePlan, HouseholdMember, Pet } from '@/domain/types';

export type RemoteSnapshotData = {
  householdId: string;
  ownerId: string;
  pet: Pet;
  plans: CarePlan[];
  members: { userId: string; role: 'owner' | 'caregiver'; displayName: string | null }[];
  events: CareEvent[];
};

export function mapRemoteSnapshot(data: RemoteSnapshotData, now = new Date()): AppSnapshot {
  const occurrences = buildCurrentOccurrences(data.plans, now).map((occurrence) => ({ ...occurrence, events: [] as CareEvent[] }));
  const byId = new Map(occurrences.map((occurrence) => [occurrence.id, occurrence]));
  for (const event of data.events) {
    let occurrence = byId.get(event.occurrenceId);
    if (!occurrence) {
      const plan = data.plans.find((candidate) => event.occurrenceId.startsWith(`occ-${candidate.id}-`));
      const suffix = plan ? event.occurrenceId.slice(`occ-${plan.id}-`.length) : '';
      const match = suffix.match(/^(\d{4}-\d{2}-\d{2})-(\d{2})(\d{2})$/);
      if (!plan || !match) continue;
      occurrence = { id: event.occurrenceId, planId: plan.id, petId: plan.petId, title: plan.title, instruction: plan.instruction, scheduledAt: scheduledAtForTimeZone(match[1], `${match[2]}:${match[3]}`, plan.timezone), events: [] };
      byId.set(occurrence.id, occurrence);
    }
    occurrence.events.push(event);
  }
  for (const occurrence of byId.values()) occurrence.events.sort((left, right) => left.recordedAt.localeCompare(right.recordedAt));
  const members: HouseholdMember[] = data.members.map((member, index) => {
    const name = member.displayName?.trim() || (member.userId === data.ownerId ? 'Hane sahibi' : 'Bakım veren');
    const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]?.toLocaleUpperCase('tr-TR') ?? '').join('') || `${index + 1}`;
    return { id: member.userId, name, initials, role: member.role, state: 'active' };
  });
  return { householdId: data.householdId, pet: data.pet, plans: data.plans, occurrences: [...byId.values()].sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt)), members, isDemo: false, isOffline: false };
}

export function mergeRemoteWithPending(remote: AppSnapshot, local: AppSnapshot): AppSnapshot {
  // Care events are append-only on the server. A pull may have started before a
  // local command was acknowledged, so an older response must not erase an
  // event that is already marked as synced in the local cache.
  const localEvents = local.occurrences.flatMap((occurrence) => occurrence.events);
  const remoteOccurrenceIds = new Set(remote.occurrences.map((occurrence) => occurrence.id));
  const merged = remote.occurrences.map((occurrence) => {
    const known = new Set(occurrence.events.map((event) => event.id));
    const missingLocalEvents = localEvents.filter((event) => event.occurrenceId === occurrence.id && !known.has(event.id));
    return missingLocalEvents.length ? { ...occurrence, events: [...occurrence.events, ...missingLocalEvents].sort((a, b) => a.recordedAt.localeCompare(b.recordedAt)) } : occurrence;
  });
  const orphanedLocal = local.occurrences
    .filter((occurrence) => !remoteOccurrenceIds.has(occurrence.id))
    .filter((occurrence) => occurrence.events.length > 0);
  return { ...remote, occurrences: [...merged, ...orphanedLocal].sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt)) };
}
