// p07-kerem — oturum script'leri, çalıştırılma sırasına göre (19 adet).
// Her blok ayrı bir `node <dosya>.js` çalıştırmasıdır; harness API'si için ../README.md.

// ===== sess-p07-kerem-1.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  console.log(await s.goto('/'));
  await s.shot('01-ilk-acilis');
});

// ===== sess-p07-kerem-2.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  await s.goto('/');
  console.log("=== Sabah bakımına 'Yeni kayıt ekle' (Deniz zaten yapmış) ===");
  console.log(await s.tap('Yeni kayıt ekle'));
  await s.shot('02-yeni-kayit-ekle');
});

// ===== sess-p07-kerem-3.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  await s.goto('/');
  await s.tap('Yeni kayıt ekle');
  console.log("=== 'Yapıldı'ya bastım (Deniz zaten yapmıştı) ===");
  console.log(await s.tap('Yapıldı'));
  await s.shot('03-yapildi-sonrasi');
});

// ===== sess-p07-kerem-4.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  await s.goto('/');
  console.log("=== Geçmiş: Deniz'in kaydı duruyor mu? ===");
  console.log(await s.tab('Geçmiş'));
  await s.shot('04-gecmis');
});

// ===== sess-p07-kerem-5.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  await s.goto('/');
  console.log("=== Akşam bakımı: 'Durum kaydet' ===");
  console.log(await s.tap('Durum kaydet'));
  console.log("=== Hızlı art arda iki kez 'Yapıldı' (parmağım kaydı sanki) ===");
  // double tap without waiting
  const box = await s.page.evaluate(() => {
    const els = [...document.querySelectorAll('[role="button"]')].filter(e => (e.innerText||'').includes('Yapıldı'));
    const el = els[0]; if (!el) return null;
    const r = el.getBoundingClientRect(); return { x: r.x + r.width/2, y: r.y + r.height/2 };
  });
  console.log('buton konumu:', JSON.stringify(box));
  await s.page.mouse.click(box.x, box.y);
  await s.page.mouse.click(box.x, box.y, { delay: 20 });
  await s.page.waitForTimeout(1200);
  console.log(await s.screen());
  await s.shot('05-aksam-cift-tap');
});

// ===== sess-p07-kerem-6.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  await s.goto('/history');
  console.log(await s.screen());
  console.log("=== Geçmişte bir kayda dokunmayı denedim (düzeltmek için) ===");
  try { console.log(await s.tap('08:12')); } catch(e) { console.log('HATA: ' + e.message); }
  try { console.log(await s.tap('Yapıldı kaydı')); } catch(e) { console.log('HATA: ' + e.message); }
  await s.shot('06-gecmis-duzelt');
});

// ===== sess-p07-kerem-7.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  await s.goto('/plans');
  console.log(await s.screen());
  await s.shot('07-planlar');
});

// ===== sess-p07-kerem-8.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  await s.goto('/plans');
  console.log(await s.tap('20:00 için yerel hatırlatıcı kur'));
  await s.shot('08-hatirlatici');
  console.log("=== Hane ===");
  console.log(await s.tab('Hane'));
  await s.shot('09-hane');
});

// ===== sess-p07-kerem-9.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  await s.goto('/household');
  console.log(await s.tap('Birini davet et'));
  await s.shot('10-davet');
});

// ===== sess-p07-kerem-10.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  await s.goto('/');
  console.log("=== Çevrimdışı provayı açıyorum ===");
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.shot('11-cevrimdisi');
});

// ===== sess-p07-kerem-11.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  await s.goto('/');
  console.log("=== Çevrimdışıyken akşam bakımına 2. kayıt ===");
  console.log(await s.tap('Yeni kayıt ekle', { nth: 1 }));
  console.log(await s.tap('Yapıldı'));
  await s.shot('12-cevrimdisi-kayit');
  console.log("=== Çevrimdışıyken 3. kez daha ===");
  console.log(await s.tap('Yeni kayıt ekle', { nth: 1 }));
  console.log(await s.tap('Yapıldı'));
  await s.shot('13-cevrimdisi-kayit2');
});

