// p08-deniz — oturum script'leri, çalıştırılma sırasına göre (21 adet).
// Her blok ayrı bir `node <dosya>.js` çalıştırmasıdır; harness API'si için ../README.md.

// ===== sess-p08-deniz-1.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  console.log(await s.goto('/'));
  await s.shot('01-acilis');
});

// ===== sess-p08-deniz-2.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/');
  console.log("### HANE ###");
  console.log(await s.tab('Hane'));
  await s.shot('02-hane');
});

// ===== sess-p08-deniz-3.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/household');
  console.log("### Deniz satirina dokun ###");
  try { console.log(await s.tap('Deniz')); } catch(e){ console.log("HATA:", e.message); }
  console.log("### Murat satirina dokun ###");
  try { console.log(await s.tap('Hane sahibi')); } catch(e){ console.log("HATA:", e.message); }
  console.log("### Bakim veren etiketine dokun ###");
  try { console.log(await s.tap('Bakım veren')); } catch(e){ console.log("HATA:", e.message); }
});

// ===== sess-p08-deniz-4.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/household');
  console.log("### DAVET ###");
  console.log(await s.tap('Birini davet et'));
  await s.shot('03-davet');
});

// ===== sess-p08-deniz-5.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/invite/demo-invite');
  console.log("### KATIL bas ###");
  console.log(await s.tap('Demo hanesine katıl'));
  await s.wait(1000);
  console.log("### HANE tekrar ###");
  console.log(await s.tab('Hane'));
});

// ===== sess-p08-deniz-6.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/');
  console.log("### Durum kaydet (aksam) ###");
  console.log(await s.tap('Durum kaydet'));
  await s.shot('04-durum-kaydet');
});

// ===== sess-p08-deniz-7.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/record/occ-evening');
  console.log(await s.tap('Yapıldı'));
  await s.wait(1200);
  console.log("### sonra ekran ###");
  console.log(await s.screen());
  await s.shot('05-kayit-sonrasi');
});

// ===== sess-p08-deniz-8.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/record/occ-evening');
  console.log(await s.screen());
  console.log("### BUGUN ###");
  console.log(await s.tab('Bugün'));
});

// ===== sess-p08-deniz-9.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/');
  console.log("### ikinci kez ayni bakim: Yeni kayit ekle (nth=1 aksam) ###");
  console.log(await s.tap('Yeni kayıt ekle', {nth:1}));
  await s.wait(500);
  console.log("### Atlandi bas (celiskili kayit) ###");
  console.log(await s.tap('Atlandı'));
  await s.wait(1500);
  console.log("### BUGUN ###");
  console.log(await s.tab('Bugün'));
  await s.shot('06-cifte-kayit');
});

// ===== sess-p08-deniz-10.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/');
  console.log("### celiski satirina dokun ###");
  try { console.log(await s.tap('Aynı görev için farklı kayıtlar var')); } catch(e){ console.log("HATA:", e.message); }
  console.log("### GECMIS ###");
  console.log(await s.tab('Geçmiş'));
  await s.shot('07-gecmis');
});

// ===== sess-p08-deniz-11.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/plans');
  console.log(await s.screen());
  await s.shot('08-planlar');
});

// ===== sess-p08-deniz-12.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/plans');
  console.log(await s.tap('20:00 için yerel hatırlatıcı kur'));
  await s.wait(1500);
  console.log("### sonra ###");
  console.log(await s.screen());
  await s.shot('09-hatirlatici');
});

// ===== sess-p08-deniz-13.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/');
  console.log(await s.tap('Plus önizlemesini incele'));
  await s.wait(800);
  await s.shot('10-plus');
});

// ===== sess-p08-deniz-14.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/');
  console.log("### cevrimdisi AC ###");
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.wait(600);
  console.log("### kayit ekle (sabah) ###");
  console.log(await s.tap('Yeni kayıt ekle', {nth:0}));
  await s.wait(500);
  console.log(await s.tap('Emin değilim'));
  await s.wait(1500);
  console.log(await s.screen());
  await s.shot('11-cevrimdisi');
});

// ===== sess-p08-deniz-15.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/history');
  console.log(await s.screen());
  await s.shot('12-gecmis-celiskili');
});

// ===== sess-p08-deniz-16.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  console.log("### ERTESI GUN ACILIS ###");
  console.log(await s.goto('/'));
  await s.shot('13-gun2-acilis');
  console.log("### GECMIS duruyor mu ###");
  console.log(await s.tab('Geçmiş'));
});

// ===== sess-p08-deniz-17.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/');
  console.log("### cevrimdisi KAPAT ###");
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.wait(1500);
  console.log("### GECMIS ###");
  console.log(await s.tab('Geçmiş'));
  for (const r of ['/settings','/privacy','/export','/profile','/account','/kvkk']) {
    console.log("### " + r + " ###");
    try { console.log((await s.goto(r)).slice(0,400)); } catch(e){ console.log("HATA", e.message); }
  }
});

// ===== sess-p08-deniz-18.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/_sitemap');
  console.log(await s.screen());
});

// ===== sess-p08-deniz-19.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/household');
  console.log("### SIFIRLA bas ###");
  console.log(await s.tap('Demoyu başlangıca döndür'));
  await s.wait(1500);
  console.log("### sonra hane ###");
  console.log(await s.screen());
  console.log("### GECMIS ###");
  console.log(await s.tab('Geçmiş'));
  await s.shot('14-sifirlama-sonrasi');
});

// ===== sess-p08-deniz-20.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/');
  const ls = await s.page.evaluate(() => {
    const out = {};
    for (let i=0;i<localStorage.length;i++){ const k = localStorage.key(i); out[k] = (localStorage.getItem(k)||'').slice(0,900); }
    return out;
  });
  console.log(JSON.stringify(ls, null, 1));
});

// ===== sess-p08-deniz-21.js =====
const { withApp } = require('./app');
withApp('p08-deniz', async (s) => {
  await s.goto('/record/occ-morning');
  console.log("### ayni durumu (Yapildi) 2. kez ekle — Deniz zaten yapildi demisti ###");
  await s.tap('Yapıldı'); await s.wait(1500);
  console.log(await s.tab('Bugün'));
  console.log("### GECMIS ###");
  console.log(await s.tab('Geçmiş'));
});
