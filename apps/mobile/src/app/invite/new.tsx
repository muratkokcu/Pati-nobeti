import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { Screen, ScreenLoading } from '@/components/screen';
import { BodyText, DisplayText, MetaText, TitleText } from '@/components/typography';
import { layout, opacity, palette, radius, spacing, touchTarget, typography } from '@/design/tokens';
import { useApp } from '@/state/app-context';
import { useRuntime } from '@/state/runtime-context';

type Invite = { id: string; token: string; expiresAt: string };

const DEMO_TOKEN = 'demo-invite';

/** Davet eden tarafın ekranı. Kabul eden tarafın ekranı: `invite/[token].tsx`. */
export default function NewInviteScreen() {
  const { snapshot, isLoading } = useApp();
  const runtime = useRuntime();
  const [invite, setInvite] = useState<Invite | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shared, setShared] = useState(false);
  if (isLoading || !snapshot) return <ScreenLoading />;

  const isDemo = snapshot.isDemo;
  const petName = snapshot.pet.name;
  const link = (token: string) => `patinobeti://invite/${token}`;
  const message = (token: string) => `${petName} için ortak bakım hanesine katıl: ${link(token)}`;

  const create = async () => {
    setError(null);
    if (isDemo) {
      setInvite({ id: 'demo', token: DEMO_TOKEN, expiresAt: new Date(Date.now() + 7 * 864e5).toISOString() });
      return;
    }
    if (!runtime.gateway || !runtime.activeHouseholdId) { setError('Hane bağlantısı bulunamadı. Uygulamayı yeniden açıp dene.'); return; }
    setPending(true);
    try {
      const created = await runtime.gateway.createInvite(runtime.activeHouseholdId);
      setInvite({ id: created.inviteId, token: created.token, expiresAt: created.expiresAt });
    } catch { setError('Davet oluşturulamadı. Bağlantını kontrol edip yeniden dene.'); }
    finally { setPending(false); }
  };

  const share = async () => {
    if (!invite) return;
    setError(null);
    const result = await Share.share({ title: 'PatiNöbeti hane daveti', message: message(invite.token) });
    if (result.action === Share.sharedAction) {
      setShared(true);
      if (!isDemo && runtime.gateway && runtime.activeHouseholdId) void runtime.gateway.trackEvent('invite_shared', runtime.activeHouseholdId).catch(() => undefined);
    }
  };

  const revoke = async () => {
    if (!invite) return;
    setError(null);
    if (isDemo) { setInvite(null); setShared(false); return; }
    if (!runtime.gateway) return;
    setPending(true);
    try { await runtime.gateway.revokeInvite(invite.id); setInvite(null); setShared(false); }
    catch { setError('Davet iptal edilemedi. Bağlantını kontrol edip yeniden dene.'); }
    finally { setPending(false); }
  };

  const expiry = invite ? new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).format(new Date(invite.expiresAt)) : null;

  return <Screen>
    <DisplayText style={styles.heading}>Bakımı paylaşın</DisplayText>
    <BodyText style={styles.intro}>{petName} için ikinci bir bakım veren davet edin. Davet edilen kişi kendi hesabıyla katılır; kayıtlarda kimin ne zaman ne yaptığı ayrı ayrı görünür.</BodyText>

    <View style={styles.rights}>
      <Text style={styles.rightsTitle}>Davet edilen kişi ne yapabilir?</Text>
      {[
        { icon: 'checkmark-circle-outline' as const, text: 'Bakım kaydı ekleyebilir ve kendi kaydını düzeltebilir', can: true },
        { icon: 'eye-outline' as const, text: 'Planları ve hanenin bakım geçmişini görebilir', can: true },
        { icon: 'close-circle-outline' as const, text: 'Hane ayarlarını değiştiremez, üye çıkaramaz', can: false },
        { icon: 'close-circle-outline' as const, text: 'Başkasının kaydını silemez; düzeltme yeni kayıt olarak eklenir', can: false },
      ].map((row) => (
        <View key={row.text} style={styles.rightsRow}>
          <Ionicons color={row.can ? palette.statusInk.done : palette.muted} name={row.icon} size={layout.icon.lg} />
          <BodyText style={styles.rightsText}>{row.text}</BodyText>
        </View>
      ))}
    </View>

    {invite ? (
      <View style={styles.card}>
        <View style={styles.cardHead}>
          <TitleText>Davet hazır</TitleText>
          <View style={[styles.state, { backgroundColor: shared ? palette.statusSoft.done : palette.neutralSoft }]}>
            <Ionicons color={shared ? palette.statusInk.done : palette.neutralInk} name={shared ? 'paper-plane' : 'ellipse-outline'} size={layout.icon.sm} />
            <Text style={[styles.stateText, { color: shared ? palette.statusInk.done : palette.neutralInk }]}>{shared ? 'Gönderildi' : 'Henüz gönderilmedi'}</Text>
          </View>
        </View>
        <Text accessibilityLabel={`Davet kodu ${invite.token.split('').join(' ')}`} selectable style={styles.code}>{invite.token}</Text>
        <MetaText>{expiry} tarihine kadar geçerli · tek kullanımlık</MetaText>

        <Pressable accessibilityRole="button" onPress={() => void share()} style={({ pressed }) => [styles.primary, pressed && styles.pressed]}>
          <Ionicons color={palette.white} name="share-social-outline" size={layout.icon.lg} />
          <Text style={styles.primaryText}>Daveti gönder</Text>
        </Pressable>

        {isDemo ? (
          <Pressable accessibilityRole="button" onPress={() => router.push(`/invite/${DEMO_TOKEN}`)} style={({ pressed }) => [styles.secondary, pressed && styles.secondaryPressed]}>
            <Text style={styles.secondaryText}>Karşı tarafın gördüğü ekranı aç</Text>
          </Pressable>
        ) : null}

        <Pressable accessibilityRole="button" accessibilityState={{ disabled: pending }} disabled={pending} onPress={() => void revoke()} style={styles.textAction}>
          <Text style={styles.dangerText}>{pending ? 'İşleniyor…' : 'Bu daveti iptal et'}</Text>
        </Pressable>
      </View>
    ) : (
      <Pressable accessibilityRole="button" accessibilityState={{ disabled: pending }} disabled={pending} onPress={() => void create()} style={({ pressed }) => [styles.primary, styles.primaryStandalone, pending && styles.disabled, pressed && styles.pressed]}>
        <Ionicons color={palette.white} name="person-add-outline" size={layout.icon.lg} />
        <Text style={styles.primaryText}>{pending ? 'Davet oluşturuluyor…' : 'Davet oluştur'}</Text>
      </Pressable>
    )}

    {error ? <View accessibilityLiveRegion="polite" style={styles.error}><Ionicons color={palette.overdue} name="alert-circle-outline" size={layout.icon.lg} /><BodyText style={styles.errorText}>{error}</BodyText></View> : null}

    <MetaText style={styles.footnote}>
      {isDemo
        ? 'Bu yerel demoda davet gerçekten gönderilmez; kod örnektir ve gerçek bir hane oluşturmaz.'
        : 'Bağlantı yalnız davet ettiğiniz kişide çalışır, tek kullanımlıktır ve süresi dolunca kendiliğinden geçersiz olur.'}
    </MetaText>
  </Screen>;
}

