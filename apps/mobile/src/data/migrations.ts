import type { SQLiteDatabase } from 'expo-sqlite';
import { Platform } from 'react-native';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

type MigrationExecutor = Pick<SQLiteDatabase, 'execAsync'>;
async function transaction(db: SQLiteDatabase, task: (executor: MigrationExecutor) => Promise<void>) {
  if (Platform.OS === 'web') return db.withTransactionAsync(() => task(db));
  return db.withExclusiveTransactionAsync((txn) => task(txn));
}

export async function migrateDatabase(db: SQLiteDatabase) {
  if (Platform.OS !== 'web') {
    const storageKey = 'patinobeti.database-key.v2';
    let key = await SecureStore.getItemAsync(storageKey);
    if (!key) {
      key = Array.from(await Crypto.getRandomBytesAsync(32), (value) => value.toString(16).padStart(2, '0')).join('');
      await SecureStore.setItemAsync(storageKey, key, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY });
    }
    if (!/^[a-f0-9]{64}$/.test(key)) throw new Error('Yerel veritabanı anahtarı geçersiz.');
    await db.execAsync(`PRAGMA key = '${key}';`);
  }
  await db.execAsync('PRAGMA foreign_keys = ON;');
  const current = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const version = current?.user_version ?? 0;
  if (version < 1) {
    await db.execAsync('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');
    await transaction(db, (txn) => txn.execAsync(`
      CREATE TABLE IF NOT EXISTS app_state (
        key TEXT PRIMARY KEY NOT NULL,
        value TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS outbox (
        command_id TEXT PRIMARY KEY NOT NULL,
        command_type TEXT NOT NULL,
        payload TEXT NOT NULL,
        base_version INTEGER NOT NULL DEFAULT 0,
        state TEXT NOT NULL DEFAULT 'queued',
        created_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS outbox_state_created_idx ON outbox(state, created_at);
      PRAGMA user_version = 1;
    `));
  }
  if (version < 2) {
    await transaction(db, (txn) => txn.execAsync(`
      ALTER TABLE outbox ADD COLUMN retry_count INTEGER NOT NULL DEFAULT 0;
      ALTER TABLE outbox ADD COLUMN attempted_at TEXT;
      ALTER TABLE outbox ADD COLUMN last_error TEXT;
      PRAGMA user_version = 2;
    `));
  }
  if (version < 3) {
    await transaction(db, (txn) => txn.execAsync(`
      ALTER TABLE outbox ADD COLUMN lease_until TEXT;
      ALTER TABLE outbox ADD COLUMN next_attempt_at TEXT;
      PRAGMA user_version = 3;
    `));
  }
  if (version < 4) {
    await transaction(db, (txn) => txn.execAsync(`
      ALTER TABLE outbox ADD COLUMN scope_key TEXT NOT NULL DEFAULT 'demo';
      CREATE INDEX IF NOT EXISTS outbox_scope_state_created_idx ON outbox(scope_key, state, created_at);
      PRAGMA user_version = 4;
    `));
  }
  if (version < 5) {
    await transaction(db, (txn) => txn.execAsync(`
      ALTER TABLE outbox ADD COLUMN lease_token TEXT;
      PRAGMA user_version = 5;
    `));
  }
}
