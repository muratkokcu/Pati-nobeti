import { PixelRatio, Platform, type TextStyle } from 'react-native';

/**
 * PatiNöbeti tasarım tokenları — tek kaynak.
 *
 * Bütün renkler `B2C/docs/tasarim-kiyaslama/06-erisilebilirlik-kabul-listesi.md` eşikleriyle
 * ölçülerek seçildi: karar metni ≥ 7,0 (K-01), ikincil metin ≥ 5,5 (K-02), taşıyıcı çizgi ve
 * nokta ≥ 3,0 (K-03), kişi dolgusu ≥ 3,0 (K-04), baş harf ≥ 7,0 (K-05). Aynı eşikler koyu
 * şemada da geçerlidir (K-61). Ölçüm betiği: `apps/mobile/scripts/kontrast.py`.
 * Kararların gerekçesi: `B2C/docs/tasarim-kiyaslama/05-tasarim-sistemi.md`.
 *
 * Ekranlarda tek seferlik renk/boy/dolgu yazma; her değer buradan gelir.
 */

// ---------------------------------------------------------------- tipografi
// K-13: hiyerarşi ölçek ve boşlukla kurulur. Gövde 400, başlık 600; hiçbir rol 700 değil.
// K-16: gövde/meta satır yüksekliği ≥ 1,40×, başlık ≥ 1,20×.
// K-15: 20 dp altında negatif harf aralığı yok.
export const typography = {
  display: { fontSize: 26, fontWeight: '600', letterSpacing: -0.4, lineHeight: 32 },
  title: { fontSize: 19, fontWeight: '600', lineHeight: 25 },
  body: { fontSize: 16, fontWeight: '400', lineHeight: 23 },
  bodyStrong: { fontSize: 16, fontWeight: '600', lineHeight: 23 },
  meta: { fontSize: 13, fontWeight: '400', lineHeight: 19 },
  metaStrong: { fontSize: 13, fontWeight: '600', lineHeight: 19 },
  label: { fontSize: 12, fontWeight: '600', letterSpacing: 0.1, lineHeight: 17 },
  // K-21: saat, tarih ve sayı sütunları tabular — alt alta karşılaştırılıyorlar.
  clock: { fontSize: 14, fontVariant: ['tabular-nums'], fontWeight: '600', letterSpacing: 0.2, lineHeight: 20 },
  clockLead: { fontSize: 20, fontVariant: ['tabular-nums'], fontWeight: '600', letterSpacing: -0.2, lineHeight: 24 },
} as const satisfies Record<string, TextStyle>;

