import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';

export async function scheduleDemoReminder(planId: string, hour: number, minute = 0) {
  const current = await Notifications.getPermissionsAsync();
  const permission = current.status === 'granted' ? current : await Notifications.requestPermissionsAsync();
  if (permission.status !== 'granted') return { ok: false as const, reason: 'permission' as const };
  const storageKey = `reminder:${planId}`;
  const previousId = await SecureStore.getItemAsync(storageKey);
  if (previousId) await Notifications.cancelScheduledNotificationAsync(previousId).catch(() => undefined);
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: { title: 'PatiNöbeti', body: 'Planlanan bakım zamanı yaklaşıyor.', data: { route: `/record/today/${planId}` } },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute },
  });
  await SecureStore.setItemAsync(storageKey, notificationId);
  return { ok: true as const };
}
