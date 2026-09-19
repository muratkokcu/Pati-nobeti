import { Platform } from 'react-native';
import * as Crypto from 'expo-crypto';
import type { SQLiteDatabase } from 'expo-sqlite';
import { normalizeOccurrences, rollForward } from '@/domain/schedule';
import type { AppSnapshot, CareEvent, CareEventKind, CareOutcome } from '@/domain/types';
import { createDemoSnapshot } from './seed';
import { mergeRemoteWithPending } from './remote-snapshot';

// wa-sqlite (expo-sqlite web) has no exclusive connection; the web demo build falls
// back to a plain transaction on the same database handle.
type TransactionTask = Parameters<SQLiteDatabase['withExclusiveTransactionAsync']>[0];
type TransactionHandle = Parameters<TransactionTask>[0];

function inTransaction(db: SQLiteDatabase, task: TransactionTask) {
  if (Platform.OS === 'web') return db.withTransactionAsync(() => task(db as unknown as TransactionHandle));
  return db.withExclusiveTransactionAsync(task);
}

const SNAPSHOT_KEY = 'demo_snapshot';
type RepositoryOptions = { snapshotKey?: string; scopeKey?: string; initialSnapshot?: () => AppSnapshot; queueAllWrites?: boolean; normalizeStored?: boolean };
export type RecordCareInput = { occurrenceId: string; outcome: CareOutcome; actorId: string; actorName: string; kind?: CareEventKind; note?: string };
export type OutboxCommand = { commandId: string; commandType: 'record_care'; payload: string; baseVersion: number; retryCount: number; createdAt: string; leaseToken?: string };

export interface CareRepository {
  getSnapshot(): Promise<AppSnapshot>;
  recordCare(input: RecordCareInput): Promise<CareEvent>;
  undoCare(eventId: string): Promise<void>;
  resetDemo(): Promise<AppSnapshot>;
  setOffline(value: boolean): Promise<AppSnapshot>;
  hydrateSnapshot(snapshot: AppSnapshot): Promise<AppSnapshot>;
  listPendingCommands(limit?: number): Promise<OutboxCommand[]>;
  claimPendingCommands(limit?: number, leaseMs?: number): Promise<OutboxCommand[]>;
  markCommandSynced(commandId: string, leaseToken: string): Promise<void>;
  markCommandFailed(commandId: string, leaseToken: string, error: string): Promise<void>;
}

export async function purgeProductionDataForUser(db: SQLiteDatabase, userId: string) {
  const prefix = `production:${userId}:%`;
  await inTransaction(db, async (txn) => {
    await txn.runAsync('DELETE FROM outbox WHERE scope_key LIKE ?', prefix);
    await txn.runAsync('DELETE FROM app_state WHERE key LIKE ?', prefix);
  });
}

export class DemoSQLiteRepository implements CareRepository {
  private readonly snapshotKey: string;
  private readonly scopeKey: string;
  private readonly initialSnapshot?: () => AppSnapshot;
  private readonly queueAllWrites: boolean;
  private readonly normalizeStored: boolean;

  constructor(private readonly db: SQLiteDatabase, options: RepositoryOptions = {}) {
    this.snapshotKey = options.snapshotKey ?? SNAPSHOT_KEY;
    this.scopeKey = options.scopeKey ?? 'demo';
    this.initialSnapshot = options.initialSnapshot ?? (options.snapshotKey ? undefined : createDemoSnapshot);
    this.queueAllWrites = options.queueAllWrites ?? false;
    this.normalizeStored = options.normalizeStored ?? true;
  }

  async getSnapshot() {
    const row = await this.db.getFirstAsync<{ value: string }>('SELECT value FROM app_state WHERE key = ?', this.snapshotKey);
    if (!row) {
      if (!this.initialSnapshot) throw new Error('Bu hane için yerel cache henüz oluşmadı.');
      return this.replaceSnapshot(this.initialSnapshot());
    }
    const stored = JSON.parse(row.value) as AppSnapshot;
    // Gün dönmüşse bugünün görevleri burada üretilir; ekranlar dünün kaydını bugün göstermez.
    const rolled = rollForward(this.normalizeStored ? normalizeOccurrences(stored) : stored);
    if (rolled !== stored) await this.writeSnapshot(rolled);
    return rolled;
  }

  private async writeSnapshot(snapshot: AppSnapshot) {
    await this.db.runAsync(`INSERT INTO app_state(key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`, this.snapshotKey, JSON.stringify(snapshot), new Date().toISOString());
  }

  private async replaceSnapshot(snapshot: AppSnapshot) { await this.writeSnapshot(snapshot); return snapshot; }

