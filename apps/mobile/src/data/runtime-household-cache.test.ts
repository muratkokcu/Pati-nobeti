/* eslint-disable import/first -- Jest mock must be installed before importing the module under test. */
const mockStorage = new Map<string, string>();

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(async (key: string) => mockStorage.get(key) ?? null),
  setItemAsync: jest.fn(async (key: string, value: string) => { mockStorage.set(key, value); }),
  deleteItemAsync: jest.fn(async (key: string) => { mockStorage.delete(key); }),
}));

import { clearCachedHouseholds, readCachedHouseholds, writeCachedHouseholds } from './runtime-household-cache';

describe('runtime household cache', () => {
  beforeEach(() => mockStorage.clear());

  it('restores only valid scoped household summaries', async () => {
    await writeCachedHouseholds('user-a', [{ id: 'home-a', name: 'Mırmır’ın hanesi', role: 'owner' }]);
    expect(await readCachedHouseholds('user-a')).toEqual([{ id: 'home-a', name: 'Mırmır’ın hanesi', role: 'owner' }]);
    expect(await readCachedHouseholds('user-b')).toEqual([]);
  });

  it('clears the user scope on explicit sign out', async () => {
    await writeCachedHouseholds('user-a', [{ id: 'home-a', name: 'Ev', role: 'caregiver' }]);
    await clearCachedHouseholds('user-a');
    expect(await readCachedHouseholds('user-a')).toEqual([]);
  });
});
