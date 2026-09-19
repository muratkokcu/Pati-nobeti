# Test harness

Personaların uygulamayı gerçekten kullanması için kullanılan araç. Ayrıntı ve sınırlar:
`../00-yontem-ve-tekrar-calistirma.md`.

## Kurulum

```bash
# playwright-core (tarayıcı indirmez; sistemdeki Chromium'u kullanır)
mkdir -p /tmp/patinobeti-harness && cd /tmp/patinobeti-harness
npm init -y && npm install playwright-core
cp <bu-klasör>/app.js <bu-klasör>/serve-web.js .

# Chromium yolu (varsayılan: ~/.cache/ms-playwright/chromium-*/chrome-linux64/chrome)
export CHROMIUM_PATH=/path/to/chrome
```

## Çalıştırma

```bash
cd apps/mobile
npx expo export --platform web --output-dir /tmp/patinobeti-harness/web-build

cd /tmp/patinobeti-harness
node serve-web.js ./web-build 4321     # COOP/COEP başlıklı statik sunucu
node sess-p01.js                        # kendi persona script'in
```

`npx expo start --web` kullanılamaz: `web.output: "static"` + web worker birleşimi Metro'da
`Worker chunk not found` hatası verir (expo/expo#50153).

## API

```js
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  await s.goto('/');                          // uygulamayı aç
  await s.screen();                           // görünen her şey + dokunulabilir öğeler
  await s.tap('Durum kaydet');                // etikete dokun
  await s.tab('Geçmiş');                      // Bugün | Planlar | Geçmiş | Hane
  await s.toggle('Çevrimdışı provayı aç');    // anahtar (aria-label ile)
  await s.back();
  await s.wait(800);
  await s.shot('01-gecmis');                  // ekran görüntüsü
});
```

- Profil `sessions/<persona>/profile` altında kalıcıdır: aynı persona ile ikinci çalıştırma
  "ertesi gün açtım" demektir. Sıfırdan başlamak için o klasörü sil.
- `APP_URL` ile sunucu adresi değiştirilebilir (varsayılan `http://localhost:4321`).
- `KIT.md` personalara verilen brifingdir; tekrar testte değiştirilmeden kullanılmalı.

## oturum-scriptleri/

Personaların 1. turda gerçekten çalıştırdığı script'ler, persona başına tek dosyada ve
çalıştırılma sırasına göre. Bir bulgunun hangi adımlarla üretildiğini buradan izleyebilirsin.
