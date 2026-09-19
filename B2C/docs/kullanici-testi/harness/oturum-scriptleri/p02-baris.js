// p02-baris — oturum script'leri, çalıştırılma sırasına göre (16 adet).
// Her blok ayrı bir `node <dosya>.js` çalıştırmasıdır; harness API'si için ../README.md.

// ===== sess-p02-baris-1.js =====
const { withApp } = require('./app');
withApp('p02-baris', async (s) => {
  console.log('### AÇILIŞ');
  console.log(await s.goto('/'));
  await s.shot('s1-01-acilis');
});

// ===== sess-p02-baris-2.js =====
const { withApp } = require('./app');
withApp('p02-baris', async (s) => {
  await s.goto('/');
  console.log('### DOKUNUŞ 1: Durum kaydet');
  console.log(await s.tap('Durum kaydet'));
  await s.shot('s1-02-durum-kaydet');
});

// ===== sess-p02-baris-3.js =====
const { withApp } = require('./app');
withApp('p02-baris', async (s) => {
  await s.goto('/');
  await s.tap('Durum kaydet');
  console.log('### DOKUNUŞ 2: Yapıldı');
  console.log(await s.tap('Yapıldı'));
  await s.shot('s1-03-yapildi');
  console.log('\n### 1sn sonra tekrar ekran');
  await s.wait(1500);
  console.log(await s.screen());
});

// ===== sess-p02-baris-4.js =====
const { withApp } = require('./app');
withApp('p02-baris', async (s) => {
  await s.goto('/');
  console.log('### Akşam bakımına ikinci kayıt: "Yeni kayıt ekle" (nth=1)');
  console.log(await s.tap('Yeni kayıt ekle', { nth: 1 }));
  await s.shot('s1-04-ikinci-kayit-ekran');
  console.log('\n### Yapıldı diyorum yine');
  console.log(await s.tap('Yapıldı'));
  await s.shot('s1-05-cifte-kayit');
});

// ===== sess-p02-baris-5.js =====
const { withApp } = require('./app');
withApp('p02-baris', async (s) => {
  await s.goto('/');
  console.log('### GEÇMİŞ');
  console.log(await s.tab('Geçmiş'));
  await s.shot('s1-06-gecmis');
});

// ===== sess-p02-baris-6.js =====
const { withApp } = require('./app');
withApp('p02-baris', async (s) => {
  await s.goto('/');
  console.log('### HANE');
  console.log(await s.tab('Hane'));
  await s.shot('s1-07-hane');
});

// ===== sess-p02-baris-7.js =====
const { withApp } = require('./app');
withApp('p02-baris', async (s) => {
  await s.goto('/household');
  console.log('### DAVET EKRANI');
  console.log(await s.tap('Birini davet et'));
  await s.shot('s1-08-davet');
});

// ===== sess-p02-baris-8.js =====
const { withApp } = require('./app');
withApp('p02-baris', async (s) => {
  await s.goto('/household');
  await s.tap('Birini davet et');
  console.log('### KATIL');
  console.log(await s.tap('Demo hanesine katıl'));
  await s.shot('s1-09-katildim');
  console.log('\n### HANE tekrar');
  console.log(await s.tab('Hane'));
});

// ===== sess-p02-baris-9.js =====
const { withApp } = require('./app');
withApp('p02-baris', async (s) => {
  await s.goto('/');
  console.log('### PLANLAR');
  console.log(await s.tab('Planlar'));
  await s.shot('s1-10-planlar');
});

// ===== sess-p02-baris-10.js =====
const { withApp } = require('./app');
withApp('p02-baris', async (s) => {
  await s.goto('/plans');
  console.log('### HATIRLATICI KUR');
  console.log(await s.tap('20:00 için yerel hatırlatıcı kur'));
  await s.shot('s1-11-hatirlatici');
  await s.wait(1200);
  console.log('\n### sonra');
  console.log(await s.screen());
});

// ===== sess-p02-baris-11.js =====
const { withApp } = require('./app');
withApp('p02-baris', async (s) => {
  console.log('### ERTESİ GÜN — açılış (veriler duruyor mu?)');
  console.log(await s.goto('/'));
  await s.shot('s2-01-ertesi-gun');
  console.log('\n### GEÇMİŞ hâlâ duruyor mu');
  console.log(await s.tab('Geçmiş'));
});

// ===== sess-p02-baris-12.js =====
const { withApp } = require('./app');
withApp('p02-baris', async (s) => {
  console.log('### Doğrudan kayıt ekranı (kısayol denemesi)');
  console.log(await s.goto('/record/occ-morning'));
  await s.shot('s2-02-kisayol');
});

// ===== sess-p02-baris-13.js =====
const { withApp } = require('./app');
withApp('p02-baris', async (s) => {
  await s.goto('/');
  console.log('### ÇEVRİMDIŞI PROVA AÇIK');
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.shot('s2-03-cevrimdisi');
  console.log('\n### Çevrimdışıyken kayıt: Yeni kayıt ekle (sabah)');
  console.log(await s.tap('Yeni kayıt ekle', { nth: 0 }));
  console.log('\n### Atlandı diyorum');
  console.log(await s.tap('Atlandı'));
  await s.shot('s2-04-cevrimdisi-kayit');
});

// ===== sess-p02-baris-14.js =====
const { withApp } = require('./app');
withApp('p02-baris', async (s) => {
  await s.goto('/');
  console.log('### Çakışma satırına dokunmayı dene');
  try { console.log(await s.tap('Aynı görev için farklı kayıtlar var')); }
  catch (e) { console.log('DOKUNULAMADI: ' + e.message); }
  console.log('\n### GEÇMİŞ');
  console.log(await s.tab('Geçmiş'));
  await s.shot('s2-05-gecmis-cakisma');
});

// ===== sess-p02-baris-15.js =====
const { withApp } = require('./app');
withApp('p02-baris', async (s) => {
  await s.goto('/');
  console.log('### PLUS');
  console.log(await s.tap('Plus önizlemesini incele'));
  await s.shot('s2-06-plus');
});

// ===== sess-p02-baris-16.js =====
const { withApp } = require('./app');
withApp('p02-baris', async (s) => {
  await s.goto('/history');
  console.log('### Yanlış kaydı silebilir miyim? Geçmiş satırına dokun');
  try { console.log(await s.tap('Atlandı kaydı')); }
  catch (e) { console.log('DOKUNULAMADI: ' + e.message); }
  console.log('\n### Çevrimdışıyı kapatınca sıradaki kayıt ne oluyor');
  console.log(await s.tab('Bugün'));
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.wait(1500);
  console.log(await s.screen());
  await s.shot('s2-07-online-donus');
});
