#!/usr/bin/env python3
# Kullanim: python3 kontrast.py <hex_on> <hex_zemin>  |  argumansiz: token denetimi
import math, sys, re, itertools, pathlib

def rgb(h):
    h = h.lstrip('#'); return tuple(int(h[i:i+2], 16) / 255 for i in (0, 2, 4))
def hexs(t): return '#%02X%02X%02X' % tuple(max(0, min(255, round(c * 255))) for c in t)
def lin(c): return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
def delin(c): return c * 12.92 if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055
def lum(h):
    r, g, b = map(lin, rgb(h)); return 0.2126 * r + 0.7152 * g + 0.0722 * b
def ratio(a, b):                       # WCAG 2.2 kontrast orani
    la, lb = lum(a), lum(b); hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)

# --- renk korlugu simulasyonu (Brettel/Vienot tipi LMS matrisleri) ---
M1 = [[0.31399022, 0.63951294, 0.04649755], [0.15537241, 0.75789446, 0.08670142],
      [0.01775239, 0.10944209, 0.87256922]]
M2 = [[5.47221206, -4.6419601, 0.16963708], [-1.1252419, 2.29317094, -0.1678952],
      [0.02980165, -0.19318073, 1.16364789]]
SIM = {'protanopi':   [[0, 1.05118294, -0.05116099], [0, 1, 0], [0, 0, 1]],
       'doteranopi':  [[1, 0, 0], [0.9513092, 0, 0.04866992], [0, 0, 1]],
       'tritanopi':   [[1, 0, 0], [0, 1, 0], [-0.86744736, 1.86727089, 0]]}
def mul(M, v): return [sum(M[i][j] * v[j] for j in range(3)) for i in range(3)]
def simulate(h, k):
    o = mul(M2, mul(SIM[k], mul(M1, [lin(c) for c in rgb(h)])))
    return hexs(tuple(delin(max(0.0, min(1.0, c))) for c in o))

# --- CIEDE2000 (renk farki) ---
def rgb2lab(h):
    r, g, b = [lin(c) for c in rgb(h)]
    X = 0.4124*r + 0.3576*g + 0.1805*b; Y = 0.2126*r + 0.7152*g + 0.0722*b
    Z = 0.0193*r + 0.1192*g + 0.9505*b
    f = lambda t: t ** (1/3) if t > 0.008856 else 7.787 * t + 16/116
    fx, fy, fz = f(X/0.95047), f(Y), f(Z/1.08883)
    return (116*fy - 16, 500*(fx - fy), 200*(fy - fz))
def de2000(c1, c2):
    L1, a1, b1 = rgb2lab(c1); L2, a2, b2 = rgb2lab(c2)
    C1, C2 = math.hypot(a1, b1), math.hypot(a2, b2); Cb = (C1 + C2) / 2
    G = 0.5 * (1 - math.sqrt(Cb**7 / (Cb**7 + 25**7))) if Cb > 0 else 0.5
    a1p, a2p = (1+G)*a1, (1+G)*a2
    C1p, C2p = math.hypot(a1p, b1), math.hypot(a2p, b2)
    h1p = math.degrees(math.atan2(b1, a1p)) % 360; h2p = math.degrees(math.atan2(b2, a2p)) % 360
    dLp, dCp = L2 - L1, C2p - C1p
    if C1p * C2p == 0: dhp = 0
    elif abs(h2p - h1p) <= 180: dhp = h2p - h1p
    elif h2p - h1p > 180: dhp = h2p - h1p - 360
    else: dhp = h2p - h1p + 360
    dHp = 2 * math.sqrt(C1p * C2p) * math.sin(math.radians(dhp) / 2)
    Lbp, Cbp = (L1 + L2) / 2, (C1p + C2p) / 2
    if C1p * C2p == 0: hbp = h1p + h2p
    elif abs(h1p - h2p) <= 180: hbp = (h1p + h2p) / 2
    elif h1p + h2p < 360: hbp = (h1p + h2p + 360) / 2
    else: hbp = (h1p + h2p - 360) / 2
    T = (1 - 0.17*math.cos(math.radians(hbp-30)) + 0.24*math.cos(math.radians(2*hbp))
         + 0.32*math.cos(math.radians(3*hbp+6)) - 0.20*math.cos(math.radians(4*hbp-63)))
    Rc = 2*math.sqrt(Cbp**7/(Cbp**7+25**7)) if Cbp > 0 else 0
    Sl = 1 + (0.015*(Lbp-50)**2)/math.sqrt(20+(Lbp-50)**2)
    Sc, Sh = 1 + 0.045*Cbp, 1 + 0.015*Cbp*T
    Rt = -math.sin(math.radians(2 * 30*math.exp(-(((hbp-275)/25)**2)))) * Rc
    return math.sqrt((dLp/Sl)**2 + (dCp/Sc)**2 + (dHp/Sh)**2 + Rt*(dCp/Sc)*(dHp/Sh))

