export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type Table<Row, Insert = Partial<Row>, Update = Partial<Insert>> = { Row: Row; Insert: Insert; Update: Update; Relationships: [] };

export type Database = {
  public: {
    Tables: {
      households: Table<{ id: string; name: string; created_by: string; bootstrap_key: string | null; created_at: string }>;
      profiles: Table<{ user_id: string; display_name: string; updated_at: string }, { user_id: string; display_name: string; updated_at?: string }>;
      household_members: Table<{ household_id: string; user_id: string; role: 'owner' | 'caregiver'; joined_at: string }>;
      pets: Table<{ id: string; household_id: string; name: string; species: 'cat' | 'dog' | 'other'; created_at: string }>;
      care_plans: Table<{ id: string; household_id: string; pet_id: string; title: string; instruction: string; local_times: string[]; timezone: string; paused_at: string | null; version: number; created_at: string }>;
      care_events: Table<
        { id: string; household_id: string; plan_id: string; occurrence_key: string; actor_id: string; outcome: 'done' | 'skipped' | 'uncertain'; kind: 'record' | 'resolution'; note: string | null; recorded_at: string; created_at: string },
        { id: string; household_id: string; plan_id: string; occurrence_key: string; actor_id: string; outcome: 'done' | 'skipped' | 'uncertain'; kind?: 'record' | 'resolution'; note?: string | null; recorded_at?: string; created_at?: string }
      >;
      household_invitations: Table<{ id: string; household_id: string; token_hash: string; role: 'caregiver'; created_by: string; expires_at: string; accepted_at: string | null; accepted_by: string | null; revoked_at: string | null; created_at: string }>;
      product_events: Table<{ id: string; user_id: string; household_id: string | null; event_name: 'owner_created' | 'invite_shared' | 'invite_accepted' | 'shared_state_viewed' | 'paywall_viewed'; properties: Json; occurred_at: string }, { id?: string; user_id: string; household_id?: string | null; event_name: 'owner_created' | 'invite_shared' | 'invite_accepted' | 'shared_state_viewed' | 'paywall_viewed'; properties?: Json; occurred_at?: string }>;
    };
    Views: Record<string, never>;
    Functions: {
      create_household: { Args: { household_name: string; pet_name: string; pet_kind?: 'cat' | 'dog' | 'other' }; Returns: string };
      create_household_with_plan: { Args: { household_name: string; pet_name: string; pet_kind: 'cat' | 'dog' | 'other'; plan_title: string; plan_instruction: string; plan_times: string[]; plan_timezone: string; operation_id: string }; Returns: string };
      create_household_invite: { Args: { target_household: string; valid_for?: string }; Returns: { invite_id: string; token: string; expires_at: string }[] };
      preview_household_invite: { Args: { raw_token: string }; Returns: { household_name: string; pet_name: string; expires_at: string }[] };
      accept_household_invite: { Args: { raw_token: string }; Returns: string };
      revoke_household_invite: { Args: { target_invite: string }; Returns: undefined };
      record_care_event: { Args: { event_id: string; target_household: string; target_plan: string; target_occurrence: string; event_actor: string; event_outcome: 'done' | 'skipped' | 'uncertain'; event_kind: 'record' | 'resolution'; event_note: string | null; event_recorded_at: string }; Returns: string };
    };
    Enums: { member_role: 'owner' | 'caregiver'; care_outcome: 'done' | 'skipped' | 'uncertain'; care_event_kind: 'record' | 'resolution'; pet_species: 'cat' | 'dog' | 'other'; product_event_name: 'owner_created' | 'invite_shared' | 'invite_accepted' | 'shared_state_viewed' | 'paywall_viewed' };
    CompositeTypes: Record<string, never>;
  };
};
