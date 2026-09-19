# Erişilebilirlik ve dil kabul listesi (T-6)

Tarih: 19 Eylül 2026 · Sahip: `erisilebilirlik-dil` · Kaynak görev: `04-sentez-ve-aksiyon.md` T-6
Bağlı kararlar: 2 (durum asla tek renkle anlatılmaz), 6 (kaçırma amber ve nötr), 7 (seri yok),
13 (gece birincil bağlam), 14 (ciddiyet zamanlamada, sıcaklık tipografide).

**Bu belge bir kapıdır.** T-1 (token sistemi), T-2 (bileşen seti), T-3 (Bugün ekranı) ve
T-4 (kim yaptı görselleştirmesi) bu listedeki maddeleri geçmeden birleşmez. Görsel yenilemenin
amacı arayüzü ayırt edilebilir kılmaktır; **bedeli Nuray'ın uygulamayı okuyamaması olamaz.**

## Ölçüt kullanıcı

63 yaşında, emekli öğretmen, gözlüksüz okumaya çalışıyor, WhatsApp dışında uygulama kullanmıyor,
yanlış bir şeye basıp bozmaktan korkuyor (`kullanici-testi/raporlar/p03-nuray.md`).
Kendi cümlesi, ki bu listenin çıkış noktasıdır:

> "Yazı boyutu benim için yeterli, hatta iyi. (…) Açık krem zemin üstündeki gri açıklama yazıları
> soluk kalıyor, zorlanıyorum. 'İKİNCİ BAKIM VEREN SONRASI' gibi küçük, turuncu, hepsi büyük harf
> yazılar benim için en zoru. Büyük harf yazıyı yaşlı göz daha zor söker."

Buradan çıkan iki yön:
1. **Punto ve dokunma hedefleri bugün iyi (B-48). Yenileme bunları küçültemez** — yoğunluk artışı
   punto düşürerek yapılamaz.
2. **WCAG AA bu kullanıcı için yetmiyor.** Aşağıda ölçüldü: şikâyet ettiği gri metin AA'yı
   4,58 ile geçiyor (eşik 4,5). Yani AA'yı geçmek "Nuray okuyabiliyor" demek değil. Bu yüzden
   proje eşiği AA'nın üstünde tutulur.

## Kanıt işaretleri

| İşaret | Anlamı |
|---|---|
| **[Ö]** | Ölçüldü — betikle hesaplandı veya ekran görüntüsünden piksel örneklendi; sayı belgede. |
| **[D]** | Doğrulandı — kullanıcı testinde bir kişi birebir söyledi, bulgu numarası var. |
| **[Ç]** | Çıkarım — standart/literatür yorumu, bu projede ölçülmedi. Tartışmaya açık. |

Ölçüm yöntemi ve betik: bu belgenin sonundaki **Ek A**. Kontrast WCAG 2.2 bağıl parlaklık
formülüyle, renk ayrışması CIEDE2000 ile, renk körlüğü Brettel/Viénot tipi LMS simülasyonuyla
hesaplandı. Hiçbir oran gözle tahmin edilmedi.

---

# 1. Kontrast eşikleri

## 1.1 Eşik tablosu (kural)

Metnin **ne iş yaptığına** göre eşik belirlenir, puntosuna göre değil.

| # | Rol | Ne kapsar | Eşik | Gerekçe |
|---|---|---|---|---|
| **K-01** | **Karar metni** | Gövde metni, kayıt cümlesi (`SAAT → FİİL → KİŞİ`), durum çipi yazısı, saat, çakışma uyarısı, paylaşım durumu, buton yazısı, avatar baş harfi | **≥ 7,0** | Kullanıcının "verdim mi?" sorusunu cevaplayan her metin. WCAG AAA seviyesi; AAA zaten 20/80 görme keskinliği için tanımlı. [Ö] AA'nın yetmediği ölçüldü. |
| **K-02** | **İkincil metin** | Meta satırı, tarih, sekme etiketi, yardım/açıklama metni, plan tekrar bilgisi | **≥ 5,5** | AA (4,5) ile AAA (7,0) arası. Nuray'ın şikâyet ettiği metin 4,58'di. |
| **K-03** | **Renk dışı taşıyıcı** | Kart kenarlığı, çip kenarı, ray çizgisi, durum noktası, anahtar izi, odak halkası, ikon | **≥ 3,0** | WCAG 1.4.11 (non-text contrast). |
| **K-04** | **Kişi rengi (dolgu)** | Avatar dolgusu, kayıt satırındaki kişi noktası | **≥ 3,0** her iki zemine karşı | Şekil/konum taşıyıcı olduğu için UI bileşeni eşiği. |
| **K-05** | **Kişi rengi (baş harf)** | Dolgu üzerindeki harf | **≥ 7,0** | Kimlik = karar bilgisi. |

**K-06 · Büyük metin muafiyeti kullanılmaz.** WCAG'ın "18,66px kalın veya 24px ise 3,0 yeter"
kuralı bu projede geçersizdir. Başlık da 7,0 ister. [Ç] Gerekçe: yaşa bağlı kontrast duyarlılığı
kaybı punto ile telafi edilmez; Nuray puntoyu yeterli bulup kontrastı bulmadı (B-49).

**K-07 · Opaklık uygulanan renk, birleştirilmiş hâliyle ölçülür.** `opacity: 0.78` ile
soluklaştırılan bir metnin eşiği, zeminle harmanlanmış son rengi üzerinden hesaplanır.
Token'da geçen ham hex değil.

**K-08 · Pirinç/amber ton metin olarak kullanılmaz.** [Ö] `#B97822` krem zeminde 3,23 — nokta ve
ray düğümü olarak geçer (K-03), metin olarak 4,5'i bile tutmaz. Amber yalnız aksan rengidir;
onun metin karşılığı ayrı ve koyu bir token olmalıdır.

**K-09 · Yüzey kademesi tek başına ayrım sayılmaz.** [Ö] Kart yüzeyi ile sayfa zemini arasındaki
oran hem eski hem yeni palette **1,10**. Yani kart kenarı yalnız açıklık farkıyla görünmez;
kenarlık zorunludur ve kenarlık K-03'e (≥ 3,0) tabidir.

**K-10 · Devre dışı öğe** ≥ 3,0 kontrast taşır **ve** neden devre dışı olduğunu söyleyen görünür
bir metin bulunur. Sadece soluklaştırmak yasaktır. [D] Nuray "Bildirim izni verilmedi" ekranında
ne yapacağını bilemedi.

**K-11 · Metin fotoğraf üzerine konmaz.** Hayvan fotoğrafı (karar 12) arka plan olarak
kullanılırsa üstündeki metin katı zeminli bir kutuda durur. Fotoğrafın rengi ölçülemez.

## 1.2 Ölçüm A — ekran görüntülerindeki palet (bugünkü ürün)

Ölçülen dosya: `apps/mobile/src/design/tokens.ts` @ commit `0d2011f`
(blob `e36e0c6`). Ekran görüntüleri `ekranlar/*.png` bu paleti gösteriyor.

**Ekran görüntülerinden piksel örneklendi [Ö]** — `01-bugun.png` üzerinde ölçülen gerçek değerler
token'larla birebir aynı çıktı: eyebrow `#74450F`, meta `#64706A`, Plus kartı zemini `#F3E4CB`,
sayfa zemini `#F5F1E8`. Yani aşağıdaki tablo "kodda ne yazıyor" değil, **ekranda ne göründüğüdür**.

