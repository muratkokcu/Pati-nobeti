begin;
select plan(35);

insert into auth.users(id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'owner@test.local', '', now(), '{}', '{}', now(), now()),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'caregiver@test.local', '', now(), '{}', '{}', now(), now()),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'outsider@test.local', '', now(), '{}', '{}', now(), now()),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'second-caregiver@test.local', '', now(), '{}', '{}', now(), now());

set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000001","role":"authenticated"}', true);
select lives_ok($$insert into public.profiles(user_id, display_name) values ('10000000-0000-0000-0000-000000000001', 'Murat')$$, 'owner can create their own profile');
select lives_ok($$select public.create_household('Luna hanesi', 'Luna', 'cat')$$, 'authenticated user can atomically create a household');
select lives_ok($$select public.create_household('Moka hanesi', 'Moka')$$, 'same owner can create a second isolated household');
select results_eq($$select species::text from public.pets where name = 'Luna'$$, $$values ('cat'::text)$$, 'household creation persists the pet species');
select throws_ok(
  $$select public.create_household_with_plan('Bozuk hane', 'Pati', 'other', 'Bakım', '', array[]::time[], 'Europe/Istanbul', '20000000-0000-0000-0000-000000000001')$$,
  '22023', 'invalid_plan_times', 'invalid initial plan aborts the atomic household bootstrap'
);
select results_eq($$select count(*) from public.households$$, $$values (2::bigint)$$, 'failed bootstrap leaves no partial household');
select lives_ok(
  $$select public.create_household_with_plan('Tarçın hanesi', 'Tarçın', 'dog', 'Sabah bakımı', '', array['08:00'::time], 'Europe/Istanbul', '20000000-0000-0000-0000-000000000002')$$,
  'valid initial household and plan bootstrap succeeds'
);
select results_eq(
  $$select public.create_household_with_plan('Tarçın hanesi', 'Tarçın', 'dog', 'Sabah bakımı', '', array['08:00'::time], 'Europe/Istanbul', '20000000-0000-0000-0000-000000000002')$$,
  $$select id from public.households where name = 'Tarçın hanesi'$$,
  'lost-response bootstrap retry returns the same household'
);
select results_eq($$select count(*) from public.households$$, $$values (3::bigint)$$, 'bootstrap retry creates no duplicate household');
insert into public.care_plans(household_id, pet_id, title, local_times, timezone)
select h.id, p.id, 'Akşam bakımı', array['20:00'::time], 'Europe/Istanbul'
from public.households h join public.pets p on p.household_id = h.id where h.name = 'Luna hanesi';
create temp table test_ids as select h.id as household_id, p.id as plan_id
from public.households h join public.care_plans p on p.household_id = h.id where h.name = 'Luna hanesi';
create temp table invite_one as select * from public.create_household_invite((select id from public.households where name = 'Luna hanesi'), interval '48 hours');
create temp table invite_two as select * from public.create_household_invite((select id from public.households where name = 'Luna hanesi'), interval '48 hours');
create temp table invite_revoked as select * from public.create_household_invite((select id from public.households where name = 'Luna hanesi'), interval '48 hours');

