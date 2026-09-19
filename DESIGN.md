---
name: PatiNöbeti
description: Ortak bakımı sakin, izlenebilir bir zaman hattında buluşturan mobil arayüz sistemi.
colors:
  canvas: "#F5F1E8"
  surface: "#FFFCF6"
  ink: "#1F2723"
  muted: "#64706A"
  primary: "#265847"
  primary-soft: "#DCE8E1"
  brass: "#B97822"
  brass-soft: "#F3E4CB"
  overdue: "#A43C2E"
  overdue-soft: "#F5DDD8"
  uncertain: "#555C83"
  uncertain-soft: "#E4E5F0"
  line: "#D9D4C9"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "system-ui, sans-serif"
    fontSize: "34px"
    fontWeight: 700
    lineHeight: 1.176
    letterSpacing: "-0.7px"
  title:
    fontFamily: "system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.286
    letterSpacing: "-0.2px"
  body:
    fontFamily: "system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.438
  meta:
    fontFamily: "system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.385
rounded:
  sm: "10px"
  md: "14px"
  lg: "18px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "0 16px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "16px"
  status-done:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "6px 9px"
  status-uncertain:
    backgroundColor: "{colors.uncertain-soft}"
    textColor: "{colors.uncertain}"
    rounded: "{rounded.sm}"
    padding: "6px 9px"
---

# Design System: PatiNöbeti

## Overview

**Creative North Star: “Ortak Hat”**

PatiNöbeti, birden fazla kişinin bakım kayıtlarını aynı sakin ve okunaklı hat üzerinde buluşturur. Zaman çizgisi yalnızca görsel motif değil, ürünün temel vaadidir: kim, neyi, ne zaman kaydetti? Sıcak kâğıt tonları ve koyu yeşil güven verir; pirinç ve durum renkleri yalnızca anlam taşır.

Arayüz sakin, gündelik ve operasyoneldir. Oyuncakçı estetiği, klinik soğukluk, jenerik pembe/mavi pet dili, korku pazarlaması ve sağlık garantisi hissi bu sisteme ait değildir. Mevcut sistem açık temadır; koyu tema, semantik renk eşlemesi tamamlanmadan varsayılmamalıdır.

**Temel karakter:** sakin güven, kayıt defteri netliği, tek elle hızlı kullanım, sınırlı ve anlamlı renk.

## Colors

Palet, sıcak nötr zemin üzerinde koyu botanik yeşili ana eylem rengi; pirinç, tuğla ve menekşe tonları ise ayrı durum dilleri olarak kullanır.

- **Kâğıt Tuval** (`canvas`, `#F5F1E8`): ekran ve navigasyon zemini.
- **Temiz Yüzey** (`surface`, `#FFFCF6`): kart, seçim satırı ve zaman çizgisi düğümü.
- **Mürekkep** (`ink`, `#1F2723`): başlık ve ana metin.
- **Sessiz Metin** (`muted`, `#64706A`): ikincil açıklama, tarih ve pasif navigasyon.
- **Nöbet Yeşili** (`primary`, `#265847`) / **Yumuşak Yeşil** (`primary-soft`, `#DCE8E1`): ana eylem, aktif durum, başarı ve bilgilendirme.
- **Pirinç** (`brass`, `#B97822`) / **Yumuşak Pirinç** (`brass-soft`, `#F3E4CB`): henüz kayıt yok, atlandı, çevrimdış prova ve Plus vurgusu. Koyu metni `#74450F` kullanır.
- **Gecikme Tuğlası** (`overdue`, `#A43C2E`) / **Yumuşak Tuğla** (`overdue-soft`, `#F5DDD8`): gecikme, çakışma ve hata.
- **Belirsizlik Menekşesi** (`uncertain`, `#555C83`) / **Yumuşak Menekşe** (`uncertain-soft`, `#E4E5F0`): “Emin değilim” ve netleştirme.
- **Ayırıcı** (`line`, `#D9D4C9`): 1 px sınırlar ve 2 px zaman hattı.

**Renk anlamı kuralı.** Yeşil = kayıt/eylem, pirinç = bekleyen veya ticari vurgu, tuğla = dikkat/çakışma, menekşe = belirsizlik. Bu renkleri dekoratif olarak birbirinin yerine kullanma; her durumu ikon ve metinle de adlandır.

