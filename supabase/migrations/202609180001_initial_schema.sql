create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;
create schema if not exists private;

create type public.member_role as enum ('owner', 'caregiver');
create type public.care_outcome as enum ('done', 'skipped', 'uncertain');
create type public.care_event_kind as enum ('record', 'resolution');
create type public.pet_species as enum ('cat', 'dog', 'other');
create type public.product_event_name as enum ('owner_created', 'invite_shared', 'invite_accepted', 'shared_state_viewed', 'paywall_viewed', 'paywall_interest');

create table public.households (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  created_by uuid not null references auth.users(id),
  bootstrap_key uuid unique,
  created_at timestamptz not null default now()
);
create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 80),
  updated_at timestamptz not null default now()
);
create table public.household_members (
  household_id uuid not null references public.households(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.member_role not null,
  joined_at timestamptz not null default now(),
  primary key (household_id, user_id)
);
create table public.pets (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  species public.pet_species not null default 'other',
  created_at timestamptz not null default now(),
  unique (id, household_id)
);
create table public.care_plans (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  pet_id uuid not null,
  title text not null check (char_length(title) between 1 and 120),
  instruction text not null default '' check (char_length(instruction) <= 1000),
  local_times time[] not null check (cardinality(local_times) between 1 and 12),
  timezone text not null check (char_length(timezone) between 1 and 80),
  paused_at timestamptz,
  version bigint not null default 1 check (version > 0),
  created_at timestamptz not null default now(),
  unique (id, household_id),
  foreign key (pet_id, household_id) references public.pets(id, household_id) on delete restrict
);
create table public.care_events (
  id uuid primary key,
  household_id uuid not null references public.households(id) on delete cascade,
  plan_id uuid not null,
  occurrence_key text not null check (char_length(occurrence_key) between 1 and 180),
  actor_id uuid not null references auth.users(id),
  outcome public.care_outcome not null,
  kind public.care_event_kind not null default 'record',
  note text check (char_length(note) <= 500),
  recorded_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  foreign key (plan_id, household_id) references public.care_plans(id, household_id) on delete restrict
);
create index care_events_household_occurrence_idx on public.care_events(household_id, occurrence_key, recorded_at, id);
alter publication supabase_realtime add table public.care_events;

-- Raw invite tokens are returned once and never stored. Only their SHA-256 digest is persisted.
create table public.household_invitations (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households(id) on delete cascade,
  token_hash bytea not null unique,
  role public.member_role not null default 'caregiver' check (role = 'caregiver'),
  created_by uuid not null references auth.users(id),
  expires_at timestamptz not null,
  accepted_at timestamptz,
  accepted_by uuid references auth.users(id),
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  check (expires_at > created_at),
  check ((accepted_at is null and accepted_by is null) or (accepted_at is not null and accepted_by is not null))
);
create table public.product_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  household_id uuid references public.households(id) on delete cascade,
  event_name public.product_event_name not null,
  properties jsonb not null default '{}'::jsonb check (jsonb_typeof(properties) = 'object' and octet_length(properties::text) <= 4096),
  occurred_at timestamptz not null default now()
);
create index product_events_name_time_idx on public.product_events(event_name, occurred_at);
create index household_invitations_household_idx on public.household_invitations(household_id, created_at desc);

