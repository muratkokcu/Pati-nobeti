# Tasarım sistemi — T-1 token seti ve T-2 bileşenleri

Tarih: 19 Eylül 2026 · Sahip: `marka-tasarim` · Kaynak görev: `04-sentez-ve-aksiyon.md` T-1, T-2
Kapı: `06-erisilebilirlik-kabul-listesi.md` (T-6) · Ölçüm betiği: `apps/mobile/scripts/kontrast.py`

Kod: `apps/mobile/src/design/tokens.ts`, `src/design/theme.tsx`, `src/design/status-language.ts`,
`src/components/{person-badge,status-chip,event-line,task-card}.tsx`.
Görsel kanıt: `ekranlar/tasarim-sistemi/*.png`, canlı galeri `/design-system` rotası.

**Ölçüm sonucu: 254 ölçümün 254'ü geçiyor** (açık ve koyu şema birlikte, `scripts/kontrast.py`).
`npm run typecheck`, `npm run lint`, `npm test` (88 test) yeşil.

---

## 1. Çıkış noktası

`00-kendi-arayuzumuz.md` arayüzü "jenerik" diye işaretledi ve kök sebepleri tasarım sistemi
seviyesinde koydu: tipografi sistemi yok, renk stratejisi tek boyutlu, kimlik taşıyıcısı yok,
ritim kalibre edilmemiş, durum dili eksik. Bu belge o beş maddenin her birine token seviyesinde
karşılık veriyor. Ekran kurgusu (T-3/T-4) bu turda değişmedi.

---

## 2. Tipografi — ağırlık yerine ölçek

Eski ölçekte display/title/meta hepsi `700`, gövde `400`; hiyerarşi ağırlıkla kurulmaya
çalışılıyordu ve "her şey bağırınca hiçbir şey öne çıkmıyordu". Yeni ölçekte **hiçbir rol 700
değil** (K-13): gövde 400, başlık ve vurgu 600.

| Rol | Boy / satır | Ağırlık | Harf aralığı | Kullanım |
|---|---|---|---|---|
| `display` | 26 / 32 (1,23×) | 600 | −0,4 | ekran başlığı |
| `title` | 19 / 25 (1,32×) | 600 | 0 | kart ve bölüm başlığı |
| `body` | 16 / 23 (1,44×) | 400 | 0 | gövde, kayıt cümlesi |
| `bodyStrong` | 16 / 23 | 600 | 0 | isim, buton etiketi, seçenek başlığı |
| `meta` | 13 / 19 (1,46×) | 400 | 0 | tarih, açıklama, eşitleme durumu |
| `metaStrong` | 13 / 19 | 600 | 0 | vurgulu meta |
| `label` | 12 / 17 (1,42×) | 600 | +0,1 | çip, sekme etiketi |
| `clock` | 14 / 20 (1,43×) | 600 | +0,2 | saat — tabular |
| `clockLead` | 20 / 24 (1,20×) | 600 | −0,2 | "şimdi" kartının saati, fiyat — tabular |

**Neden 34 → 26.** 34 px display telefonda satır sarımı yapıp ekranın üçte birini yiyordu.
26 px hâlâ en büyük öğe ama artık iki görev yerine dört bilgi bloğu sığıyor. K-12 gereği
gövde 16 ve meta 13 **düşürülmedi** — yoğunluk punto düşürerek değil, başlık küçülterek,
satır aralığı ve kart dolgusu sıkılaştırılarak alındı.

**Tabular rakam (K-21).** `clock` ve `clockLead` `fontVariant: ['tabular-nums']` taşır; 08:12 ile
20:00 alt alta geldiğinde rakam sütunu kaymaz.

**Harf aralığı (K-15).** 20 px altında negatif tracking yok — `title` eski −0,2 değerini kaybetti.
**Satır yüksekliği (K-16).** Gövde ve meta ≥ 1,40×, başlık ≥ 1,20×; eski `display` 1,18 ile kalıyordu.
**Büyük harf (K-14).** `textTransform: 'uppercase'` kod tabanında yok; "İKİNCİ BAKIM VEREN SONRASI"
cümle düzenine indi. Nuray'ın şikâyetinin nedeni kontrast değil büyük harfti (ölçüldü: 6,45).

