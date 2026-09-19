---
name: PatiNöbeti
description: Hayvanın fotoğrafıyla açılan, kaydı kimin ne zaman girdiğini renk değil dil taşıyan ortak bakım arayüzü.
colors:
  canvas: "#F1EDE2"
  surface: "#FBF8EF"
  surface-pressed: "#E8E3D6"
  raised: "#FFFDF8"
  sunken: "#E9E4D7"
  ink: "#1F2723"
  muted: "#505C56"
  line: "#888271"
  line-strong: "#746D5A"
  white: "#FFFFFF"
  primary: "#205241"
  primary-pressed: "#194133"
  primary-soft: "#CFE1D6"
  on-primary: "#FFFFFF"
  on-primary-soft: "#174E3B"
  hero-primary: "#1B4A39"
  on-hero-primary: "#FFFFFF"
  on-hero-primary-muted: "#BFDDCB"
  hero-brass: "#E9B44C"
  on-hero-brass: "#462800"
  on-hero-brass-muted: "#573900"
  photo-panel: "#252A20"
  on-photo-panel: "#F3F1E9"
  on-photo-panel-muted: "#CFD6CC"
  scrim: "rgba(18, 21, 17, 0.58)"
  nav-surface: "#FFFDF8"
  nav-border: "#888271"
  status-upcoming-fg: "#3C4842"
  status-upcoming-bg: "#E1DED2"
  status-upcoming-border: "#868273"
  status-upcoming-accent: "#6D7973"
  status-due-fg: "#174E3B"
  status-due-bg: "#CFE1D6"
  status-due-border: "#6A8979"
  status-due-accent: "#2E6B54"
  status-overdue-fg: "#643F00"
  status-overdue-bg: "#F2DFB6"
  status-overdue-border: "#987F46"
  status-overdue-accent: "#B5741E"
  status-done-fg: "#174E3B"
  status-done-bg: "#CFE1D6"
  status-done-border: "#6A8979"
  status-done-accent: "#2E6B54"
  status-skipped-fg: "#3C4842"
  status-skipped-bg: "#E1DED2"
  status-skipped-border: "#868273"
  status-skipped-accent: "#6D7973"
  status-uncertain-fg: "#3C4470"
  status-uncertain-bg: "#DCDFEE"
  status-uncertain-border: "#7C819A"
  status-uncertain-accent: "#5B6394"
  status-conflict-fg: "#7F271A"
  status-conflict-bg: "#F2D9D1"
  status-conflict-border: "#9F7A6E"
  status-conflict-accent: "#A43C2E"
  person-kehribar: "#85491B"
  person-gok: "#1B5A93"
  person-sis: "#625462"
  person-yosun: "#475E49"
  person-erguvan: "#764878"
  person-cam: "#2F6338"
  person-kul: "#695357"
  person-kiremit: "#953C38"
typography:
  display:
    fontFamily: "system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1.231
    letterSpacing: "-0.4px"
  title:
    fontFamily: "system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: 1.316
    letterSpacing: "normal"
  body:
    fontFamily: "system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.438
  bodyStrong:
    fontFamily: "system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.438
  meta:
    fontFamily: "system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.462
  metaStrong:
    fontFamily: "system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.462
  label:
    fontFamily: "system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.417
    letterSpacing: "0.1px"
  clock:
    fontFamily: "system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.429
    letterSpacing: "0.2px"
    fontFeature: "tabular-nums"
  clockLead:
    fontFamily: "system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.2px"
    fontFeature: "tabular-nums"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "28px"
  pill: "999px"
spacing:
  xxs: "2px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.bodyStrong}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "44px"
  button-primary-pressed:
    backgroundColor: "{colors.primary-pressed}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    typography: "{typography.bodyStrong}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "44px"
  card-now:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "18px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "14px"
  row-next:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "8px 10px"
    height: "44px"
  hero-panel:
    backgroundColor: "{colors.photo-panel}"
    textColor: "{colors.on-photo-panel}"
    rounded: "{rounded.xl}"
    padding: "14px"
  chip-status-done:
    backgroundColor: "{colors.status-done-bg}"
    textColor: "{colors.status-done-fg}"
    typography: "{typography.metaStrong}"
    rounded: "{rounded.sm}"
    padding: "5px 8px"
  chip-status-conflict:
    backgroundColor: "{colors.status-conflict-bg}"
    textColor: "{colors.status-conflict-fg}"
    typography: "{typography.metaStrong}"
    rounded: "{rounded.sm}"
    padding: "5px 8px"
  chip-filter:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.metaStrong}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "36px"
  chip-filter-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    typography: "{typography.metaStrong}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "36px"
  nav-pill:
    backgroundColor: "{colors.nav-surface}"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "78px"
