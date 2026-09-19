import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const KEY = 'patinobeti.pending-invite.v1';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
type PendingInvite = { token: string; savedAt: number };

async function readRaw() {
  return Platform.OS === 'web' ? sessionStorage.getItem(KEY) : SecureStore.getItemAsync(KEY);
}

export async function savePendingInvite(token: string) {
  const value = JSON.stringify({ token, savedAt: Date.now() } satisfies PendingInvite);
  if (Platform.OS === 'web') sessionStorage.setItem(KEY, value);
  else await SecureStore.setItemAsync(KEY, value, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY });
}

export async function getPendingInvite() {
  const raw = await readRaw();
  if (!raw) return null;
  try {
    const pending = JSON.parse(raw) as PendingInvite;
    if (typeof pending.token === 'string' && pending.token.length >= 32 && Date.now() - pending.savedAt <= MAX_AGE_MS) return pending.token;
  } catch { /* Bozuk veya eski intent aşağıda temizlenir. */ }
  await clearPendingInvite();
  return null;
}

export async function clearPendingInvite() {
  if (Platform.OS === 'web') sessionStorage.removeItem(KEY);
  else await SecureStore.deleteItemAsync(KEY);
}