  async hydrateSnapshot(remote: AppSnapshot) {
    let next = remote;
    await inTransaction(this.db, async (txn) => {
      const row = await txn.getFirstAsync<{ value: string }>('SELECT value FROM app_state WHERE key = ?', this.snapshotKey);
      if (row) next = mergeRemoteWithPending(remote, JSON.parse(row.value) as AppSnapshot);
      await txn.runAsync(`INSERT INTO app_state(key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`, this.snapshotKey, JSON.stringify(next), new Date().toISOString());
    });
    return next;
  }

  async recordCare(input: RecordCareInput) {
    let event: CareEvent | null = null;
    await inTransaction(this.db, async (txn) => {
      const row = await txn.getFirstAsync<{ value: string }>('SELECT value FROM app_state WHERE key = ?', this.snapshotKey);
      if (!row) throw new Error('Kayıt için yerel snapshot bulunamadı.');
      const snapshot = JSON.parse(row.value) as AppSnapshot;
      if (!snapshot.occurrences.some((item) => item.id === input.occurrenceId)) throw new Error('Bakım saati yerel snapshot içinde bulunamadı.');
      event = {
        id: Crypto.randomUUID(), occurrenceId: input.occurrenceId, outcome: input.outcome,
        actorId: input.actorId, actorName: input.actorName, recordedAt: new Date().toISOString(),
        syncState: this.queueAllWrites || snapshot.isOffline ? 'queued' : 'local', kind: input.kind ?? 'record', note: input.note?.trim() || undefined,
      };
      const next: AppSnapshot = { ...snapshot, occurrences: snapshot.occurrences.map((item) => item.id === input.occurrenceId ? { ...item, events: [...item.events, event!] } : item) };
      await txn.runAsync(`INSERT INTO app_state(key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`, this.snapshotKey, JSON.stringify(next), new Date().toISOString());
      await txn.runAsync(`INSERT INTO outbox(command_id, command_type, payload, base_version, state, created_at, scope_key) VALUES (?, 'record_care', ?, 0, 'queued', ?, ?)`, event.id, JSON.stringify(event), event.recordedAt, this.scopeKey);
    });
    if (!event) throw new Error('Bakım kaydı oluşturulamadı.');
    return event;
  }

  async undoCare(eventId: string) {
    await inTransaction(this.db, async (txn) => {
      const row = await txn.getFirstAsync<{ value: string }>('SELECT value FROM app_state WHERE key = ?', this.snapshotKey);
      if (!row) throw new Error('Geri alma için yerel snapshot bulunamadı.');
      const snapshot = JSON.parse(row.value) as AppSnapshot;
      const event = snapshot.occurrences.flatMap((item) => item.events).find((item) => item.id === eventId);
      if (event?.syncState === 'synced') throw new Error('Eşitlenmiş kayıt silinemez; yeni bir netleştirme kaydı ekleyin.');
      const command = await txn.getFirstAsync<{ state: string }>('SELECT state FROM outbox WHERE command_id = ? AND scope_key = ?', eventId, this.scopeKey);
      if (command?.state === 'processing' || command?.state === 'synced') throw new Error('Paylaşımı başlamış kayıt fiziksel olarak geri alınamaz.');
      const next: AppSnapshot = { ...snapshot, occurrences: snapshot.occurrences.map((item) => ({ ...item, events: item.events.filter((itemEvent) => itemEvent.id !== eventId) })) };
      await txn.runAsync('DELETE FROM outbox WHERE command_id = ? AND scope_key = ?', eventId, this.scopeKey);
      await txn.runAsync('UPDATE app_state SET value = ?, updated_at = ? WHERE key = ?', JSON.stringify(next), new Date().toISOString(), this.snapshotKey);
    });
  }

  async resetDemo() {
    if (!this.initialSnapshot) throw new Error('Production cache demo verisine sıfırlanamaz.');
    const snapshot = this.initialSnapshot();
    await inTransaction(this.db, async (txn) => {
      await txn.runAsync('DELETE FROM outbox WHERE scope_key = ?', this.scopeKey);
      await txn.runAsync(`INSERT INTO app_state(key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`, this.snapshotKey, JSON.stringify(snapshot), new Date().toISOString());
    });
    return snapshot;
  }

  async setOffline(value: boolean) {
    const snapshot = await this.getSnapshot();
    const next = { ...snapshot, isOffline: value } satisfies AppSnapshot;
    await this.db.runAsync(`UPDATE app_state SET value = ?, updated_at = ? WHERE key = ?`, JSON.stringify(next), new Date().toISOString(), this.snapshotKey);
    return next;
  }

  async listPendingCommands(limit = 50) {
    const rows = await this.db.getAllAsync<{ command_id: string; command_type: 'record_care'; payload: string; base_version: number; retry_count: number; created_at: string }>(
      `SELECT command_id, command_type, payload, base_version, retry_count, created_at FROM outbox WHERE scope_key = ? AND state IN ('queued', 'failed') ORDER BY created_at LIMIT ?`, this.scopeKey, limit,
    );
    return rows.map((row) => ({ commandId: row.command_id, commandType: row.command_type, payload: row.payload, baseVersion: row.base_version, retryCount: row.retry_count, createdAt: row.created_at }));
  }