// ===== sess-p07-kerem-12.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  await s.goto('/history');
  console.log("=== Çevrimdışı kayıtlar geçmişte nasıl görünüyor ===");
  console.log(await s.screen());
  await s.shot('14-gecmis-offline');
  console.log("=== Şimdi çevrimiçi oluyorum ===");
  await s.tab('Bugün');
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  await s.shot('15-online-sonrasi');
  console.log("=== Geçmiş, çevrimiçi sonrası ===");
  console.log(await s.tab('Geçmiş'));
  await s.shot('16-gecmis-online');
});

// ===== sess-p07-kerem-13.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  await s.goto('/');
  console.log("=== Sabah bakımı 'yapıldı' iken ÜSTÜNE 'Atlandı' basıyorum (çelişki) ===");
  await s.tap('Yeni kayıt ekle', { nth: 0 });
  console.log(await s.tap('Atlandı'));
  await s.shot('17-celiskili-kayit');
});

// ===== sess-p07-kerem-14.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  await s.goto('/');
  console.log("=== Çakışan satıra dokunmayı denedim ===");
  try { console.log(await s.tap('Aynı görev için farklı kayıtlar var')); } catch(e){ console.log('HATA: '+e.message); }
  console.log("=== Plus ekranı ===");
  await s.goto('/');
  console.log(await s.tap('Plus önizlemesini incele'));
  await s.shot('18-plus');
});

// ===== sess-p07-kerem-15.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  await s.goto('/record/occ-morning');
  await s.page.mouse.wheel(0, 800); await s.wait(700);
  console.log("=== Kayıt ekranı, aşağı kaydırdım: doz/not/saat alanı var mı? ===");
  console.log(await s.screen());
  const inputs = await s.page.evaluate(() => [...document.querySelectorAll('input,textarea,select')].map(e=>e.tagName+':'+(e.getAttribute('placeholder')||e.getAttribute('aria-label')||e.type||'')));
  console.log('GİRİŞ ALANLARI: ' + JSON.stringify(inputs));
  await s.shot('19-kayit-ekrani-alt');
});

// ===== sess-p07-kerem-oturum2.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  console.log("=== OTURUM 2: uygulamayı yeniden açtım ===");
  console.log(await s.goto('/'));
  await s.shot('20-oturum2-acilis');
  console.log("=== Geçmiş hâlâ duruyor mu ===");
  console.log(await s.tab('Geçmiş'));
  await s.shot('21-oturum2-gecmis');
});

// ===== sess-p07-kerem-17.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  await s.goto('/record/occ-evening');
  console.log("=== Akşam bakımına 'Emin değilim' ===");
  console.log(await s.tap('Emin değilim'));
  await s.shot('22-emin-degilim');
  console.log("=== Geçmiş: kayıt sayısı sınırı var mı? ===");
  console.log(await s.tab('Geçmiş'));
});

// ===== sess-p07-kerem-18.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  await s.goto('/record/occ-morning');
  console.log("=== 'Yapıldı'ya bastım, kaydediliyorken HEMEN 'Atlandı'ya da bastım ===");
  const pos = await s.page.evaluate(() => {
    const b = [...document.querySelectorAll('[role=button]')];
    const y = b.find(e=>(e.innerText||'').includes('Yapıldı'));
    const a = b.find(e=>(e.innerText||'').includes('Atlandı'));
    const r1=y.getBoundingClientRect(), r2=a.getBoundingClientRect();
    return {y:{x:r1.x+r1.width/2,y:r1.y+r1.height/2}, a:{x:r2.x+r2.width/2,y:r2.y+r2.height/2}};
  });
  await s.page.mouse.click(pos.y.x, pos.y.y);
  await s.page.mouse.click(pos.a.x, pos.a.y);
  await s.page.waitForTimeout(1500);
  console.log(await s.screen());
  await s.shot('23-yarisan-tiklama');
  console.log("=== Geçmiş ===");
  console.log(await s.tab('Geçmiş'));
});

// ===== sess-p07-kerem-19.js =====
const { withApp } = require('./app');
withApp('p07-kerem', async (s) => {
  console.log(await s.goto('/'));
  await s.shot('24-bugun-son');
});
