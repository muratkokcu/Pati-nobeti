import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { BodyText, TitleText } from '@/components/typography';
import { ScreenLoading } from '@/components/screen';
import { spacing } from '@/design/tokens';
import { todayOccurrenceForPlan } from '@/domain/schedule';
import { useApp } from '@/state/app-context';

export default function TodayPlanRedirect() {
  const { planId } = useLocalSearchParams<{ planId: string }>();
  const { snapshot, isLoading, refreshSnapshot } = useApp();
  const [refreshComplete, setRefreshComplete] = useState(false);
  const occurrence = snapshot ? todayOccurrenceForPlan(snapshot, planId) : undefined;
  useEffect(() => { if (occurrence) router.replace(`/record/${occurrence.id}`); }, [occurrence]);
  useEffect(() => {
    if (snapshot && !occurrence && !refreshComplete) void refreshSnapshot().finally(() => setRefreshComplete(true));
  }, [snapshot, occurrence, refreshComplete, refreshSnapshot]);
  if (isLoading || !snapshot || occurrence || !refreshComplete) return <ScreenLoading />;
  return <View style={{ gap: spacing.sm, padding: spacing.xl }}><TitleText>Bugün bu plan için görev yok</TitleText><BodyText>Plan duraklatılmış veya güncellenmiş olabilir. Bugün ekranından güncel durumu kontrol et.</BodyText></View>;
}
