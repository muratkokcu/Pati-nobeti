import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenLoading } from '@/components/screen';
import { layout, palette, radius, shadow, spacing, typography } from '@/design/tokens';
import { useRuntime } from '@/state/runtime-context';

const icons = {
  index: { active: 'today', idle: 'today-outline' },
  plans: { active: 'calendar', idle: 'calendar-outline' },
  history: { active: 'time', idle: 'time-outline' },
  household: { active: 'people', idle: 'people-outline' },
} as const;

export default function TabsLayout() {
  const { mode, session, households, isBooting } = useRuntime();
  const insets = useSafeAreaInsets();
  if (isBooting) return <ScreenLoading />;
  if (mode === 'production' && !session) return <Redirect href="/auth" />;
  if (mode === 'production' && households.length === 0) return <Redirect href="/onboarding" />;
  return <Tabs screenOptions={({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: palette.primary,
    tabBarInactiveTintColor: palette.muted,
    // İçeriğin üstünde yüzen tek öğe; gölge yalnız burada kullanılır (DESIGN.md).
    tabBarStyle: {
      backgroundColor: palette.navSurface,
      borderColor: palette.navBorder,
      borderRadius: radius.pill,
      borderTopColor: palette.navBorder,
      borderWidth: layout.hairline,
      bottom: insets.bottom + spacing.sm,
      height: layout.navHeight,
      left: layout.navInset,
      paddingBottom: spacing.sm,
      paddingTop: spacing.sm,
      position: 'absolute',
      right: layout.navInset,
      ...shadow.floating,
    },
    tabBarItemStyle: { borderRadius: radius.pill, height: layout.navHeight - spacing.lg, paddingVertical: 0 },
    tabBarIconStyle: { marginBottom: 0, marginTop: spacing.xxs },
    tabBarLabelStyle: { ...typography.label, lineHeight: 14, marginTop: spacing.xxs },
    tabBarIcon: ({ color, focused, size }) => <Ionicons color={color} name={focused ? icons[route.name as keyof typeof icons].active : icons[route.name as keyof typeof icons].idle} size={layout.icon.lg} />,
  })}>
    <Tabs.Screen name="index" options={{ title: 'Bugün' }} />
    <Tabs.Screen name="plans" options={{ title: 'Planlar' }} />
    <Tabs.Screen name="history" options={{ title: 'Geçmiş' }} />
    <Tabs.Screen name="household" options={{ title: 'Hane' }} />
  </Tabs>;
}
