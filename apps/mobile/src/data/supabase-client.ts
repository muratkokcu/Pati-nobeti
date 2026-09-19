import 'react-native-url-polyfill/auto';
import 'expo-sqlite/localStorage/install';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import type { Database } from './database.types';
import { secureSessionStorage } from './secure-session-storage';

let singleton: SupabaseClient<Database> | null = null;

export function getConfiguredSupabaseClient() {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url && !publishableKey) return null;
  if (!url || !publishableKey) throw new Error('Supabase yapılandırması eksik: URL ve publishable key birlikte verilmelidir.');
  if (!singleton) {
    singleton = createClient<Database>(url, publishableKey, {
      auth: { storage: Platform.OS === 'web' ? localStorage : secureSessionStorage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false, flowType: 'pkce' },
    });
  }
  return singleton;
}
