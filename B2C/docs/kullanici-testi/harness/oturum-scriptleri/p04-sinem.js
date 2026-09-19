// p04-sinem — oturum script'leri, çalıştırılma sırasına göre (18 adet).
// Her blok ayrı bir `node <dosya>.js` çalıştırmasıdır; harness API'si için ../README.md.

// ===== sess-p04-sinem-1.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  console.log('=== AÇILIŞ ===');
  console.log(await s.goto('/'));
  await s.shot('s1-01-acilis');
  console.log('\n=== HANE SEKMESİ ===');
  console.log(await s.tab('Hane'));
  await s.shot('s1-02-hane');
});

// ===== s2.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  await s.goto('/household');
  console.log('=== DAVET EKRANI ===');
  console.log(await s.tap('Birini davet et'));
  await s.shot('s1-03-davet');
});

// ===== s3.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  await s.goto('/');
  console.log('=== DURUM KAYDET (akşam bakımı) ===');
  console.log(await s.tap('Durum kaydet'));
  await s.shot('s1-04-kayit-formu');
});

// ===== s4.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  await s.goto('/record/occ-evening');
  console.log('=== YAPILDI BASTIM ===');
  console.log(await s.tap('Yapıldı'));
  await s.shot('s1-05-yapildi-sonrasi');
  await s.wait(800);
  console.log('\n=== SONRA EKRAN ===');
  console.log(await s.screen());
});

// ===== s5.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  await s.goto('/');
  console.log('=== BUGÜN (dünkü Yapıldı sonrası) ===');
  console.log(await s.screen());
  await s.shot('s1-06-bugun-sonra');
});

// ===== s6.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  await s.goto('/');
  console.log('=== AYNI BAKIMI 2. KEZ: Yeni kayıt ekle (akşam) ===');
  console.log(await s.tap('Yeni kayıt ekle', { nth: 1 }));
  await s.shot('s1-07-ikinci-kayit');
  console.log('\n=== YAPILDI (2. kez) ===');
  await s.tap('Yapıldı').catch(e => console.log('HATA: ' + e.message));
  await s.wait(2000);
  console.log(await s.screen());
  await s.shot('s1-08-cifte-kayit-sonrasi');
});

// ===== s7.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  await s.goto('/history');
  console.log('=== GEÇMİŞ ===');
  console.log(await s.screen());
  await s.shot('s1-09-gecmis');
});

// ===== s8.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  await s.goto('/plans');
  console.log('=== PLANLAR ===');
  console.log(await s.screen());
  await s.shot('s1-10-planlar');
});

// ===== s9.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  await s.goto('/plans');
  console.log('=== HATIRLATICI KUR ===');
  console.log(await s.tap('yerel hatırlatıcı kur'));
  await s.shot('s1-11-hatirlatici');
  await s.wait(1500);
  console.log('\n--- 1.5sn sonra ---');
  console.log(await s.screen());
});

// ===== s10.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  await s.goto('/');
  console.log('=== ÇEVRİMDIŞI PROVA AÇIK ===');
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.shot('s1-12-offline-acik');
  console.log('\n=== ÇEVRİMDIŞIYKEN SABAH BAKIMINA KAYIT ===');
  console.log(await s.tap('Yeni kayıt ekle', { nth: 0 }));
  await s.wait(500);
  console.log(await s.tap('Emin değilim'));
  await s.wait(2500);
  console.log('\n=== SONRASI ===');
  console.log(await s.screen());
  await s.shot('s1-13-offline-kayit');
});

// ===== s11.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  await s.goto('/history');
  console.log('=== ÇEVRİMDIŞI KAYIT GEÇMİŞTE Mİ? ===');
  console.log(await s.screen());
  await s.shot('s1-14-gecmis-offline');
  console.log('\n=== ÇEVRİMDIŞINI KAPAT (metrodan çıktım) ===');
  await s.tab('Bugün');
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.wait(2500);
  console.log('\n--- bekledikten sonra ---');
  console.log(await s.screen());
  await s.shot('s1-15-online-donus');
});

// ===== s12.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  await s.goto('/');
  console.log('=== PLUS ÖNİZLEME ===');
  console.log(await s.tap('Plus önizlemesini incele'));
  await s.shot('s1-16-plus');
});

// ===== s13.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  await s.goto('/');
  console.log('=== LUNA BAŞLIĞINA DOKUN (hane değiştirici var mı?) ===');
  try { console.log(await s.tap('Luna')); } catch(e) { console.log('HATA: ' + e.message); }
  await s.wait(600);
  console.log('\n=== HANE: kişiye dokun (yetki/süre var mı?) ===');
  await s.tab('Hane');
  try { console.log(await s.tap('Deniz')); } catch(e) { console.log('HATA: ' + e.message); }
});

// ===== s14.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  await s.goto('/invite/demo-invite');
  console.log('=== KATIL ===');
  console.log(await s.tap('Demo hanesine katıl'));
  await s.wait(2000);
  console.log('\n=== SONRA ===');
  console.log(await s.screen());
  await s.shot('s1-17-katildim');
  console.log('\n=== HANE ===');
  console.log(await s.tab('Hane'));
});

// ===== sess-p04-sinem-2.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  console.log('=== ERTESİ GÜN: AÇILIŞ ===');
  console.log(await s.goto('/'));
  await s.shot('s2-01-acilis');
  console.log('\n=== GEÇMİŞ: dün ne oldu? ===');
  console.log(await s.tab('Geçmiş'));
  await s.shot('s2-02-gecmis');
  console.log('\n=== GEÇMİŞTE AŞAĞI KAYDIR ===');
  await s.page.mouse.wheel(0, 1200);
  await s.wait(800);
  console.log(await s.screen());
  await s.shot('s2-03-gecmis-alt');
});

// ===== s16.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  await s.goto('/');
  console.log('=== AKŞAM: zaten yapıldı yazıyor, tekrar açıyorum ===');
  console.log(await s.tap('Yeni kayıt ekle', { nth: 1 }));
  console.log('\n=== ATLANDI basıyorum (müşteri kapıyı açmadı) ===');
  await s.tap('Atlandı').catch(e=>console.log('HATA '+e.message));
  await s.wait(400);
  console.log('--- 0.4sn sonra ---');
  console.log(await s.screen());
  await s.wait(2500);
  console.log('\n--- 3sn sonra ---');
  console.log(await s.screen());
  await s.shot('s2-04-atlandi');
});

// ===== s17.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  await s.goto('/');
  console.log('=== ÇAKIŞMA SATIRINA DOKUN ===');
  try { console.log(await s.tap('Aynı görev için farklı kayıtlar var')); } catch(e){ console.log('HATA: '+e.message); }
  await s.wait(800);
  console.log('\n=== GEÇMİŞ: çakışma orada anlaşılıyor mu? ===');
  console.log(await s.tab('Geçmiş'));
  await s.shot('s2-05-gecmis-cakisma');
});

// ===== s18.js =====
const { withApp } = require('./app');
withApp('p04-sinem', async (s) => {
  await s.goto('/');
  console.log('=== ŞEBEKEYİ GERÇEKTEN KESİYORUM (metro) ===');
  await s.context.setOffline(true);
  try {
    await s.page.reload({ waitUntil: 'load', timeout: 15000 });
    await s.wait(1500);
    console.log(await s.screen());
  } catch (e) {
    console.log('YÜKLENMEDİ: ' + e.message.split('\n')[0]);
  }
  await s.shot('s2-06-gercek-offline');
  await s.context.setOffline(false);
});
