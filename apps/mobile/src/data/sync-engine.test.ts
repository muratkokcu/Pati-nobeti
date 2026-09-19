import type { CareRepository, OutboxCommand } from './repository';
import type { CareRemoteGateway } from './remote-gateway';
import { drainCareOutbox } from './sync-engine';

const eventId = '550e8400-e29b-41d4-a716-446655440000';
const validCommand: OutboxCommand = {
  commandId: eventId, commandType: 'record_care', baseVersion: 0, retryCount: 0, createdAt: '2026-09-18T08:00:00.000Z',
  leaseToken: 'lease-1',
  payload: JSON.stringify({ id: eventId, occurrenceId: 'occ-plan-day-0800', outcome: 'done', actorId: 'user-1', actorName: 'Murat', recordedAt: '2026-09-18T08:01:00.000Z', syncState: 'queued', kind: 'record' }),
};

function repositoryWith(commands: OutboxCommand[]) {
  return {
    claimPendingCommands: jest.fn().mockResolvedValue(commands),
    markCommandSynced: jest.fn().mockResolvedValue(undefined),
    markCommandFailed: jest.fn().mockResolvedValue(undefined),
  } as unknown as CareRepository;
}

function gateway() {
  return { pushCareEvent: jest.fn().mockResolvedValue(undefined) } as unknown as CareRemoteGateway;
}

describe('outbox drain', () => {
  it('acks a command only after the remote gateway accepts the same event id', async () => {
    const repository = repositoryWith([validCommand]);
    const remote = gateway();
    const result = await drainCareOutbox(repository, remote, async () => ({ householdId: 'household', planId: 'plan', occurrenceKey: '2026-09-18/08:00' }));
    expect(remote.pushCareEvent).toHaveBeenCalledWith(expect.objectContaining({ event: expect.objectContaining({ id: eventId }) }));
    expect(repository.markCommandSynced).toHaveBeenCalledWith(eventId, 'lease-1');
    expect(result).toEqual({ attempted: 1, synced: 1, failed: 0 });
  });

  it('keeps a rejected command retryable with an error instead of acknowledging it', async () => {
    const repository = repositoryWith([validCommand]);
    const remote = gateway();
    (remote.pushCareEvent as jest.Mock).mockRejectedValueOnce(new Error('network unavailable'));
    const result = await drainCareOutbox(repository, remote, async () => ({ householdId: 'household', planId: 'plan', occurrenceKey: 'key' }));
    expect(repository.markCommandSynced).not.toHaveBeenCalled();
    expect(repository.markCommandFailed).toHaveBeenCalledWith(eventId, 'lease-1', 'network unavailable');
    expect(result.failed).toBe(1);
  });

  it('quarantines malformed payloads without sending them', async () => {
    const malformed = { ...validCommand, payload: '{"id":"not-a-uuid"}' };
    const repository = repositoryWith([malformed]);
    const remote = gateway();
    await drainCareOutbox(repository, remote, async () => ({ householdId: 'household', planId: 'plan', occurrenceKey: 'key' }));
    expect(remote.pushCareEvent).not.toHaveBeenCalled();
    expect(repository.markCommandFailed).toHaveBeenCalled();
  });

  it('rejects a payload whose event id differs from the claimed command id', async () => {
    const repository = repositoryWith([{ ...validCommand, commandId: 'different-command' }]);
    const remote = gateway();
    await drainCareOutbox(repository, remote, async () => ({ householdId: 'household', planId: 'plan', occurrenceKey: 'key' }));
    expect(remote.pushCareEvent).not.toHaveBeenCalled();
    expect(repository.markCommandFailed).toHaveBeenCalledWith('different-command', 'lease-1', 'Komut ve event kimliği eşleşmiyor.');
  });
});