def ayrisma(a, b):
    """Normal gorus + uc renk korlugunun EN KOTUSUNDEKI renk farki. Esik: 20."""
    d = de2000(a, b)
    for k in SIM: d = min(d, de2000(simulate(a, k), simulate(b, k)))
    return d

def gri(h):
    g = round(lum(h) ** (1/2.2) * 255); return '#%02X%02X%02X' % (g, g, g)



# ---------------------------------------------------------------- token denetimi
TOKENS = pathlib.Path(__file__).resolve().parent.parent / 'src' / 'design' / 'tokens.ts'

def parse_schemes(text):
    out = {}
    for name in ('light', 'dark'):
        blok = re.search(r'\n  %s: \{(.*?)\n  \},\n' % name, text, re.S)
        if not blok:
            raise SystemExit('tokens.ts icinde %s semasi bulunamadi' % name)
        body = blok.group(1)
        durum_blok = re.search(r'status: \{(.*?)\n    \},', body, re.S)
        durum = {}
        for k, blob in re.findall(r"(\w+): \{ (fg: '#.*?) \},", durum_blok.group(1)):
            durum[k] = dict(re.findall(r"(\w+): '(#[0-9A-Fa-f]{6})'", blob))
        kisi_blok = re.search(r'personSet\(\[(.*?)\], \'(#[0-9A-Fa-f]{6})\'\)', body, re.S)
        kisi = re.findall(r'#[0-9A-Fa-f]{6}', kisi_blok.group(1))
        on = kisi_blok.group(2)
        duz_kaynak = body[:durum_blok.start()] + body[durum_blok.end():]
        duz_kaynak = re.sub(r'personSet\(.*?\)', '', duz_kaynak, flags=re.S)
        flat = dict(re.findall(r"(\w+): '(#[0-9A-Fa-f]{6})'", duz_kaynak))
        out[name] = dict(flat=flat, durum=durum, kisi=kisi, kisi_on=on)
    return out

SONUC = {'gecti': 0, 'kaldi': 0}

def olc(etiket, on, zemin, esik):
    r = ratio(on, zemin)
    ok = r >= esik - 0.005
    SONUC['gecti' if ok else 'kaldi'] += 1
    print('%s %-46s %s / %s  %5.2f  (esik %.1f)' % ('ok  ' if ok else 'KALIR', etiket, on, zemin, r, esik))

