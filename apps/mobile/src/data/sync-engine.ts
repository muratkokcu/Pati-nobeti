import { z } from 'zod';
import type { CareRepository, OutboxCommand } from './repository';
import type { CareRemoteGateway } from './remote-gateway';

const careEventSchema = z.object({
  id: z.uuid(), occurrenceId: z.string().min(1), outcome: z.enum(['done', 'skipped', 'uncertain']),
  actorId: z.string().min(1), actorName: z.string().min(1), recordedAt: z.iso.datetime(),
  syncState: z.enum(['local', 'queued', 'synced', 'failed']), kind: z.enum(['record', 'resolution']).optional(), note: z.string().max(500).optional(),
});

export type SyncContext = { householdId: string; planId: string; occurrenceKey: string };
export type SyncContextResolver = (command: OutboxCommand, occurrenceId: string) => Promise<SyncContext>;

export async function drainCareOutbox(repository: CareRepository, gateway: CareRemoteGateway, resolveContext: SyncContextResolver) {
  const commands = await repository.claimPendingCommands();
  let synced = 0;
  let failed = 0;
  for (const command of commands) {
    try {
      if (!command.leaseToken) throw new Error('Outbox claim token bulunamadı.');
      if (command.commandType !== 'record_care') throw new Error(`Desteklenmeyen komut: ${command.commandType}`);
      const event = careEventSchema.parse(JSON.parse(command.payload));
      if (event.id !== command.commandId) throw new Error('Komut ve event kimliği eşleşmiyor.');
      const context = await resolveContext(command, event.occurrenceId);
      await gateway.pushCareEvent({ ...context, event });
      await repository.markCommandSynced(command.commandId, command.leaseToken);
      synced += 1;
    } catch (error) {
      if (command.leaseToken) await repository.markCommandFailed(command.commandId, command.leaseToken, error instanceof Error ? error.message : 'Bilinmeyen eşitleme hatası');
      failed += 1;
    }
  }
  return { attempted: commands.length, synced, failed };
}
