// p05-can — oturum script'leri, çalıştırılma sırasına göre (18 adet).
// Her blok ayrı bir `node <dosya>.js` çalıştırmasıdır; harness API'si için ../README.md.

// ===== sess-p05-can-1.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  console.log(await s.goto('/'));
  await s.shot('01-ilk-acilis');
});

// ===== sess-p05-can-1b.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  await s.goto('/');
  console.log("=== HANE ===");
  console.log(await s.tab('Hane'));
  await s.shot('02-hane');
});

// ===== sess-p05-can-1c.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  await s.goto('/household');
  console.log("=== DAVET ===");
  console.log(await s.tap('Birini davet et'));
  await s.shot('03-davet');
});

// ===== sess-p05-can-1d.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  await s.goto('/household');
  await s.tap('Birini davet et');
  console.log("=== KATIL ===");
  console.log(await s.tap('Demo hanesine katıl'));
  await s.shot('04-katil-sonrasi');
  console.log("=== HANE TEKRAR ===");
  console.log(await s.tab('Hane'));
});

// ===== sess-p05-can-1e.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  await s.goto('/plans');
  console.log("=== PLANLAR ===");
  console.log(await s.screen());
  await s.shot('05-planlar');
});

// ===== sess-p05-can-1f.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  await s.goto('/plans');
  console.log(await s.page.evaluate(() => document.body.scrollHeight + ' x ' + window.innerHeight));
  await s.page.mouse.wheel(0, 800); await s.wait(600);
  console.log("=== PLANLAR SCROLL ===");
  console.log(await s.screen());
  console.log("=== HATIRLATICI ===");
  console.log(await s.tap('20:00 için yerel hatırlatıcı kur'));
  await s.shot('06-hatirlatici');
});

// ===== sess-p05-can-1g.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  await s.goto('/');
  console.log("=== DURUM KAYDET ===");
  console.log(await s.tap('Durum kaydet'));
  await s.shot('07-kayit-ekrani');
});

// ===== sess-p05-can-1h.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  await s.goto('/');
  await s.tap('Durum kaydet');
  console.log("=== YAPILDI ===");
  console.log(await s.tap('Yapıldı'));
  await s.shot('08-yapildi-sonrasi');
});

// ===== sess-p05-can-1i.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  await s.goto('/');
  console.log("=== IKINCI KEZ (aksam) ===");
  console.log(await s.tap('Yeni kayıt ekle', {nth:1}));
  console.log("=== YAPILDI TEKRAR ===");
  console.log(await s.tap('Yapıldı'));
  await s.shot('09-cifte-kayit');
});

// ===== sess-p05-can-1j.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  await s.goto('/history');
  console.log("=== GECMIS ===");
  console.log(await s.screen());
  await s.shot('10-gecmis');
  await s.page.mouse.wheel(0, 900); await s.wait(600);
  console.log("=== GECMIS SCROLL ===");
  console.log(await s.screen());
  await s.shot('11-gecmis-alt');
});

// ===== sess-p05-can-1k.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  await s.goto('/');
  console.log("=== PLUS ===");
  console.log(await s.tap('Plus önizlemesini incele'));
  await s.shot('12-plus');
  await s.page.mouse.wheel(0, 900); await s.wait(600);
  console.log("=== PLUS SCROLL ===");
  console.log(await s.screen());
  await s.shot('13-plus-alt');
});

// ===== sess-p05-can-1l.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  await s.goto('/');
  console.log("=== CEVRIMDISI ACIK ===");
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.shot('14-cevrimdisi');
  console.log("=== OFFLINE KAYIT (sabah) ===");
  console.log(await s.tap('Yeni kayıt ekle', {nth:0}));
  console.log(await s.tap('Emin değilim'));
  await s.shot('15-offline-kayit');
});

// ===== sess-p05-can-1m.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  await s.goto('/');
  console.log("=== CAKISMA KARTINA DOKUN ===");
  try { console.log(await s.tap('Aynı görev için farklı kayıtlar var')); } catch(e) { console.log('HATA: '+e.message); }
  await s.shot('16-cakisma');
  console.log("=== GECMIS (cakisma) ===");
  console.log(await s.tab('Geçmiş'));
  await s.shot('17-gecmis-cakisma');
});

// ===== sess-p05-can-1n.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  await s.goto('/');
  console.log("=== LUNA basligina dokun ===");
  try { console.log(await s.tap('Luna')); } catch(e){ console.log('HATA: '+e.message); }
  console.log("=== PLAN kartina dokun ===");
  await s.goto('/plans');
  try { console.log(await s.tap('Sabah bakımı')); } catch(e){ console.log('HATA: '+e.message); }
  console.log("=== uye kartina dokun ===");
  await s.goto('/household');
  try { console.log(await s.tap('Deniz')); } catch(e){ console.log('HATA: '+e.message); }
});

// ===== sess-p05-can-2.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  console.log("=== ERTESI GUN ACILIS ===");
  console.log(await s.goto('/'));
  await s.shot('20-ertesi-gun');
  console.log("=== GECMIS ===");
  console.log(await s.tab('Geçmiş'));
});

// ===== sess-p05-can-2b.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  await s.goto('/');
  console.log("=== CEVRIMDISI KAPAT ===");
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.wait(1500);
  console.log("=== GECMIS SONRA ===");
  console.log(await s.tab('Geçmiş'));
  await s.shot('21-online-sonrasi');
});

// ===== sess-p05-can-2c.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  await s.goto('/');
  for (let i=0;i<6;i++){
    await s.tap('Yeni kayıt ekle', {nth:1});
    await s.tap(i%2? 'Atlandı':'Yapıldı');
  }
  console.log("=== 6 KAYIT SONRASI GECMIS ===");
  console.log(await s.tab('Geçmiş'));
  await s.shot('22-cok-kayit');
});

// ===== sess-p05-can-2d.js =====
const { withApp } = require('./app');
withApp('p05-can', async (s) => {
  console.log("=== BUGUN (8 kayit sonrasi) ===");
  console.log(await s.goto('/'));
  await s.shot('23-bugun-kalabalik');
  console.log("=== ILGILENIYORUM ===");
  await s.goto('/paywall');
  console.log(await s.tap('İlgileniyorum'));
  await s.shot('24-ilgileniyorum');
});
