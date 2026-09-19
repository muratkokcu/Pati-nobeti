export type CareOutcome = 'done' | 'skipped' | 'uncertain';
export type SyncState = 'local' | 'queued' | 'synced' | 'failed';
export type MemberRole = 'owner' | 'caregiver';

export type Pet = { id: string; name: string; species: 'cat' | 'dog' | 'other' };
export type CarePlan = { id: string; petId: string; title: string; instruction: string; times: string[]; timezone: string; isPaused: boolean };
export type HouseholdMember = { id: string; name: string; initials: string; role: MemberRole; state: 'active' | 'invited' };
export type CareEventKind = 'record' | 'resolution';
export type CareEvent = { id: string; occurrenceId: string; outcome: CareOutcome; actorId: string; actorName: string; recordedAt: string; syncState: SyncState; kind?: CareEventKind; note?: string };
export type TaskOccurrence = { id: string; planId: string; petId: string; title: string; instruction: string; scheduledAt: string; events: CareEvent[] };
export type AppSnapshot = { householdId?: string; pet: Pet; plans: CarePlan[]; occurrences: TaskOccurrence[]; members: HouseholdMember[]; isDemo: boolean; isOffline: boolean };