| Kullanım | Ön / Zemin | Oran | Rol | Proje eşiği | Sonuç | WCAG AA |
|---|---|---|---|---|---|---|
| Gövde metni | `#1F2723` / `#F5F1E8` | 13,57 | K-01 | 7,0 | geçer | geçer |
| Gövde metni (kart) | `#1F2723` / `#FFFCF6` | 14,94 | K-01 | 7,0 | geçer | geçer |
| Başlık 34/700 | `#1F2723` / `#F5F1E8` | 13,57 | K-01 | 7,0 | geçer | geçer |
| Alt başlık 21/700 | `#1F2723` / `#F5F1E8` | 13,57 | K-01 | 7,0 | geçer | geçer |
| **Meta gri 13/600** | `#64706A` / `#F5F1E8` | **4,58** | K-02 | 5,5 | **KALIR** | geçer (4,5) |
| **Meta gri (kart)** | `#64706A` / `#FFFCF6` | **5,04** | K-02 | 5,5 | **KALIR** | geçer |
| **Tarih satırı 16/400** | `#64706A` / `#F5F1E8` | **4,58** | K-02 | 5,5 | **KALIR** | geçer |
| **Sekme etiketi 11/700** | `#64706A` / `#FFFCF6` | **5,04** | K-02 | 5,5 | **KALIR** | geçer |
| Birincil buton yazısı | `#FFFFFF` / `#265847` | 8,17 | K-01 | 7,0 | geçer | geçer |
| Çerçeveli buton yazısı | `#265847` / `#F5F1E8` | 7,25 | K-01 | 7,0 | geçer | geçer |
| **Rozet: Yapıldı** | `#265847` / `#DCE8E1` | **6,49** | K-01 | 7,0 | **KALIR** | geçer |
| **Rozet: Atlandı** | `#74450F` / `#F3E4CB` | **6,45** | K-01 | 7,0 | **KALIR** | geçer |
| **Rozet: Emin değilim** | `#555C83` / `#E4E5F0` | **5,17** | K-01 | 7,0 | **KALIR** | geçer |
| **Avatar baş harfi (Luna)** | `#74450F` / `#F3E4CB` | **6,45** | K-05 | 7,0 | **KALIR** | geçer |
| **Hane avatarı (MU/DE)** | `#265847` / `#DCE8E1` | **6,49** | K-05 | 7,0 | **KALIR** | geçer |
| **Çakışma uyarısı 16/600** | `#A43C2E` / `#F5F1E8` | **5,71** | K-01 | 7,0 | **KALIR** | geçer |
| **"Paylaşılamadı" meta** | `#A43C2E` / `#F5F1E8` | **5,71** | K-01 | 7,0 | **KALIR** | geçer |
| "Paylaşılmayı bekliyor" meta | `#74450F` / `#F5F1E8` | 7,16 | K-01 | 7,0 | geçer | geçer |
| "Haneyle paylaşıldı" meta | `#265847` / `#F5F1E8` | 7,25 | K-01 | 7,0 | geçer | geçer |
| Demo şeridi yazısı | `#265847` / `#DCE8E1` | 6,49 | K-02 | 5,5 | geçer | geçer |
| Plus kartı eyebrow | `#74450F` / `#F3E4CB` | 6,45 | K-02 | 5,5 | geçer | geçer |
| Plan meta (yeşil) | `#265847` / `#FFFCF6` | 7,98 | K-02 | 5,5 | geçer | geçer |
| Ray saati 14/700 tabular | `#1F2723` / `#F5F1E8` | 13,57 | K-01 | 7,0 | geçer | geçer |
| Ray düğümü: yeşil | `#265847` / `#F5F1E8` | 7,25 | K-03 | 3,0 | geçer | geçer |
| Ray düğümü: pirinç | `#B97822` / `#F5F1E8` | 3,23 | K-03 | 3,0 | geçer (sınırda) | geçer |
| Ray düğümü: kırmızı | `#A43C2E` / `#F5F1E8` | 5,71 | K-03 | 3,0 | geçer | geçer |
| **Kart kenarlığı** | `#D9D4C9` / `#F5F1E8` | **1,31** | K-03 | 3,0 | **KALIR** | **kalır** |
| **Kart kenarlığı (kart üstü)** | `#D9D4C9` / `#FFFCF6` | **1,44** | K-03 | 3,0 | **KALIR** | **kalır** |
| **Anahtar kapalı izi** | `#D9D4C9` / `#FFFCF6` | **1,44** | K-03 | 3,0 | **KALIR** | **kalır** |
| **Kart / sayfa yüzey farkı** | `#FFFCF6` / `#F5F1E8` | **1,10** | K-09 | 3,0 | **KALIR** | **kalır** |
| Anahtar açık izi | `#B97822` / `#FFFCF6` | 3,55 | K-03 | 3,0 | geçer | geçer |

**Sonuç [Ö]: 33 ölçümün 16'sı proje eşiğini geçemiyor. WCAG AA'ya göre bakılırsa yalnız 4'ü
kalıyor** — ve kalan o 4'ü zaten metin değil, kenarlık ve yüzey ayrımı. Bu fark tam da K-01/K-02
eşiklerinin neden AA'nın üstünde tutulduğunun kanıtıdır.

**Nuray'ın iki şikâyeti hakkında dürüst tespit [Ö]:**

- *"Gri açıklama yazıları soluk"* → doğrulandı, 4,58. AA'yı 0,08 ile geçiyor. **Kontrast sorunu.**
- *"İKİNCİ BAKIM VEREN SONRASI okunmuyor"* → **kontrast sorunu değil**, ölçüldü: 6,45 ile
  eşiği rahat geçiyor. Sorun **BÜYÜK HARF + küçük punto**. Bu satırı koyulaştırmak işe yaramaz;
  **büyük harf yazımının kaldırılması** gerekir (bkz. K-14). Yanlış teşhis yanlış düzeltme üretir.
- *"Turuncu Plus kartı alt şeritte kesiliyor"* → [Ö] `01-bugun.png` üzerinde ölçüldü: kartın
  yalnız **77 dp**'lik kısmı görünüyor ve `Screen` bileşeninde
  `showsVerticalScrollIndicator={false}` olduğu için aşağıda içerik olduğunu gösteren hiçbir
  işaret yok. Bu bir kontrast değil **kaydırma göstergesi** sorunudur (bkz. K-36).

## 1.3 Ölçüm B — hazırlanmakta olan yeni palet (T-1, çalışma ağacı)

`marka-tasarim` ajanı bu belge yazılırken `tokens.ts`'i yeniden yazdı (henüz commit'lenmedi).
Aşağıdaki ön denetim, T-1 birleşmeden önce düzeltilmesi gereken noktaları verir.
**Bu tablo T-1'i reddetmez; T-1'e ne kaldığını söyler.**

**Açık şema — 57 ölçümün 27'si kalıyor [Ö].** Öne çıkanlar:

| Kullanım | Ön / Zemin | Oran | Eşik | Düzeltme hedefi (ton korunarak) |
|---|---|---|---|---|
| Meta (`muted`) | `#5C6862` / `#F1EDE2` | 4,97 | 5,5 | `#56615C` → 5,51 |
| Meta (`muted`, kart) | `#5C6862` / `#FBF8EF` | 5,48 | 5,5 | aynı düzeltme yeter |
| `onPrimarySoft` / çip: Yapıldı | `#1C5340` / `#CFE1D6` | 6,52 | 7,0 | `#1A4E3C` → 7,00 |
| Çip: Atlandı | `#4B5751` / `#E1DED2` | 5,60 | 7,0 | `#3E4843` → 7,04 |
| Çip: Emin değilim | `#464D7A` / `#DCDFEE` | 6,08 | 7,0 | `#3E446D` → 7,03 |
| Çip: Gecikti | `#744D0B` / `#F2DFB6` | 5,70 | 7,0 | `#624109` → 7,02 |
| Çip: Çakışma | `#8B3122` / `#F2D9D1` | 6,10 | 7,0 | `#7B2C1E` → 7,03 |
| `line` kenarlık | `#CEC7B5` / `#F1EDE2` | 1,44 | 3,0 | `#968763` → 3,02 |
| `lineStrong` kenarlık | `#B9B19C` / `#F1EDE2` | 1,83 | 3,0 | `#948868` → 3,00 |
| Çip kenarları (5 durumun hepsi) | — | 1,31–1,38 | 3,0 | ör. Yapıldı `#55886D` → 3,00 |
| Kart / zemin yüzey farkı | `#FBF8EF` / `#F1EDE2` | 1,10 | — | K-09: kenarlık zorunlu |
| Yükseltilmiş / kart farkı | `#FFFDF8` / `#FBF8EF` | 1,04 | — | K-09: kenarlık zorunlu |
| Kişi 2 baş harfi | `#FFFFFF` / `#2C79A8` | 4,76 | 7,0 | dolguyu `#225E83`'e koyult |
| Kişi 3 baş harfi | `#FFFFFF` / `#7B62A0` | 5,13 | 7,0 | `#644F83` |
| Kişi 4 baş harfi | `#FFFFFF` / `#9A5A88` | 5,01 | 7,0 | `#7B486D` |
| Kişi 5 baş harfi | `#FFFFFF` / `#9C5F49` | 5,06 | 7,0 | `#7E4C3B` |
| Kişi 7 baş harfi | `#FFFFFF` / `#5F6A3F` | 5,80 | 7,0 | `#545D38` |

Çip kenarlarının hepsinin kalması tek başına kozmetik görünebilir; değildir. [Ö] Çip dolgularının
sayfa zeminine oranı 1,12–1,17 arasında. Yani **çipin kendisi kenarlığı olmadan bir nesne olarak
görünmüyor**; kenarlık burada süs değil taşıyıcıdır (K-09).

**Koyu şema — 57 ölçümün 20'si kalıyor [Ö].** Öne çıkanlar Bölüm 7'de.

---

# 2. Tipografi kuralları