---

## 3. Kişi renkleri — kimlik rengi, durum rengi değil

Karar 1: renk kimliğe ayrılır. Sekiz renk var; her biri **dolu daire + baş harf + isim** üçlüsüyle
görünür. Ölçüm zinciri şöyle işledi:

1. Krem ve kart zemininde ≥ 3,0 kontrast (K-04) **ve** baş harf için ≥ 7,0 (K-05) istendiğinde
   açık moddaki dolgunun parlaklığı ≤ 0,10'a, koyu moddakinin ≥ 0,34'e sıkışıyor. Yani iki şemada
   da tüm kişi renkleri dar bir parlaklık bandında durmak zorunda.
2. Bu bantta 360 ton × 12 kroma ızgarası tarandı; her aday için açık ve koyu eş renk üretildi.
3. Küme, **en uzak çiftten başlayan uzak-nokta ekleme** ile kuruldu (K-29). Ayrışma ölçüsü:
   normal görüş + protanopi + döteranopi + tritanopi simülasyonlarının **en kötüsündeki** ΔE2000,
   ve iki şemanın minimumu.

| Sıra | Ad | Açık dolgu | Koyu dolgu |
|---|---|---|---|
| 1 | Kehribar | `#85491B` | `#D58F5D` |
| 2 | Gök | `#1B5A93` | `#6CA1EC` |
| 3 | Sis | `#625462` | `#A99BA9` |
| 4 | Yosun | `#475E49` | `#8DA58E` |
| 5 | Erguvan | `#764878` | `#C18EC2` |
| 6 | Çam | `#2F6338` | `#76AC7B` |
| 7 | Kül | `#695357` | `#B2999E` |
| 8 | Kiremit | `#953C38` | `#E7837B` |

Baş harf açık modda `#FFFFFF` (7,04–7,17), koyu modda `#10130F` (7,03–7,11). Dolgular her dört
yüzeye karşı ≥ 3,0.

**Prefiks ayrışması (ölçüldü).** İlk 2 renk ΔE 41,0 · ilk 3 → 16,0 · ilk 4 → 12,1 · 8 → 3,8.
K-28'in ΔE ≥ 20 eşiği yalnız ilk iki slotta tutuyor. **Bu bir palet kusuru değil, fizik sınırı:**
T-6'nın kendi serbest araması da marka kısıtı olmadan 8 renkte 12,9'da tıkanmış ve
"beşinci renkten sonra renk ayrımı istatistiksel olarak biter" demiş. Bizim kısıtımız daha sert
(baş harf 7,0, üstelik iki şemada birden), o yüzden tavan daha düşük.

**Bunu kabul edilebilir kılan şey K-27'dir:** renk kimliğin *dördüncü* işaretidir. Birinci daire,
ikinci baş harf, üçüncü isim. `ekranlar/tasarim-sistemi/05-gri-ton-provasi.png` bunun kanıtı —
tam gri tonda sekiz avatarın rengi aynı görünüyor ama kimin kim olduğu hâlâ okunuyor.

**Atama (K-29).** `assignPersonColors(memberIds)` hane listesinin kendi sırasını kullanır
(sahip önce, sonra katılım sırası) ve `i % 8` slotunu verir. Ürünün ana vakası iki bakım
verendir; bu sıra sayesinde iki bakım veren her zaman ΔE 41,0 olan Kehribar + Gök çiftini alır.
Önceki FNV karması iki kişiye pekâlâ ΔE 2,3'lük bir çift verebiliyordu; **karma artık yalnız hane
listesi elde olmadığında kullanılan yedek** (`personColorIndex`) ve ayrışma garantisi vermez.

**Koyu mod (K-65).** Aynı slot iki şemada aynı ton ailesinde, farklı hex'te. Parlaklık sırası
korunur ki aynı kişi iki modda da tanınsın.

---

## 4. Kimlik rengi ile durum rengini ayıran kural

İki dil aynı ekranda yan yana duruyor ve karışmamalarını **biçim** sağlıyor, ton değil:

| | Kişi | Durum |
|---|---|---|
| Biçim | dolu daire | yumuşak dolgulu, 1 px kenarlı hap |
| Doygunluk kaydı | koyu dolgu, açık baş harf | açık zemin, koyu metin (koyu modda tersi) |
| Yanındaki bilgi | baş harf + isim | ikon + Türkçe etiket |
| Nerede | isimden hemen önce | saatin/başlığın yanında |

Bir kişi rengi hiçbir zaman hap olarak, bir durum rengi hiçbir zaman baş harfli daire olarak
çizilmez. `PersonBadge` ve `StatusChip` bu kuralı yapısal olarak zorlar.

---

## 5. Durum dili (K-24 sabit sözlüğü)

| Durum | İkon | Türkçe etiket | Renk rolü | Açık `fg` / `bg` |
|---|---|---|---|---|
| Yaklaşan | `ellipse-outline` (boş halka) | **Yaklaşıyor** | nötr | `#3C4842` / `#E1DED2` |
| Zamanı geldi | `radio-button-on` (dolu iç halka) | **Şimdi** | birincil yeşil | `#174E3B` / `#CFE1D6` |
| Gecikti | `alarm` (çalar saat) | **Geçti** | amber, nötr | `#643F00` / `#F2DFB6` |
| Yapıldı | `checkmark-circle` | **Yapıldı** | yeşil | `#174E3B` / `#CFE1D6` |
| Atlandı | `remove-circle` | **Atlandı** | nötr | `#3C4842` / `#E1DED2` |
| Emin değilim | `help-circle` | **Emin değilim** | mor | `#3C4470` / `#DCDFEE` |
| Çakışma | `git-compare` (çatallanan çizgi) | **İki farklı kayıt var** | tuğla | `#7F271A` / `#F2D9D1` |

**Gecikme amber ve nötr (karar 6).** Eski palette gecikme tuğla kırmızısıydı; artık amber.
Kırmızı yalnız iki iş için ayrıldı: çakışma ve sistem hatası. Etiket de cezalandırmıyor —
"Kaçırdınız" değil "Geçti".

**Amber metin olarak kullanılmaz (K-08).** `#B5741E` krem zeminde 3,02 — nokta ve ray düğümü
olarak geçer, metin olarak geçmez. Amberin metin karşılığı ayrı bir token: `brassInk` `#643F00`.

**Renk tek başına hiçbir şey anlatmıyor — ölçüldü.** Durum renkleri gri tona indirildiğinde
açık şemada yapıldı ↔ çakışma ΔE **0,4**, koyu şemada emin değilim ↔ çakışma ΔE **0,6**. Bu yüzden
`StatusChip` ikonu ve etiketi **opsiyonel değil**; `label` propu yalnız metni değiştirir, kaldırmaz.
İkon silüetleri K-25 gereği ayrıştırıldı: üç daire içleriyle (tik / çizgi / soru), "yaklaşıyor" boş
halka, "şimdi" dolu iç halka, "geçti" çalar saat, "çakışma" çatallanan çizgi.

**Çip kenarı süs değil taşıyıcı (K-26).** Çip dolgusu sayfa zemininden yalnız 1,12–1,17 ayrışıyor;
yani kenarlık olmadan çip bir nesne olarak görünmüyor. Her çipin 1 px kenarı var ve kenar her
zemine karşı ≥ 3,0.

---

## 6. Yüzey kademeleri ve yoğunluk ritmi

| Kademe | Açık | Koyu | Kullanım |
|---|---|---|---|
| `canvas` | `#F1EDE2` | `#141715` | ekran zemini |
| `surface` | `#FBF8EF` | `#1C201D` | standart kart, liste satırı |
| `raised` | `#FFFDF8` | `#272C28` | "şimdi" kartı — ekrandaki tek vurgulu yüzey |
| `sunken` | `#E9E4D7` | `#0B0D0C` | gruplanmış/pasif alan |
| `surfacePressed` | `#E8E3D6` | `#2A2F2B` | basılı satır |

**K-09: kademe tek başına ayrım değil.** Kart ile zemin arasındaki oran 1,10 — göz bunu sınır
olmadan seçmez. Bu yüzden `line` `#888271` (3,28 vs. zemin) ve `lineStrong` `#746D5A` (4,40)
gerçek çizgilere dönüştü. Eski `#D9D4C9` hairline'ı 1,31 ile görünmüyordu.