---

# Design System: PatiNöbeti

## Overview

**Creative North Star: “Kayıt Defteri ve Hayvanın Kendisi”**

PatiNöbeti'nin görsel dünyası iki malzemeden kurulur: hayvanın gerçek fotoğrafı ve sıcak kâğıt üzerine düşmüş bir kayıt defteri. Ekran hayvanla açılır — fotoğraf kenardan kenara, ekranın üst üçte birinde (320 dp) — ve hemen ardından kâğıt yüzey fotoğrafın üstüne 28 px yuvarlatılmış köşeyle biner. Bu bindirme sistemin imzasıdır: fotoğraf duyguyu, kâğıt yüzey işi taşır, ikisi arasında kesik değil geçiş vardır.

Defter tarafı bilerek düşük kontrastlı ve yoğundur. Ağırlık kontrastı dardır (400 ↔ 600; sistemde 700 yoktur), hiyerarşi ölçek ve boşlukla kurulur, saatler tabular rakamla alt alta hizalanır. Kart dolgusu 14 px'e kadar sıkıştırılmıştır çünkü ekranda kaç bakımın kaydedildiği tek bakışta görünmelidir. Renk bir vurgu aracı değil, iki ayrı taşıyıcıdır: **kimlik** (sekiz kişi rengi) ve **durum** (yedi durumun fg/bg/border/accent üçlüsü) — ve her ikisi de renksiz okunacak şekilde ayrıca yazıyla adlandırılır.

Bu dünyaya ait olmayanlar, uygulanmış üründe de reddedilmiş hâlde: oyuncakçı estetiği, klinik soğukluk, jenerik pembe/mavi pet dili, eşit ağırlıklı kart listesi, iki özdeş birincil buton, fotoğrafın üstünde yüzen metin, kartlara serpiştirilmiş gölge.

**Key Characteristics:**
- Fotoğraf taşıyıcıdır, dekor değil; metin fotoğrafın üstüne değil koyu panele girer.
- Dar ağırlık kontrastı (400/600), tabular saat, negatif harf aralığı yalnız ≥20 dp'de.
- Renk hiçbir zaman tek taşıyıcı değil: durum = ikon + Türkçe etiket + renk.
- Tek gölge, yalnız yüzen pill navigasyonda; her yerde ton + 1 px çizgi.
- Erişilebilirlik eşikleri renk kararlarından önce gelir, sonra değil.
- Tek ikon ailesi: Ionicons.

## Colors

Sıcak nötr kâğıt zemin üzerinde koyu botanik yeşil eylem rengi; durum ve kimlik palet olarak ayrılmış, ikisi birbirine karışmayacak biçimde ayrı rol taşır.

### Primary
- **Nöbet Yeşili** (`primary`): birincil eylem dolgusu, aktif filtre çipi, aktif sekme, yükleme göstergesi. Basılı hâli opaklıkla değil daha koyu dolguyla verilir (`primary-pressed`).
- **Hero Yeşili** (`hero-primary`): tam genişlik hero bloğunun zemini; fotoğraf yüklenmeden ve fotoğraf yokken görünen malzeme.
- **Yumuşak Yeşil** (`primary-soft`) + **Koyu Yeşil Metin** (`on-primary-soft`): demo banner'ı, davet kartı, bilgilendirici panel.

### Secondary
- **Pirinç** (`hero-brass`) + koyu metin karşılıkları (`on-hero-brass`, `on-hero-brass-muted`): renk bloğu ve Plus vurgusu. Pirinç metin rengi olarak kullanılmaz; metin gerektiğinde `status-overdue-fg` kullanılır.

### Tertiary — durum dili
Yedi durum, dördü ayrı rol taşıyan birer renk üçlüsüdür: `fg` metin ve ikon, `bg` çip zemini, `border` çipin 1 px kenarı, `accent` ray düğümü ve nokta.
- **Yaklaşıyor / Atlandı** (`status-upcoming-*`, `status-skipped-*`): nötr kâğıt grisi; olayın kendisi nötr.
- **Şimdi / Yapıldı** (`status-due-*`, `status-done-*`): yumuşak yeşil; plan saatinin gelişi ve kaydın düşüşü aynı ailedir.
- **Geçti** (`status-overdue-*`): amber. Gecikme kırmızı değildir — kırmızı yalnız çakışmaya ayrılmıştır.
- **Emin değilim** (`status-uncertain-*`): menekşe.
- **İki farklı kayıt var** (`status-conflict-*`): tuğla. Sistemin tek kırmızısı budur.

