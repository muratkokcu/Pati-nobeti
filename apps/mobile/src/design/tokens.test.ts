import { assignPersonColors, layout, opacity, personColorAt, personColorFor, personColorIndex, schemes, typography, type Scheme } from './tokens';

/**
 * T-6 kabul listesinin (`B2C/docs/tasarim-kiyaslama/06-erisilebilirlik-kabul-listesi.md`)
 * ölçülebilir maddelerini burada kilitliyoruz. Renk körlüğü ayrışması (ΔE2000) ve tam
 * token denetimi `apps/mobile/scripts/kontrast.py` ile çalıştırılır.
 */
const channel = (value: number) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((index) => channel(parseInt(hex.slice(index, index + 2), 16) / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: string, b: string) => {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
};

const DECISION = 7.0; // K-01
const SECONDARY = 5.5; // K-02
const CARRIER = 3.0; // K-03
const cases: [string, Scheme][] = [['açık', schemes.light], ['koyu', schemes.dark]];
const surfaces = ['canvas', 'surface', 'raised', 'sunken'] as const;

describe('tipografi ölçeği', () => {
  it('K-13: gövde normal, başlık yarı kalın, hiçbir rol 700 değil', () => {
    expect(typography.body.fontWeight).toBe('400');
    expect(typography.display.fontWeight).toBe('600');
    for (const style of Object.values(typography)) expect(Number(style.fontWeight)).toBeLessThanOrEqual(600);
  });

  it('K-12: hiçbir rol 12 dp altına inmez; gövde 16, meta 13 kalır', () => {
    for (const style of Object.values(typography)) expect(style.fontSize).toBeGreaterThanOrEqual(12);
    expect(typography.body.fontSize).toBe(16);
    expect(typography.meta.fontSize).toBe(13);
    expect(typography.label.fontSize).toBeGreaterThanOrEqual(12);
  });

  it('K-16: gövde ve meta satır yüksekliği ≥ 1,40×, başlık ≥ 1,20×', () => {
    for (const role of ['body', 'bodyStrong', 'meta', 'metaStrong', 'label'] as const) {
      expect(typography[role].lineHeight / typography[role].fontSize).toBeGreaterThanOrEqual(1.4);
    }
    for (const role of ['display', 'title', 'clockLead'] as const) {
      expect(typography[role].lineHeight / typography[role].fontSize).toBeGreaterThanOrEqual(1.2);
    }
  });

  it('K-15: 20 dp altında negatif harf aralığı yok, negatif tracking en fazla −0,4', () => {
    for (const style of Object.values(typography)) {
      const tracking = (style as { letterSpacing?: number }).letterSpacing ?? 0;
      if (style.fontSize < 20) expect(tracking).toBeGreaterThanOrEqual(0);
      expect(tracking).toBeGreaterThanOrEqual(-0.4);
      expect(tracking).toBeLessThanOrEqual(0.2);
    }
  });

  it('telefonda okunur bir display: 34 px yerine 28 px altı', () => {
    expect(typography.display.fontSize).toBeLessThan(28);
  });

  it('K-21: saat rolleri tabular rakam kullanır', () => {
    expect(typography.clock.fontVariant).toContain('tabular-nums');
    expect(typography.clockLead.fontVariant).toContain('tabular-nums');
  });
});

describe('ölçü tokenları', () => {
  it('K-31: satır ve buton yüksekliği platform dokunma hedefinin altına inmez', () => {
    expect(layout.rowMinHeight).toBeGreaterThanOrEqual(44);
  });

  it('K-17: gövde metni için ayrı ve dar bir ölçü var', () => {
    expect(layout.measure).toBeLessThanOrEqual(560);
    expect(layout.measure).toBeLessThan(layout.maxContentWidth);
  });

  it('K-35: basılı durum için opaklık tokenı yok', () => {
    expect(Object.keys(opacity)).toEqual(['disabled']);
  });
});

describe.each(cases)('%s şema kontrastı', (_name, scheme) => {
  it.each(surfaces)('K-01/K-02: metin renkleri %s üzerinde eşiği geçer', (surface) => {
    expect(contrast(scheme.ink, scheme[surface])).toBeGreaterThanOrEqual(DECISION);
    expect(contrast(scheme.accent, scheme[surface])).toBeGreaterThanOrEqual(DECISION);
    expect(contrast(scheme.muted, scheme[surface])).toBeGreaterThanOrEqual(SECONDARY);
  });

  it.each(surfaces)('K-03: taşıyıcı çizgiler %s üzerinde 3:1 geçer', (surface) => {
    expect(contrast(scheme.line, scheme[surface])).toBeGreaterThanOrEqual(CARRIER);
    expect(contrast(scheme.lineStrong, scheme[surface])).toBeGreaterThanOrEqual(CARRIER);
  });

  it('K-35: basılı dolgu koyulaşır ve etiket eşiğin altına düşmez', () => {
    expect(contrast(scheme.primary, scheme.primaryPressed)).toBeGreaterThanOrEqual(1.2);
    expect(contrast(scheme.onPrimary, scheme.primaryPressed)).toBeGreaterThanOrEqual(DECISION);
    expect(contrast(scheme.surface, scheme.surfacePressed)).toBeGreaterThanOrEqual(1.2);
    expect(contrast(scheme.ink, scheme.surfacePressed)).toBeGreaterThanOrEqual(DECISION);
  });

  it('K-01/K-03: her durum çipi metinde 7:1, kenarında 3:1 taşır', () => {
    for (const colors of Object.values(scheme.status)) {
      expect(contrast(colors.fg, colors.bg)).toBeGreaterThanOrEqual(DECISION);
      for (const surface of ['canvas', 'surface', 'raised'] as const) {
        expect(contrast(colors.border, scheme[surface])).toBeGreaterThanOrEqual(CARRIER);
        expect(contrast(colors.accent, scheme[surface])).toBeGreaterThanOrEqual(CARRIER);
      }
    }
  });

  it('K-01/K-11: hero blokları ve fotoğraf paneli eşiği geçer', () => {
    expect(contrast(scheme.onHeroPrimary, scheme.heroPrimary)).toBeGreaterThanOrEqual(DECISION);
    expect(contrast(scheme.onHeroPrimaryMuted, scheme.heroPrimary)).toBeGreaterThanOrEqual(SECONDARY);
    expect(contrast(scheme.onHeroBrass, scheme.heroBrass)).toBeGreaterThanOrEqual(DECISION);
    expect(contrast(scheme.onHeroBrassMuted, scheme.heroBrass)).toBeGreaterThanOrEqual(SECONDARY);
    // K-63: fotoğraf panelinde gövde metni 7–15 aralığında kalır, halolama yapmaz.
    expect(contrast(scheme.onPhotoPanel, scheme.photoPanel)).toBeGreaterThanOrEqual(DECISION);
    expect(contrast(scheme.onPhotoPanel, scheme.photoPanel)).toBeLessThanOrEqual(15);
    expect(contrast(scheme.onPhotoPanelMuted, scheme.photoPanel)).toBeGreaterThanOrEqual(SECONDARY);
  });

  it('K-03: yüzen navigasyon kenarı her zemine karşı taşır', () => {
    expect(contrast(scheme.navBorder, scheme.navSurface)).toBeGreaterThanOrEqual(CARRIER);
    expect(contrast(scheme.navBorder, scheme.canvas)).toBeGreaterThanOrEqual(CARRIER);
    expect(contrast(scheme.ink, scheme.navSurface)).toBeGreaterThanOrEqual(DECISION);
  });

  it('K-04/K-05: kişi dolgusu 3:1, baş harfi 7:1', () => {
    expect(scheme.person).toHaveLength(8);
    for (const person of scheme.person) {
      expect(contrast(person.fill, person.onFill)).toBeGreaterThanOrEqual(DECISION);
      for (const surface of surfaces) expect(contrast(person.fill, scheme[surface])).toBeGreaterThanOrEqual(CARRIER);
    }
  });
});

describe('K-65: koyu şema kişi renkleri ayrıca türetilir', () => {
  it('aynı slot iki şemada farklı hex taşır', () => {
    schemes.light.person.forEach((person, index) => {
      expect(person.fill).not.toBe(schemes.dark.person[index].fill);
      expect(person.key).toBe(schemes.dark.person[index].key);
    });
  });
});

describe('K-29: kişi rengi ataması', () => {
  it('hane sırasına göre atar; ilk iki bakım veren en çok ayrışan iki rengi alır', () => {
    const assignment = assignPersonColors(['sahip', 'bakici']);
    expect(assignment).toEqual({ sahip: 0, bakici: 1 });
    expect(schemes.light.person[0].key).toBe('kehribar');
    expect(schemes.light.person[1].key).toBe('gok');
  });

  it('sekiz kişiye kadar renk çakışmaz', () => {
    const ids = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    expect(new Set(Object.values(assignPersonColors(ids))).size).toBe(ids.length);
  });

  it('aynı üye listesi her zaman aynı atamayı verir', () => {
    const ids = ['deniz', 'murat', 'zeynep'];
    expect(assignPersonColors(ids)).toEqual(assignPersonColors(ids));
  });

  it('tekrar eden id ikinci bir slot harcamaz', () => {
    expect(assignPersonColors(['a', 'a', 'b'])).toEqual({ a: 0, b: 1 });
  });

  it('yedek karma deterministiktir ve palet sınırları içinde kalır', () => {
    expect(personColorIndex('member-deniz')).toBe(personColorIndex('member-deniz'));
    expect(personColorFor(schemes.light, 'member-deniz')).toBe(personColorAt(schemes.light, personColorIndex('member-deniz')));
    for (let i = 0; i < 200; i += 1) expect(personColorIndex(`uye-${i}`)).toBeLessThan(8);
  });
});
