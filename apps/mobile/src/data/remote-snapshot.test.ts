import { mapRemoteSnapshot, mergeRemoteWithPending } from './remote-snapshot';
import { createDemoSnapshot } from './seed';

describe('remote snapshot mapping', () => {
  it('hydrates the shared today view with actor names and remote events', () => {
    const now = new Date(2026, 8, 18, 9);
    const snapshot = mapRemoteSnapshot({
      householdId: 'household', ownerId: 'owner', pet: { id: 'pet', name: 'Luna', species: 'cat' },
      plans: [{ id: 'plan', petId: 'pet', title: 'Bakım', instruction: '', times: ['08:00'], timezone: 'Europe/Istanbul', isPaused: false }],
      members: [{ userId: 'owner', role: 'owner', displayName: 'Murat Ak' }, { userId: 'caregiver', role: 'caregiver', displayName: 'Deniz' }],
      events: [{ id: 'event', occurrenceId: 'occ-plan-2026-09-18-0800', outcome: 'done', actorId: 'caregiver', actorName: 'Deniz', recordedAt: '2026-09-18T08:05:00.000Z', syncState: 'synced', kind: 'record' }],
    }, now);
    expect(snapshot.isDemo).toBe(false);
    expect(snapshot.members.map((member) => member.initials)).toEqual(['MA', 'D']);
    expect(snapshot.occurrences[0].events[0].actorName).toBe('Deniz');
  });

  it('keeps a stable local event until the server returns the same id', () => {
    const local = createDemoSnapshot(new Date(2026, 8, 18, 9));
    const occurrence = local.occurrences[1];
    const queued = { id: '550e8400-e29b-41d4-a716-446655440000', occurrenceId: occurrence.id, outcome: 'done' as const, actorId: 'user', actorName: 'Murat', recordedAt: '2026-09-18T20:01:00.000Z', syncState: 'queued' as const };
    const withPending = { ...local, occurrences: local.occurrences.map((item) => item.id === occurrence.id ? { ...item, events: [queued] } : item) };
    const remote = { ...local, isDemo: false, occurrences: local.occurrences.map((item) => ({ ...item, events: [] })) };
    expect(mergeRemoteWithPending(remote, withPending).occurrences.find((item) => item.id === occurrence.id)?.events).toEqual([queued]);
    const acknowledged = { ...remote, occurrences: remote.occurrences.map((item) => item.id === occurrence.id ? { ...item, events: [{ ...queued, syncState: 'synced' as const }] } : item) };
    expect(mergeRemoteWithPending(acknowledged, withPending).occurrences.find((item) => item.id === occurrence.id)?.events).toHaveLength(1);
  });

  it('does not let a stale pull erase an event that was acknowledged while the request was in flight', () => {
    const local = createDemoSnapshot(new Date(2026, 8, 18, 9));
    const occurrence = local.occurrences[1];
    const acknowledged = { id: '550e8400-e29b-41d4-a716-446655440000', occurrenceId: occurrence.id, outcome: 'done' as const, actorId: 'user', actorName: 'Murat', recordedAt: '2026-09-18T20:01:00.000Z', syncState: 'synced' as const };
    const localAfterAck = { ...local, occurrences: local.occurrences.map((item) => item.id === occurrence.id ? { ...item, events: [acknowledged] } : item) };
    const staleRemote = { ...local, isDemo: false, occurrences: local.occurrences.map((item) => ({ ...item, events: [] })) };
    expect(mergeRemoteWithPending(staleRemote, localAfterAck).occurrences.find((item) => item.id === occurrence.id)?.events).toEqual([acknowledged]);
  });

  it('hydrates a remote event from the previous 30 days into history', () => {
    const snapshot = mapRemoteSnapshot({
      householdId: 'household', ownerId: 'owner', pet: { id: 'pet', name: 'Luna', species: 'cat' },
      plans: [{ id: 'plan-with-dashes', petId: 'pet', title: 'Bakım', instruction: '', times: ['08:00'], timezone: 'Europe/Istanbul', isPaused: false }],
      members: [{ userId: 'owner', role: 'owner', displayName: 'Murat' }],
      events: [{ id: 'old-event', occurrenceId: 'occ-plan-with-dashes-2026-09-17-0800', outcome: 'done', actorId: 'owner', actorName: 'Murat', recordedAt: '2026-09-17T08:05:00.000Z', syncState: 'synced' }],
    }, new Date(2026, 8, 18, 9));
    expect(snapshot.occurrences.find((item) => item.id.endsWith('2026-09-17-0800'))?.events[0].id).toBe('old-event');
  });
});