### Neutral
- **Kâğıt Tuval** (`canvas`): ekran zemini ve fotoğrafın üstüne binen yüzey.
- **Yüzey / Kabarık / Çökük** (`surface`, `raised`, `sunken`): sırasıyla normal kart, öne çıkan ŞİMDİ kartı, basılı/çökük satır. Dört kademe (`canvas` → `surface` → `raised`, aşağıya `sunken`) derinliğin tamamını taşır.
- **Mürekkep / Sessiz** (`ink`, `muted`): başlık ve gövde; ikincil açıklama, tarih, pasif sekme.
- **Çizgi / Güçlü Çizgi** (`line`, `line-strong`): 1 px kart sınırı; ŞİMDİ kartı ve navigasyon gibi öne çıkması gereken kenar.
- **Fotoğraf Paneli** (`photo-panel`, `on-photo-panel`, `on-photo-panel-muted`) ve **Perde** (`scrim`): fotoğraf üstü okunabilirliğin tek çözümü. Perde dekoratiftir, üstünde metin durmaz.

### Kimlik paleti
Sekiz kişi rengi (`person-kehribar` … `person-kiremit`) yalnız kimlik taşır; hiçbir zaman durum anlatmaz. Sıra sabittir ve `assignPersonColors` ile hane listesi sırasına göre dağıtılır — ilk iki slot iki şema ve dört görüş simülasyonunun en kötüsünde ΔE2000 42,4 ile en uzak çifttir, çünkü ürünün ana vakası iki bakım verendir. Karma tabanlı atama kullanılmaz.

### Named Rules
**The Eşik Önce Rule.** Her renk `B2C/docs/tasarim-kiyaslama/06-erisilebilirlik-kabul-listesi.md` eşikleriyle ölçülerek seçildi: karar metni ≥7,0 (K-01), ikincil metin ≥5,5 (K-02), taşıyıcı çizgi ve nokta ≥3,0 (K-03), kişi dolgusu ≥3,0 (K-04), baş harf ≥7,0 (K-05). Yeni bir renk `apps/mobile/scripts/kontrast.py` ile ölçülmeden sisteme girmez. Eşik renge uydurulmaz; renk eşiğe uydurulur.

**The Renk Tek Başına Konuşmaz Rule.** Gri tonda durum renkleri birbirinden ayrılmıyor (yapıldı ↔ çakışma ΔE 0,4). Bu yüzden her durum ikon + Türkçe etiket + renk üçlüsüyle gösterilir; ikon ve etiket kaldırılamaz. Aynı biçimde kimlik rengi her zaman baş harf ve isimle birlikte gelir.

**The Kırmızı Yalnız Çakışma Rule.** Tuğla (`status-conflict-*`) yalnız “aynı bakım için iki farklı kayıt var” ve hata için ayrılmıştır. Gecikmiş bakım amberdir; geciken bir bakım bir hata değildir.

## Typography

**Display / Body / Label Font:** platformun sistem sans-serif'i (iOS ve Android kendi yerel karakterini korur). Ayrı bir display veya mono aile yoktur.

**Character:** Tek aile, dar ağırlık aralığı, yüksek satır yüksekliği. Karakter tipografiden değil ritimden ve boşluktan gelir; metin sakin ve gündelik okunur.

### Hierarchy
- **Display** (600, 26/32, −0,4): ekran başlığı ve hero'daki hayvan adı. Sistemin en büyük tipi budur.
- **Title** (600, 19/25): ŞİMDİ kartı başlığı, gün grubu başlığı, boş durum başlığı.
- **Body / Body Strong** (400 ve 600, 16/23): kayıt cümlesi, açıklama; güçlü hâli kişi adı, satır başlığı ve buton etiketi.
- **Meta / Meta Strong** (400 ve 600, 13/19): tarih, eşitleme notu, sayaç, ikincil açıklama.
- **Label** (600, 12/17, +0,1): durum çipi (küçük), sekme etiketi, davet durumu.
- **Clock / Clock Lead** (600, 14/20 ve 20/24, tabular): saat ve sayı sütunları. ŞİMDİ kartının saati Clock Lead'dir.