**K-12 · Minimum boyutlar (dp, `fontScale` = 1,0'da).** Yenileme bunların altına inemez.

| Rol | Bugünkü | Minimum | Not |
|---|---|---|---|
| Gövde | 16 | **16** | Düşürülemez. |
| Meta / ikincil | 13 | **13** | |
| Etiket / çip / sekme | 12 (sekme 11) | **12** | [Ö] Sekme etiketi bugün **11 px** (`(tabs)/_layout.tsx`) — **kalır**, 12'ye çıkar. |
| Başlık | 34 / 21 | serbest | Küçülebilir; yoğunluk için başlık küçültmek meşrudur, gövde küçültmek değildir. |
| Hiçbir metin | — | **12'nin altına inemez** | İstisna yok. Yasal metin de değil. |

**K-13 · Hiyerarşi ölçek ve boşlukla kurulur, ağırlıkla değil.** Bir ekranda `700` ağırlık en
fazla bir rolde bulunur. [D] `00-kendi-arayuzumuz.md`: "Her şey bağırınca hiçbir şey öne çıkmıyor."
Gövde ağırlığı 400'ün altına inemez (300 yasak) — ince ağırlık düşük kontrastla aynı etkiyi yapar.

**K-14 · BÜYÜK HARF yasak.** Ne eyebrow'da, ne çipte, ne butonda, ne başlıkta.
[D] B-49 / Nuray: "Büyük harf yazıyı yaşlı göz daha zor söker." [Ö] O satırın kontrastı 6,45'ti,
yani sorun kontrast değildi. Ayrıca Türkçede büyük harf yazım `İ/I` ve `ı/i` ayrımını ekran
okuyucuda bozar. `textTransform: 'uppercase'` kod tabanında hiç bulunmayacak.

**K-15 · Harf aralığı.** 20 dp ve üstünde negatif tracking serbest (en fazla −0,4).
**20 dp'nin altında `letterSpacing` negatif olamaz**; 0 veya pozitif (en fazla +0,2) olur.
[Ç] Küçük puntoda sıkıştırma okunabilirliği düşürür.

**K-16 · Satır yüksekliği.** Gövde ve meta **≥ 1,40×**; başlık **≥ 1,20×**.
[Ö] Bugünkü `display` 34/40 = **1,18 — kalır** (41'e çıkmalı). Diğerleri geçiyor:
title 1,29 · body 1,44 · meta 1,38 (sınırda, 13/19'a çıkarılması önerilir).

**K-17 · Satır uzunluğu.** Gövde metni bir satırda **70 karakteri geçmez**.
[Ö] `Screen` bileşeninde `maxContentWidth: 680`; 16 dp gövde ile bu ~85 karakter eder.
Metin blokları için ayrı bir `maxTextWidth ≤ 560` tanımlanır veya metin bloğu kart içinde daralır.
Telefonda (390 dp) sorun yok; tablet ve web önizlemesinde çıkıyor.

**K-18 · Dinamik tip kırılmaz.** Her ekran, **`fontScale = 2,0`** (iOS AX5 / Android "en büyük")
altında 390×844'te:
- yatay kaydırma üretmez,
- hiçbir metni kırpmaz veya `…` ile kesmez,
- butonlar dikey büyür, metin buton dışına taşmaz,
- iki sütunlu düzenler tek sütuna iner,
- alt sekme çubuğu içeriği örtmez.

**K-19 · `allowFontScaling={false}` yasaktır.** [Ö] Bugün kod tabanında hiç yok — bu kural onu
korumak içindir. `maxFontSizeMultiplier` yalnız tamamen dekoratif metinde ve **1,6'nın altında
olmayacak** şekilde kullanılabilir.

**K-20 · Kritik metin `numberOfLines` ile kesilmez.** Kesilmeyecek metinler: bakım adı, kayıt
cümlesi (`SAAT → FİİL → KİŞİ`), durum etiketi, uyarı metni, buton etiketi, kişi adı.
Kesilebilecekler: serbest not önizlemesi, uzun hane adı.

**K-21 · Tabular rakam zorunlu alanlar.** `fontVariant: ['tabular-nums']`:
- zaman çizelgesi saatleri ve zaman penceresi ("07:00–10:00"),
- kayıt cümlesindeki saat,
- Geçmiş'teki tarih-saat sütunu,
- son 7 günün nokta şeridindeki gün/sayı etiketleri,
- adalet göstergesindeki sayılar (karar 10),
- fiyat ve süre ("₺249 / yıl", "30 gün").
Gerekçe: bu sayılar alt alta karşılaştırılır; orantılı rakamda sütun kayar.
[Ö] Bugün yalnız `task-row` saatinde var; Geçmiş'te yok — **kalır**.

**K-22 · Tek font ailesi, sistem fontu.** Özel font satın alınmıyor (kapsam dışı kararı).
Sistem fontu kullanıcının kendi erişilebilirlik ayarlarını (kalın metin, büyük punto) miras alır;
bu bir kısıt değil avantajdır.

---

# 3. Renk dışı durum göstergesi

## 3.1 Neden pazarlık edilemez: ölçüm

Durum renklerinin gri tona indirgendiğinde (renk körlüğünün en ağır hâli, siyah-beyaz yazdırma,
düşük parlaklıkta ekran) ne kadar ayrıştığı ölçüldü [Ö]:

**Bugünkü palet:**

| Çift | Gri karşılıkları | ΔE2000 |
|---|---|---|
| **Yapıldı – Atlandı** | `#505050` / `#515151` | **0,3 — ayırt edilemez** |
| **Emin değilim – Gecikti** | `#5E5E5E` / `#5F5F5F` | **0,4 — ayırt edilemez** |
| Yapıldı – Emin değilim | `#505050` / `#5E5E5E` | 5,0 |

**Yeni palet (T-1 çalışma ağacı), açık şema:**

| Çift | ΔE2000 | |
|---|---|---|
| Yapıldı – Çakışma | **0,4** | ayırt edilemez |
| Yapıldı – Emin değilim | **2,2** | ayırt edilemez |
| Emin değilim – Çakışma | **2,6** | ayırt edilemez |

**Koyu şemada durum daha kötü: 10 çiftin 6'sı ΔE < 5** (Yapıldı–Gecikti 0,9; Emin değilim–Çakışma
0,6).

Yani hem eski hem yeni palette **durum rengi, renk görülmediğinde sıfır bilgi taşıyor.**
Bu bir palet hatası değildir — renk fizikinin sınırıdır ve karar 2'nin ("durum asla tek başına
renkle anlatılmaz") neden bir tercih değil zorunluluk olduğunun kanıtıdır.

## 3.2 Kurallar

**K-23 · Her durum üç işaret taşır: ikon + Türkçe etiket + renk.** Üçü de olmadan durum
gösterilmez. Yalnız renkli nokta, yalnız renkli kenar, yalnız renkli arka plan yasaktır.

**K-24 · Beş durumun sabit sözlüğü.** Her ekranda aynı ikon, aynı etiket, aynı renk:

| Durum | İkon (silüet) | Türkçe etiket | Renk rolü |
|---|---|---|---|
| Yaklaşan | içi boş halka | "Yaklaşıyor" | nötr |
| Zamanı geldi | dolu halka | "Şimdi" | birincil |
| Gecikti | üçgen/saat | "Geçti" | amber (karar 6: nötr, ceza değil) |
| Kaydedildi | tik | "Yapıldı" / "Atlandı" / "Emin değilim" | yeşil / nötr / mor |
| Çakışma | çatal/ikiz | "İki farklı kayıt var" | tuğla |

Etiketler ürün genelinde tek biçimdir. "Yapıldı kaydı" ve "Yapıldı" aynı ekranlarda karışmaz
(K-51).

**K-25 · İkonlar silüet olarak ayrışır.** Test: ikonları 16 dp'de, tek renkte (siyah), etiketsiz
yan yana koy; başka birine "hangisi hangisi" diye sor. Dolu/boş daire çifti tek başına yetmez;
en az bir ikon farklı geometriye (köşeli, çizgili) sahip olur.

**K-26 · Durum asla yalnız arka plan renkleriyle gösterilmez.** Çip dolgusu sayfa zemininden
ayrışmıyorsa (ölçüldü: 1,12–1,17) çipin kenarı K-03'e tabidir.

## 3.3 Kişi renkleri ve renk körlüğü

**Ölçüm [Ö].** Yeni paletin 8 kişi rengi, normal görüş + protanopi + döteranopi + tritanopi
simülasyonlarının **en kötüsünde** ikili ΔE2000 ile ölçüldü:

| Şema | 20'nin altındaki çift | En kötü çift |
|---|---|---|
| Açık | **28 çiftin 20'si** | Kahve `#6B4409` ↔ Çam `#2C5418` → **ΔE 2,3** |
| Koyu | **28 çiftin 18'i** | Kahve `#AC8456` ↔ Çam `#72925E` → **ΔE 1,8** |

Bu paletin kusuru değil, matematiğin sınırı. Serbest arama yapıldı [Ö] — marka kısıtı olmadan,
yalnız "krem ve kart zemininde ≥ 4,5 kontrast" şartıyla 524 aday renk arasından en iyi ayrışan
kümeler:

| Renk sayısı | Ulaşılabilen en iyi en-kötü ΔE2000 |
|---|---|
| 2 | 49,3 |
| 3 | 28,5 |
| 4 | 25,7 |
| **5** | **20,5** |
| 6 | 16,4 |
| 8 | 12,9 |

**K-27 · Renk hiçbir zaman kimliğin tek taşıyıcısı değildir.** Her kişi göstergesi **avatar dolgusu
+ baş harf + isim** taşır. Renk dördüncü, yedek işarettir. [Ö] Yukarıdaki tablo, 6 renkten sonra
renk körlüğünde güvenilir ayrışmanın mümkün olmadığını gösteriyor; dolayısıyla
`04-sentez-ve-aksiyon.md` karar 1'deki "6-8 renk" hedefi **renk körlüğü testinden geçmez** ve
ancak K-27 sayesinde kabul edilebilir.

**K-28 · Ayrışma eşiği: ΔE2000 ≥ 20**, normal görüş ve üç renk körlüğü simülasyonunun hepsinde.
Bu eşiği geçen en fazla **5 renk** vardır.

**K-29 · Atama sırası rastgele olamaz.** [Ö] Bugünkü `assignPersonColors()` FNV-1a karmasıyla
slot seçiyor; ürünün ana vakası iki bakım verendir ve karma ikisine ΔE 2,3 olan Kahve ile Çam'ı
verebilir. **İlk slotlar en çok ayrışan renklerden başlayarak sabitlenir.** Mevcut 8 renk için
ölçülen en iyi sıra (hem açık hem koyu şemada geçerli):

`Gök → Kahve → Kiremit → Deniz mavisi → Zeytin → Erguvan → Leylak → Çam`

[Ö] İlk iki renk (Gök + Kahve) iki modun en kötüsünde **ΔE 40,2** — ürünün ana vakası için
fazlasıyla güvenli. İlk dört renk ΔE 12,9 (açık) / 17,2 (koyu). **Beşinci renkten sonra renk
ayrımı istatistiksel olarak biter**; o noktadan itibaren ayrım tamamen isim ve baş harftedir.

**K-30 · Test yöntemi (her palet değişikliğinde çalıştırılır).**
1. **Betik**: Ek A'daki ölçüm çalıştırılır; çıktı PR açıklamasına yapıştırılır.
2. **Gri ton ekran görüntüsü**: Bugün, Geçmiş ve kayıt ekranının ekran görüntüsü tam gri tona
   çevrilir. Testi geçme koşulu: *her kaydın kime ait olduğu ve hangi durumda olduğu gri görüntüde
   okunabiliyor.* [D] Nuray'ın turundan T-4'ün kabul kriteri de budur: "Kayıt satırı renk olmadan
   da (gri tonda) okunabilir olacak."
3. **Cihaz filtresi**: iOS Ayarlar → Erişilebilirlik → Ekran → Renk Filtreleri → Döteranopi;
   Android → Renk düzeltme. Aynı üç ekran açılır.

---

# 4. Dokunma hedefi ve tek el kullanımı

**K-31 · Minimum dokunma hedefi 44×44 (iOS) / 48×48 (Android).** `touchTarget` token'ı bunu zaten
veriyor; korunur. Görsel öğe daha küçükse `hitSlop` ile hedef büyütülür — **hedefi küçültmek için
görseli küçültmek yasaktır.**

**K-32 · Hedefler arası boşluk ≥ 8 dp.** Yıkıcı bir eylem ile sık kullanılan bir eylem arasında
**≥ 24 dp** ve **görsel olarak farklı biçim** bulunur.
[D] Nuray'ın 5 puanlı bulgusu: "Demoyu başlangıca döndür" düğmesi "Birini davet et"in hemen
altında ve tehlikeli görünmüyor. [Ö] `04-hane.png`'de iki düğme aynı genişlikte, aynı yükseklikte,
aynı köşe yarıçapında; biri dolu biri çerçeveli — bu ayrım yeterli değil.

**K-33 · Başparmak bandı.** 390×844 mantıksal ekranda, sekme çubuğu (82) ve alt güvenli alan
(~34) çıkarıldığında rahat erişim bandı **y ≈ 563–728** [Ö]. Ekranın birincil eylemi bu banttadır.
[Ö] `05-kayit.png`'de üç seçenek de y < 563'te; **ekranın alt yarısı tamamen boş** — tek el
kullanımında en değerli bölge kullanılmıyor.

**K-34 · Yıkıcı eylem başparmak bandında durmaz** ve her zaman onay ister (K-52).

**K-35 · Basılı durum iki koşulu birden sağlar:**
1. Dolgu değişir: dinlenme ile basılı hâl arasındaki kontrast oranı **≥ 1,20**.
2. Basılı hâlde **etiketin kontrastı K-01/K-02 eşiğinin altına düşmez.**

[Ö] Bugünkü `opacity: 0.82` (ve yeni token'daki `pressed: 0.78`) 1. koşulu geçiyor (1,55) ama
2.'yi **geçmiyor**: buton yazısının kontrastı 8,17 → **5,27**'ye düşüyor. Ölçülen çalışan
alternatif: dolguyu **%15 koyultmak** → `#265847` → `#204B3C`; durum değişimi 1,20, beyaz yazı
9,84. **Basılı durum açarak değil koyultarak yapılır.**

**K-36 · Dokunulabilir ile dokunulamaz görsel olarak ayrışır.**
[D] Nuray: "Geçmiş'te satırların hiçbirine basılmıyor" — basılabileceğini sandı. Bir satır
dokunulabilirse bunu söyleyen kalıcı bir işaret (chevron, buton, kenarlık) taşır; dokunulamazsa
buton gibi görünmez.

**K-37 · Kaydırma ile gizlenen içeriğin işareti bulunur.**
[Ö] `showsVerticalScrollIndicator={false}` bugün `Screen` bileşeninde açık ve Plus kartının
yalnız 77 dp'si görünüyor. Kural: **ya kaydırma göstergesi açılır, ya da hiçbir kart ekran
kenarında yarım kalmaz** (son öğe ya tam görünür ya hiç görünmez). İkisinden biri şart.

**K-38 · Klavye açıkken hiçbir birincil düğme klavyenin altında kalmaz.**
(`03-ortak-bakim.md`, 11pets'ten çıkan negatif ders.)

**K-39 · Ekran okuyucu sözleşmesi.** Her etkileşimli öğede:
- `accessibilityRole` (bugün 42 yerde var — korunur),
- `accessibilityLabel`: görünen metinle **aynı bilgiyi** verir, fazlasını değil,
- durum taşıyan öğede `accessibilityState` (`disabled`, `selected`, `checked`),
- yıkıcı veya sonucu geri alınamaz eylemlerde `accessibilityHint`.
[Ö] Bugün 10 `accessibilityLabel` ve yalnız **1** `accessibilityHint` var. Yeni eklenen her
etkileşimli bileşen bu sözleşmeye uyar; B-53 (ekran okuyucu ile hiç test edilmedi) T-10'da
kapatılır.

**K-40 · Odak sırası görsel sıraya eşittir** ve hiçbir ekran odak tuzağı içermez.
[D] B-52: üçüncü "geri"de boş ekran kalıyor — geri yığını tükendiğinde uygulama ana sekmeye döner,
boş ekran bırakmaz.

---

# 5. Hareket

**K-41 · Süre üst sınırları.**

| Hareket | Üst sınır | Not |
|---|---|---|
| Durum/geri bildirim animasyonu | **200 ms** | kayıt onayı, çip değişimi |
| Ekran geçişi | **300 ms** | platformun kendi geçişi tercih edilir |
| Liste öğesi giriş animasyonu | **150 ms**, kademe (stagger) en fazla 30 ms | |
| Herhangi bir döngüsel/sürekli animasyon | **yok** | yükleniyor göstergesi hariç |

[Ö] Bugün kod tabanında tek animasyon var: `collapsible.tsx` içinde `FadeIn.duration(200)` —
sınırda, geçer.

**K-42 · Azaltılmış hareket tercihi desteklenir.** `AccessibilityInfo.isReduceMotionEnabled()`
açıkken: konum/ölçek animasyonları kaldırılır, yerine anlık geçiş veya en fazla 100 ms opaklık
geçişi konur. **Bilgi kaybolmaz** — animasyonla anlatılan her şeyin durağan bir karşılığı vardır.

**K-43 · Hareket bilgi taşımaz.** Bir şeyin "yeni geldiği", "kaydedildiği" veya "çakıştığı"
yalnız animasyonla anlatılmaz; metinle de yazar.

**K-44 · Saniyede 3'ten fazla parlama/yanıp sönme yasaktır.** Kırmızı flaş hiç kullanılmaz.

**K-45 · Kayıt onayının erişilebilir karşılığı.** [D] Nuray'ın 9 numaralı ihtiyacı: *"'Kaydedildi'
onayı. Büyük, bir saniye kalan, net bir yazı."* Ve 10 numaralı bulgusu: onay olmadığı için ikinci
kez basma isteği doğuyor — çift kaydın kökü bu. Onay **dört kanalın hepsinde** verilir:

1. **Görsel**: en az **1000 ms** ekranda kalan, gövde puntosunda (≥ 16 dp), K-01 kontrastında
   "Kaydedildi" metni. Yalnız animasyon veya yalnız ikon yetmez.
2. **Yapısal**: onay metni `accessibilityLiveRegion="polite"` (Android) bir bölgede bulunur ve
   iOS'ta `AccessibilityInfo.announceForAccessibility('Kaydedildi')` ile duyurulur.
3. **Kalıcı**: kayıt, listede görünür hâle gelir — yani onay kaybolduğunda da kanıt ekranda kalır.
4. **Dokunsal**: başarı haptiği (`Haptics.NotificationFeedbackType.Success`). Tek başına yeterli
   değildir, diğer üçünün yerine geçmez.

Onayın yanında, süresi boyunca **"Geri al"** düğmesi bulunur (Nuray'ın 1 numaralı ihtiyacı).
Geri al düğmesi K-31 dokunma hedefi ve K-01 kontrastına tabidir.

**K-46 · Yükleniyor durumu 400 ms'den uzun sürerse metinle açıklanır** ("Kayıtlar getiriliyor…").
Dönen çark tek başına bilgi değildir.

---

# 6. Dil kuralları

## 6.1 Hitap kararı

**K-47 · Ürünün tek hitabı: saygılı "siz".** Senli benli dil hiçbir ekranda kullanılmaz.

Gerekçe:
- [D] B-51 / Nuray (63, emekli öğretmen): *"Bir yerde 'görün/kaydedin' diye saygılı, bir yerde
  'açabilirsin/görebilirsin' diye senli benli. Öğretmenim, gözüme batıyor."* Karışıklığı bildiren
  kişi ölçüt kullanıcıdır.
- **Risk asimetriktir.** "Siz" genç bir kullanıcıya mesafeli gelebilir ama yanlış olmaz;
  "sen" 63 yaşındaki bir kullanıcıya saygısız gelebilir ve uygulamayı kapattırır. Ürünün
  varlık sebebi iki kuşağın (Nuray ve kızı) aynı ekranı paylaşmasıdır — ortak paydası "siz"dir.
- Nuray'ın karşılaştırma ölçütü WhatsApp'tır ve Türkçe WhatsApp "siz" kullanır.
- Ürünün en sevilen cümlesi zaten hitapsızdır: *"Deniz, 08:12'de 'yapıldı' ekledi."* [D] Nuray:
  "tam istediğim cümle."

**K-48 · En iyi cümle hitapsız cümledir.** Hitap kararı bir geri çekilme hattıdır, hedef değil.
Öncelik sırası:
1. **Olguyu söyle** (üçüncü şahıs): "Deniz, 08:12'de 'yapıldı' ekledi."
2. **Ad kullan** (etiket, başlık): "Bakım geçmişi", "Bugün", "Akşam bakımı".
3. **Gerekiyorsa "siz"**: "Kendi planınızdaki adımları uygulayın."
4. "Sen" hiçbir zaman.

**K-49 · Düğme ve menü etiketleri hitap taşımaz.** Düğme etiketi kısa eylem adıdır ve kişi eki
almaz: "Kaydet", "Geri al", "Vazgeç", "Sil", "Davet gönder". Bunlar "siz"in ihlali sayılmaz;
etiket biçimidir. **Ayırt etme testi:** metin cümle ise (nokta ile biten, özne-yüklem taşıyan)
"siz" kuralına tabidir; iki-üç kelimelik eylem etiketi ise hitapsızdır.
Yasak biçimler: "Kaydedebilirsin", "Görebilirsin", "Açabilirsiniz" (düğmede).

## 6.2 Terim sözlüğü

**K-50 · Yeni terim eklemeden önce bu tabloya bakılır.** Tablo `B-50`'deki 10 anlaşılmayan
kelimeden üretildi; hepsi Nuray'ın birebir ifadesiyle kayıtlı.

| Yasak / sorunlu | Nuray ne anladı | Bunun yerine | Not |
|---|---|---|---|
| **nöbet** ("Bugünün nöbeti") | "kedi nöbet mi geçirdi?" | **"Bugün"** başlık olarak; alt satır "Luna'nın bakımı" | Hasta hayvan bağlamında tıbbi anlamla çakışıyor. **Uygulamanın adı da PatiNöbeti** — ad `urun-sozlesmesi`nin kararıdır, bu belge yalnız ekran içi kullanımı yasaklar ve adı risk olarak kayda geçirir. |
| **prova** ("Çevrimdışı prova") | "terziden, tiyatrodan bilirim, anlamadım" | **"İnternet yokmuş gibi dene"** (demo anahtarı etiketi) | |
| **eşitleme / uzak eşitleme** | "bende matematik demek" | **"paylaşma"** / "haneyle paylaşma" | Zaten çalışan karşılık var, [D] Nuray onayladı: "Bu cihazda kayıtlı · paylaşılmayı bekliyor" — *"bu iyi yazılmış."* |
| **Plus önizlemesi** | "neyin önünü izliyorum bilmiyorum" | **"Plus'ta ne var"** | |
| **backend bağlantısıyla etkinleşir** | "hiçbir şey anlamadım, bu cümle bana yazılmamış" | **"Bu özellik henüz açık değil."** + ne zaman/ne yapmalı | Teknik mimari sözcükleri kullanıcı metninde hiç geçmez. |
| **bakım hattı** | "telefon hattı mı, otobüs hattı mı?" | **"bakım kaydı"** / "Kim ne zaman yaptı, ikiniz de aynı şeyi görün" | |
| **görünür kıl** ("Durum net değilse bunu görünür kıl") | "kitap dili, takıldım" | **"Durum net değilse bunu işaretleyin."** | |
| **PLANLANAN FİYAT TESTİ** | "beni mi test ediyorlar? huzursuz oldum" | **"Fiyat henüz kesin değil"** | Ayrıca K-14 gereği büyük harf zaten yasak. |
| **sıraya alınır** | kısmen anladı, "ne zaman çıkacağı yazmıyor" | **"…paylaşılmayı bekler; bağlantı gelince kendiliğinden gönderilir."** | Kuyruğun ne zaman boşalacağı yazılmadan "sıra" bilgi taşımıyor. |
| **"Ne yapılacağını değil, ne zaman kayıt beklendiğini birlikte görün"** | "iki kere okudum, çözemedim" | **"Hangi bakım saat kaçta?"** | Soyut karşıtlık kurma yasak; düz cümle. |
| **Demoyu başlangıca döndür** | tehlikeli olduğunu anlamadı, her şeyini sildi | **"Bütün kayıtları sil"** | Etiket sonucu söyler; işlemi değil. |

**K-51 · Aynı iş, aynı ad.** [D] B-51 / Nuray 11 numaralı bulgu: kayıt yokken "Durum kaydet",
varken "Yeni kayıt ekle" — aynı iş, iki isim. Tek ad seçilir ve ürün genelinde değişmez.
Aynı kural durum etiketleri için de geçerlidir ("Yapıldı kaydı" ≠ "Yapıldı" ≠ "yapıldı").

**K-52 · Uygulamanın kendi iç kavramları kullanıcıya sızmaz.** Yasak sözcükler: backend, sync,
queue, occurrence, snapshot, provider, token, deep link, payload, migration, demo mode.

## 6.3 Dilbilgisi

**K-53 · Saat eki okunuşa göre seçilir, elle yazılmaz.** `clockSuffix()` kullanılır
(`src/domain/care.ts`). Doğru: `08:12'de`, `18:59'da`, `18:14'te`, `20:00'de`.
Saat içeren hiçbir yeni metinde ek elle birleştirilmez; testi `care.test.ts` korur.
Aynı kural sayı ve tarih ekleri için de geçerlidir ("7'si", "30 gün", "₺249'a").

**K-54 · Sayı, tarih ve saat biçimi `tr-TR`.** `Intl.DateTimeFormat('tr-TR')` /
`Intl.NumberFormat('tr-TR')`. Ondalık ayırıcı virgül, binlik nokta. 24 saat düzeni.
Saat dilimi hane planının saat dilimidir, cihazınki değil.

**K-55 · Kesme işareti tek biçim: `’` (U+2019).** Kod tabanında `'` ile karışmaz.

## 6.4 Uyarı ve hata metni biçimi

**K-56 · Uyarı zarardan önce gelir.** Nuray'ın grup turundaki kuralı birebir alınmıştır
(`tartisma/p03-nuray.md`): *"Uyarı zarardan önce, tek ekranda, ve yanında mutlaka 'peki ne
yapayım' düğmesi."*

Her uyarı ekranı **tam olarak** şu dört parçadan oluşur:

1. **Ne olacak** — tek cümle, gövde puntosunda, en fazla iki satır.
   İyi: *"Deniz bunu 08:12'de 'yapıldı' diye yazmış."*
2. **Sonuç, açıkça** — geri alınabilir mi, kaç kaydı etkiler.
   İyi: *"Bu 4 kaydı silmek üzeresiniz, geri gelmez."*
3. **İki düğme, ikisi de eylemi adıyla söyler.** Güvenli olan solda ve öntanımlıdır.
   İyi: `[Vazgeç]` `[Yine de ekle]` · `[Vazgeç]` `[4 kaydı sil]`
   Yasak: `[Tamam]`, `[Evet]`, `[Hayır]`, `[İptal]` tek başına.
4. **Tek ekran.** Uyarı üst üste binmez, ikinci bir onay istemez.

**K-57 · Zarardan sonra çıkan her uyarının yanında çözüm düğmesi olur.**
[D] Nuray'ın 3 puanlı, 5 ciddiyetli bulgusu: kırmızı "Aynı görev için farklı kayıtlar var."
yazıyor, çözecek düğme yok, üstelik **doğru bilgi ekrandan kayboluyor**. Kural:
- Hata metni yerini aldığı bilgiyi **ekrandan silemez**. Doğru cevap ekranda kalır, uyarı yanına
  eklenir.
- Uyarının yanında çözümü başlatan düğme bulunur: *"Hangisi doğru?"*

**K-58 · Her basışta "Emin misiniz?" yasak.** [D] Nuray: *"Buna alışırım, okumadan 'evet'lerim,
üstelik ilk dokunuşa güvenmediğim için iki kere basarım — çifte kaydın asıl sebebi bu olur."*
Onay yalnız şu iki durumda istenir: (a) işlem geri alınamaz, (b) birden fazla kaydı etkiler.
Normal kayıt onay istemez; **onay yerine geri alma** verilir (K-45).

**K-59 · Hata mesajı üç soruyu birden cevaplar: ne oldu, neden, ne yapayım.**
[D] Nuray: *"'Bildirim izni verilmedi. Cihaz ayarlarından daha sonra açabilirsin.' Ben o cihaz
ayarlarını nasıl bulacağım? Beni oraya götüren bir düğme yok, orada bıraktı."*
"Ne yapayım" bir cümle değil, **bir düğmedir** — kullanıcıyı gideceği yere götürür.

**K-60 · Tıbbi sınır dili korunur.** [D] B-47: 10/10 persona onayladı. "Bu bir uygulama içi
kayıttır; tıbbi doğrulama veya kanıt değildir." Yenileme bu cümleleri ne siler ne zayıflatır;
kontrastı K-02'ye tabidir.

---

# 7. Koyu mod

[D] Karar 13: *"Gece birincil bağlamdır."* Dolayısıyla koyu mod sonradan eklenen bir varyant
değildir; **yalnız açık modda çalışan bir değişiklik birleşmez** (bkz. K-61 ve Bölüm 8 kontrol
listesindeki "açık ve koyu modda birer ekran görüntüsü" maddesi).

**K-61 · Bölüm 1'deki bütün eşikler koyu modda aynen geçerlidir.** K-01 = 7,0 · K-02 = 5,5 ·
K-03 = 3,0 · K-04 = 3,0 · K-05 = 7,0. Ayrı ve gevşek bir koyu mod eşiği yoktur.

**K-62 · Açık mod token'ları koyu moda taşınamaz.** [Ö] Ölçüldü — bugünkü açık mod renkleri
`#141816` gibi bir koyu zemine doğrudan konsaydı:

| Token | Koyu zeminde oran | Eşik | |
|---|---|---|---|
| `primary` `#265847` | **2,19** | 7,0 | kalır |
| `overdue` `#A43C2E` | **2,79** | 7,0 | kalır |
| `muted` `#64706A` | **3,47** | 5,5 | kalır |

Her rolün koyu karşılığı ayrıca türetilir ve ayrıca ölçülür.

**K-63 · Saf siyah zemin ve saf beyaz metin kullanılmaz.** [Ç] Gövde metni kontrastı **7,0 ≤ x ≤
15,0** aralığında tutulur; 21:1 (beyaz/siyah) yaşlı ve astigmatik gözde halolama (kelime
kenarlarının dağılması) yapar. T-1'in koyu şeması bu aralığın üst sınırında: `#ECE8DD` / `#141715`
= **14,75** [Ö] — geçer, sınırda.

**K-64 · Koyu modda yükseklik gölgeyle anlatılmaz.** Gölge koyu zeminde görünmez. Kademeler
açıklık farkı + kenarlıkla kurulur ve kenarlık K-03'e tabidir.

**K-65 · Kişi renkleri koyu mod için yeniden türetilir** ve K-28 testini yeniden geçer. Aynı
kişinin açık ve koyu moddaki rengi aynı renk ailesinden olur (tanınabilirlik), aynı hex olmaz.

**Ölçüm — T-1 koyu şeması, 57 ölçümün 20'si kalıyor [Ö].** Öne çıkanlar:

| Kullanım | Ön / Zemin | Oran | Eşik | Düzeltme hedefi |
|---|---|---|---|---|
| Birincil buton yazısı | `#F2FBF6` / `#2E7357` | **5,37** | 7,0 | dolguyu `#265F48`'e koyult → 7,08 |
| Çip: Yapıldı | `#7CC8A0` / `#1B3A2D` | 6,29 | 7,0 | çip zeminini koyult veya yazıyı aç |
| Çip: Atlandı | `#AAB4AD` / `#262B27` | 6,75 | 7,0 | |
| Çip: Emin değilim | `#A6ADDB` / `#262A3E` | 6,49 | 7,0 | |
| Çip: Gecikti | `#E2AE62` / `#3A2D16` | 6,68 | 7,0 | |
| Çip: Çakışma | `#F09C8B` / `#3C231C` | 6,78 | 7,0 | |
| `line` kenarlık | `#3A423C` / `#141715` | **1,74** | 3,0 | `#5A665D` → 3,00 |
| `lineStrong` kenarlık | `#525C55` / `#141715` | **2,60** | 3,0 | `#5A665E` → 3,01 |
| Kart / zemin yüzey farkı | `#1C201D` / `#141715` | 1,10 | — | K-09: kenarlık zorunlu |
| Kişi 1 baş harfi | `#121511` / `#648BA2` | **5,04** | 7,0 | dolguyu `#86A4B6`'ya aç |
| Kişi 6 baş harfi | `#121511` / `#AC8456` | **5,42** | 7,0 | `#BB9A75` |
| Kişi 8 baş harfi | `#121511` / `#72925E` | **5,25** | 7,0 | `#8BA979` |

İyi haber [Ö]: koyu şemanın gövde ve meta metinleri eşikleri rahat geçiyor (14,75 ve 7,17) ve
durum aksanlarının hepsi K-03'ün çok üstünde. Kalan işin tamamı **çip yazıları, kenarlıklar ve
kişi renkleri**.

---

# 8. Kontrol listesi — birleşmeden önce

Bir değişiklik bu maddelerin **hepsini** geçmeden `main`'e girmez. Her kutu ya işaretlenir ya da
neden atlandığı PR'da yazılır.

## Palet veya token değiştiyse
- [ ] **Ek A'daki ölçüm betiği çalıştırıldı**, çıktısı PR açıklamasında. Gözle tahmin yok.
- [ ] Karar metinlerinin hepsi **≥ 7,0** (K-01); ikincil metinler **≥ 5,5** (K-02).
- [ ] Kenarlık, çip kenarı, durum noktası, anahtar izi **≥ 3,0** (K-03).
- [ ] Kart kenarı yalnız açıklık farkına bırakılmadı; kenarlık var ve ölçüldü (K-09).
- [ ] Kişi renkleri: dolgu ≥ 3,0, baş harf ≥ 7,0, ikili ΔE2000 ≥ 20 (normal + 3 renk körlüğü).
- [ ] Kişi rengi atama sırası sabit ve en çok ayrışan renklerle başlıyor (K-29).
- [ ] **Aynı ölçümler koyu şema için de yapıldı** (K-61, K-62).

## Metin veya ekran değiştiyse
- [ ] Hiçbir metin 12 dp'nin altında değil; gövde 16, meta 13, etiket 12 (K-12).
- [ ] Hiçbir yerde BÜYÜK HARF metin yok; `textTransform: 'uppercase'` yok (K-14).
- [ ] Satır yüksekliği gövde/meta ≥ 1,40×, başlık ≥ 1,20× (K-16).
- [ ] **`fontScale = 2,0` ile açıldı**: kırpma, taşma, yatay kaydırma yok (K-18).
- [ ] `allowFontScaling={false}` eklenmedi (K-19).
- [ ] Tabular rakam gereken yerlerde var (K-21).
- [ ] Tek hitap: "siz"; "sen" hiçbir cümlede yok (K-47).
- [ ] Yeni terimler K-50 sözlüğüne bakılarak seçildi; yasak sözcükler yok (K-52).
- [ ] Saat/tarih ekleri `clockSuffix()` ve `tr-TR` ile üretiliyor (K-53, K-54).
- [ ] Aynı iş her yerde aynı adla anılıyor (K-51).

## Durum, uyarı veya kayıt akışı değiştiyse
- [ ] Her durum **ikon + Türkçe etiket + renk** taşıyor; renk tek başına hiçbir yerde bilgi
      taşımıyor (K-23, K-24).
- [ ] **Gri ton ekran görüntüsü alındı**: kim yaptı ve hangi durumda olduğu renk olmadan okunuyor
      (K-30 / T-4 kabul kriteri).
- [ ] Uyarı zarardan önce geliyor, tek ekran, iki düğme eylemi adıyla söylüyor (K-56).
- [ ] Zarardan sonra çıkan uyarının yanında çözüm düğmesi var ve doğru bilgi ekrandan silinmiyor
      (K-57).
- [ ] Rutin işlemde "emin misiniz?" sorulmuyor; yerine geri alma var (K-58, K-45).
- [ ] Kayıt onayı dört kanalda birden veriliyor: 1 sn görünür metin + canlı bölge duyurusu +
      listede kalıcı iz + haptik (K-45).

## Her değişiklikte
- [ ] Dokunma hedefleri ≥ 44/48; yıkıcı eylem sık eylemden ≥ 24 dp uzakta ve farklı biçimde
      (K-31, K-32).
- [ ] Birincil eylem başparmak bandında (y 563–728); yıkıcı eylem değil (K-33, K-34).
- [ ] Basılı durum dolguyu **koyultarak** gösteriyor ve etiket kontrastı eşiğin altına düşmüyor
      (K-35).
- [ ] Hiçbir kart ekran kenarında yarım kalmıyor **veya** kaydırma göstergesi açık (K-37).
- [ ] Yeni etkileşimli her öğede `accessibilityRole` + `accessibilityLabel`; yıkıcı olanda
      `accessibilityHint` (K-39).
- [ ] Animasyon süreleri sınırda; azaltılmış hareket tercihi destekleniyor; hareket bilgi
      taşımıyor (K-41, K-42, K-43).
- [ ] **Açık ve koyu modda birer ekran görüntüsü** PR'a eklendi (K-61).

## T-10 doğrulamasında (bir kez)
- [ ] TalkBack ve VoiceOver ile Bugün → kayıt → Geçmiş turu yapıldı (B-53 kapanır).
- [ ] Cihaz renk filtresi (döteranopi) açıkken aynı tur yapıldı (K-30).
- [ ] Nuray personasının kararı kötüleşmedi (T-10 kabul kriteri).

---

# Ek A · Ölçüm betiği

Aşağıdaki betik `tokens.ts`'i okur, bu belgedeki bütün oranları ve renk körlüğü ayrışmasını
yeniden üretir. Palet değişen her PR'da çalıştırılır ve çıktısı PR açıklamasına yapıştırılır.
Depoya dosya olarak eklenmedi; T-1 tamamlanınca `marka-tasarim` isterse
`apps/mobile/scripts/` altına alabilir.

```python
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

if __name__ == '__main__':
    if len(sys.argv) == 3:
        print(f'{ratio(sys.argv[1], sys.argv[2]):.2f}')
    else:
        print('ESIKLER: karar metni 7.0 · ikincil metin 5.5 · tasiyici 3.0 · kisi dE2000 20')
        print('Kullanim: python3 kontrast.py "#1F2723" "#F1EDE2"')
```

**Betiğin verdiği üç sayı ve anlamları**
- `ratio(on, zemin)` → WCAG kontrast oranı. K-01/K-02/K-03 eşikleriyle karşılaştırılır.
- `ayrisma(a, b)` → iki rengin **en kötü görüş koşulundaki** farkı. Kişi renkleri için ≥ 20.
- `gri(h)` → rengin gri ton karşılığı. İki durum renginin gri karşılıkları arasındaki `de2000`
  5'in altındaysa o iki durum renk olmadan ayırt edilemez.

---

# Ek B · Bu belgenin kapsamadığı, ama kayda geçirilenler

Bunlar T-6'nın yetkisi dışında ama erişilebilirlik/dil açısından işaretlenmiştir:

1. **Uygulamanın adı.** "PatiNöbeti" — [D] ölçüt kullanıcı "nöbet" kelimesini hasta hayvan
   bağlamında yanlış okudu ve *"içim cız etti"* dedi. Ekran içi kullanımı K-50 ile yasaklandı;
   **adın kendisi `urun-sozlesmesi`nin kararıdır.** Risk olarak kaydedilmiştir.
2. **Geri alma ve kayıt düzeltme** (Nuray'ın 1 ve 2 numaralı ihtiyaçları). Kayıt onayının
   erişilebilir biçimi K-45'te tanımlandı ama **geri alma özelliğinin kendisi ürün işidir**
   (`kayit-butunlugu`). Geri alma olmadan K-58 (onay sormama kuralı) uygulanamaz — bağımlılık.
3. **"Hane" kavramının iki ayrı evde çalışmaması** (B-46) — ürün kararı.
4. **B-52, üçüncü geri'de boş ekran** — K-40'ta kural olarak yazıldı, düzeltmesi `mobil-urun`'da.
