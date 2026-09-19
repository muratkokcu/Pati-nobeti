# Yöntem, test altyapısı ve testi tekrar çalıştırma

Tarih: 18 Eylül 2026 · Test edilen sürüm: `apps/mobile` yerel demo MVP

## 1. Bu testin statüsü

On kullanıcı **simüle edilmiş personadır**. Uygulamayı gerçekten çalıştırdılar, gerçek ekranlara
tıkladılar, gerçek ekran görüntüleri aldılar; ama gerçek insan değildirler.

- **Kanıt sayılan:** uygulamanın gözlenen davranışı. Her bulgu ayrıca kaynak kodda doğrulandı
  (bkz. `01-bulgu-listesi.md`, her satırda dosya:satır referansı var).
- **Kanıt sayılmayan:** "öderim/ödemem" beyanları, fiyat rakamları, kullanmaya devam etme
  tahminleri, pazar büyüklüğü yorumları. Bunlar hipotezdir ve gerçek kullanıcıyla sınanmalıdır.
- `../02-dogrulama-plani.md` ve `../07-mvp-uygulama-durumu.md` içindeki beta kapısı eşikleri
  (beş hedef hane, en az üç gerçek ödeme niyeti) bu çalışmayla **karşılanmamıştır**.

## 2. Tur yapısı

1. **1. tur — bireysel kullanım.** Her persona kendi künyesiyle (bkz. `02-persona-kunyeleri.md`)
   en az 2 oturum yaptı: ilk izlenim ve "ertesi gün tekrar açtım". Verileri oturumlar arasında
   korunduğu için ikinci oturum gerçekten bir dönüş oturumuydu.
   Çıktı: `raporlar/*.md` (birebir), `ekran-goruntuleri/<persona>/*.png` (203 görüntü).
2. **2. tur — grup tartışması.** Herkese grubun ortak bulguları, kendi aleyhlerine olan itirazlar
   ve beş çatışma sorusu verildi (`tartisma/00-tartisma-brifi.md`). Herkes en az bir kişiyi adıyla
   hedef almak, 30 günlük üç öncelik oyu vermek ve fiyat rakamı söylemek zorundaydı.
   Çıktı: `tartisma/p01..p10.md` (birebir).
3. **Sentez.** `../08-kullanici-testi-bulgulari.md` (özet) ve `01-bulgu-listesi.md` (geliştirme listesi).

## 3. Uygulama nasıl çalıştırıldı

Hedef platform iOS/Android; ancak bu makinede emülatör/cihaz yok. Test, **web derlemesi** üzerinden
yapıldı. Web, ürünün hedef platformu değildir — bu yüzden bazı davranışlar (push teslimi, gerçek
çevrimdışı açılış, native geri hareketi, Dynamic Type) bu testte doğrulanamaz; bkz. bölüm 6.

```bash
# 1) Statik web derlemesi
cd apps/mobile
npx expo export --platform web --output-dir <çıktı>/web-build

# 2) Cross-origin izolasyon başlıklı yerel sunucu (SQLite wasm için şart)
node harness/serve-web.js <çıktı>/web-build 4321

# 3) Persona oturumu
node <persona-script>.js      # harness/app.js içindeki withApp() kullanılır
```

`npx expo start --web` dev sunucusu bu projede **çalışmıyor**: `web.output: "static"` + web worker
birleşimi Metro'da `Worker chunk not found` hatası veriyor (expo/expo#50153). Statik export bu
hatadan etkilenmiyor, o yüzden export + kendi sunucumuz kullanıldı.

## 4. Harness

`harness/app.js` — her persona için izole, kalıcı bir Chromium profili açar:
390×844 (telefon), `isMobile`/`hasTouch`, `tr-TR`, `Europe/Istanbul`. Profil klasörü persona
başına ayrıdır; bu yüzden her personanın kendi SQLite verisi vardır ve oturumlar arasında kalır.

```js
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  console.log(await s.goto('/'));                        // uygulamayı aç + ekranı yazdır
  console.log(await s.tap('Durum kaydet'));              // görünen etikete dokun
  console.log(await s.tab('Geçmiş'));                    // alt sekme
  console.log(await s.toggle('Çevrimdışı provayı aç'));  // anahtar
  await s.shot('01-gecmis');                             // ekran görüntüsü
});
```

- `s.screen()` yalnızca **aktif ekranı** döndürür. React Navigation web'de pasif sekmeleri DOM'da
  tutuyor; harness bunları `z-index: -1` üzerinden ayıklar, yoksa dört ekranın metni birbirine karışır.
