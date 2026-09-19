import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { BodyText, MetaText, TitleText } from '@/components/typography';
import { Screen } from '@/components/screen';
import { palette, radius, spacing, touchTarget } from '@/design/tokens';
import { useRuntime } from '@/state/runtime-context';
import { RemoteDomainError } from '@/data/remote-errors';
import type { InvitePreview } from '@/data/remote-gateway';
import { clearPendingInvite, savePendingInvite } from '@/data/pending-invite';

export default function InviteScreen() {
  const { token } = useLocalSearchParams<{ token: string }>();
  const runtime = useRuntime();
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [preview, setPreview] = useState<InvitePreview | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  useEffect(() => {
    if (!runtime.isBooting && runtime.mode === 'production' && !runtime.session && token) void savePendingInvite(token).then(() => router.replace({ pathname: '/auth', params: { next: `/invite/${token}` } }));
  }, [runtime.isBooting, runtime.mode, runtime.session, token]);
  const loadPreview = useCallback(async () => {
    if (!runtime.gateway || !token) return;
    setPreviewLoading(true); setFeedback(null);
    try { setPreview(await runtime.gateway.previewInvite(token)); }
    catch (error) { setFeedback(error instanceof RemoteDomainError && error.code === 'offline' ? 'Davet bilgisi için bağlantı kurulamadı. İnternete bağlanıp yeniden dene.' : 'Bu davet artık kullanılamıyor.'); }
    finally { setPreviewLoading(false); }
  }, [runtime.gateway, token]);
  useEffect(() => {
    if (runtime.mode === 'production' && runtime.session && runtime.gateway && token) {
      void runtime.gateway.getMyProfile().then((name) => { if (name) setDisplayName(name); }).catch(() => undefined);
      void Promise.resolve().then(loadPreview);
    }
  }, [runtime.mode, runtime.session, runtime.gateway, token, loadPreview]);
  if (runtime.isBooting || (runtime.mode === 'production' && !runtime.session)) return null;
  const accept = async () => {
    if (runtime.mode === 'demo') { router.replace('/(tabs)'); return; }
    if (!runtime.gateway || !token) return;
    if (displayName.trim().length < 2) { setFeedback('Kayıtlarda görünecek adını gir.'); return; }
    setPending(true); setFeedback(null);
    let acceptedHousehold: string | null = null;
    try { await runtime.gateway.setProfile(displayName); acceptedHousehold = await runtime.gateway.acceptInvite(token); void runtime.gateway.trackEvent('invite_accepted', acceptedHousehold).catch(() => undefined); await runtime.refreshHouseholds(acceptedHousehold); await clearPendingInvite(); router.replace('/(tabs)'); }
    catch (error) { setFeedback(acceptedHousehold ? 'Haneye katıldın; güncel görünüm alınamadı. Bağlantı geldiğinde yeniden dene.' : error instanceof RemoteDomainError && error.code === 'offline' ? 'Katılım sonucu doğrulanamadı. İnternete bağlanıp aynı daveti güvenle yeniden dene.' : 'Davet kullanılamadı. Süresi dolmuş, iptal edilmiş veya daha önce başka biri tarafından kullanılmış olabilir.'); }
    finally { setPending(false); }
  };
  return <Screen><View style={styles.root}><MetaText>{runtime.mode === 'demo' ? 'Davet önizlemesi' : 'Hane daveti'}</MetaText><TitleText style={styles.title}>{runtime.mode === 'demo' ? 'Luna’nın bakım hanesine katıl' : preview ? `${preview.petName} için ${preview.householdName} hanesine katıl` : 'Ortak bakım hanesine katıl'}</TitleText><BodyText style={styles.body}>Katıldığında bakım planlarını ve hane üyelerinin eklediği kayıtları görebilirsin. Yeni kayıt ekleyebilirsin; hane sahibi ayarlarını değiştiremezsin.</BodyText><View style={styles.summary}><BodyText>Rol</BodyText><Text style={styles.value}>Bakım veren</Text>{runtime.mode === 'demo' ? <><BodyText>Davet kodu</BodyText><Text style={styles.value}>{token}</Text></> : <><MetaText>{preview ? `${new Date(preview.expiresAt).toLocaleString('tr-TR')} tarihine kadar geçerli.` : previewLoading ? 'Davet bilgisi doğrulanıyor…' : 'Davet bilgisi alınamadı.'}</MetaText><MetaText>Güvenlik için davet kodu ekranda gösterilmez; giriş tamamlanana kadar cihazın korumalı alanında en fazla 7 gün tutulur.</MetaText></>}</View>{runtime.mode === 'production' ? <><Text style={styles.label}>Kayıtlarda görünecek adın</Text><TextInput autoComplete="name" editable={!pending} onChangeText={setDisplayName} placeholder="Örn. Deniz" placeholderTextColor={palette.muted} style={styles.input} value={displayName} /></> : null}{feedback ? <Text accessibilityRole="alert" style={styles.feedback}>{feedback}</Text> : null}{runtime.mode === 'production' && !preview && !previewLoading ? <Pressable accessibilityRole="button" onPress={() => void loadPreview()} style={styles.retry}><Text style={styles.retryText}>Davet bilgilerini yeniden dene</Text></Pressable> : null}<Pressable accessibilityRole="button" accessibilityState={{ disabled: pending || (runtime.mode === 'production' && !preview) }} disabled={pending || (runtime.mode === 'production' && !preview)} onPress={() => void accept()} style={[styles.primary, (pending || (runtime.mode === 'production' && !preview)) && styles.disabled]}><Text style={styles.primaryText}>{pending ? 'Katılım doğrulanıyor…' : runtime.mode === 'demo' ? 'Demo hanesine katıl' : 'Haneye katıl'}</Text></Pressable><Pressable accessibilityRole="button" onPress={() => { if (runtime.mode === 'production') void clearPendingInvite(); router.back(); }} style={styles.secondary}><Text style={styles.secondaryText}>Şimdi değil</Text></Pressable><MetaText style={styles.disclosure}>{runtime.mode === 'demo' ? 'Bu yerel demoda gerçek bir üyelik veya hesap oluşturulmaz.' : 'Katılım, bu hesaba bakım veren rolü ekler. Davet tek kullanımlıktır.'}</MetaText></View></Screen>;
}
const styles = StyleSheet.create({ root: { paddingTop: spacing.xl }, title: { fontSize: 29, lineHeight: 35, marginTop: spacing.sm }, body: { color: palette.muted, marginTop: spacing.md }, summary: { backgroundColor: palette.surface, borderRadius: radius.lg, gap: spacing.sm, marginVertical: spacing.xl, padding: spacing.lg }, value: { color: palette.ink, fontSize: 16, fontWeight: '700', marginBottom: spacing.sm }, label: { color: palette.ink, fontSize: 14, fontWeight: '700', marginBottom: spacing.sm }, input: { backgroundColor: palette.surface, borderColor: palette.line, borderRadius: radius.md, borderWidth: 1, color: palette.ink, fontSize: 16, marginBottom: spacing.lg, minHeight: 52, paddingHorizontal: spacing.lg }, feedback: { color: palette.overdue, fontSize: 14, fontWeight: '600', lineHeight: 20, marginBottom: spacing.md }, retry: { alignItems: 'center', borderColor: palette.primary, borderRadius: radius.md, borderWidth: 1, justifyContent: 'center', marginBottom: spacing.md, minHeight: touchTarget }, retryText: { color: palette.primary, fontSize: 15, fontWeight: '700' }, primary: { alignItems: 'center', backgroundColor: palette.primary, borderRadius: radius.md, justifyContent: 'center', minHeight: touchTarget }, primaryText: { color: palette.white, fontSize: 16, fontWeight: '700' }, disabled: { opacity: 0.48 }, secondary: { alignItems: 'center', justifyContent: 'center', marginTop: spacing.sm, minHeight: touchTarget }, secondaryText: { color: palette.primary, fontSize: 15, fontWeight: '700' }, disclosure: { marginTop: spacing.lg } });
