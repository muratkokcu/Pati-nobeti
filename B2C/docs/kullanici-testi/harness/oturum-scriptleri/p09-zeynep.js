// p09-zeynep — oturum script'leri, çalıştırılma sırasına göre (19 adet).
// Her blok ayrı bir `node <dosya>.js` çalıştırmasıdır; harness API'si için ../README.md.

// ===== z1.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  console.log(await s.goto('/'));
  await s.shot('z-01-bugun');
});

// ===== z2.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/');
  console.log(await s.tap('Durum kaydet'));
  await s.shot('z-02-durum-kaydet');
});

// ===== z3.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/');
  await s.tap('Durum kaydet');
  console.log(await s.tap('Emin değilim'));
  await s.shot('z-03-emin-degilim');
});

// ===== z4.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/');
  console.log(await s.tap('Yeni kayıt ekle', { nth: 1 }));
  await s.shot('z-04-ikinci-kayit');
});

// ===== z5.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/');
  await s.tap('Yeni kayıt ekle', { nth: 1 });
  console.log(await s.tap('Yapıldı'));
  await s.shot('z-05-cift-kayit-sonrasi');
});

// ===== z6.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/');
  console.log(await s.tab('Geçmiş'));
  await s.shot('z-06-gecmis');
});

// ===== z7.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/history');
  // sayfayı sonuna kadar kaydır
  for (let i=0;i<6;i++){ await s.page.mouse.wheel(0, 800); await s.wait(400); }
  console.log(await s.screen());
  console.log('--- sayfa yüksekliği ---');
  console.log(await s.page.evaluate(() => document.body.scrollHeight + ' / görünen ' + window.innerHeight));
  await s.shot('z-07-gecmis-alt');
});

// ===== z8.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/plans');
  console.log(await s.screen());
  await s.shot('z-08-planlar');
});

// ===== z9.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/plans');
  console.log(await s.tap('20:00 için yerel hatırlatıcı kur'));
  await s.shot('z-09-hatirlatici');
});

// ===== z10.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/household');
  console.log(await s.screen());
  await s.shot('z-10-hane');
});

// ===== z11.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/household');
  console.log(await s.tap('Birini davet et'));
  await s.shot('z-11-davet');
});

// ===== z12.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/');
  console.log(await s.tap('Plus önizlemesini incele'));
  await s.shot('z-12-plus');
});

// ===== z13.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/');
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  console.log('=== sabah bakımına ikinci kayıt: Atlandı ===');
  await s.tap('Yeni kayıt ekle', { nth: 0 });
  console.log(await s.tap('Atlandı'));
  await s.shot('z-13-cevrimdisi');
});

// ===== z14.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/history');
  console.log(await s.screen());
  // bir kaydın üstüne dokunup düzeltebiliyor muyum?
  try { console.log('--- kayda dokun ---'); console.log(await s.tap('Atlandı')); }
  catch(e){ console.log('HATA: ' + e.message); }
  await s.shot('z-14-gecmis-catisma');
});

// ===== z15.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  console.log('=== OTURUM 2: uygulamayı yeniden açtım ===');
  console.log(await s.goto('/'));
  await s.shot('z-15-oturum2-acilis');
});

// ===== z16.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/');
  console.log('=== çevrimdışı provayı kapat ===');
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.wait(1500);
  console.log('=== geçmiş ===');
  console.log(await s.tab('Geçmiş'));
  await s.shot('z-16-kuyruk-bosaldi-mi');
});

// ===== z17.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/');
  for (const l of ['Luna','ortak bakım kaydı']) {
    try { console.log('### dokun: '+l); console.log(await s.tap(l)); }
    catch(e){ console.log('HATA ('+l+'): '+e.message); }
  }
});

// ===== z18.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/');
  console.log('=== yanlış "atlandı" kaydını düzeltmek için üçüncü kayıt: Yapıldı ===');
  await s.tap('Yeni kayıt ekle', { nth: 0 });
  console.log(await s.tap('Yapıldı'));
  console.log('=== geçmiş ===');
  console.log(await s.tab('Geçmiş'));
  await s.shot('z-18-duzeltme-denemesi');
});

// ===== z19.js =====
const { withApp } = require('./app');
withApp('p09-zeynep', async (s) => {
  await s.goto('/household');
  console.log('=== Demoyu başlangıca döndür ===');
  console.log(await s.tap('Demoyu başlangıca döndür'));
  await s.wait(1000);
  console.log('=== geçmiş sonrası ===');
  console.log(await s.tab('Geçmiş'));
  await s.shot('z-19-reset');
});
