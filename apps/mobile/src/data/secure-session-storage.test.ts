const mockValues = new Map<string, string>();

jest.mock('expo-secure-store', () => ({
  WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'device-only',
  getItemAsync: jest.fn(async (key: string) => mockValues.get(key) ?? null),
  setItemAsync: jest.fn(async (key: string, value: string) => { mockValues.set(key, value); }),
  deleteItemAsync: jest.fn(async (key: string) => { mockValues.delete(key); }),
}));

jest.mock('expo-crypto', () => ({ randomUUID: jest.fn().mockReturnValueOnce('generation-a').mockReturnValueOnce('generation-b') }));

// Jest mock fabrikaları gerçek modül import edilmeden önce kurulmalıdır.
// eslint-disable-next-line import/first
import { secureSessionStorage } from './secure-session-storage';

describe('secure session storage', () => {
  beforeEach(() => mockValues.clear());

  it('switches chunk generations only after the complete value is written', async () => {
    const first = 'a'.repeat(2000);
    const second = 'b'.repeat(2000);
    await secureSessionStorage.setItem('session', first);
    expect(await secureSessionStorage.getItem('session')).toBe(first);
    await secureSessionStorage.setItem('session', second);
    expect(await secureSessionStorage.getItem('session')).toBe(second);
    expect([...mockValues.keys()].some((key) => key.includes('generation-a'))).toBe(false);
  });

  it('reads and removes the legacy numeric metadata layout', async () => {
    mockValues.set('legacy.meta', '2'); mockValues.set('legacy.0', 'old-'); mockValues.set('legacy.1', 'session');
    expect(await secureSessionStorage.getItem('legacy')).toBe('old-session');
    await secureSessionStorage.removeItem('legacy');
    expect(mockValues.size).toBe(0);
  });
});
