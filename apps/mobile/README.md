# PatiNöbeti mobil MVP

Expo SDK 57 ve React Native ile geliştirilen iki açık çalışma modlu MVP:

- Supabase ortam değişkenleri yoksa deterministik, yalnız cihazda kalan yerel demo.
- URL ve publishable key birlikte sağlanırsa gerçek hesap, hane, bakım planı,
  davet ve ortak kayıt görünümü kullanan production modu.

Production modu auth, hane/davet, şifreli SQLite cache, scoped offline outbox,
Realtime invalidation ve 30 günlük geçmiş içerir. Migration henüz gerçek Supabase
stack'inde çalıştırılmadığı ve iki fiziksel cihazlı akış doğrulanmadığı için dış
pilot hazır olduğu iddia edilmez. Push ve ödeme de henüz bağlı değildir.

Native veritabanı SQLCipher kullanır; bu nedenle Expo Go değil development build
gerekir. Veritabanı anahtarı cihazın SecureStore alanında tutulur. Web demo
SQLCipher kapsamı dışındadır ve hassas gerçek veri pilotu için hedef değildir.

## Komutlar

```bash
npm install
npm run typecheck
npm run lint
npm test
npx expo export --platform android
```

Native geliştirme için `npm run android` veya `npm run ios` ile development
build kullanın. Ortam anahtarları için `.env.example` dosyasını esas alın.

Ürün kapsamı ve beta kapısı için `../../B2C/docs/07-mvp-uygulama-durumu.md`
belgesine bakın.