## Typography

Arayüz, React Native sistem yazı tipini kullanır; iOS ve Android kendi yerel sans-serif karakterini korur. Hiyerarşi kompakt, dolaysız ve Türkçe içerikte rahat taranabilir olmalıdır.

- **Display:** 34/40, 700, `-0.7` harf aralığı; yalnızca üst seviye ekran başlığı.
- **Title:** 21/27, 700, `-0.2`; kart ve bölüm başlığı.
- **Body:** 16/23, 400; açıklama ve kayıt cümlesi.
- **Meta:** 13/18, 600; tarih, rol, eşitleme ve açıklama metni.
- **Kontrol etiketi:** genellikle 15–16, 700; durum etiketi 12, 700; sekme etiketi 11, 700.
- **Sayısal zaman:** 14–15, 700–800 ve tabular numerals.

29/35 modal başlığı ve 28/34 kayıt başlığı mevcut yoğunluk varyantlarıdır; yeni keyfi boyutlar ekleme. Metin büyütmede kırpma yerine satır sarımına ve kartların uzamasına izin ver.

## Layout

Temel ritim `4, 8, 12, 16, 24, 32`dir. Ekran içeriği yatayda 16 px dolgu alır, merkezlenir ve web/geniş ekranda `680 px` ile sınırlanır; telefon genişliğinde akış tek sütundur. Alt sekme ve modal eylemleri için içerik sonunda yeterli boşluk bırakılır (ana kaydırma yüzeyinde 120 px).

Tüm ekranlar cihaz safe-area/window inset'lerine uymalıdır: iOS'ta çentik, Dynamic Island ve home indicator; Android'de durum/navigasyon çubukları, kesik ve klavye. Mevcut ana `Screen` üst safe area'yı uygular; yeni modal veya özel `ScrollView` yüzeyleri aynı korumayı bilinçli olarak sağlamalıdır.

**Ortak Hat deseni.** Zaman soldan okunur: 62 px ray, ortalanmış saat, 16 px içi yüzey renkli ve 3 px durum kenarlı düğüm, 2 px ayırıcı çizgi. İçerik rayın sağında 12 px ayrılır. Düğüm rengi kaydın durumunu gösterir; satır metni aynı durumu açıkça söyler. Geçmiş ve çakışma kayıtları silinmez; yeni kayıtlar hatta eklenir.

Kompakt genişlikte alt navigasyon dört bölümdür: Bugün, Planlar, Geçmiş, Hane. Geniş yüzey, 680 px içerik sütununu korur; yeni bir tablet navigasyon modeli uygulanana kadar kartları ekrana yayma.

## Elevation & Depth

Sistem düz ve katmanlıdır; uygulanmış yüzeylerde gölge yoktur. Derinlik `canvas` ile `surface` farkı, 1 px `line` sınırı ve yumuşak durum zeminleriyle kurulur. Gölgeyi kartları “önemli” göstermek için ekleme; modal ve navigasyon geçişlerinde platform davranışını kullan.

## Shapes

Köşe sistemi yumuşak ama çocukça değildir: 10 px etiket/küçük blok, 14 px buton/bildirim, 18 px kart ve durum paneli. Avatar ve işaretler tam daire olabilir. Kart sınırları 1 px; süs amaçlı kalın kontur, kapsül buton veya her şeyi karta çevirme kullanılmaz.

## Components

### Buttons and choices

- Ana eylem Nöbet Yeşili zemin, beyaz 700 etiket, 14 px radius ve en az platform dokunma yüksekliğidir: iOS 44 pt, Android 48 dp.
- İkincil eylem aynı radius ile 1 px yeşil veya `line` sınır kullanır. Metin eylemi de aynı minimum dokunma alanını korur.
- Büyük sonuç seçenekleri 18 px radius, 1 px sınır, ikon + başlık + açıklama + chevron düzenidir; minimum yükseklik dokunma hedefinden 28 px fazladır.
- Basılı durumda opaklık `0.72–0.82`, devre dışı durumda `0.48`dir. Kaydetme sırasında etiket “Kaydediliyor…” olur.

### Cards, banners, and states

