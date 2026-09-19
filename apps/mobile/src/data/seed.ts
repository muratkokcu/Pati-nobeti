import { buildDayOccurrences, localDayKey, occurrenceIdFor, scheduledAtFor } from '@/domain/schedule';
import type { AppSnapshot, CareEvent, CarePlan } from '@/domain/types';

export function createDemoSnapshot(now = new Date()): AppSnapshot {
  const dayKey = localDayKey(now);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Istanbul';
  const plans: CarePlan[] = [
    { id: 'plan-morning', petId: 'pet-luna', title: 'Sabah bakımı', instruction: 'Veterinerinizin verdiği plana göre kaydedin.', times: ['08:00'], timezone, isPaused: false },
    { id: 'plan-evening', petId: 'pet-luna', title: 'Akşam bakımı', instruction: 'Kendi bakım planınızdaki adımları uygulayın.', times: ['20:00'], timezone, isPaused: false },
  ];
  const morningId = occurrenceIdFor('plan-morning', dayKey, '08:00');
  const seedEvent: CareEvent = { id: 'event-seed-1', occurrenceId: morningId, outcome: 'done', actorId: 'member-deniz', actorName: 'Deniz', recordedAt: scheduledAtFor(dayKey, '08:12'), syncState: 'local', kind: 'record' };
  return {
    isDemo: true,
    isOffline: false,
    pet: { id: 'pet-luna', name: 'Luna', species: 'cat' },
    members: [
      { id: 'member-murat', name: 'Murat', initials: 'MU', role: 'owner', state: 'active' },
      { id: 'member-deniz', name: 'Deniz', initials: 'DE', role: 'caregiver', state: 'active' },
    ],
    plans,
    occurrences: buildDayOccurrences(plans, dayKey).map((occurrence) => occurrence.id === morningId ? { ...occurrence, events: [seedEvent] } : occurrence),
  };
}