**Yoğunluk.** `layout` token'ları: kart dolgusu 16 → 14 (`cardPadding`), vurgulu kart 18,
sıkışık satır 10, ray genişliği 62 → 52, görev satırı minimum yüksekliği 176 → `touchTarget × 2`.
Bölüm aralığı 20, blok 12, satır 8, liste 6. Punto düşmeden ekrana giren bilgi yaklaşık iki katına
çıktı (`ekranlar/tasarim-sistemi/03-gorev-karti.png`: bir "şimdi" kartı + üç sıradaki satır).

**Basılı durum (K-35).** Opaklık düşürmek yasak — çünkü ölçüldü ki `opacity: 0.78` buton yazısının
kontrastını 8,17'den 5,27'ye düşürüyor. Basılı hâl artık dolguyu **koyultuyor**:
`primaryPressed` `#194133` (durum farkı 1,27, beyaz yazı 11,38), `surfacePressed` benzer şekilde.
`opacity` token'ında yalnız `disabled: 0.65` kaldı ve o da ölçüldü (yazı/dolgu 3,69, dolgu/zemin 3,33).

---

## 7. Koyu mod kuralları

Karar 13 gece bağlamını birincil yapıyor; T-6 K-61 de "ayrı ve gevşek bir koyu mod eşiği yoktur"
diyor. Uygulanan kurallar:

1. **Aynı eşikler.** K-01 7,0 · K-02 5,5 · K-03 3,0 · K-04 3,0 · K-05 7,0 koyu şemada da geçerli;
   denetim betiği iki şemayı birlikte ölçüyor ve ikisi de tam geçiyor.
