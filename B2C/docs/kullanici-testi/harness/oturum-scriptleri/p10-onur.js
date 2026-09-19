// p10-onur — oturum script'leri, çalıştırılma sırasına göre (23 adet).
// Her blok ayrı bir `node <dosya>.js` çalıştırmasıdır; harness API'si için ../README.md.

// ===== o1.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  console.log(await s.goto('/'));
  await s.shot('o1-01-acilis');
});

// ===== o2.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.goto('/');
  console.log(await s.tab('Planlar'));
  await s.shot('o1-02-planlar');
});

// ===== o3.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.goto('/plans');
  try { console.log('--- Sabah bakimi satirina dokundum ---'); console.log(await s.tap('Sabah bakımı')); }
  catch(e){ console.log('HATA: '+e.message); }
  try { console.log('--- 08:00 metnine dokundum ---'); console.log(await s.tap('08:00')); }
  catch(e){ console.log('HATA: '+e.message); }
});

// ===== o4.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.goto('/plans');
  console.log(await s.tap('yerel hatırlatıcı kur'));
  await s.shot('o1-03-hatirlatici');
  await s.wait(1500);
  console.log('--- 1.5 sn sonra ---');
  console.log(await s.screen());
});

// ===== o5.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.goto('/plans');
  console.log(await s.tap('yerel hatırlatıcı kur'));
  await s.wait(1200);
  console.log('--- tekrar bastim ---');
  console.log(await s.tap('yerel hatırlatıcı kur'));
  await s.shot('o1-04-hatirlatici-izinli');
}, { contextOptions: { permissions: ['notifications'] } });

// ===== o6.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.goto('/household');
  console.log(await s.screen());
  await s.shot('o1-05-hane');
});

// ===== o7.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.goto('/household');
  console.log(await s.tap('Birini davet et'));
  await s.shot('o1-06-davet');
});

// ===== o8.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.goto('/');
  const t0 = Date.now();
  console.log(await s.tap('Durum kaydet'));
  console.log('>>> gecen sure (ms): ' + (Date.now()-t0));
  await s.shot('o1-07-kayit-ekrani');
});

// ===== o9.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.goto('/record/occ-evening');
  console.log(await s.tap('Yapıldı'));
  await s.shot('o1-08-yapildi-sonrasi');
  await s.wait(1000);
  console.log('--- sonra Bugun ---');
  console.log(await s.tab('Bugün'));
});

// ===== o10.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.goto('/');
  console.log(await s.tap('Yeni kayıt ekle', {nth:1}));
  await s.wait(500);
  console.log('--- ikinci kez Yapildi ---');
  console.log(await s.tap('Yapıldı'));
  await s.wait(1500);
  console.log('--- Bugun ---');
  console.log(await s.tab('Bugün'));
  await s.shot('o1-09-cift-kayit');
});

// ===== o11.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.goto('/history');
  console.log(await s.screen());
  await s.shot('o1-10-gecmis');
});

// ===== o12.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.goto('/');
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.shot('o1-11-cevrimdisi');
});

// ===== o13.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.goto('/');
  console.log(await s.tap('Yeni kayıt ekle', {nth:0}));
  await s.wait(400);
  console.log('--- Emin degilim bastim ---');
  console.log(await s.tap('Emin değilim'));
  await s.wait(1500);
  console.log('--- Bugun ---');
  console.log(await s.tab('Bugün'));
  await s.shot('o1-12-cevrimdisi-kayit');
  console.log('--- Gecmis ---');
  console.log(await s.tab('Geçmiş'));
});

// ===== o14.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.goto('/');
  console.log('--- cevrimdisiyi kapatiyorum ---');
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.wait(2000);
  console.log('--- 2 sn sonra ---');
  console.log(await s.screen());
  await s.shot('o1-13-online-donus');
});

// ===== o15.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.goto('/');
  console.log(await s.tap('Plus önizlemesini incele'));
  await s.shot('o1-14-plus');
});