  async claimPendingCommands(limit = 50, leaseMs = 30_000) {
    const now = new Date();
    const leaseUntil = new Date(now.getTime() + leaseMs).toISOString();
    let claimed: OutboxCommand[] = [];
    await inTransaction(this.db, async (txn) => {
      const rows = await txn.getAllAsync<{ command_id: string; command_type: 'record_care'; payload: string; base_version: number; retry_count: number; created_at: string }>(
        `SELECT command_id, command_type, payload, base_version, retry_count, created_at FROM outbox
         WHERE scope_key = ? AND retry_count < 8 AND (
           (state IN ('queued', 'failed') AND (next_attempt_at IS NULL OR next_attempt_at <= ?))
           OR (state = 'processing' AND lease_until <= ?)
         ) ORDER BY created_at LIMIT ?`, this.scopeKey, now.toISOString(), now.toISOString(), limit,
      );
      const tokens = new Map<string, string>();
      for (const row of rows) {
        const token = Crypto.randomUUID(); tokens.set(row.command_id, token);
        await txn.runAsync(`UPDATE outbox SET state = 'processing', lease_until = ?, lease_token = ?, attempted_at = ? WHERE command_id = ? AND scope_key = ?`, leaseUntil, token, now.toISOString(), row.command_id, this.scopeKey);
      }
      claimed = rows.map((row) => ({ commandId: row.command_id, commandType: row.command_type, payload: row.payload, baseVersion: row.base_version, retryCount: row.retry_count, createdAt: row.created_at, leaseToken: tokens.get(row.command_id) }));
    });
    return claimed;
  }

  async markCommandSynced(commandId: string, leaseToken: string) {
    await inTransaction(this.db, async (txn) => {
      const result = await txn.runAsync(`UPDATE outbox SET state = 'synced', attempted_at = ?, lease_until = NULL, lease_token = NULL, next_attempt_at = NULL, last_error = NULL WHERE command_id = ? AND scope_key = ? AND state = 'processing' AND lease_token = ?`, new Date().toISOString(), commandId, this.scopeKey, leaseToken);
      if (result.changes !== 1) throw new Error('Outbox ACK geçişi reddedildi.');
      const row = await txn.getFirstAsync<{ value: string }>('SELECT value FROM app_state WHERE key = ?', this.snapshotKey);
      if (!row) throw new Error('ACK için yerel snapshot bulunamadı.');
      const snapshot = JSON.parse(row.value) as AppSnapshot;
      const next: AppSnapshot = { ...snapshot, occurrences: snapshot.occurrences.map((item) => ({ ...item, events: item.events.map((event) => event.id === commandId ? { ...event, syncState: 'synced' } : event) })) };
      await txn.runAsync('UPDATE app_state SET value = ?, updated_at = ? WHERE key = ?', JSON.stringify(next), new Date().toISOString(), this.snapshotKey);
    });
  }

  async markCommandFailed(commandId: string, leaseToken: string, error: string) {
    const command = await this.db.getFirstAsync<{ retry_count: number }>('SELECT retry_count FROM outbox WHERE command_id = ? AND scope_key = ?', commandId, this.scopeKey);
    const retry = (command?.retry_count ?? 0) + 1;
    const delayMs = Math.min(15 * 60_000, 2 ** Math.min(retry, 10) * 1_000) + Math.floor(Math.random() * 1_000);
    const attemptedAt = new Date();
    await inTransaction(this.db, async (txn) => {
      const result = await txn.runAsync(`UPDATE outbox SET state = 'failed', retry_count = retry_count + 1, attempted_at = ?, lease_until = NULL, lease_token = NULL, next_attempt_at = ?, last_error = ? WHERE command_id = ? AND scope_key = ? AND state = 'processing' AND lease_token = ?`, attemptedAt.toISOString(), new Date(attemptedAt.getTime() + delayMs).toISOString(), error.slice(0, 500), commandId, this.scopeKey, leaseToken);
      if (result.changes !== 1) throw new Error('Outbox hata geçişi reddedildi.');
      const row = await txn.getFirstAsync<{ value: string }>('SELECT value FROM app_state WHERE key = ?', this.snapshotKey);
      if (!row) throw new Error('Hata durumu için yerel snapshot bulunamadı.');
      const snapshot = JSON.parse(row.value) as AppSnapshot;
      const next: AppSnapshot = { ...snapshot, occurrences: snapshot.occurrences.map((item) => ({ ...item, events: item.events.map((event) => event.id === commandId ? { ...event, syncState: 'failed' } : event) })) };
      await txn.runAsync('UPDATE app_state SET value = ?, updated_at = ? WHERE key = ?', JSON.stringify(next), new Date().toISOString(), this.snapshotKey);
    });
  }
}