const styles = StyleSheet.create({
  heading: { marginTop: spacing.xl },
  intro: { color: palette.muted, marginTop: spacing.sm },
  rights: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, marginTop: layout.sectionGap, padding: layout.cardPaddingLoose },
  rightsTitle: { ...typography.bodyStrong, color: palette.ink, marginBottom: spacing.xxs },
  rightsRow: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.sm },
  rightsText: { flex: 1 },
  card: { backgroundColor: palette.primarySoft, borderRadius: radius.lg, gap: spacing.sm, marginTop: layout.sectionGap, padding: layout.cardPaddingLoose },
  state: { alignItems: 'center', borderRadius: radius.sm, flexDirection: 'row', gap: spacing.xs, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  stateText: { ...typography.label },
  cardHead: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, justifyContent: 'space-between' },
  code: { backgroundColor: palette.raised, borderColor: palette.line, borderRadius: radius.md, borderWidth: 1, color: palette.ink, fontSize: 16, fontVariant: ['tabular-nums'], fontWeight: typography.bodyStrong.fontWeight, letterSpacing: 0.6, lineHeight: 24, padding: spacing.md },
  primary: { alignItems: 'center', backgroundColor: palette.primary, borderRadius: radius.pill, flexDirection: 'row', gap: spacing.sm, justifyContent: 'center', minHeight: touchTarget, paddingHorizontal: spacing.lg },
  primaryStandalone: { marginTop: layout.sectionGap },
  primaryText: { ...typography.bodyStrong, color: palette.white },
  secondary: { alignItems: 'center', borderColor: palette.primary, borderRadius: radius.pill, borderWidth: 1, justifyContent: 'center', minHeight: touchTarget, paddingHorizontal: spacing.lg },
  secondaryText: { ...typography.bodyStrong, color: palette.primary },
  secondaryPressed: { backgroundColor: palette.surfacePressed },
  textAction: { justifyContent: 'center', minHeight: touchTarget },
  dangerText: { ...typography.metaStrong, color: palette.overdue },
  disabled: { opacity: opacity.disabled },
  pressed: { backgroundColor: palette.primaryPressed },
  error: { alignItems: 'flex-start', backgroundColor: palette.overdueSoft, borderRadius: radius.md, flexDirection: 'row', gap: spacing.sm, marginTop: layout.blockGap, padding: layout.cardPadding },
  errorText: { color: palette.overdue, flex: 1 },
  footnote: { marginTop: layout.blockGap },
});