select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000002","role":"authenticated"}', true);
select results_eq(
  format('select household_name, pet_name from public.preview_household_invite(%L)', (select token from invite_one)),
  $$values ('Luna hanesi'::text, 'Luna'::text)$$,
  'authenticated invitee can verify household and pet before accepting'
);
select lives_ok(format('select public.accept_household_invite(%L)', (select token from invite_one)), 'caregiver accepts a valid invite');
select lives_ok(format('select public.accept_household_invite(%L)', (select token from invite_one)), 'lost-response retry is idempotent for the same caregiver');
select lives_ok($$insert into public.profiles(user_id, display_name) values ('10000000-0000-0000-0000-000000000002', 'Deniz')$$, 'caregiver can create their own profile');
select results_eq($$select count(*) from public.households$$, $$values (1::bigint)$$, 'caregiver reads only the joined household');
select results_eq($$select count(*) from public.profiles$$, $$values (2::bigint)$$, 'members can read profiles shared through a household');
select lives_ok($$insert into public.product_events(user_id, household_id, event_name) values ('10000000-0000-0000-0000-000000000002', (select household_id from test_ids), 'shared_state_viewed')$$, 'member can append their own product event');
select throws_ok(
  $$insert into public.care_plans(household_id, pet_id, title, local_times, timezone)
    select h.id, p.id, 'Yetkisiz plan', array['08:00'::time], 'Europe/Istanbul'
    from public.households h join public.pets p on p.household_id = h.id$$,
  '42501', null, 'caregiver cannot create an owner-managed plan'
);
select lives_ok(
  $$select public.record_care_event(
    '550e8400-e29b-41d4-a716-446655440000',
    (select household_id from test_ids),
    (select plan_id from test_ids),
    '2026-09-18/20:00', '10000000-0000-0000-0000-000000000002', 'done', 'record', null, '2026-09-18T20:01:00Z'
  )$$, 'caregiver can append a care event'
);
select lives_ok(
  $$select public.record_care_event(
    '550e8400-e29b-41d4-a716-446655440000',
    (select household_id from test_ids),
    (select plan_id from test_ids),
    '2026-09-18/20:00', '10000000-0000-0000-0000-000000000002', 'done', 'record', null, '2026-09-18T20:01:00Z'
  )$$, 'same event payload is an idempotent success'
);
select throws_ok(
  $$select public.record_care_event(
    '550e8400-e29b-41d4-a716-446655440000',
    (select household_id from test_ids),
    (select plan_id from test_ids),
    '2026-09-18/20:00', '10000000-0000-0000-0000-000000000002', 'skipped', 'record', null, '2026-09-18T20:01:00Z'
  )$$, '23000', 'idempotency_conflict', 'same event id with different immutable payload is rejected'
);

select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000001","role":"authenticated"}', true);
select throws_ok(format('select public.accept_household_invite(%L)', (select token from invite_two)), '22023', 'already_member', 'owner cannot consume their own invite');
select lives_ok(format('select public.revoke_household_invite(%L)', (select invite_id from invite_revoked)), 'owner can revoke a pending invite');

select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000004","role":"authenticated"}', true);
select lives_ok(format('select public.accept_household_invite(%L)', (select token from invite_two)), 'owner self-open leaves the invite usable by a new caregiver');

select set_config('request.jwt.claims', '{"sub":"10000000-0000-0000-0000-000000000003","role":"authenticated"}', true);
select results_eq($$select count(*) from public.households$$, $$values (0::bigint)$$, 'non-member cannot read another household');
select results_eq($$select count(*) from public.profiles$$, $$values (0::bigint)$$, 'non-member cannot read unrelated profiles');
select throws_ok($$insert into public.product_events(user_id, household_id, event_name) values ('10000000-0000-0000-0000-000000000003', (select household_id from test_ids), 'shared_state_viewed')$$, '42501', null, 'non-member cannot append a household product event');
select throws_ok(format('select public.accept_household_invite(%L)', (select token from invite_revoked)), '22023', 'invite_invalid_or_expired', 'revoked invite cannot be accepted');
select throws_ok(format('select * from public.preview_household_invite(%L)', (select token from invite_revoked)), '22023', 'invite_invalid_or_expired', 'revoked invite cannot be previewed');
select throws_ok(
  $$select public.record_care_event(
    '550e8400-e29b-41d4-a716-446655440001',
    (select household_id from test_ids),
    (select plan_id from test_ids),
    '2026-09-18/20:00', '10000000-0000-0000-0000-000000000003', 'done', 'record', null, now()
  )$$, '42501', null, 'non-member cannot append a care event'
);

reset role;
select col_type_is('public', 'household_invitations', 'token_hash', 'bytea', 'only a token digest is persisted');
select hasnt_column('public', 'household_invitations', 'token', 'raw invite token is not stored');
select throws_ok(
  $$delete from public.household_members where user_id = '10000000-0000-0000-0000-000000000001' and household_id = (select id from public.households where name = 'Luna hanesi')$$,
  '23514', 'household_requires_owner', 'the final owner cannot be deleted'
);
select throws_ok(
  $$insert into public.care_plans(household_id, pet_id, title, local_times, timezone)
    values ((select id from public.households where name = 'Moka hanesi'), (select id from public.pets where name = 'Luna'), 'Yanlış hane', array['08:00'::time], 'Europe/Istanbul')$$,
  '23503', null, 'a valid household cannot reference another household pet'
);
select policies_are('public', 'care_events', array['events_insert_member', 'events_read_member'], 'care event policy surface is explicit');
select table_privs_are('public', 'care_events', 'authenticated', array['SELECT', 'INSERT'], 'authenticated users cannot mutate audit events');

select * from finish();
rollback;
