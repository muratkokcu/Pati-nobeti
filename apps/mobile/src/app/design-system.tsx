import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { EventLine } from '@/components/event-line';
import { PersonBadge, PersonBadgeStack } from '@/components/person-badge';
import { StatusChip } from '@/components/status-chip';
import { TaskCard } from '@/components/task-card';
import { BodyText, ClockLeadText, ClockText, DisplayText, MetaText, TitleText } from '@/components/typography';
import { AppThemeProvider, useAppTheme, type SchemeName } from '@/design/theme';
import { layout, radius, shadow, spacing, typography, type StatusKey } from '@/design/tokens';
import type { CareEvent, TaskOccurrence } from '@/domain/types';

/**
 * Tasarım sistemi galerisi — T-1/T-2 teslimlerinin görsel kanıtı.
 * Ürün akışının parçası değildir; sekmelerden erişilmez, `/design-system` ile açılır.
 */

const PEOPLE = ['Deniz', 'Murat', 'Zeynep', 'Kerem', 'Nuray', 'Elif', 'Barış', 'Ayşe Gül'];
const STATUSES: StatusKey[] = ['upcoming', 'due', 'overdue', 'done', 'skipped', 'uncertain', 'conflict'];

const event = (id: string, over: Partial<CareEvent> = {}): CareEvent => ({
  id, occurrenceId: 'o1', outcome: 'done', actorId: 'uye-1', actorName: 'Deniz',
  recordedAt: '2026-09-19T05:12:00.000Z', syncState: 'synced', ...over,
});

const nowTask: TaskOccurrence = {
  id: 'o1', planId: 'p1', petId: 'luna', title: 'Sabah bakımı',
  instruction: 'Mama ve sabah ilacı', scheduledAt: '2026-09-19T05:00:00.000Z',
  events: [event('e1'), event('e2', { actorId: 'uye-4', actorName: 'Murat', outcome: 'done', recordedAt: '2026-09-19T05:41:00.000Z' })],
};
const nextTasks: TaskOccurrence[] = [
  { id: 'o2', planId: 'p2', petId: 'luna', title: 'Öğlen yürüyüşü', instruction: '', scheduledAt: '2026-09-19T10:00:00.000Z', events: [event('e3', { actorId: 'uye-7', actorName: 'Zeynep', outcome: 'skipped' })] },
  { id: 'o3', planId: 'p3', petId: 'luna', title: 'Akşam bakımı', instruction: '', scheduledAt: '2026-09-19T17:00:00.000Z', events: [] },
  { id: 'o4', planId: 'p4', petId: 'luna', title: 'Gece ilacı', instruction: '', scheduledAt: '2026-09-19T20:30:00.000Z', events: [] },
];

