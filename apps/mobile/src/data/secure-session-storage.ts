import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

const CHUNK_SIZE = 1800;

function metaKey(key: string) { return `${key}.meta`; }
type Metadata = { generation: string; count: number };
function chunkKey(key: string, generation: string, index: number) { return `${key}.${generation}.${index}`; }
function parseMetadata(raw: string | null): Metadata | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Metadata;
    if (typeof parsed === 'object' && parsed !== null && typeof parsed.generation === 'string' && Number.isInteger(parsed.count) && parsed.count >= 1 && parsed.count <= 100) return parsed;
  } catch { /* Sayısal eski metadata JSON nesnesi değildir. */ }
  const legacyCount = Number(raw);
  return Number.isInteger(legacyCount) && legacyCount >= 1 && legacyCount <= 100 ? { generation: 'legacy', count: legacyCount } : null;
}

export const secureSessionStorage = {
  async getItem(key: string) {
    const metadata = parseMetadata(await SecureStore.getItemAsync(metaKey(key)));
    if (!metadata) return null;
    const chunks = await Promise.all(Array.from({ length: metadata.count }, (_, index) => SecureStore.getItemAsync(metadata.generation === 'legacy' ? `${key}.${index}` : chunkKey(key, metadata.generation, index))));
    return chunks.every((chunk): chunk is string => chunk !== null) ? chunks.join('') : null;
  },
  async setItem(key: string, value: string) {
    const previous = parseMetadata(await SecureStore.getItemAsync(metaKey(key)));
    const chunks = value.match(new RegExp(`.{1,${CHUNK_SIZE}}`, 'gs')) ?? [''];
    const generation = Crypto.randomUUID();
    await Promise.all(chunks.map((chunk, index) => SecureStore.setItemAsync(chunkKey(key, generation, index), chunk, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY })));
    await SecureStore.setItemAsync(metaKey(key), JSON.stringify({ generation, count: chunks.length }), { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY });
    if (previous) await Promise.all(Array.from({ length: previous.count }, (_, index) => SecureStore.deleteItemAsync(previous.generation === 'legacy' ? `${key}.${index}` : chunkKey(key, previous.generation, index))));
  },
  async removeItem(key: string) {
    const metadata = parseMetadata(await SecureStore.getItemAsync(metaKey(key)));
    if (metadata) await Promise.all(Array.from({ length: metadata.count }, (_, index) => SecureStore.deleteItemAsync(metadata.generation === 'legacy' ? `${key}.${index}` : chunkKey(key, metadata.generation, index))));
    await SecureStore.deleteItemAsync(metaKey(key));
  },
};
