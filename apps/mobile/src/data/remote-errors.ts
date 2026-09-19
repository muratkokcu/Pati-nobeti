export type RemoteErrorCode = 'offline' | 'auth_required' | 'owner_required' | 'invalid_or_expired' | 'already_member' | 'idempotency_conflict' | 'server_error';

export class RemoteDomainError extends Error {
  constructor(public readonly code: RemoteErrorCode, public readonly retryable: boolean) {
    super(code);
    this.name = 'RemoteDomainError';
  }
}

export function mapRemoteError(error: unknown) {
  const candidate = error as { code?: string; message?: string };
  const message = candidate?.message ?? '';
  if (/network|fetch|offline/i.test(message)) return new RemoteDomainError('offline', true);
  if (message.includes('authentication_required')) return new RemoteDomainError('auth_required', false);
  if (message.includes('owner_required')) return new RemoteDomainError('owner_required', false);
  if (message.includes('already_member')) return new RemoteDomainError('already_member', false);
  if (message.includes('invite_invalid_or_expired')) return new RemoteDomainError('invalid_or_expired', false);
  if (message.includes('idempotency_conflict') || candidate?.code === '23000') return new RemoteDomainError('idempotency_conflict', false);
  return new RemoteDomainError('server_error', true);
}