// ------------------------------------------------------------ ritim ve ölçü
export const spacing = { xxs: 2, xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;
// xl/xxl yalnızca hero, renk bloğu ve fotoğraf kartları içindir; normal kartlar lg kalır.
export const radius = { sm: 8, md: 12, lg: 16, xl: 24, xxl: 28, pill: 999 } as const;
export const touchTarget = Platform.OS === 'ios' ? 44 : 48;

/** Yoğunluk ritmi: ekrana daha çok bilgi sığsın diye kart dolgusu ve satır aralığı kısaldı. */
export const layout = {
  gutter: spacing.lg,
  sectionGap: 20,
  blockGap: spacing.md,
  rowGap: spacing.sm,
  listGap: 6,
  cardPadding: 14,
  cardPaddingLoose: 18,
  cardPaddingTight: 10,
  railWidth: 52,
  railGap: spacing.md,
  railLine: 2,
  nodeSize: 14,
  nodeBorder: 3,
  dot: 10,
  avatar: { sm: 24, md: 32, lg: 40 },
  icon: { xs: 12, sm: 14, md: 18, lg: 22, xl: 32 },
  hairline: 1,
  rowMinHeight: touchTarget,
  fieldHeight: 52,
  tabBar: { height: 82, paddingBottom: 18, paddingTop: spacing.sm },
  headerOffset: 56,
  /** K-17: gövde metni 70 karakteri geçmesin. */
  measure: 560,
  maxContentWidth: 680,
  scrollClearance: 120,
  /** Hero / renk bloğu ve fotoğraf kartı ölçüleri. */
  heroMinHeight: 168,
  photoRatio: 4 / 3,
  /** Yüzen pill navigasyon: ekran kenarından boşluk ve yükseklik. */
  navInset: spacing.lg,
  navHeight: 64,
} as const;

/**
 * Yüzen pill navigasyonun tek gölgesi. Kartlarda gölge yoktur (DESIGN.md);
 * gölge yalnız içeriğin üstünde yüzen tek öğeye aittir ve koyu modda görünmediği için
 * orada ayrımı `navBorder` taşır (K-64).
 */
export const shadow = {
  floating: { elevation: 8, shadowColor: '#1F2723', shadowOffset: { height: 6, width: 0 }, shadowOpacity: 0.16, shadowRadius: 18 },
} as const;

/**
 * K-10: devre dışı öğe soluklaştırılsa da ≥3,0 kontrast taşır (ölçüldü: yazı/dolgu 3,69,
 * dolgu/zemin 3,33) ve nedenini söyleyen görünür bir metin bulunur.
 * K-35 gereği basılı durum için opaklık yoktur; `primaryPressed` / `surfacePressed` kullanılır.
 */
export const opacity = { disabled: 0.65 } as const;

/**
 * K-19 gereği `allowFontScaling={false}` yasak. Sabit boyutlu daireler (avatar, düğüm)
 * yazı ölçeğiyle birlikte büyür ki baş harf kırpılmasın.
 */
export function scaled(size: number, max = 2) {
  return Math.round(size * Math.min(PixelRatio.getFontScale(), max));
}

// ----------------------------------------------------------------- renkler
/** K-24 sabit sözlüğündeki yedi durum. */
export type StatusKey = 'upcoming' | 'due' | 'overdue' | 'done' | 'skipped' | 'uncertain' | 'conflict';
/** fg: metin/ikon (≥7,0) · bg: çip zemini · border: çipin 1 px kenarı (≥3,0) · accent: ray düğümü, nokta (≥3,0) */
export type StatusColors = { accent: string; bg: string; border: string; fg: string };
/** Kimlik rengi. `fill` dolu daire, `onFill` baş harf (≥7,0). */
export type PersonColor = { fill: string; key: string; label: string; onFill: string };

export type Scheme = {
  accent: string;
  /** Hero / renk bloğu: koyu yeşil ve pirinç zeminler, üzerlerine gelen metin renkleriyle. */
  heroPrimary: string;
  onHeroPrimary: string;
  onHeroPrimaryMuted: string;
  heroBrass: string;
  onHeroBrass: string;
  onHeroBrassMuted: string;
  /** Fotoğraf üstü okunabilirlik: metin asla fotoğrafın üstüne değil, bu katı panelin içine gelir (K-11). */
  photoPanel: string;
  onPhotoPanel: string;
  onPhotoPanelMuted: string;
  /** Fotoğrafı koyultan dekoratif perde; üstünde metin durmaz. */
  scrim: string;
  /** Yüzen pill navigasyon. */
  navSurface: string;
  navBorder: string;
  canvas: string;
  ink: string;
  line: string;
  lineStrong: string;
  muted: string;
  onPrimary: string;
  onPrimarySoft: string;
  person: readonly PersonColor[];
  primary: string;
  primaryBorder: string;
  /** K-35: basılı durum opaklıkla değil dolguyu koyultarak gösterilir. */
  primaryPressed: string;
  primarySoft: string;
  raised: string;
  status: Record<StatusKey, StatusColors>;
  sunken: string;
  surface: string;
  surfacePressed: string;
  white: string;
};

/**
 * K-29: atama sırası rastgele değil. Sıra, iki şemanın ve dört görüş simülasyonunun
 * en kötüsündeki ΔE2000 ayrışmasına göre sabittir; ilk iki renk ΔE 42,4 ile en uzak çifttir.
 * Ürünün ana vakası iki bakım verendir, bu yüzden en iyi ayrışma ilk iki slotta durur.
 */
const PERSON_KEYS = ['kehribar', 'gok', 'sis', 'yosun', 'erguvan', 'cam', 'kul', 'kiremit'] as const;
const PERSON_LABELS = ['Kehribar', 'Gök', 'Sis', 'Yosun', 'Erguvan', 'Çam', 'Kül', 'Kiremit'] as const;
const personSet = (fills: readonly string[], onFill: string): readonly PersonColor[] =>
  PERSON_KEYS.map((key, index) => ({ fill: fills[index], key, label: PERSON_LABELS[index], onFill }));

export const schemes: Record<'light' | 'dark', Scheme> = {
  light: {
    canvas: '#F1EDE2', surface: '#FBF8EF', surfacePressed: '#E8E3D6', raised: '#FFFDF8', sunken: '#E9E4D7',
    ink: '#1F2723', muted: '#505C56', line: '#888271', lineStrong: '#746D5A', white: '#FFFFFF',
    primary: '#205241', primaryPressed: '#194133', primaryBorder: '#205241',
    onPrimary: '#FFFFFF', primarySoft: '#CFE1D6', onPrimarySoft: '#174E3B', accent: '#205241',
    heroPrimary: '#1B4A39', onHeroPrimary: '#FFFFFF', onHeroPrimaryMuted: '#BFDDCB',
    heroBrass: '#E9B44C', onHeroBrass: '#462800', onHeroBrassMuted: '#573900',
    photoPanel: '#252A20', onPhotoPanel: '#F3F1E9', onPhotoPanelMuted: '#CFD6CC',
    scrim: 'rgba(18, 21, 17, 0.58)',
    navSurface: '#FFFDF8', navBorder: '#888271',
    status: {
      upcoming: { fg: '#3C4842', bg: '#E1DED2', border: '#868273', accent: '#6D7973' },
      due: { fg: '#174E3B', bg: '#CFE1D6', border: '#6A8979', accent: '#2E6B54' },
      overdue: { fg: '#643F00', bg: '#F2DFB6', border: '#987F46', accent: '#B5741E' },
      done: { fg: '#174E3B', bg: '#CFE1D6', border: '#6A8979', accent: '#2E6B54' },
      skipped: { fg: '#3C4842', bg: '#E1DED2', border: '#868273', accent: '#6D7973' },
      uncertain: { fg: '#3C4470', bg: '#DCDFEE', border: '#7C819A', accent: '#5B6394' },
      conflict: { fg: '#7F271A', bg: '#F2D9D1', border: '#9F7A6E', accent: '#A43C2E' },
    },
    person: personSet(['#85491B', '#1B5A93', '#625462', '#475E49', '#764878', '#2F6338', '#695357', '#953C38'], '#FFFFFF'),
  },
  dark: {
    canvas: '#141715', surface: '#1C201D', surfacePressed: '#2A2F2B', raised: '#272C28', sunken: '#0B0D0C',
    ink: '#ECE8DD', muted: '#9BA69E', line: '#6D766F', lineStrong: '#818C84', white: '#FFFFFF',
    primary: '#186045', primaryPressed: '#12472F', primaryBorder: '#6FBF96',
    onPrimary: '#F2FBF6', primarySoft: '#1B3A2D', onPrimarySoft: '#87D3AB', accent: '#7CC8A0',
    heroPrimary: '#17402F', onHeroPrimary: '#F2FBF6', onHeroPrimaryMuted: '#BFDDCB',
    heroBrass: '#E9B44C', onHeroBrass: '#462800', onHeroBrassMuted: '#573900',
    photoPanel: '#252A20', onPhotoPanel: '#F3F1E9', onPhotoPanelMuted: '#CFD6CC',
    scrim: 'rgba(8, 10, 8, 0.62)',
    navSurface: '#272C28', navBorder: '#6D766F',
    status: {
      upcoming: { fg: '#AEB8B1', bg: '#262B27', border: '#6C766F', accent: '#8C9891' },
      due: { fg: '#87D3AB', bg: '#1B3A2D', border: '#4E7D67', accent: '#6FBF96' },
      overdue: { fg: '#E8B367', bg: '#3A2D16', border: '#87704C', accent: '#D9A14F' },
      done: { fg: '#87D3AB', bg: '#1B3A2D', border: '#4E7D67', accent: '#6FBF96' },
      skipped: { fg: '#AEB8B1', bg: '#262B27', border: '#6C766F', accent: '#8C9891' },
      uncertain: { fg: '#ADB4E2', bg: '#262A3E', border: '#6C7295', accent: '#9AA2D4' },
      conflict: { fg: '#F39F8E', bg: '#3C231C', border: '#95695D', accent: '#E8907E' },
    },
    // K-65: aynı kişi koyu modda aynı renk ailesinde kalır, aynı hex olmaz.
    person: personSet(['#D58F5D', '#6CA1EC', '#A99BA9', '#8DA58E', '#C18EC2', '#76AC7B', '#B2999E', '#E7837B'], '#10130F'),
  },
};

const mapStatus = (field: keyof StatusColors): Record<StatusKey, string> =>
  Object.fromEntries(Object.entries(schemes.light.status).map(([key, value]) => [key, value[field]])) as Record<StatusKey, string>;

/**
 * Geriye dönük düz palet (= açık şema). Yeni bileşenler `useAppTheme()` kullanır;
 * henüz taşınmamış ekranlar bu düz haritayı kullanmaya devam eder.
 */
export const palette = {
  canvas: schemes.light.canvas,
  surface: schemes.light.surface,
  surfacePressed: schemes.light.surfacePressed,
  raised: schemes.light.raised,
  sunken: schemes.light.sunken,
  ink: schemes.light.ink,
  muted: schemes.light.muted,
  line: schemes.light.line,
  lineStrong: schemes.light.lineStrong,
  white: schemes.light.white,
  primary: schemes.light.primary,
  primaryPressed: schemes.light.primaryPressed,
  primarySoft: schemes.light.primarySoft,
  onPrimarySoft: schemes.light.onPrimarySoft,
  // K-08: amber metin olarak kullanılmaz; `brassInk` amberin koyu metin karşılığıdır.
  brass: schemes.light.status.overdue.accent,
  brassSoft: schemes.light.status.overdue.bg,
  brassInk: schemes.light.status.overdue.fg,
  // Tuğla yalnızca çakışma ve hata içindir; gecikme kırmızı değildir (karar 6).
  overdue: schemes.light.status.conflict.fg,
  overdueSoft: schemes.light.status.conflict.bg,
  uncertain: schemes.light.status.uncertain.fg,
  uncertainSoft: schemes.light.status.uncertain.bg,
  neutralSoft: schemes.light.status.skipped.bg,
  neutralInk: schemes.light.status.skipped.fg,
  statusAccent: mapStatus('accent'),
  statusSoft: mapStatus('bg'),
  statusInk: mapStatus('fg'),
} as const;

// ------------------------------------------------------- kişi rengi ataması
const PERSON_COUNT = PERSON_KEYS.length;

/**
 * Hane üyelerine renk atar. Sıra hane listesinin kendi sırasıdır (sahip önce, sonra katılım
 * sırası), böylece ilk iki bakım veren her zaman en çok ayrışan iki rengi alır (K-29).
 * Karma tabanlı seçim kullanılmaz: karma iki bakım verene ΔE 2,3 olan bir çift verebiliyordu.
 */
export function assignPersonColors(memberIds: readonly string[]): Record<string, number> {
  const assignment: Record<string, number> = {};
  let slot = 0;
  for (const id of memberIds) {
    if (id in assignment) continue;
    assignment[id] = slot % PERSON_COUNT;
    slot += 1;
  }
  return assignment;
}

/**
 * Hane listesi elde yokken (tek bir kaydı bağlamsız göstermek gibi) kullanılan yedek.
 * Ayrışma garantisi vermez; mümkün olan her yerde `assignPersonColors` sonucu geçilmelidir.
 */
export function personColorIndex(memberId: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < memberId.length; i += 1) {
    hash ^= memberId.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash % PERSON_COUNT;
}

export function personColorAt(scheme: Scheme, index: number): PersonColor {
  return scheme.person[((index % PERSON_COUNT) + PERSON_COUNT) % PERSON_COUNT];
}

export function personColorFor(scheme: Scheme, memberId: string): PersonColor {
  return personColorAt(scheme, personColorIndex(memberId));
}
