# MVP uygulama durumu

Son güncelleme: 19 Eylül 2026

## Ortak karar

Marka/tasarım, mobil ürün ve teknik mimari rolleri şu ürün sözleşmesinde uzlaştı:

- Ürün adı **PatiNöbeti**, açıklayıcı imza **Ortak bakım kaydı**.
- Marka fikri **Ortak Hat**: zaman, kaydı ekleyen kişi ve kayıt devri aynı zaman çizelgesinde görünür.
- Mobil temel Expo SDK 57, React Native ve TypeScript'tir.
- Uygulama ekranları SQLite tabanlı repository'den okur. Gelecekte Supabase adaptörü bu sözleşmenin arkasına eklenir; ekranların doğrudan uzak veritabanına bağlanmasına izin verilmez.
- Gelir modeli hane aboneliğidir. Ödeme teklifi ikinci bakım veren ortak durumu gördükten sonra test edilir ve yalnız hane sahibine gösterilir.

## Çalışan yerel MVP

`apps/mobile` altında Bugün, Planlar, Geçmiş ve Hane sekmeleri; üç sonuçlu bakım kaydı; aktör/zaman/eşitleme görünürlüğü; çevrimdışı prova ve outbox; günlük yerel hatırlatıcı; ödeme almayan Plus önizlemesi ve deterministik demo sıfırlama çalışır. Yapılandırılmış production modunda ayrıca gerçek auth, atomik hane+ilk plan onboarding'i, server-backed ortak bugün, kayıt ve tek kullanımlık davet akışı kodlanmıştır.

Demo; gerçek hesap, Supabase eşitlemesi, push teslimi veya ödeme yapıyormuş gibi davranmaz. Bu sınır ekranlarda açıkça yazılıdır.

## Teknik doğrulama

- `npm run typecheck`: başarılı; ölü `/explore` referansı güncel plana yönlendirildi
- `npm run lint`: başarılı
- `npm test`: 31/31 başarılı (`care`, timezone/gün devri, ACK-temelli outbox,
  sync motoru, uzak hata sözleşmesi, ortak snapshot merge/history ve atomik
  SecureStore nesil değişimi)
- `npx expo export --platform android`: başarılı production bundle
- Supabase başlangıç migration'ı ve 35 assertion'lı davranışsal pgTAP sözleşmesi
  eklendi; yerel ortamda Docker/Supabase stack bulunmadığı için RLS testi henüz çalıştırılmadı.
- `npm audit --omit=dev`, Expo araç zincirinde 14 orta seviye bulgu bildiriyor. Önerilen otomatik çözüm mevcut SDK ile uyumsuz/breaking downgrade ürettiği için zorla uygulanmadı; SDK güncellemesi sırasında tekrar değerlendirilecek.

## Simüle kullanıcı testi (18 Eylül 2026)

On persona ile yapılan simüle kullanıcı testi, demo üzerinde 60 bulgu üretti;
`kullanici-testi/` altında tamamı belgelidir. Bu test **gerçek kullanıcı görüşmesi değildir**
ve aşağıdaki beta kapısı maddelerinin hiçbirini karşılamaz. Testin tek somut sonucu:
huninin 2. adımı (davet gönderme) ve 4. adımı (iki ayrı kişinin kayıt eklemesi) üründe
mevcut olmadığı için sıradaki gerçek deney bugünkü haliyle ölçülemez.

Testin ilk dört bulgusu (B-01, B-02, B-03, B-07) aynı gün düzeltildi: ikinci kayıt öncesi bilgi
ekranı, kartın tüm kayıtları göstermesi, çakışmanın görünür ve çözülebilir olması, günlük görev
üretimi. Ayrıntı: `kullanici-testi/04-uygulanan-duzeltmeler.md`.

Ayrıca test sırasında web derlemesinin çalışabilmesi için iki uyumluluk düzeltmesi eklendi:
`apps/mobile/metro.config.js` (wasm + COOP/COEP) ve `src/data/repository.ts` içindeki
`inTransaction()` (web'de exclusive transaction desteklenmiyor). Native davranış değişmedi.

## Demo ile beta arasındaki kapı

Yerel MVP, kullanıcı görüşmesi ve kullanılabilirlik testi için **GO** olabilir. Kapalı veya herkese açık beta için aşağıdakiler tamamlanmadan **NO-GO**:

1. Supabase auth ve repository adaptörü; migration'ların gerçek projede çalışması
2. RLS pozitif/negatif izolasyon testleri ve davet token'ının tek kullanımlı kabulü
3. Outbox retry, idempotency ve sunucu sürümüne dayalı çakışma uzlaştırması
4. Gerçek cihazlarda iOS/Android bildirim ve saat dilimi test matrisi
5. Store sandbox ödeme/restore/entitlement doğrulaması
6. KVKK aydınlatma, veri dışa aktarma ve hesap silme
7. Beş hedef hane ile görev tamamlama testi ve en az üç gerçek ödeme niyeti

## Sonraki deney

İlk deney kod büyütmek değil, iki bakım verenli beş hanede şu huniyi ölçmektir:

`owner plan kurdu → davet gönderdi → caregiver kabul etti → iki ayrı kişi kayıt ekledi → ortak geçmiş görüldü → fiyat teklifi açıldı`

Seed verisi aktivasyon sayılmaz. Her adım gerçek kullanıcı olayıyla ölçülmelidir.