create function private.is_household_member(target_household uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select (select auth.uid()) is not null and exists(
    select 1 from public.household_members hm
    where hm.household_id = target_household and hm.user_id = (select auth.uid())
  );
$$;
create function private.is_household_owner(target_household uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select (select auth.uid()) is not null and exists(
    select 1 from public.household_members hm
    where hm.household_id = target_household and hm.user_id = (select auth.uid()) and hm.role = 'owner'
  );
$$;
create function private.shares_household(target_user uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select (select auth.uid()) is not null and exists(
    select 1 from public.household_members mine
    join public.household_members theirs on theirs.household_id = mine.household_id
    where mine.user_id = (select auth.uid()) and theirs.user_id = target_user
  );
$$;

alter table public.households enable row level security;
alter table public.profiles enable row level security;
alter table public.household_members enable row level security;
alter table public.pets enable row level security;
alter table public.care_plans enable row level security;
alter table public.care_events enable row level security;
alter table public.household_invitations enable row level security;
alter table public.product_events enable row level security;

create policy households_read_member on public.households for select to authenticated using ((select private.is_household_member(id)));
create policy profiles_read_shared on public.profiles for select to authenticated using (user_id = (select auth.uid()) or (select private.shares_household(user_id)));
create policy profiles_manage_self on public.profiles for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy households_update_owner on public.households for update to authenticated using ((select private.is_household_owner(id))) with check ((select private.is_household_owner(id)));
create policy members_read_member on public.household_members for select to authenticated using ((select private.is_household_member(household_id)));
create policy pets_read_member on public.pets for select to authenticated using ((select private.is_household_member(household_id)));
create policy pets_manage_owner on public.pets for all to authenticated using ((select private.is_household_owner(household_id))) with check ((select private.is_household_owner(household_id)));
create policy plans_read_member on public.care_plans for select to authenticated using ((select private.is_household_member(household_id)));
create policy plans_manage_owner on public.care_plans for all to authenticated using ((select private.is_household_owner(household_id))) with check ((select private.is_household_owner(household_id)));
create policy events_read_member on public.care_events for select to authenticated using ((select private.is_household_member(household_id)));
create policy events_insert_member on public.care_events for insert to authenticated with check ((select private.is_household_member(household_id)) and actor_id = (select auth.uid()));
create policy product_events_insert_self on public.product_events for insert to authenticated with check (user_id = (select auth.uid()) and (household_id is null or (select private.is_household_member(household_id))));

revoke all on all tables in schema public from anon;
revoke all on public.households, public.profiles, public.household_members, public.pets, public.care_plans, public.care_events, public.household_invitations, public.product_events from authenticated;
grant select on public.households, public.household_members, public.pets, public.care_plans, public.care_events to authenticated;
grant select, insert, update on public.profiles to authenticated;
grant update(name) on public.households to authenticated;
grant insert, update on public.pets, public.care_plans to authenticated;
grant insert on public.care_events to authenticated;
grant insert on public.product_events to authenticated;

grant usage on schema private to authenticated;
revoke execute on function private.is_household_member(uuid), private.is_household_owner(uuid), private.shares_household(uuid) from public;
grant execute on function private.is_household_member(uuid), private.is_household_owner(uuid), private.shares_household(uuid) to authenticated;

create function public.create_household(household_name text, pet_name text, pet_kind public.pet_species default 'other')
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  caller uuid := (select auth.uid());
  new_household uuid;
begin
  if caller is null then raise exception 'authentication_required' using errcode = '42501'; end if;
  if char_length(trim(household_name)) < 1 or char_length(trim(household_name)) > 80 then raise exception 'invalid_household_name' using errcode = '22023'; end if;
  if char_length(trim(pet_name)) < 1 or char_length(trim(pet_name)) > 80 then raise exception 'invalid_pet_name' using errcode = '22023'; end if;
  insert into public.households(name, created_by) values (trim(household_name), caller) returning id into new_household;
  insert into public.household_members(household_id, user_id, role) values (new_household, caller, 'owner');
  insert into public.pets(household_id, name, species) values (new_household, trim(pet_name), pet_kind);
  return new_household;
end;
$$;

create function public.create_household_with_plan(
  household_name text, pet_name text, pet_kind public.pet_species,
  plan_title text, plan_instruction text, plan_times time[], plan_timezone text,
  operation_id uuid
) returns uuid language plpgsql security definer set search_path = '' as $$
declare
  caller uuid := (select auth.uid());
  new_household uuid;
  new_pet uuid;
begin
  if caller is null then raise exception 'authentication_required' using errcode = '42501'; end if;
  select id into new_household from public.households where bootstrap_key = operation_id and created_by = caller;
  if new_household is not null then return new_household; end if;
  if cardinality(plan_times) < 1 or cardinality(plan_times) > 12 then
    raise exception 'invalid_plan_times' using errcode = '22023';
  end if;
  if char_length(trim(plan_title)) < 1 or char_length(trim(plan_title)) > 120 then
    raise exception 'invalid_plan_title' using errcode = '22023';
  end if;
  if char_length(plan_instruction) > 1000 or char_length(trim(plan_timezone)) < 1 then
    raise exception 'invalid_plan_details' using errcode = '22023';
  end if;
  new_household := public.create_household(household_name, pet_name, pet_kind);
  update public.households set bootstrap_key = operation_id where id = new_household;
  select id into new_pet from public.pets where household_id = new_household;
  insert into public.care_plans(household_id, pet_id, title, instruction, local_times, timezone)
  values (new_household, new_pet, trim(plan_title), trim(plan_instruction), plan_times, trim(plan_timezone));
  return new_household;
end;
$$;

create function public.create_household_invite(target_household uuid, valid_for interval default interval '48 hours')
returns table(invite_id uuid, token text, expires_at timestamptz)
language plpgsql security definer set search_path = '' as $$
declare
  caller uuid := (select auth.uid());
  raw_token text := encode(extensions.gen_random_bytes(32), 'hex');
begin
  if caller is null then raise exception 'authentication_required' using errcode = '42501'; end if;
  if not (select private.is_household_owner(target_household)) then raise exception 'owner_required' using errcode = '42501'; end if;
  if valid_for < interval '5 minutes' or valid_for > interval '7 days' then raise exception 'invalid_invite_lifetime' using errcode = '22023'; end if;
  return query
    insert into public.household_invitations(household_id, token_hash, created_by, expires_at)
    values (target_household, extensions.digest(raw_token, 'sha256'), caller, now() + valid_for)
    returning id, raw_token, household_invitations.expires_at;
end;
$$;

create function public.preview_household_invite(raw_token text)
returns table(household_name text, pet_name text, expires_at timestamptz)
language plpgsql stable security definer set search_path = '' as $$
begin
  if (select auth.uid()) is null then raise exception 'authentication_required' using errcode = '42501'; end if;
  return query
    select h.name, p.name, i.expires_at
    from public.household_invitations i
    join public.households h on h.id = i.household_id
    join public.pets p on p.household_id = h.id
    where i.token_hash = extensions.digest(raw_token, 'sha256')
      and i.accepted_at is null and i.revoked_at is null and i.expires_at > now()
    order by p.created_at limit 1;
  if not found then raise exception 'invite_invalid_or_expired' using errcode = '22023'; end if;
end;
$$;

create function public.accept_household_invite(raw_token text)
returns uuid language plpgsql security definer set search_path = '' as $$
declare
  caller uuid := (select auth.uid());
  invitation public.household_invitations%rowtype;
begin
  if caller is null then raise exception 'authentication_required' using errcode = '42501'; end if;
  select * into invitation from public.household_invitations
    where token_hash = extensions.digest(raw_token, 'sha256')
    for update;
  if not found or invitation.revoked_at is not null or invitation.expires_at <= now() then
    raise exception 'invite_invalid_or_expired' using errcode = '22023';
  end if;
  if invitation.accepted_at is not null then
    if invitation.accepted_by = caller then return invitation.household_id; end if;
    raise exception 'invite_invalid_or_expired' using errcode = '22023';
  end if;
  if exists (select 1 from public.household_members hm where hm.household_id = invitation.household_id and hm.user_id = caller) then
    raise exception 'already_member' using errcode = '22023';
  end if;
  insert into public.household_members(household_id, user_id, role)
    values (invitation.household_id, caller, invitation.role)
    on conflict (household_id, user_id) do nothing;
  update public.household_invitations set accepted_at = now(), accepted_by = caller where id = invitation.id;
  return invitation.household_id;
end;
$$;

create function public.revoke_household_invite(target_invite uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare target_household uuid;
begin
  select household_id into target_household from public.household_invitations where id = target_invite and accepted_at is null for update;
  if target_household is null or not (select private.is_household_owner(target_household)) then
    raise exception 'owner_required_or_invite_unavailable' using errcode = '42501';
  end if;
  update public.household_invitations set revoked_at = now() where id = target_invite;
end;
$$;

create function public.record_care_event(
  event_id uuid, target_household uuid, target_plan uuid, target_occurrence text,
  event_actor uuid, event_outcome public.care_outcome, event_kind public.care_event_kind,
  event_note text, event_recorded_at timestamptz
) returns uuid language plpgsql security invoker set search_path = '' as $$
declare matches boolean;
begin
  if event_actor <> (select auth.uid()) then raise exception 'actor_mismatch' using errcode = '42501'; end if;
  insert into public.care_events(id, household_id, plan_id, occurrence_key, actor_id, outcome, kind, note, recorded_at)
  values (event_id, target_household, target_plan, target_occurrence, event_actor, event_outcome, event_kind, event_note, event_recorded_at)
  on conflict (id) do nothing;
  select exists(
    select 1 from public.care_events e where e.id = event_id and e.household_id = target_household
      and e.plan_id = target_plan and e.occurrence_key = target_occurrence and e.actor_id = event_actor
      and e.outcome = event_outcome and e.kind = event_kind and e.note is not distinct from event_note
      and e.recorded_at = event_recorded_at
  ) into matches;
  if not matches then raise exception 'idempotency_conflict' using errcode = '23000'; end if;
  return event_id;
end;
$$;

create function private.prevent_last_owner_removal() returns trigger
language plpgsql set search_path = '' as $$
begin
  if not exists (select 1 from public.households h where h.id = old.household_id) then
    if tg_op = 'DELETE' then return old; end if;
    return new;
  end if;
  if old.role = 'owner' and (tg_op = 'DELETE' or new.role <> 'owner') and not exists (
    select 1 from public.household_members hm
    where hm.household_id = old.household_id and hm.user_id <> old.user_id and hm.role = 'owner'
  ) then raise exception 'household_requires_owner' using errcode = '23514'; end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;
create trigger household_requires_owner before update of role or delete on public.household_members
for each row execute function private.prevent_last_owner_removal();

revoke all on function public.create_household(text, text, public.pet_species), public.create_household_with_plan(text, text, public.pet_species, text, text, time[], text, uuid), public.create_household_invite(uuid, interval), public.preview_household_invite(text), public.accept_household_invite(text), public.revoke_household_invite(uuid), public.record_care_event(uuid, uuid, uuid, text, uuid, public.care_outcome, public.care_event_kind, text, timestamptz) from public;
grant execute on function public.create_household(text, text, public.pet_species), public.create_household_with_plan(text, text, public.pet_species, text, text, time[], text, uuid), public.create_household_invite(uuid, interval), public.preview_household_invite(text), public.accept_household_invite(text), public.revoke_household_invite(uuid), public.record_care_event(uuid, uuid, uuid, text, uuid, public.care_outcome, public.care_event_kind, text, timestamptz) to authenticated;
