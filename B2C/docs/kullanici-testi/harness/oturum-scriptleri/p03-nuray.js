// p03-nuray — oturum script'leri, çalıştırılma sırasına göre (17 adet).
// Her blok ayrı bir `node <dosya>.js` çalıştırmasıdır; harness API'si için ../README.md.

// ===== sess-p03-nuray-1.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  console.log('=== AÇILIŞ ===');
  console.log(await s.goto('/'));
  await s.shot('01-acilis');
});

// ===== sess-p03-nuray-2.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  await s.goto('/');
  console.log('=== DURUM KAYDET basiyorum ===');
  console.log(await s.tap('Durum kaydet'));
  await s.shot('02-durum-kaydet');
});

// ===== sess-p03-nuray-3.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  await s.goto('/');
  await s.tap('Durum kaydet');
  console.log('=== YAPILDI basiyorum ===');
  console.log(await s.tap('Yapıldı'));
  await s.shot('03-yapildi-sonrasi');
});

// ===== sess-p03-nuray-4.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  await s.goto('/');
  console.log('=== ikinci Yeni kayit ekle (aksam) ===');
  let sc = await s.tap('Yeni kayıt ekle', { nth: 1 });
  console.log(sc);
  await s.shot('04-ikinci-kayit-ekrani');
  if (sc.includes('Akşam')) {
    console.log('=== bu sefer ATLANDI diyorum ===');
    console.log(await s.tap('Atlandı'));
    await s.shot('05-atlandi-sonrasi');
  }
});

// ===== sess-p03-nuray-5.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  await s.goto('/');
  console.log('=== GECMIS ===');
  console.log(await s.tab('Geçmiş'));
  await s.shot('06-gecmis');
});

// ===== sess-p03-nuray-6.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  await s.goto('/');
  console.log('=== PLANLAR ===');
  console.log(await s.tab('Planlar'));
  await s.shot('07-planlar');
});

// ===== sess-p03-nuray-7.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  await s.goto('/plans');
  console.log('=== HATIRLATICI KUR ===');
  console.log(await s.tap('yerel hatırlatıcı kur'));
  await s.shot('08-hatirlatici');
});

// ===== sess-p03-nuray-8.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  await s.goto('/');
  console.log('=== HANE ===');
  console.log(await s.tab('Hane'));
  await s.shot('09-hane');
});

// ===== sess-p03-nuray-9.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  await s.goto('/household');
  console.log('=== BIRINI DAVET ET ===');
  console.log(await s.tap('Birini davet et'));
  await s.shot('10-davet');
});

// ===== sess-p03-nuray-10.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  await s.goto('/');
  console.log('=== ANAHTARI CEVIRIYORUM ===');
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.shot('11-cevrimdisi');
  console.log('=== simdi kayit eklemeyi deneyeyim (sabah) ===');
  console.log(await s.tap('Yeni kayıt ekle', { nth: 0 }));
  console.log(await s.tap('Yapıldı'));
  await s.shot('12-cevrimdisi-kayit');
});

// ===== sess-p03-nuray-11.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  await s.goto('/');
  console.log('=== PLUS ===');
  console.log(await s.tap('Plus önizlemesini incele'));
  await s.shot('13-plus');
});

// ===== sess-p03-nuray-12.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  await s.goto('/');
  await s.tab('Geçmiş');
  await s.tab('Hane');
  console.log('=== Hane -> Birini davet et -> GERI ===');
  await s.tap('Birini davet et');
  const a = await s.back();
  console.log(a.split('\n').slice(0,4).join('\n'));
  console.log('--- bir daha geri ---');
  const b = await s.back();
  console.log(b.split('\n').slice(0,4).join('\n'));
  console.log('--- bir daha geri ---');
  const c = await s.back();
  console.log(c.split('\n').slice(0,4).join('\n'));
});

// ===== sess-p03-nuray-13.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  console.log('=== ERTESI GUN ACILIS ===');
  console.log(await s.goto('/'));
  await s.shot('20-ertesi-gun');
  console.log('=== GECMIS ===');
  console.log(await s.tab('Geçmiş'));
  await s.shot('21-ertesi-gecmis');
});

// ===== sess-p03-nuray-14.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  await s.goto('/');
  console.log('=== anahtari geri kapatiyorum ===');
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.shot('22-anahtar-kapali');
  console.log('=== GECMIS: bekleyen kayit ne oldu? ===');
  console.log(await s.tab('Geçmiş'));
});

// ===== sess-p03-nuray-15.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  await s.goto('/');
  console.log('=== sabah icin EMIN DEGILIM ===');
  await s.tap('Yeni kayıt ekle', { nth: 0 });
  console.log(await s.tap('Emin değilim'));
  await s.shot('23-emin-degilim');
  console.log('=== GECMIS ===');
  console.log(await s.tab('Geçmiş'));
  await s.shot('24-gecmis-son');
});

// ===== sess-p03-nuray-16.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  await s.goto('/household');
  console.log('=== DEMOYU BASLANGICA DONDUR basiyorum ===');
  console.log(await s.tap('Demoyu başlangıca döndür'));
  await s.shot('25-reset-sonrasi');
  console.log('=== GECMIS: kayitlarim duruyor mu? ===');
  console.log(await s.tab('Geçmiş'));
});

// ===== sess-p03-nuray-17.js =====
const { withApp } = require('./app');
withApp('p03-nuray', async (s) => {
  console.log(await s.goto('/'));
  await s.shot('26-reset-sonrasi-bugun');
});