- `s.tap()` etiketi kapsayan **en küçük** canlı öğeyi bulur ve gerçek fare tıklaması yapar; bu
  sayede gizli/arka plandaki eşleşmelere tıklanmaz.
- Oturum sonunda konsol hataları ve `pageerror`lar dökülür.
- Persona senaryolarını kişi başına 2-3 kez çalıştırmak, ilk kurulumdan sonra ~40 saniye sürer.

`harness/KIT.md` — personalara verilen kullanım kiti (görev listesi, rapor formatı, demo sınırı
açıklaması). Tekrar test yapılacaksa bu dosya da değiştirilmeden kullanılmalıdır.

## 5. Test için üründe yapılan iki değişiklik

Web derlemesi bu iki düzeltme olmadan **hiç açılmıyordu**. İkisi de gerçek uyumluluk
düzeltmesidir, teste özel kısayol değildir:

1. **`apps/mobile/metro.config.js` (yeni dosya).** `expo-sqlite`'ın web sürümü `wa-sqlite.wasm`'ı
   asset olarak import ediyor; varsayılan `assetExts` içinde `wasm` yok, bundling başarısız oluyordu.
   Ayrıca SQLite worker'ının `SharedArrayBuffer` kullanabilmesi için `Cross-Origin-Embedder-Policy:
   credentialless` ve `Cross-Origin-Opener-Policy: same-origin` başlıkları gerekiyor
   (Expo v57 SQLite web kurulumu).
2. **`apps/mobile/src/data/repository.ts` — `inTransaction()` yardımcısı.** Web'de
   `withExclusiveTransactionAsync` desteklenmiyor (`pageerror: withExclusiveTransactionAsync is not
   supported on web`); uygulama açılışta `getSnapshot → resetDemo` zincirinde patlıyor ve sonsuz
   "yükleniyor" ekranında kalıyordu. `Platform.OS === 'web'` durumunda `withTransactionAsync`'e
   düşülüyor, native davranış değişmiyor.

Doğrulama: `npm test` 4/4 geçiyor. `npm run typecheck` **testten önce de** kırıktı:
`src/components/app-tabs.web.tsx:27` silinmiş `/explore` rotasına referans veriyor
(`app-tabs.tsx` ve `app-tabs.web.tsx` Expo şablonundan kalma ölü dosyalar).

## 6. Bu testin doğrulayamadığı şeyler

Aşağıdakiler web harness'ının sınırıdır; gerçek cihazda ayrıca test edilmelidir ve
**hiçbir persona bulgusu bu başlıklarda kanıt sayılmaz**:

- Gerçek push teslimi ve bildirim aksiyonları (`scheduleNotificationAsync is not available on web`).
- Uygulama kapalıyken çevrimdışı açılış (tarayıcıda `ERR_INTERNET_DISCONNECTED`). Uçak/metro
  senaryosu — Onur ve Sinem için karar verici — native sürümde mutlaka test edilmeli.
- Outbox'ın gerçekten boşalması (uzak eşitleme yok).
- iOS/Android geri hareketi, native sekme davranışı, haptik.
- Dynamic Type / sistem yazı boyutu ölçeklemesi ve ekran okuyucu etiketlerinin gerçek okunuşu.
  Nuray'ın punto/kontrast gözlemleri tarayıcı görüntüsü üzerindendir.
- Gerçek hesap, davet teslimi, rol sınırlarının sunucu tarafında uygulanması, ödeme akışı.

## 7. Klasör düzeni

```
kullanici-testi/
├── 00-yontem-ve-tekrar-calistirma.md   (bu dosya)
├── 01-bulgu-listesi.md                 geliştirme listesi: ID, tekrar adımları, kod, kabul kriteri
├── 02-persona-kunyeleri.md             10 persona künyesi (birebir)
├── 03-oylar-fiyat-ve-oncelik.md        oy dökümü, fiyat beyanları, öncelik sırası
├── 04-uygulanan-duzeltmeler.md        düzeltilen bulgular, dokunulan dosyalar, doğrulama
├── raporlar/                           1. tur bireysel raporlar (birebir)
├── tartisma/                           2. tur grup tartışması (brif + 10 cevap, birebir)
├── ekran-goruntuleri/                  persona başına ekran görüntüleri (203 adet)
└── harness/                            app.js, serve-web.js, KIT.md
    └── oturum-scriptleri/          personaların gerçekten çalıştırdığı script'ler (persona başına, sırayla)
```
