import type { SupabaseClient } from '@supabase/supabase-js';
import type { AppSnapshot, CareEvent, Pet } from '@/domain/types';
import type { Database } from './database.types';
import { mapRemoteError } from './remote-errors';
import { mapRemoteSnapshot } from './remote-snapshot';

export type RemoteCareEventInput = { householdId: string; planId: string; occurrenceKey: string; event: CareEvent };
export type CreatedInvite = { inviteId: string; token: string; expiresAt: string };
export type InvitePreview = { householdName: string; petName: string; expiresAt: string };
export type HouseholdSummary = { id: string; name: string; role: 'owner' | 'caregiver' };
export type CreatePlanInput = { householdId: string; petId: string; title: string; instruction: string; times: string[]; timezone: string };
export type CreateHouseholdInput = { operationId: string; householdName: string; petName: string; species: Pet['species']; planTitle: string; planInstruction: string; times: string[]; timezone: string };
export type ProductEventName = Database['public']['Enums']['product_event_name'];

export interface CareRemoteGateway {
  getMyProfile(): Promise<string | null>;
  setProfile(displayName: string): Promise<void>;
  createHousehold(householdName: string, petName: string, species: Pet['species']): Promise<string>;
  createHouseholdWithPlan(input: CreateHouseholdInput): Promise<string>;
  listHouseholds(): Promise<HouseholdSummary[]>;
  createPlan(input: CreatePlanInput): Promise<string>;
  fetchSnapshot(householdId: string, now?: Date): Promise<AppSnapshot>;
  createInvite(householdId: string): Promise<CreatedInvite>;
  previewInvite(token: string): Promise<InvitePreview>;
  acceptInvite(token: string): Promise<string>;
  revokeInvite(inviteId: string): Promise<void>;
  pushCareEvent(input: RemoteCareEventInput): Promise<void>;
  trackEvent(eventName: ProductEventName, householdId?: string, properties?: Record<string, string | number | boolean>): Promise<void>;
}

export class SupabaseCareGateway implements CareRemoteGateway {
  constructor(private readonly client: SupabaseClient<Database>) {}

  async getMyProfile() {
    const { data: auth, error: authError } = await this.client.auth.getUser();
    if (authError) throw mapRemoteError(authError);
    if (!auth.user) return null;
    const { data, error } = await this.client.from('profiles').select('display_name').eq('user_id', auth.user.id).maybeSingle();
    if (error) throw mapRemoteError(error);
    return data?.display_name ?? null;
  }

  async setProfile(displayName: string) {
    const { data: auth, error: authError } = await this.client.auth.getUser();
    if (authError) throw mapRemoteError(authError);
    if (!auth.user) throw new Error('Profil için aktif oturum gerekiyor.');
    const { error } = await this.client.from('profiles').upsert({ user_id: auth.user.id, display_name: displayName.trim() });
    if (error) throw mapRemoteError(error);
  }

  async createHousehold(householdName: string, petName: string, species: Pet['species']) {
    const { data, error } = await this.client.rpc('create_household', { household_name: householdName, pet_name: petName, pet_kind: species });
    if (error) throw mapRemoteError(error);
    return data;
  }

  async createHouseholdWithPlan(input: CreateHouseholdInput) {
    const { data, error } = await this.client.rpc('create_household_with_plan', {
      household_name: input.householdName, pet_name: input.petName, pet_kind: input.species,
      plan_title: input.planTitle, plan_instruction: input.planInstruction,
      plan_times: input.times, plan_timezone: input.timezone, operation_id: input.operationId,
    });
    if (error) throw mapRemoteError(error);
    return data;
  }

  async listHouseholds() {
    const { data: auth, error: authError } = await this.client.auth.getUser();
    if (authError) throw mapRemoteError(authError);
    if (!auth.user) throw new Error('Haneler için aktif oturum gerekiyor.');
    const { data: memberships, error: membershipError } = await this.client.from('household_members').select('household_id,role').eq('user_id', auth.user.id);
    if (membershipError) throw mapRemoteError(membershipError);
    const ids = memberships.map((membership) => membership.household_id);
    if (ids.length === 0) return [];
    const { data: households, error: householdError } = await this.client.from('households').select('id,name').in('id', ids);
    if (householdError) throw mapRemoteError(householdError);
    const roleByHousehold = new Map(memberships.map((membership) => [membership.household_id, membership.role]));
    return households.map((household) => ({ id: household.id, name: household.name, role: roleByHousehold.get(household.id) ?? 'caregiver' }));
  }

  async createPlan(input: CreatePlanInput) {
    const { data, error } = await this.client.from('care_plans').insert({
      household_id: input.householdId, pet_id: input.petId, title: input.title.trim(), instruction: input.instruction.trim(),
      local_times: input.times, timezone: input.timezone,
    }).select('id').single();
    if (error) throw mapRemoteError(error);
    return data.id;
  }

