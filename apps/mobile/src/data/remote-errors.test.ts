import { mapRemoteError } from './remote-errors';

describe('remote error contract', () => {
  it.each([
    [{ message: 'Failed to fetch' }, 'offline', true],
    [{ code: '22023', message: 'invite_invalid_or_expired' }, 'invalid_or_expired', false],
    [{ code: '22023', message: 'already_member' }, 'already_member', false],
    [{ code: '23000', message: 'idempotency_conflict' }, 'idempotency_conflict', false],
  ])('maps infrastructure details to a stable product state', (input, code, retryable) => {
    expect(mapRemoteError(input)).toMatchObject({ code, retryable });
  });
});
