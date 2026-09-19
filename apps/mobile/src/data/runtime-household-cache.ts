import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export type CachedHousehold = { id: string; name: string; role: 'owner' | 'caregiver' };

const keyFor = (userId: string) => `patinobeti.runtime.households.${userId}`;

export async function readCachedHouseholds(userId: string): Promise<CachedHousehold[]> {
  const raw = Platform.OS === 'web' ? localStorage.getItem(keyFor(userId)) : await SecureStore.getItemAsync(keyFor(userId));
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is CachedHousehold => Boolean(item && typeof item === 'object' && typeof item.id === 'string' && typeof item.name === 'string' && (item.role === 'owner' || item.role === 'caregiver')));
  } catch { return []; }
}

export async function writeCachedHouseholds(userId: string, households: CachedHousehold[]) {
  const raw = JSON.stringify(households);
  if (Platform.OS === 'web') localStorage.setItem(keyFor(userId), raw);
  else await SecureStore.setItemAsync(keyFor(userId), raw);
}

export async function clearCachedHouseholds(userId: string) {
  if (Platform.OS === 'web') localStorage.removeItem(keyFor(userId));
  else await SecureStore.deleteItemAsync(keyFor(userId));
}
