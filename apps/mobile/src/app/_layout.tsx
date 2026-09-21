import { Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DatabaseGate } from '@/components/database-gate';
import { ScreenLoading } from '@/components/screen';
import { NotificationNavigator } from '@/components/notification-navigator';
import { AppProvider } from '@/state/app-context';
import { RuntimeProvider } from '@/state/runtime-context';
import { palette } from '@/design/tokens';

export default function RootLayout() {
  // Tek grotesk: Archivo. Yüklenene kadar ekran çizilmez ki tipografi zıplamasın.
  const [fontsLoaded] = useFonts({ Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold, Archivo_700Bold });
  if (!fontsLoaded) return <ScreenLoading />;
  return (
    <DatabaseGate>
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
          <Stack.Screen name="invite/new" options={{ presentation: 'modal', title: 'Bakım veren davet et' }} />
          <Stack.Screen name="paywall" options={{ presentation: 'modal', title: 'PatiNöbeti Plus' }} />
          <Stack.Screen name="design-system" options={{ title: 'Tasarım sistemi' }} />
        </Stack>
      </AppProvider></RuntimeProvider>
    </DatabaseGate>
  );
}