### Named Rules
**The 600 Tavanı Rule.** Sistemde 700 yoktur (K-13). Hiyerarşi ölçek ve boşlukla kurulur; bir şeyi öne çıkarmak için ağırlık artırılmaz, boyut veya yüzey kademesi değiştirilir.

**The Tabular Saat Rule.** Saat, tarih ve sayı sütunları `fontVariant: ['tabular-nums']` taşır (K-21), çünkü alt alta karşılaştırılıyorlar. Saati gövde tipiyle yazma.

**The Ölçekle Büyü Rule.** `allowFontScaling={false}` yasaktır (K-19). Sabit çaplı daireler (avatar, ray düğümü) `scaled()` ile yazı ölçeğine bağlıdır; baş harf kırpılmaz, kart uzar. 20 dp altında negatif harf aralığı kullanılmaz (K-15).

## Layout

Ritim `2, 4, 8, 12, 16, 24, 32`; buna ek olarak yoğunluk ölçüleri ayrı adlandırılır: bölüm arası 20, blok arası 12, satır arası 8, liste arası 6. Kart dolgusu üç kademedir — sıkışık 10, normal 14, geniş 18. Kenar boşluğu (gutter) 16'dır; içerik ortalanır ve 680 px ile sınırlanır, gövde metni 560 px ölçüsünü geçmez (K-17, ~70 karakter).

Ekran gövdesi tek sütundur ve kaydırma sonunda 148 px boşluk bırakır — yüzen navigasyon içeriği kesmesin diye. Tüm ekranlar üst safe-area uygular; yüzen navigasyon alt inset'e `+8` ile oturur.

**Tam genişlik hero deseni (imza).** Hero 320 dp yüksektir ve gutter'ı negatif marjla kırar. Fotoğraf `cover` ve `50% / 30%` konumlanır. Metin fotoğrafın üstünde yüzmez: ad, gün özeti ve bakım veren rozetleri `photo-panel` koyu paneline girer (24 px köşe, 14 px dolgu), panel hero'nun alt kenarından 44 px yukarıda durur. Hemen altında kâğıt yüzey 28 px üst köşelerle hero'nun üstüne −28 px biner.

**Ortak Hat deseni.** Zaman soldan okunur: 52 px ray, 12 px ray boşluğu, 2 px hat, 14 px düğüm ve 3 px düğüm kenarı. Düğüm rengi durumun `accent`'idir; satır metni aynı durumu ayrıca söyler.

**Dokunma hedefi.** Satır ve buton minimumu iOS 44 pt / Android 48 dp; alan yüksekliği 52.

## Elevation & Depth

Sistem tonaldır. Derinlik dört yüzey kademesiyle kurulur — `sunken` → `canvas` → `surface` → `raised` — ve 1 px `line` / `line-strong` sınırıyla tanımlanır. Bir şeyi önemli göstermek için gölge değil, bir kademe yukarı yüzey ve daha güçlü çizgi kullanılır (ŞİMDİ kartı: `raised` + `line-strong`; sıradaki satır: `surface` + `line`).

Sistemin **tek** gölgesi vardır ve içeriğin gerçekten üstünde yüzen tek öğeye, alt pill navigasyona aittir.

### Shadow Vocabulary
- **floating** (`0 6px 18px rgba(31,39,35,0.16)`, Android `elevation: 8`): yalnız yüzen pill navigasyon. Koyu şemada gölge görünmediği için ayrımı `nav-border` taşır (K-64).

### Named Rules
**The Tek Gölge Rule.** Gölge yalnız yüzen navigasyondadır. Kartta, çipte, panelde, modalda gölge yoktur; ikinci bir gölge tokenı eklemek sistemi bozar.

**The Basılı Hâl Dolgudur Rule.** Basılı durum opaklıkla değil dolguyu koyultarak gösterilir (K-35): `primary-pressed`, `surface-pressed`, `sunken`. Opaklık yalnız devre dışı öğeye aittir (0,65) ve devre dışı öğe bile ≥3,0 kontrast ve nedenini söyleyen görünür bir metin taşır (K-10).

## Shapes

Köşe sistemi yumuşak, ölçek büyüdükçe köşe büyür: 8 px durum çipi ve küçük blok, 12 px buton ve sıradaki satır, 16 px kart, 24 px hero paneli, 28 px fotoğrafın üstüne binen yüzey, tam yuvarlak (pill) navigasyon, filtre çipi ve avatar. Kart sınırı 1 px; süs amaçlı kalın kontur yoktur.