- Standart kart `surface`, 18 px radius, isteğe bağlı 1 px `line`, 16 px iç boşluk kullanır. Liste benzeri geçmiş ve hane satırlarında tam kart yerine yalnızca alt ayırıcı kullanılabilir.
- Demo banner'ı yumuşak yeşil, flask ikonu ve 12/17 kalın açıklamayla açıkça “Yerel demo” der.
- Durum etiketleri ikon + metin + semantik zemin kullanır: “Yapıldı kaydı”, “Atlandı kaydı”, “Emin değilim”. Yalnızca renkle anlam taşınmaz.
- Başarı yumuşak yeşil, hata yumuşak tuğla, netleştirme yumuşak menekşe panelidir. Geçici geri bildirim `alert`/live-region semantiğiyle duyurulur.

### Navigation and iconography

Ionicons kullan; aynı yüzeyde başka ikon ailesi karıştırma. Aktif sekme yeşil, pasif sekme `muted`, sekme zemini `surface` ve üst sınırı `line`dır. Sistem geri hareketini ve modal sunumunu koru; özel geri jesti icat etme.

### Hesap ve onboarding

- Demo ve production aynı anda görünmez. Supabase yapılandırması yoksa yerel demo,
  URL + publishable key birlikte varsa gerçek hesap akışı açılır; sessiz fallback yoktur.
- Auth yüzeyi iki sekmeli tek formdur. Alan etiketi placeholder'ın yerine geçmez;
  yükleme, geçersiz bilgi, e-posta doğrulama ve eksik yapılandırma metinle açıklanır.
- İlk kurulum üç gerçek iş adımıdır: görünen ad, hane+evcil hayvan, ilk bakım
  planı. `1 / 3` yalnız ilerlemeyi bildirir; uzun bir ürün turu değildir.
- Onboarding'in sonraki değer anı ikinci bakım vereni davet etmektir. Ürün bunu
  kurulum sonunda sakin bir bilgi yüzeyiyle belirtir; sahte başarı kutlaması yapmaz.
- Production kayıt sonucu “Haneyle paylaşıldı”, demo sonucu “yalnız bu cihazda”
  der. Ham davet kodu production ekranında gösterilmez; paylaşım anı dışında tutulmaz.

## Do's and Don'ts

### Do

- **Do** her kritik durumda “kim, neyi, ne zaman kaydetti?” sorusunu yanıtla; kaydı, aktörü, zamanı ve eşitleme durumunu birlikte göster.
- **Do** “kaydedildi” ile “gerçekten/doğru uygulandı” ayrımını metinde koru. Çakışmayı yeni bir netleştirme kaydıyla çöz; eski kayıtları gizleme.
- **Do** her dokunulabilir alanı en az 44 pt/48 dp yap, ekran okuyucu etiketi ve gerektiğinde ipucu ekle; durumları renk + ikon + metinle anlat.
- **Do** font scaling, uzun Türkçe metin, azaltılmış hareket, klavye ve safe-area davranışını iOS/Android'de test et. Hareket eklenirse platform geçişlerini izle ve reduced-motion durumunda crossfade/ani geçişe dön.
- **Do** gerçek backend gelene kadar uzak eşitleme, push, hesap, davet, ödeme ve aboneliği “önizleme” veya “planlanan” olarak etiketle.

### Don't

- **Don't** demo verisini canlı hane durumu, tıbbi kanıt, klinik doğrulama, gönderilmiş davet, alınmış ödeme ya da başlatılmış abonelik gibi sunma.
- **Don't** tanı, doz önerisi, sağlık skoru veya yapılacağı garanti eden dil ekleme; arayüz koordinasyon ve kayıt aracıdır.
- **Don't** ham renk, boşluk, radius veya yeni tip boyutunu ekranda tekil olarak icat et; önce `apps/mobile/src/design/tokens.ts` ve ortak bileşenleri güncelle. `DESIGN.md` uygulamayla aynı değişiklikte yenilenmelidir.
- **Don't** kullanılmayan Expo başlangıç tema bileşenlerini PatiNöbeti'nin normatif sistemi sayma; üretim rotaları `design/tokens.ts`, `typography`, `Screen`, durum ve görev bileşenlerini esas alır.
- **Don't** koyu temayı basit renk tersine çevirme ile ekleme. Tüm semantik roller ve kontrastlar tanımlanıp iki platformda doğrulanmadan destekleniyor sayma.
