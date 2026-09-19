import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { DemoBanner } from '@/components/demo-banner';
import { Screen, ScreenLoading } from '@/components/screen';
import { BodyText, DisplayText, MetaText, TitleText } from '@/components/typography';
import { layout, opacity, palette, radius, spacing, touchTarget, typography } from '@/design/tokens';
import { useApp } from '@/state/app-context';
import { useRuntime } from '@/state/runtime-context';
import { purgeProductionDataForUser } from '@/data/repository';

export default function HouseholdScreen() {
  const { snapshot, isLoading, resetDemo } = useApp();
  const runtime = useRuntime();
  const db = useSQLiteContext();
  if (isLoading || !snapshot) return <ScreenLoading />;
  const me = snapshot.members.find((member) => member.id === runtime.session?.user.id);
  const confirmReset = () => Alert.alert('Demo sıfırlansın mı?', 'Bu cihazdaki sonradan eklenen demo kayıtları geri alınamaz.', [{ text: 'Vazgeç', style: 'cancel' }, { text: 'Sıfırla', style: 'destructive', onPress: () => { void resetDemo(); } }]);
  const signOut = async () => {
    if (runtime.session) await purgeProductionDataForUser(db, runtime.session.user.id);
    await runtime.signOut();
  };
  return <Screen><DisplayText style={styles.heading}>{snapshot.pet.name}’nın hanesi</DisplayText><BodyText style={styles.intro}>Bakımı paylaşan kişiler ve yetkileri.</BodyText>{snapshot.isDemo ? <DemoBanner /> : null}{snapshot.members.map((member) => <View key={member.id} style={styles.member}><View style={styles.avatar}><Text style={styles.avatarText}>{member.initials}</Text></View><View style={styles.copy}><TitleText>{member.name}</TitleText><MetaText>{member.role === 'owner' ? 'Hane sahibi' : 'Bakım veren'} · aktif</MetaText></View></View>)}
    {snapshot.isDemo || me?.role === 'owner' ? <Pressable accessibilityRole="button" onPress={() => router.push('/invite/new')} style={styles.primary}><Text style={styles.primaryText}>Bakım veren davet et</Text></Pressable> : null}
    <View style={styles.rule} />{snapshot.isDemo ? <><Pressable accessibilityRole="button" onPress={confirmReset} style={styles.secondary}><Text style={styles.secondaryText}>Demoyu başlangıca döndür</Text></Pressable><MetaText style={styles.disclosure}>Davet bu demoda gönderilmez. Yerel kayıtlar gerçek bir haneye aktarılmaz.</MetaText></> : <><Pressable accessibilityRole="button" onPress={() => void signOut().catch(() => Alert.alert('Çıkış tamamlanamadı', 'Yeniden deneyebilirsiniz.'))} style={styles.secondary}><Text style={styles.secondaryText}>Hesaptan çık</Text></Pressable><MetaText style={styles.disclosure}>Çıkışta bu hesaba ait cihaz cache’i silinir. Paylaşılmış sunucu kayıtları denetim izi olarak kalır; hatalı kayıt için netleştirme eklenir.</MetaText></>}</Screen>;
}
const styles = StyleSheet.create({ heading: { marginTop: spacing.xl }, intro: { color: palette.muted, marginTop: spacing.sm }, member: { alignItems: 'center', borderBottomColor: palette.line, borderBottomWidth: 1, flexDirection: 'row', gap: spacing.md, paddingVertical: spacing.lg }, avatar: { alignItems: 'center', backgroundColor: palette.primarySoft, borderRadius: radius.pill, height: layout.avatar.lg, justifyContent: 'center', width: layout.avatar.lg }, avatarText: { ...typography.bodyStrong, color: palette.primary }, copy: { flex: 1, gap: spacing.xxs }, primary: { alignItems: 'center', backgroundColor: palette.primary, borderRadius: radius.md, justifyContent: 'center', marginTop: spacing.xl, minHeight: touchTarget, paddingHorizontal: spacing.lg }, primaryText: { ...typography.bodyStrong, color: palette.white }, disabled: { opacity: opacity.disabled }, inviteState: { backgroundColor: palette.primarySoft, borderRadius: radius.lg, gap: spacing.sm, marginTop: spacing.md, padding: spacing.lg }, textAction: { justifyContent: 'center', minHeight: touchTarget }, actionText: { ...typography.metaStrong, color: palette.primary }, dangerText: { ...typography.metaStrong, color: palette.overdue }, rule: { backgroundColor: palette.line, height: layout.hairline, marginVertical: spacing.xl }, secondary: { alignItems: 'center', borderColor: palette.primary, borderRadius: radius.md, borderWidth: 1, justifyContent: 'center', minHeight: touchTarget }, secondaryText: { ...typography.bodyStrong, color: palette.primary }, disclosure: { marginTop: spacing.md } });
