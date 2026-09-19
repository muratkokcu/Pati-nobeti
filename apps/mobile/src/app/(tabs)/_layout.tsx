import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, Tabs } from 'expo-router';
import { ScreenLoading } from '@/components/screen';
import { palette } from '@/design/tokens';
import { useRuntime } from '@/state/runtime-context';

const icons = { index: 'today-outline', plans: 'calendar-outline', history: 'time-outline', household: 'people-outline' } as const;

export default function TabsLayout() {
  const { mode, session, households, isBooting } = useRuntime();
  if (isBooting) return <ScreenLoading />;
  if (mode === 'production' && !session) return <Redirect href="/auth" />;
  if (mode === 'production' && households.length === 0) return <Redirect href="/onboarding" />;
  return <Tabs screenOptions={({ route }) => ({
    headerShown: false, tabBarActiveTintColor: palette.primary, tabBarInactiveTintColor: palette.muted,
    tabBarStyle: { backgroundColor: palette.surface, borderTopColor: palette.line, height: 82, paddingBottom: 18, paddingTop: 8 },
    tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
    tabBarIcon: ({ color, size }) => <Ionicons color={color} name={icons[route.name as keyof typeof icons]} size={size} />,
  })}>
    <Tabs.Screen name="index" options={{ title: 'Bugün' }} />
    <Tabs.Screen name="plans" options={{ title: 'Planlar' }} />
    <Tabs.Screen name="history" options={{ title: 'Geçmiş' }} />
    <Tabs.Screen name="household" options={{ title: 'Hane' }} />
  </Tabs>;
}