// ===== o16.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.goto('/');
  console.log('>>> UCAK MODU ACILIYOR (gercek ag kesildi)');
  await s.context.setOffline(true);
  await s.wait(500);
  console.log('--- sekme degistirmeyi denedim ---');
  try { console.log(await s.tab('Geçmiş')); } catch(e){ console.log('HATA: '+e.message); }
  console.log('>>> simdi uygulamayi KAPATIP ACIYORUM (reload)');
  try {
    await s.page.reload({ waitUntil: 'load', timeout: 8000 });
    await s.wait(1500);
    console.log(await s.screen());
  } catch(e) { console.log('RELOAD HATASI: ' + e.message.split('\n')[0]); 
    console.log(await s.page.evaluate(()=>document.body.innerText.slice(0,400)).catch(()=>'(ekran okunamadi)'));
  }
  await s.shot('o1-15-ucak-modu-reload');
  await s.context.setOffline(false);
});

// ===== o17.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  console.log('>>> DUBAI (UTC+4), cihaz saati:');
  console.log(await s.page.evaluate(()=>new Date().toString()).catch(()=>'-'));
  console.log(await s.goto('/'));
  console.log('cihaz saati: ' + await s.page.evaluate(()=>new Date().toLocaleString('tr-TR')));
  await s.shot('o2-01-dubai-bugun');
  console.log('--- Gecmis ---');
  console.log(await s.tab('Geçmiş'));
}, { contextOptions: { timezoneId: 'Asia/Dubai' } });

// ===== o18.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.goto('/');
  console.log('cihaz saati: ' + await s.page.evaluate(()=>new Date().toString()));
  console.log(await s.screen());
  console.log('--- Planlar ---');
  console.log(await s.tab('Planlar'));
  await s.shot('o2-02-londra');
}, { contextOptions: { timezoneId: 'Europe/London' } });

// ===== o19.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  if (!s.context.clock) { console.log('clock API yok'); return; }
  await s.context.clock.install({ time: new Date('2026-09-19T21:30:00+03:00') });
  console.log(await s.goto('/'));
  console.log('cihaz saati: ' + await s.page.evaluate(()=>new Date().toString()));
  await s.shot('o2-03-ertesi-gun');
});

// ===== o20.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.context.clock.install({ time: new Date('2026-09-22T10:00:00+03:00') });
  console.log('>>> 4 gun sonra actim (22 Eylul Sali 10:00)');
  console.log(await s.goto('/'));
  console.log('--- Gecmis: kayitlarin gercek tarihi ---');
  console.log(await s.tab('Geçmiş'));
  await s.shot('o2-04-dort-gun-sonra');
});

// ===== o21.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.context.clock.install({ time: new Date('2026-09-22T22:40:00+03:00') });
  await s.goto('/household');
  console.log('>>> demoyu sifirliyorum (22 Eylul 22:40 - iki plan da gecmis)');
  console.log(await s.tap('Demoyu başlangıca döndür'));
  await s.wait(1200);
  console.log('--- Bugun ---');
  console.log(await s.tab('Bugün'));
  await s.shot('o2-05-sifirlama-sonrasi');
  console.log('--- Gecmis ---');
  console.log(await s.tab('Geçmiş'));
});

// ===== o22.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.context.clock.install({ time: new Date('2026-09-22T22:50:00+03:00') });
  for (const r of ['/settings','/notifications','/pets']) {
    try { const sc = await s.goto(r); console.log('### ' + r + ' ###\n' + sc.split('--- DOKUNULABİLİR')[0].slice(0,300)); }
    catch(e){ console.log('### '+r+' ### HATA'); }
  }
  console.log('=== kacirilmis akszam bakimina kayit girme ===');
  await s.goto('/');
  console.log(await s.tap('Durum kaydet'));
});

// ===== o23.js =====
const { withApp } = require('./app');
withApp('p10-onur', async (s) => {
  await s.context.clock.install({ time: new Date('2026-09-22T22:55:00+03:00') });
  await s.goto('/record/occ-evening');
  console.log(await s.tap('Atlandı'));
  await s.wait(1200);
  console.log(await s.tab('Bugün'));
  await s.shot('o2-06-atlandi');
});