Silüetler ayrışır (K-25): durum ikonları yalnız renkle değil geometriyle ayrılır — boş halka, dolu iç halka, saat, çatallanan çizgi. Avatar tam daire, üst üste binen rozet yığını 2 px zemin renginde halka taşır.

## Components

### Buttons
- **Shape:** yumuşak dikdörtgen (12 px), en az 44 pt / 48 dp yükseklik.
- **Primary:** `primary` dolgu, `on-primary` 16/600 etiket, 16 px yatay dolgu, ikonlu hâlde ok ikonu sağda 8 px boşlukla. Basılı: `primary-pressed`.
- **Secondary:** zeminsiz, 1 px `primary` kenar, `primary` 16/600 etiket, aynı yükseklik.
- **Text action:** yalnız metin, minimum dokunma yüksekliğini korur. Yıkıcı metin eylemi `status-conflict-fg`.
- **Kaydetme:** etiket “Kaydediliyor…” olur. Düğme etiketleri hitapsızdır (“Durum kaydet”, “Kayıtları aç”), gövde metni saygılı “siz” kullanır.

### Chips
- **Durum çipi:** durum `bg` zemin, `border` 1 px kenar, `fg` ikon + etiket, 8 px köşe. `md` 5/8 dolgu + 14 px ikon + Meta Strong; `sm` 3/6 dolgu + 12 px ikon + Label. Çip asla ikonsuz veya etiketsiz gösterilmez.
- **Filtre çipi:** pill, 36 px yükseklik, 12 px yatay dolgu. Pasif `surface` + `line`; aktif `primary` dolgu + beyaz etiket; basılı `surface-pressed`. Seçim `accessibilityState.selected` ile ayrıca duyurulur.

### Cards / Containers
- **ŞİMDİ kartı:** `raised` zemin, `line-strong` 1 px, 16 px köşe, 18 px dolgu. Başlıkta Clock Lead saat solda, durum çipi sağda; altında başlık, talimat, son üç kayıt satırı, eşitleme notu ve tek birincil eylem. Ekranda yalnız bir tane bulunur.
- **Sıradaki satırı:** `surface` zemin, `line` 1 px, 12 px köşe, 10/8 dolgu, 44 dp minimum yükseklik. Saat solda 42 px sütunda, başlık ve son kayıt ortada, durum çipi veya chevron sağda. ŞİMDİ kartıyla aynı ağırlıkta gösterilmez.
- **Gün kartı (Geçmiş):** tek kart, satırlar arasında 1 px `line` üst ayırıcı; her satır ayrı kart değildir.
- **Panel:** başarı/bilgilendirme `primary-soft`, hata `status-conflict-bg`, netleştirme `status-uncertain-bg`.

### Inputs / Fields
- 52 px alan yüksekliği, 12 px köşe, `raised` zemin ve 1 px `line` kenar. Davet kodu alanı tabular rakam ve +0,6 harf aralığı kullanır. Alan etiketi placeholder'ın yerine geçmez; yükleme, geçersiz bilgi ve eksik yapılandırma metinle açıklanır.