  async fetchSnapshot(householdId: string, now = new Date()) {
    const [householdResult, petResult, plansResult, membersResult] = await Promise.all([
      this.client.from('households').select('id,created_by').eq('id', householdId).single(),
      this.client.from('pets').select('id,name,species').eq('household_id', householdId).limit(1).single(),
      this.client.from('care_plans').select('id,pet_id,title,instruction,local_times,timezone,paused_at').eq('household_id', householdId),
      this.client.from('household_members').select('user_id,role').eq('household_id', householdId),
    ]);
    if (householdResult.error) throw mapRemoteError(householdResult.error);
    if (petResult.error) throw mapRemoteError(petResult.error);
    if (plansResult.error) throw mapRemoteError(plansResult.error);
    if (membersResult.error) throw mapRemoteError(membersResult.error);
    const household = householdResult.data;
    const pet = petResult.data;
    if (!household || !pet || !plansResult.data || !membersResult.data) throw new Error('Hane verisi eksik döndü.');
    const plans = plansResult.data.map((plan) => ({
      id: plan.id, petId: plan.pet_id, title: plan.title, instruction: plan.instruction,
      times: plan.local_times.map((time) => time.slice(0, 5)), timezone: plan.timezone, isPaused: plan.paused_at !== null,
    }));
    const memberIds = membersResult.data.map((member) => member.user_id);
    const historyStart = new Date(now);
    historyStart.setDate(historyStart.getDate() - 30);
    const [profilesResult, eventsResult] = await Promise.all([
      memberIds.length > 0 ? this.client.from('profiles').select('user_id,display_name').in('user_id', memberIds) : Promise.resolve({ data: [], error: null }),
      this.client.from('care_events').select('id,occurrence_key,actor_id,outcome,kind,note,recorded_at').eq('household_id', householdId).gte('recorded_at', historyStart.toISOString()).order('recorded_at').limit(2000),
    ]);
    if (profilesResult.error) throw mapRemoteError(profilesResult.error);
    if (eventsResult.error) throw mapRemoteError(eventsResult.error);
    const nameByUser = new Map(profilesResult.data.map((profile) => [profile.user_id, profile.display_name]));
    return mapRemoteSnapshot({
      householdId,
      ownerId: household.created_by,
      pet: { id: pet.id, name: pet.name, species: pet.species },
      plans,
      members: membersResult.data.map((member) => ({ userId: member.user_id, role: member.role, displayName: nameByUser.get(member.user_id) ?? null })),
      events: eventsResult.data.map((event) => ({
        id: event.id, occurrenceId: event.occurrence_key, outcome: event.outcome, actorId: event.actor_id,
        actorName: nameByUser.get(event.actor_id) ?? 'Hane üyesi', recordedAt: event.recorded_at,
        syncState: 'synced', kind: event.kind, note: event.note ?? undefined,
      })),
    }, now);
  }

  async createInvite(householdId: string) {
    const { data, error } = await this.client.rpc('create_household_invite', { target_household: householdId });
    if (error) throw mapRemoteError(error);
    const invite = data?.[0];
    if (!invite) throw new Error('Davet oluşturulamadı.');
    return { inviteId: invite.invite_id, token: invite.token, expiresAt: invite.expires_at };
  }

  async previewInvite(token: string) {
    const { data, error } = await this.client.rpc('preview_household_invite', { raw_token: token });
    if (error) throw mapRemoteError(error);
    const preview = data?.[0];
    if (!preview) throw new Error('Davet önizlemesi bulunamadı.');
    return { householdName: preview.household_name, petName: preview.pet_name, expiresAt: preview.expires_at };
  }

  async acceptInvite(token: string) {
    const { data, error } = await this.client.rpc('accept_household_invite', { raw_token: token });
    if (error) throw mapRemoteError(error);
    return data;
  }

  async revokeInvite(inviteId: string) {
    const { error } = await this.client.rpc('revoke_household_invite', { target_invite: inviteId });
    if (error) throw mapRemoteError(error);
  }

  async pushCareEvent({ householdId, planId, occurrenceKey, event }: RemoteCareEventInput) {
    const { error } = await this.client.rpc('record_care_event', {
      event_id: event.id, target_household: householdId, target_plan: planId, target_occurrence: occurrenceKey,
      event_actor: event.actorId, event_outcome: event.outcome, event_kind: event.kind ?? 'record', event_note: event.note ?? null, event_recorded_at: event.recordedAt,
    });
    if (error) throw mapRemoteError(error);
  }

  async trackEvent(eventName: ProductEventName, householdId?: string, properties = {}) {
    const { data: auth, error: authError } = await this.client.auth.getUser();
    if (authError) throw mapRemoteError(authError);
    if (!auth.user) throw new Error('Ürün olayı için aktif oturum gerekiyor.');
    const { error } = await this.client.from('product_events').insert({ user_id: auth.user.id, household_id: householdId ?? null, event_name: eventName, properties });
    if (error) throw mapRemoteError(error);
  }
}
