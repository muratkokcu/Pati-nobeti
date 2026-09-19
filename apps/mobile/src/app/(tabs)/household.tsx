import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { DemoBanner } from '@/components/demo-banner';
import { Screen, ScreenLoading } from '@/components/screen';
import { BodyText, DisplayText, MetaText, TitleText } from '@/components/typography';
import { palette, radius, spacing, touchTarget } from '@/design/tokens';
import { useApp } from '@/state/app-context';
import { useRuntime } from '@/state/runtime-context';
import { purgeProductionDataForUser } from '@/data/repository';

export default function HouseholdScreen() {
  const { snapshot, isLoading, resetDemo } = useApp();
  const runtime = useRuntime();
  const db = useSQLiteContext();
  const [invite, setInvite] = useState<{ id: string; token: string; expiresAt: string } | null>(null);
  const [pending, setPending] = useState(false);
  if (isLoading || !snapshot) return <ScreenLoading />;
  const me = snapshot.members.find((member) => member.id === runtime.session?.user.id);
  const confirmReset = () => Alert.alert('Demo sıfırlansın mı?', 'Bu cihazdaki sonradan eklenen demo kayıtları geri alınamaz.', [{ text: 'Vazgeç', style: 'cancel' }, { text: 'Sıfırla', style: 'destructive', onPress: () => { void resetDemo(); } }]);
  const createInvite = async () => {
    if (!runtime.gateway || !runtime.activeHouseholdId) return;
    setPending(true);
    try {
      const created = await runtime.gateway.createInvite(runtime.activeHouseholdId);
      setInvite({ id: created.inviteId, token: created.token, expiresAt: created.expiresAt });
      const result = await Share.share({ title: 'PatiNöbeti hane daveti', message: `${snapshot.pet.name} için ortak bakım hanesine katıl: patinobeti://invite/${created.token}` });
      if (result.action === Share.sharedAction) void runtime.gateway.trackEvent('invite_shared', runtime.activeHouseholdId).catch(() => undefined);
    } catch { Alert.alert('Davet oluşturulamadı', 'Bağlantını kontrol edip yeniden dene.'); }
    finally { setPending(false); }
  };
  const shareInvite = async () => {
    if (!invite || !runtime.gateway || !runtime.activeHouseholdId) return;
    const result = await Share.share({ title: 'PatiNöbeti hane daveti', message: `${snapshot.pet.name} için ortak bakım hanesine katıl: patinobeti://invite/${invite.token}` });
    if (result.action === Share.sharedAction) void runtime.gateway.trackEvent('invite_shared', runtime.activeHouseholdId).catch(() => undefined);
  };
  const revokeInvite = async () => {
    if (!runtime.gateway || !invite) return;
    setPending(true);
    try { await runtime.gateway.revokeInvite(invite.id); setInvite(null); }
    catch { Alert.alert('Davet iptal edilemedi', 'Bağlantını kontrol edip yeniden dene.'); }
    finally { setPending(false); }
  };
  const signOut = async () => {
    if (runtime.session) await purgeProductionDataForUser(db, runtime.session.user.id);
    await runtime.signOut();
  };
  return <Screen><DisplayText style={styles.heading}>{snapshot.pet.name}’nın hanesi</DisplayText><BodyText style={styles.intro}>Bakımı paylaşan kişiler ve yetkileri.</BodyText>{snapshot.isDemo ? <DemoBanner /> : null}{snapshot.members.map((member) => <View key={member.id} style={styles.member}><View style={styles.avatar}><Text style={styles.avatarText}>{member.initials}</Text></View><View style={styles.copy}><TitleText>{member.name}</TitleText><MetaText>{member.role === 'owner' ? 'Hane sahibi' : 'Bakım veren'} · aktif</MetaText></View></View>)}
    {snapshot.isDemo ? <Pressable accessibilityRole="button" onPress={() => router.push('/invite/demo-invite')} style={styles.primary}><Text style={styles.primaryText}>Davet akışını önizle</Text></Pressable> : me?.role === 'owner' ? <>
      <Pressable accessibilityRole="button" accessibilityState={{ disabled: pending }} disabled={pending} onPress={() => void createInvite()} style={[styles.primary, pending && styles.disabled]}><Text style={styles.primaryText}>{pending ? 'İşleniyor…' : 'Bakım veren davet et'}</Text></Pressable>
      {invite ? <View style={styles.inviteState}><TitleText>Davet paylaşılmaya hazır</TitleText><MetaText>{new Date(invite.expiresAt).toLocaleString('tr-TR')} tarihine kadar geçerli. İptal edene veya uygulamayı kapatana kadar yeniden paylaşabilirsin.</MetaText><Pressable accessibilityRole="button" disabled={pending} onPress={() => void shareInvite()} style={styles.textAction}><Text style={styles.actionText}>Davet bağlantısını yeniden paylaş</Text></Pressable><Pressable accessibilityRole="button" disabled={pending} onPress={() => void revokeInvite()} style={styles.textAction}><Text style={styles.dangerText}>Bu daveti iptal et</Text></Pressable></View> : null}
    </> : null}
    <View style={styles.rule} />{snapshot.isDemo ? <><Pressable accessibilityRole="button" onPress={confirmReset} style={styles.secondary}><Text style={styles.secondaryText}>Demoyu başlangıca döndür</Text></Pressable><MetaText style={styles.disclosure}>Davet bu demoda gönderilmez. Yerel kayıtlar gerçek bir haneye aktarılmaz.</MetaText></> : <><Pressable accessibilityRole="button" onPress={() => void signOut().catch(() => Alert.alert('Çıkış tamamlanamadı', 'Yeniden deneyebilirsin.'))} style={styles.secondary}><Text style={styles.secondaryText}>Hesaptan çık</Text></Pressable><MetaText style={styles.disclosure}>Çıkışta bu hesaba ait cihaz cache’i silinir. Paylaşılmış sunucu kayıtları denetim izi olarak kalır; hatalı kayıt için netleştirme eklenir.</MetaText></>}</Screen>;
}
const styles = StyleSheet.create({ heading: { marginTop: spacing.xl }, intro: { color: palette.muted, marginTop: spacing.sm }, member: { alignItems: 'center', borderBottomColor: palette.line, borderBottomWidth: 1, flexDirection: 'row', gap: spacing.md, paddingVertical: spacing.lg }, avatar: { alignItems: 'center', backgroundColor: palette.primarySoft, borderRadius: 25, height: 50, justifyContent: 'center', width: 50 }, avatarText: { color: palette.primary, fontSize: 15, fontWeight: '800' }, copy: { flex: 1, gap: 3 }, primary: { alignItems: 'center', backgroundColor: palette.primary, borderRadius: radius.md, justifyContent: 'center', marginTop: spacing.xl, minHeight: touchTarget, paddingHorizontal: spacing.lg }, primaryText: { color: palette.white, fontSize: 16, fontWeight: '700' }, disabled: { opacity: 0.48 }, inviteState: { backgroundColor: palette.primarySoft, borderRadius: radius.lg, gap: spacing.sm, marginTop: spacing.md, padding: spacing.lg }, textAction: { justifyContent: 'center', minHeight: touchTarget }, actionText: { color: palette.primary, fontSize: 14, fontWeight: '700' }, dangerText: { color: palette.overdue, fontSize: 14, fontWeight: '700' }, rule: { backgroundColor: palette.line, height: 1, marginVertical: spacing.xl }, secondary: { alignItems: 'center', borderColor: palette.primary, borderRadius: radius.md, borderWidth: 1, justifyContent: 'center', minHeight: touchTarget }, secondaryText: { color: palette.primary, fontSize: 15, fontWeight: '700' }, disclosure: { marginTop: spacing.md } });