### Navigation
- Dört bölüm: Bugün, Planlar, Geçmiş, Hane. Yüzen pill: `nav-surface` zemin, 1 px `nav-border`, tam yuvarlak, 78 dp yükseklik (yazı ölçeğiyle 1,35×'e kadar büyür), ekran kenarından 16 px içeride, alt inset + 8 px yukarıda, `shadow.floating`.
- Aktif sekme `primary` ve dolu Ionicon; pasif `muted` ve outline Ionicon. Etiket Label tipidir ve her zaman görünür.

### Person Badge (imza bileşeni)
Kimlik taşıyıcısı: renkli daire + baş harf + isim. Çap 24/32/40 ve yazı ölçeğiyle büyür. Baş harf Türkçe büyütmeyle üretilir (i → İ), en çok iki harf. `monochrome` provası rengi kaldırır ve kimliğin baş harf + isimle hâlâ okunduğunu doğrular. Yığın hâlinde rozetler çapın 1/3'ü kadar üst üste biner ve zemin renginde 2 px halka taşır.

### Event Line (imza bileşeni)
Kalıcı imza satırı: **SAAT → KİŞİ → FİİL**, tek satırda — “08:12 · Deniz “yapıldı” kaydetti”. Saat tabular, ayırıcı nokta kişinin rengidir, sonuç sözcüğü durumun `fg` rengiyle ve 600 ağırlıkla tırnak içinde yazılır. Renk kaybolduğunda cümle aynı şekilde okunur.

### Week Track (imza bileşeni)
Son yedi gün, seri sayacı değil günlerin kendisi: yedi 14 px daire ve altında gün harfi. Tümü kaydedildi = `status-done-accent` dolu; kısmen = `status-overdue-accent` dolu; hiç yok = boş + `status-overdue-border` kenar; bugün = 2 px `ink` kenar. Başlıkta “Son 7 gün” ve “n / m bakım kaydedildi” ayrıca yazılır.

## Do's and Don'ts

### Do:
- **Do** her durumu ikon + Türkçe etiket + renk üçlüsüyle göster; renk kaldırıldığında ekran hâlâ okunmalı.
- **Do** yeni renkleri `apps/mobile/scripts/kontrast.py` ile K-01…K-05 eşiklerine karşı ölç ve sonucu kabul listesine yaz.
- **Do** kişi rengini `assignPersonColors` sonucundan geçir; sıra hane listesinin sırasıdır, ilk iki bakım veren en çok ayrışan çifti alır.
- **Do** derinliği yüzey kademesi (`canvas` → `surface` → `raised`) ve 1 px çizgiyle kur.
- **Do** hayvan fotoğrafını hero'nun taşıyıcısı yap; metni koyu panele koy, fotoğrafın üstünde yüzdürme.
- **Do** gövde metninde saygılı “siz” kullan; düğme etiketlerini hitapsız bırak.
- **Do** her rasterın kaynağını ve lisansını `assets/images/pets/KAYNAK.md` biçiminde kaydet; kaynağı yazılmamış görsel uygulamaya girmez.
- **Do** basılı hâli dolguyu koyultarak ver (`primary-pressed`, `surface-pressed`).

### Don't:
- **Don't** karta, çipe veya panele gölge ekleme; `shadow.floating` yalnız yüzen navigasyona aittir.
- **Don't** 700 ağırlık veya sistemde olmayan bir tip boyutu kullanma; hiyerarşiyi ölçek ve boşlukla kur.
- **Don't** gecikmeyi kırmızıyla anlatma; kırmızı yalnız “iki farklı kayıt var” ve hata içindir.
- **Don't** kişi rengini durum anlatmak, durum rengini kimlik anlatmak için kullanma.
- **Don't** basılı durumu opaklıkla gösterme; opaklık yalnız devre dışı (0,65) içindir.
- **Don't** metni fotoğrafın üstüne doğrudan koyma; `photo-panel` dışında fotoğraf üstü metin yoktur, `scrim` dekoratiftir.
- **Don't** Ionicons dışında ikon ailesi karıştırma.
- **Don't** ekranda tek seferlik renk, boşluk, radius veya tip boyutu yaz; önce `apps/mobile/src/design/tokens.ts` güncellenir, `DESIGN.md` aynı değişiklikte yenilenir.
- **Don't** `allowFontScaling={false}` yazma; metin büyüdüğünde kart uzar.
- **Don't** demo verisini canlı hane durumu, tıbbi kanıt, gönderilmiş davet veya alınmış ödeme gibi sunma.

## Bilinen eksikler (sistemin henüz karşılamadığı yerler)

Bunlar kural değil, açık borçtur; “var” sayılmamalıdır.

- **Koyu şema bağlı değil.** `schemes.dark` tam bir token seti taşır ve K-61/K-65 ile ölçüldü, ama `AppThemeProvider` `useColorScheme()`e bağlı değildir ve varsayılan `'light'`tir. Ayrıca `screen.tsx`, `(tabs)/index.tsx`, `(tabs)/history.tsx`, `(tabs)/_layout.tsx`, `paywall.tsx`, `invite/new.tsx` hâlâ düz `palette` (= açık şema) kullanır. Bugün koyu tema açılırsa arayüz yarı koyu çıkar. Koyu tema desteklenmiş sayılmaz.
- **Dynamic Type gerçek cihazda test edilmedi.** `scaled()` ve `allowFontScaling` kuralları koda girdi, ancak iOS/Android'de büyük yazı ölçeğiyle doğrulanmadı. Ölçek davranışı iddia değil, hedeftir.
- **Hareket sistemi yok.** Sistemde süre, easing veya geçiş tokenı yoktur. Tek hareket hero fotoğrafının 220 ms açılış geçişidir ve bu bir token değil, tek seferlik bir değerdir. Hareket eklenirse önce tokenlaştırılmalı ve reduced-motion davranışı tanımlanmalıdır.
