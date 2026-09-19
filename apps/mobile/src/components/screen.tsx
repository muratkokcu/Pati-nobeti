import type { PropsWithChildren } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette, spacing } from '@/design/tokens';

export function Screen({ children, ...props }: PropsWithChildren<ScrollViewProps>) {
  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} {...props}>{children}</ScrollView>
    </SafeAreaView>
  );
}
export function ScreenLoading() { return <View accessibilityLabel="İçerik yükleniyor" accessibilityLiveRegion="polite" accessibilityRole="progressbar" style={styles.loading}><ActivityIndicator color={palette.primary} /><Text style={styles.loadingText}>Yükleniyor…</Text></View>; }
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: palette.canvas }, content: { alignSelf: 'center', maxWidth: 680, paddingHorizontal: spacing.lg, paddingBottom: 120, width: '100%' }, loading: { alignItems: 'center', backgroundColor: palette.canvas, flex: 1, gap: spacing.md, justifyContent: 'center' }, loadingText: { color: palette.muted, fontSize: 14, fontWeight: '600' } });