2. **Hiçbir rol taşınmadı (K-62).** Her rol koyu için ayrıca türetildi. Birincil buton dolgusu
   `#186045`, üzerine `#F2FBF6` → 7,11 (T-6'nın "acil" işaretlediği 5,37 düzeltildi).
3. **Saf siyah ve saf beyaz yok (K-63).** Zemin `#141715`, metin `#ECE8DD` → 14,75; gövde metni
   7–15 aralığında kalıyor, halolama yapmıyor.
4. **Yükseklik gölgeyle anlatılmaz (K-64).** Kademeler açıklık farkı + kenarlıkla kuruluyor;
   `line` koyu şemada `#6D766F` (en açık koyu yüzeye karşı bile 3,03).
5. **Kişi renkleri yeniden türetildi (K-65)**, aynı aile, farklı hex.

**Henüz sistem temasına bağlı değil.** `AppThemeProvider` varsayılan olarak açık temayı verir;
koyu tema yalnız açıkça istendiğinde (`scheme="dark"`) gelir. Sebebi dürüst: ekranlar hâlâ düz
`palette` haritasını kullanıyor, sistem temasına bağlansaydı yarısı açık yarısı koyu bir arayüz
çıkardı. Ekranlar `useAppTheme()`e taşındığında (T-3) kök sağlayıcı `useColorScheme()`e bağlanır.
DESIGN.md'nin "koyu temayı basit renk tersine çevirme ile ekleme" kuralı bu yüzden korunuyor.

---

## 8. Bileşenler (T-2)

| Bileşen | Ne garanti eder |
|---|---|
| `PersonBadge` | daire + baş harf + isim; `monochrome` propu renksiz provayı gösterir; `PersonBadgeStack` çakışmada iki avatarı yan yana koyar. Yazı ölçeği büyüdüğünde daire de büyür (`scaled()`, K-19). |
| `StatusChip` | ikon + Türkçe etiket + renk üçlüsü, 1 px kenar. `StatusDot` durum noktasını çip'in kenar rengiyle çizer ki kişi rengiyle karışmasın. |
| `EventLine` | `08:12 · Deniz yapıldı ekledi`. Ayırıcı noktanın **kendisi** kişinin rengidir; renk kaybolduğunda cümle aynen okunur. Ekran okuyucuya `eventSentence()`in dilbilgisel cümlesi gider. |
| `TaskCard` | `now` (vurgulu yüzey, büyük saat, durum çipi, kayıt satırları, tek birincil eylem) ve `next` (tek satır: saat · başlık · özet · çip · chevron, en az dokunma hedefi yüksekliğinde). |

`StatusLabel` artık `StatusChip`'in üzerine kuruldu, `TaskRow` kayıt cümlelerini `EventLine` ile
çiziyor, kayıt ekranının defteri de `EventLine` kullanıyor. Böylece Bugün, Geçmiş ve kayıt ekranı
ekran kurgusu değişmeden aynı bileşenleri paylaşıyor.

**K-20:** bakım adı, kişi adı, kayıt cümlesi ve durum etiketi `numberOfLines` ile kesilmiyor;
uzun Türkçe metin sarıyor, kart uzuyor.

---

## 9. Yeni görsel yön: canlı renk bloğu, marka içinde

Kullanıcı arayüzü gördükten sonra asıl eksiğin kontrast değil **görsel dünyanın yokluğu** olduğunu
söyledi: hayvanla ilgili bir üründe tek bir hayvan görseli, hero'su veya renk bloğu yok; her ekran
metin duvarı. Seçilen yön **"canlı renk bloğu, marka içinde kalarak"**: koyu yeşil ve pirinç hero
blokları, büyük hayvan fotoğrafı, yuvarlak kartlar ve yüzen pill navigasyon. Palet ve marka
taahhüdü değişmiyor (PRODUCT.md), yükselen şey enerji seviyesi. Bu tur yalnız **tokenları** kuruyor
— ekran kurgusunu bir sonraki ajan yazacak. Eklenenler: `radius.xl` 24 / `radius.xxl` 28 (hero ve
fotoğraf kartları), `heroPrimary` `#1B4A39` + `heroBrass` `#E9B44C` ve üzerlerine gelen metin
renkleri, fotoğraf üstü okunabilirlik için `photoPanel` `#252A20` (K-11 gereği metin fotoğrafın
üstüne değil bu **katı** panelin içine gelir) ile dekoratif `scrim`, ve yüzen navigasyon için
`navSurface` / `navBorder` / `shadow.floating`. Hepsi aynı kapıdan geçti: hero metinleri 10,07 ve
7,10; fotoğraf paneli 12,98 (K-63'ün 7–15 aralığında); navigasyon kenarı her zemine karşı ≥ 3,0.
Gölge yalnız yüzen tek öğeye ait; kartlar düz kalıyor ve koyu modda ayrımı kenarlık taşıyor.

---

## 10. Bu turda yapılmayanlar

- **T-3 / T-4 ekran kurgusu.** Bugün, Geçmiş, kayıt ve paywall ekranlarının düzeni değişmedi;
  yalnız tek seferlik renk ve boy değerleri token'a çevrildi.
- **K-18 `fontScale = 2,0` tam turu.** Bileşenler ölçeğe hazır (`allowFontScaling` hiçbir yerde
  kapalı değil, kritik metin kesilmiyor, daireler ölçekle büyüyor) ama her ekranın 390×844'te
  iki kat puntoyla taranması ekran turudur; T-3 ile birlikte yapılmalı.
- **K-33 başparmak bandı, K-37 kaydırma göstergesi, K-45 kayıt onayı, K-56–K-59 uyarı biçimi.**
  Hepsi ekran kurgusu kararı; token seviyesinde karşılıkları hazır.
- **K-47 "siz" hitabı ve K-50 terim sözlüğü.** Metin sweep'i `erisilebilirlik-dil` + T-3 işi.
  Bu turda eklenen yeni metinler hitapsız olgu cümlesi biçiminde yazıldı.
- **K-28 ΔE ≥ 20, 3. slottan itibaren.** Karşılanamıyor; gerekçe ve telafisi Bölüm 3'te.

---

## 11. Değişiklik nasıl doğrulanır

```bash
cd apps/mobile
python3 scripts/kontrast.py        # 254 ölçüm, iki şema; çıktı PR açıklamasına gider
npm run typecheck && npm run lint && npm test
npx expo export --platform web --output-dir <dizin>   # /design-system rotası galeridir
```

Galeri rotası (`src/app/design-system.tsx`) ürün akışının parçası değildir; sekmelerden
erişilmez. Palet veya bileşen değiştiğinde açık tema, koyu tema ve gri ton ekran görüntüsü
buradan alınır.
