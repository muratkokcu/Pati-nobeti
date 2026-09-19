import { router, type Href } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef } from 'react';
import { notificationResponseKey } from '@/domain/schedule';

// Bildirime dokunulduğunda bugünün kaydına götürür. Web karşılığı için notification-navigator.web.tsx.
export function NotificationNavigator() {
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
