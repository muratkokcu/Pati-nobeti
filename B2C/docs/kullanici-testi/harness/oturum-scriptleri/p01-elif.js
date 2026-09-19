// p01-elif — oturum script'leri, çalıştırılma sırasına göre (17 adet).
// Her blok ayrı bir `node <dosya>.js` çalıştırmasıdır; harness API'si için ../README.md.

// ===== s1a.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  console.log(await s.goto('/'));
  await s.shot('01-ilk-acilis');
});

// ===== s1b.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  await s.goto('/');
  console.log("=== 08:00 'Yeni kayıt ekle' bastım ===");
  console.log(await s.tap('Yeni kayıt ekle'));
  await s.shot('02-cifte-kayit-ekrani');
});

// ===== s1c.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  await s.goto('/');
  await s.tap('Yeni kayıt ekle');
  console.log("=== 'Yapıldı'ya bastım (Deniz zaten vermişti) ===");
  console.log(await s.tap('Yapıldı'));
  await s.shot('03-yapildi-sonrasi');
});

// ===== s1d.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  await s.goto('/');
  console.log(await s.tab('Geçmiş'));
  await s.shot('04-gecmis');
});

// ===== s1e.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  await s.goto('/');
  console.log(await s.tab('Planlar'));
  await s.shot('05-planlar');
});

// ===== s1f.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  await s.goto('/plans');
  console.log("=== Sabah bakımı satırına dokundum ===");
  try { console.log(await s.tap('Sabah bakımı')); } catch(e) { console.log('HATA: '+e.message); }
  console.log("=== hatırlatıcı kur ===");
  try { console.log(await s.tap('20:00 için yerel hatırlatıcı kur')); } catch(e) { console.log('HATA: '+e.message); }
  await s.shot('06-hatirlatici');
});

// ===== s1g.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  await s.goto('/');
  console.log(await s.tab('Hane'));
  await s.shot('07-hane');
});

// ===== s1h.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  await s.goto('/household');
  console.log(await s.tap('Birini davet et'));
  await s.shot('08-davet');
});

// ===== s1i.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  await s.goto('/');
  console.log("=== Plus kartı ===");
  console.log(await s.tap('Plus önizlemesini incele'));
  await s.shot('09-plus');
});

// ===== s1j.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  await s.goto('/');
  console.log("=== çevrimdışı provayı açtım ===");
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.shot('10-cevrimdisi');
  console.log("=== akşam dozunu kaydediyorum (çevrimdışıyken) ===");
  console.log(await s.tap('Durum kaydet'));
  console.log(await s.tap('Yapıldı'));
  await s.shot('11-cevrimdisi-kayit');
});

// ===== s1k.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  await s.goto('/');
  console.log("=== çevrimdışıyı kapattım ===");
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  console.log("=== 20:00'e çelişkili kayıt: Atlandı ===");
  await s.tap('Yeni kayıt ekle', { nth: 1 });
  console.log(await s.tap('Atlandı'));
  await s.shot('12-celiski');
});

// ===== s1l.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  await s.goto('/');
  await s.shot('12-celiski-bugun');
  console.log(await s.tab('Geçmiş'));
  await s.shot('13-gecmis-celiski');
});

// ===== s2a.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  console.log("=== ERTESİ GÜN: uygulamayı açtım ===");
  console.log(await s.goto('/'));
  await s.shot('20-ertesi-gun');
  console.log("=== Geçmiş: 'bu sabah kim verdi?' ===");
  console.log(await s.tab('Geçmiş'));
  await s.shot('21-ertesi-gecmis');
});

// ===== s2b.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  await s.goto('/household');
  await s.tap('Birini davet et');
  console.log("=== Demo hanesine katıl bastım ===");
  console.log(await s.tap('Demo hanesine katıl'));
  await s.shot('22-davet-katil');
});

// ===== s2c.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  console.log("=== katıl sonrası Hane ===");
  console.log(await s.tab('Hane'));
  console.log("=== Geçmişte bir kayda dokunmayı denedim (yanlış kaydı düzeltmek için) ===");
  await s.tab('Geçmiş');
  try { console.log(await s.tap('Atlandı kaydı')); } catch(e){ console.log('HATA: '+e.message); }
  await s.shot('23-kayit-duzeltme');
});

// ===== s2d.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  await s.goto('/');
  await s.page.mouse.wheel(0, 1200); await s.wait(700);
  await s.shot('24-bugun-alt');
  console.log("=== 08:00'e 'Emin değilim' ekledim ===");
  await s.tap('Yeni kayıt ekle');
  console.log(await s.tap('Emin değilim'));
  await s.shot('25-emin-degilim');
});

// ===== s2e.js =====
const { withApp } = require('./app');
withApp('p01-elif', async (s) => {
  await s.goto('/household');
  console.log("=== çelişkiden çıkmanın tek yolu: Demoyu başlangıca döndür ===");
  console.log(await s.tap('Demoyu başlangıca döndür'));
  await s.wait(800);
  console.log("=== Bugün ===");
  console.log(await s.tab('Bugün'));
  await s.shot('26-reset-sonrasi');
});
