// p06-aylin — oturum script'leri, çalıştırılma sırasına göre (16 adet).
// Her blok ayrı bir `node <dosya>.js` çalıştırmasıdır; harness API'si için ../README.md.

// ===== sess-p06-aylin-1.js =====
const { withApp } = require('./app');
withApp('p06-aylin', async (s) => {
  console.log(await s.goto('/'));
  await s.shot('01-ilk-acilis');
});

// ===== sess-p06-aylin-2.js =====
const { withApp } = require('./app');
withApp('p06-aylin', async (s) => {
  await s.goto('/');
  console.log("=== HANE ===");
  console.log(await s.tab('Hane'));
  await s.shot('02-hane');
  console.log("=== PLANLAR ===");
  console.log(await s.tab('Planlar'));
  await s.shot('03-planlar');
});

// ===== sess-p06-aylin-3.js =====
const { withApp } = require('./app');
withApp('p06-aylin', async (s) => {
  await s.goto('/');
  console.log("=== GECMIS ===");
  console.log(await s.tab('Geçmiş'));
  await s.shot('04-gecmis');
  console.log("=== DURUM KAYDET (aksam) ===");
  await s.tab('Bugün');
  console.log(await s.tap('Durum kaydet'));
  await s.shot('05-durum-kaydet');
});

// ===== sess-p06-aylin-4.js =====
const { withApp } = require('./app');
withApp('p06-aylin', async (s) => {
  await s.goto('/record/occ-evening');
  console.log(await s.tap('Yapıldı'));
  await s.shot('06-yapildi-sonrasi');
  console.log("=== TEKRAR KAYDET DENEMESI ===");
  await s.tab('Bugün');
  console.log(await s.screen());
});

// ===== sess-p06-aylin-5.js =====
const { withApp } = require('./app');
withApp('p06-aylin', async (s) => {
  await s.goto('/');
  console.log("=== Luna adina dokun (hayvan degistirici var mi?) ===");
  try { console.log(await s.tap('Luna')); } catch(e) { console.log('HATA: ' + e.message); }
  await s.shot('07-luna-tap');
  console.log("=== Avatar L ===");
  try { console.log(await s.tap('ortak bakım kaydı')); } catch(e) { console.log('HATA: ' + e.message); }
});

// ===== sess-p06-aylin-6.js =====
const { withApp } = require('./app');
withApp('p06-aylin', async (s) => {
  await s.goto('/');
  console.log("=== CIFTE KAYIT: aksam icin ikinci kez ===");
  console.log(await s.tap('Yeni kayıt ekle', {nth:1}));
  await s.shot('08-ikinci-kayit-ekrani');
  console.log("--- Yapildi tekrar ---");
  console.log(await s.tap('Yapıldı'));
  await s.wait(1200);
  await s.tab('Geçmiş');
  console.log(await s.screen());
  await s.shot('09-gecmis-cift');
});

// ===== sess-p06-aylin-7.js =====
const { withApp } = require('./app');
withApp('p06-aylin', async (s) => {
  await s.goto('/');
  await s.tab('Hane');
  console.log("=== DAVET ===");
  console.log(await s.tap('Birini davet et'));
  await s.shot('10-davet');
  await s.wait(500);
  console.log("=== PLUS ===");
  await s.tab('Bugün');
  console.log(await s.tap('Plus önizlemesini incele'));
  await s.shot('11-plus');
});

// ===== sess-p06-aylin-8.js =====
const { withApp } = require('./app');
withApp('p06-aylin', async (s) => {
  await s.goto('/plans');
  await s.shot('12-planlar-tam');
  console.log("=== PLAN SATIRINA DOKUN (Sabah bakimi) ===");
  try { console.log(await s.tap('Sabah bakımı')); } catch(e){ console.log('HATA: '+e.message); }
  console.log("=== HATIRLATICI ===");
  await s.goto('/plans');
  console.log(await s.tap('yerel hatırlatıcı kur'));
  await s.shot('13-hatirlatici');
});

// ===== sess-p06-aylin-9.js =====
const { withApp } = require('./app');
withApp('p06-aylin', async (s) => {
  await s.goto('/');
  console.log("=== CEVRIMDISI AC ===");
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.shot('14-cevrimdisi');
  console.log("=== CEVRIMDISI KAYIT (sabah) ===");
  console.log(await s.tap('Yeni kayıt ekle', {nth:0}));
  console.log(await s.tap('Emin değilim'));
  await s.wait(1200);
  console.log(await s.screen());
  await s.shot('15-cevrimdisi-kayit');
});

// ===== sess-p06-aylin-10.js =====
const { withApp } = require('./app');
withApp('p06-aylin', async (s) => {
  await s.goto('/history');
  console.log(await s.screen());
  await s.shot('16-gecmis-catisma');
  console.log("=== Gecmis satirina dokun (detay/paylas var mi) ===");
  try { console.log(await s.tap('Yapıldı kaydı')); } catch(e){ console.log('HATA: '+e.message); }
});

// ===== sess-p06-aylin-11.js =====
const { withApp } = require('./app');
withApp('p06-aylin', async (s) => {
  console.log("=== 2. OTURUM: uygulamayi yeniden actim ===");
  console.log(await s.goto('/'));
  await s.shot('20-oturum2-acilis');
  console.log("=== GECMIS DURUYOR MU ===");
  console.log(await s.tab('Geçmiş'));
});

// ===== sess-p06-aylin-12.js =====
const { withApp } = require('./app');
withApp('p06-aylin', async (s) => {
  await s.goto('/');
  console.log("=== Cevrimdisi kapat, sira ne oluyor ===");
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.wait(1200);
  console.log(await s.tab('Geçmiş'));
  console.log("=== HANE: uyeye dokun (cikar/devret var mi) ===");
  await s.tab('Hane');
  try { console.log(await s.tap('Deniz')); } catch(e){ console.log('HATA: '+e.message); }
});

// ===== sess-p06-aylin-13.js =====
const { withApp } = require('./app');
withApp('p06-aylin', async (s) => {
  await s.goto('/household');
  console.log(await s.tap('Birini davet et'));
  console.log("=== KATIL ===");
  console.log(await s.tap('Demo hanesine katıl'));
  await s.wait(1200);
  await s.shot('21-katil-sonrasi');
  console.log("=== HANE SONRASI ===");
  console.log(await s.tab('Hane'));
});

// ===== sess-p06-aylin-14.js =====
const { withApp } = require('./app');
withApp('p06-aylin', async (s) => {
  await s.goto('/household');
  await s.tap('Birini davet et');
  await s.shot('22-davet-ekrani');
  await s.goto('/paywall');
  await s.shot('23-paywall');
  console.log(await s.tap('İlgileniyorum'));
  await s.goto('/history');
  await s.shot('24-gecmis-son');
});

// ===== sess-p06-aylin-15.js =====
const { withApp } = require('./app');
withApp('p06-aylin', async (s) => {
  await s.goto('/paywall');
  await s.tap('İlgileniyorum');
  await s.wait(1500);
  const scr = await s.screen();
  console.log(scr.split('\n').slice(0,6).join('\n'));
  await s.shot('25-ilgileniyorum-sonrasi');
});

// ===== sess-p06-aylin-16.js =====
const { withApp } = require('./app');
withApp('p06-aylin', async (s) => {
  await s.goto('/');
  await s.tap('Plus önizlemesini incele');
  await s.wait(800);
  await s.tap('İlgileniyorum');
  await s.wait(1500);
  console.log((await s.screen()).split('\n').slice(0,4).join('\n'));
});