def denetle():
    text = TOKENS.read_text(encoding='utf-8')
    semalar = parse_schemes(text)
    for ad, s in semalar.items():
        f, d = s['flat'], s['durum']
        yuzeyler = [f[k] for k in ('canvas', 'surface', 'raised', 'sunken')]
        print('\n===== %s sema =====' % ad.upper())
        for k in ('canvas', 'surface', 'raised', 'sunken'):
            olc('K-01 ink / %s' % k, f['ink'], f[k], 7.0)
            olc('K-02 muted / %s' % k, f['muted'], f[k], 5.5)
            olc('K-01 accent / %s' % k, f['accent'], f[k], 7.0)
            olc('K-03 line / %s' % k, f['line'], f[k], 3.0)
            olc('K-03 lineStrong / %s' % k, f['lineStrong'], f[k], 3.0)
        olc('K-01 onPrimary / primary', f['onPrimary'], f['primary'], 7.0)
        olc('K-01 onPrimary / primaryPressed', f['onPrimary'], f['primaryPressed'], 7.0)
        olc('K-35 primary / primaryPressed (>=1.20)', f['primary'], f['primaryPressed'], 1.20)
        olc('K-35 surface / surfacePressed (>=1.20)', f['surface'], f['surfacePressed'], 1.20)
        olc('K-01 ink / surfacePressed', f['ink'], f['surfacePressed'], 7.0)
        olc('K-01 onPrimarySoft / primarySoft', f['onPrimarySoft'], f['primarySoft'], 7.0)
        olc('K-03 primaryBorder / surface', f['primaryBorder'], f['surface'], 3.0)
        olc('K-01 onHeroPrimary / heroPrimary', f['onHeroPrimary'], f['heroPrimary'], 7.0)
        olc('K-02 onHeroPrimaryMuted / heroPrimary', f['onHeroPrimaryMuted'], f['heroPrimary'], 5.5)
        olc('K-01 onHeroBrass / heroBrass', f['onHeroBrass'], f['heroBrass'], 7.0)
        olc('K-02 onHeroBrassMuted / heroBrass', f['onHeroBrassMuted'], f['heroBrass'], 5.5)
        olc('K-11 onPhotoPanel / photoPanel', f['onPhotoPanel'], f['photoPanel'], 7.0)
        olc('K-63 onPhotoPanel / photoPanel (<=15)', f['photoPanel'], f['onPhotoPanel'], 7.0)
        olc('K-02 onPhotoPanelMuted / photoPanel', f['onPhotoPanelMuted'], f['photoPanel'], 5.5)
        olc('K-03 navBorder / navSurface', f['navBorder'], f['navSurface'], 3.0)
        olc('K-03 navBorder / canvas', f['navBorder'], f['canvas'], 3.0)
        olc('K-01 ink / navSurface', f['ink'], f['navSurface'], 7.0)
        olc('K-02 muted / navSurface', f['muted'], f['navSurface'], 5.5)
        for k, v in d.items():
            olc('K-01 durum %s: metin / cip' % k, v['fg'], v['bg'], 7.0)
            for y in ('canvas', 'surface', 'raised'):
                olc('K-03 durum %s: kenar / %s' % (k, y), v['border'], f[y], 3.0)
                olc('K-03 durum %s: nokta / %s' % (k, y), v['accent'], f[y], 3.0)
        for i, c in enumerate(s['kisi']):
            # K-05 (21 Eyl 2026): esik 7.0 -> 4.5. Bas harf kimligin yedek isareti; isim her zaman
            # yaninda yazili (K-27), bu yuzden AA buyuk-metin esigi yeterli. Canli kisi renkleri
            # 7.0 esiginde mumkun degildi; renk urunun talebi, isim ise okunurlugun garantisi.
            olc('K-05 kisi %d bas harfi' % (i + 1), s['kisi_on'], c, 4.5)
            for y in ('canvas', 'surface', 'raised', 'sunken'):
                olc('K-04 kisi %d dolgu / %s' % (i + 1, y), c, f[y], 3.0)
    print('\n--- K-28 kisi renkleri ayrismasi (normal + 3 renk korlugu, iki sema birlikte) ---')
    L, D = semalar['light']['kisi'], semalar['dark']['kisi']
    n = len(L)
    en_kotu = lambda i, j: min(ayrisma(L[i], L[j]), ayrisma(D[i], D[j]))
    for k in range(2, n + 1):
        m = min(en_kotu(i, j) for i in range(k) for j in range(i + 1, k))
        isaret = 'ok  ' if m >= 20 else 'not '
        print('%s ilk %d renk: en kotu dE2000 %5.1f  (K-28 esik 20)' % (isaret, k, m))
    print('     K-27: 5 rengin ustunde renk korlugunde guvenilir ayrisma yok; kimlik')
    print('     avatar + bas harf + isim ile tasinir, renk dorduncu isarettir.')
    print('\n--- K-30 durum renkleri gri tonda ---')
    for ad, s in semalar.items():
        d = s['durum']
        anahtarlar = [k for k in d if k not in ('upcoming', 'due')]
        for i in range(len(anahtarlar)):
            for j in range(i + 1, len(anahtarlar)):
                a, b = anahtarlar[i], anahtarlar[j]
                fark = de2000(gri(d[a]['accent']), gri(d[b]['accent']))
                if fark < 5:
                    print('     %-5s %s / %s gri tonda ayrilmiyor (dE %.1f) -> ikon + etiket zorunlu' % (ad, a, b, fark))
    print('\nSONUC: %d gecti, %d kaldi' % (SONUC['gecti'], SONUC['kaldi']))
    return 1 if SONUC['kaldi'] else 0

if __name__ == '__main__':
    if len(sys.argv) == 3:
        print('%.2f' % ratio(sys.argv[1], sys.argv[2]))
    else:
        sys.exit(denetle())
