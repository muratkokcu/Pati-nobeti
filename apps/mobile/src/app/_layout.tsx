import { router, Stack, type Href } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { migrateDatabase } from '@/data/migrations';
import { AppProvider } from '@/state/app-context';
import { RuntimeProvider } from '@/state/runtime-context';
import { palette } from '@/design/tokens';
import { notificationResponseKey } from '@/domain/schedule';

function NotificationNavigator() {
  const response = Notifications.useLastNotificationResponse();
  const handled = useRef<string | null>(null);
  useEffect(() => {
    const id = response?.notification.request.identifier;
    const actionId = response?.actionIdentifier;
    const deliveredAt = response?.notification.date;
    const route = response?.notification.request.content.data?.route;
    const key = id && actionId && deliveredAt ? notificationResponseKey(id, deliveredAt, actionId) : null;
    if (key && key !== handled.current && typeof route === 'string' && route.startsWith('/record/today/')) {
      handled.current = key;
      router.push(route as Href);
      void Notifications.clearLastNotificationResponseAsync();
    }
  }, [response]);
  return null;
}

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={Platform.OS === 'web' ? ':memory:' : 'patinobeti-v2.db'} onInit={migrateDatabase}>
      <RuntimeProvider><AppProvider>
        <StatusBar style="dark" />
        <NotificationNavigator />
        <Stack screenOptions={{ contentStyle: { backgroundColor: palette.canvas }, headerShadowVisible: false, headerStyle: { backgroundColor: palette.canvas }, headerTintColor: palette.ink }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="auth/callback" options={{ headerShown: false }} />
          <Stack.Screen name="auth/reset" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="record/[occurrenceId]" options={{ presentation: 'modal', title: 'Durum kaydı' }} />
          <Stack.Screen name="invite/[token]" options={{ title: 'Daveti değerlendir' }} />
          <Stack.Screen name="paywall" options={{ presentation: 'modal', title: 'PatiNöbeti Plus' }} />
        </Stack>
      </AppProvider></RuntimeProvider>
    </SQLiteProvider>
  );
}