function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  const theme = useAppTheme();
  return (
    <View style={[styles.section, { borderTopColor: theme.line }]}>
      <TitleText>{title}</TitleText>
      {note ? <MetaText style={styles.note}>{note}</MetaText> : null}
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function Swatch({ color, name, onColor }: { color: string; name: string; onColor: string }) {
  return (
    <View style={[styles.swatch, { backgroundColor: color }]}>
      <Text style={[styles.swatchName, { color: onColor }]}>{name}</Text>
      <Text style={[styles.swatchHex, { color: onColor }]}>{color}</Text>
    </View>
  );
}

function Gallery({ heading }: { heading: string }) {
  const theme = useAppTheme();
  return (
    <View style={[styles.panel, { backgroundColor: theme.canvas }]}>
      <DisplayText>{heading}</DisplayText>
      <MetaText>Bugünün nöbeti · 19 Eylül Cumartesi</MetaText>

      <Section note="Gövde 400, başlık 600. Boy farkı hiyerarşiyi taşır; kalınlık değil." title="Tipografi">
        <DisplayText>Bugünün nöbeti</DisplayText>
        <TitleText>Sabah bakımı</TitleText>
        <BodyText>Deniz sabah ilacını verdi ve kaydı ekledi.</BodyText>
        <MetaText>19 Eylül Cumartesi · Europe/Istanbul</MetaText>
        <View style={styles.inline}><ClockLeadText>08:00</ClockLeadText><ClockText>08:12</ClockText><ClockText>20:00</ClockText><ClockText>11:59</ClockText></View>
      </Section>

      <Section note="Tuval → kart → vurgulu kart → çukur. Gölge yok; kademe ve 1 px sınır." title="Yüzey kademeleri">
        <View style={styles.swatchRow}>
          <Swatch color={theme.canvas} name="canvas" onColor={theme.ink} />
          <Swatch color={theme.surface} name="surface" onColor={theme.ink} />
          <Swatch color={theme.raised} name="raised" onColor={theme.ink} />
          <Swatch color={theme.sunken} name="sunken" onColor={theme.ink} />
        </View>
      </Section>

      <Section note="Üye id’sinden deterministik atanır. Renk kalksa da baş harf ve isim kalır." title="Kişi renkleri">
        <View style={styles.people}>{PEOPLE.map((name, index) => <PersonBadge colorIndex={index} key={name} name={name} size="md" />)}</View>
        <MetaText style={styles.note}>Renksiz prova (gri ton):</MetaText>
        <View style={styles.people}>{PEOPLE.slice(0, 4).map((name, index) => <PersonBadge colorIndex={index} key={name} monochrome name={name} size="md" />)}</View>
        <MetaText style={styles.note}>Çakışmada iki avatar yan yana:</MetaText>
        <PersonBadgeStack people={[{ colorIndex: 0, name: 'Deniz' }, { colorIndex: 3, name: 'Murat' }]} size="md" />
      </Section>

      <Section note="İkon + Türkçe etiket + renk. Gecikme amber ve nötr; kırmızı yalnız çakışma ve hata için." title="Durum dili">
        <View style={styles.people}>{STATUSES.map((status) => <StatusChip key={status} status={status} />)}</View>
        <View style={styles.people}>{STATUSES.map((status) => <StatusChip key={status} size="sm" status={status} />)}</View>
      </Section>

      <Section note="SAAT → KİŞİ → FİİL. Ayırıcı noktanın kendisi kişinin rengidir." title="Kayıt satırı">
        <EventLine colorIndex={0} event={event('g1')} />
        <EventLine colorIndex={3} event={event('g2', { actorName: 'Murat', outcome: 'skipped', recordedAt: '2026-09-19T17:04:00.000Z' })} />
        <EventLine colorIndex={6} event={event('g3', { actorName: 'Zeynep', outcome: 'uncertain', recordedAt: '2026-09-19T20:39:00.000Z' })} />
        <EventLine colorIndex={1} event={event('g4', { actorName: 'Ayşe Gül', kind: 'resolution', recordedAt: '2026-09-19T21:02:00.000Z' })} />
        <EventLine colorIndex={0} event={event('g5')} monochrome />
      </Section>

      <Section note="Yeni yön: canlı renk bloğu, marka içinde. Metin fotoğrafın üstüne değil katı panelin içine gelir." title="Hero ve renk blokları">
        <View style={[styles.hero, { backgroundColor: theme.heroPrimary }]}>
          <Text style={[styles.heroTitle, { color: theme.onHeroPrimary }]}>Luna bugün</Text>
          <Text style={[styles.heroBody, { color: theme.onHeroPrimaryMuted }]}>İki bakım planlandı, biri kaydedildi.</Text>
        </View>
        <View style={[styles.hero, { backgroundColor: theme.heroBrass }]}>
          <Text style={[styles.heroTitle, { color: theme.onHeroBrass }]}>İkinci kişi her planda ücretsiz</Text>
          <Text style={[styles.heroBody, { color: theme.onHeroBrassMuted }]}>Ücretsiz sınır hayvan sayısındadır.</Text>
        </View>
        <View style={[styles.hero, { backgroundColor: theme.photoPanel }]}>
          <Text style={[styles.heroTitle, { color: theme.onPhotoPanel }]}>Fotoğraf paneli</Text>
          <Text style={[styles.heroBody, { color: theme.onPhotoPanelMuted }]}>Fotoğrafın üstündeki metin bu katı panelin içinde durur.</Text>
        </View>
        <View style={[styles.nav, { backgroundColor: theme.navSurface, borderColor: theme.navBorder }, shadow.floating]}>
          <Text style={[styles.navItem, { color: theme.accent }]}>Bugün</Text>
          <Text style={[styles.navItem, { color: theme.muted }]}>Planlar</Text>
          <Text style={[styles.navItem, { color: theme.muted }]}>Geçmiş</Text>
          <Text style={[styles.navItem, { color: theme.muted }]}>Hane</Text>
        </View>
      </Section>

      <Section note="“Şimdi” büyük ve tek; kalan bakımlar sıkışık satır." title="Görev kartı">
        <TaskCard occurrence={nowTask} onPress={() => undefined} variant="now" />
        <View style={styles.nextList}>{nextTasks.map((task) => <TaskCard key={task.id} occurrence={task} onPress={() => undefined} variant="next" />)}</View>
      </Section>
    </View>
  );
}

function Panel({ scheme, heading }: { scheme: SchemeName; heading: string }) {
  return <AppThemeProvider scheme={scheme}><Gallery heading={heading} /></AppThemeProvider>;
}

export default function DesignSystemScreen() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Panel heading="Açık tema" scheme="light" />
      <Panel heading="Koyu tema" scheme="dark" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { paddingBottom: layout.scrollClearance },
  panel: { gap: spacing.xs, paddingHorizontal: layout.gutter, paddingVertical: spacing.xl },
  section: { borderTopWidth: layout.hairline, gap: spacing.xxs, marginTop: layout.sectionGap, paddingTop: layout.sectionGap },
  sectionBody: { gap: layout.rowGap, marginTop: spacing.md },
  note: { marginTop: spacing.xxs },
  inline: { alignItems: 'baseline', flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  people: { alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  swatchRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  swatch: { borderRadius: radius.sm, flexGrow: 1, gap: spacing.xxs, minWidth: 92, padding: layout.cardPaddingTight },
  swatchName: typography.label,
  swatchHex: typography.meta,
  nextList: { gap: layout.listGap, marginTop: spacing.sm },
  hero: { borderRadius: radius.xl, gap: spacing.xs, justifyContent: 'flex-end', minHeight: layout.heroMinHeight, padding: layout.cardPaddingLoose },
  heroTitle: typography.display,
  heroBody: typography.body,
  nav: { alignItems: 'center', borderRadius: radius.pill, borderWidth: layout.hairline, flexDirection: 'row', height: layout.navHeight, justifyContent: 'space-around', marginTop: spacing.md, paddingHorizontal: spacing.md },
  navItem: typography.label,
});
