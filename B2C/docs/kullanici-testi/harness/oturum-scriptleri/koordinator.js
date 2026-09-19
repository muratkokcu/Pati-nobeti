// koordinator — testten önce harness'ı doğrulamak için yapılan keşif oturumları.

// ########## smoke.js ##########
// smoke — oturum script'leri, çalıştırılma sırasına göre (1 adet).
// Her blok ayrı bir `node <dosya>.js` çalıştırmasıdır; harness API'si için ../README.md.

// ===== smoke.js =====
const { withApp } = require('./app');
withApp('smoke', async (s) => {
  console.log(await s.goto('/'));
  console.log('SHOT:', await s.shot('01-home'));
});

// ########## dbg.js ##########
// dbg — oturum script'leri, çalıştırılma sırasına göre (2 adet).
// Her blok ayrı bir `node <dosya>.js` çalıştırmasıdır; harness API'si için ../README.md.

// ===== dbg.js =====
const { withApp } = require('./app');
withApp('dbg', async (s) => {
  await s.goto('/');
  // click the "Planlar" tab the way a user would: the tab bar button
  const info = await s.page.evaluate(() => {
    const btns = [...document.querySelectorAll('[role="button"], [role="tab"], a')];
    return btns.map((b) => ({ role: b.getAttribute('role'), label: (b.innerText||'').trim().slice(0,30), aria: b.getAttribute('aria-label'), sel: b.getAttribute('aria-selected'), cls: b.className?.toString().slice(0,40) })).slice(0, 25);
  });
  console.log(JSON.stringify(info, null, 1));
  await s.page.getByRole('button', { name: 'Planlar' }).first().click();
  await s.page.waitForTimeout(900);
  const hidden = await s.page.evaluate(() => {
    const roots = [...document.querySelectorAll('[aria-hidden="true"]')].map(e => (e.innerText||'').trim().slice(0,40));
    return { url: location.pathname, hiddenCount: roots.length, sample: roots.slice(0,5) };
  });
  console.log(JSON.stringify(hidden, null, 1));
  console.log(await s.screen());
});

// ===== dbg2.js =====
const { withApp } = require('./app');
withApp('dbg', async (s) => {
  await s.goto('/');
  await s.tab('Geçmiş');
  const info = await s.page.evaluate(() => {
    const out = [];
    const walk = (el, depth) => {
      if (depth > 8) return;
      for (const child of el.children) {
        const st = getComputedStyle(child);
        const r = child.getBoundingClientRect();
        const txt = (child.innerText || '').trim().slice(0, 25).replace(/\n/g, '|');
        if (txt) out.push({ d: depth, tag: child.tagName, vis: st.visibility, disp: st.display, op: st.opacity, pe: st.pointerEvents, ah: child.getAttribute('aria-hidden'), z: st.zIndex, rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], txt });
        walk(child, depth + 1);
      }
    };
    walk(document.body, 0);
    return out.slice(0, 30);
  });
  console.log(JSON.stringify(info, null, 0).replace(/},/g, '},\n'));
});

// ########## explore.js ##########
// explore — oturum script'leri, çalıştırılma sırasına göre (2 adet).
// Her blok ayrı bir `node <dosya>.js` çalıştırmasıdır; harness API'si için ../README.md.

// ===== explore.js =====
const { withApp } = require('./app');
withApp('explore', async (s) => {
  await s.goto('/');
  console.log('### RECORD FLOW');
  console.log(await s.tap('Durum kaydet'));
  console.log('### TABS');
  for (const tab of ['Planlar', 'Geçmiş', 'Hane']) {
    await s.goto('/');
    console.log(await s.tap(tab));
    await s.shot('tab-' + tab);
  }
  console.log('### PAYWALL');
  await s.goto('/');
  console.log(await s.tap('Plus önizlemesini incele'));
  await s.shot('paywall');
});

// ===== explore2.js =====
const { withApp } = require('./app');
withApp('explore', async (s) => {
  await s.goto('/');
  for (const t of ['Planlar', 'Geçmiş', 'Hane', 'Bugün']) {
    console.log('\n######## TAB: ' + t);
    console.log(await s.tab(t));
    await s.shot('tab-' + t);
  }
});

// ########## flow2.js ##########
// flow2 — oturum script'leri, çalıştırılma sırasına göre (1 adet).
// Her blok ayrı bir `node <dosya>.js` çalıştırmasıdır; harness API'si için ../README.md.

// ===== flow.js =====
const { withApp } = require('./app');
withApp('flow2', async (s) => {
  await s.goto('/');
  console.log('## kayıt akışı');
  await s.tap('Durum kaydet');
  console.log(await s.tap('Yapıldı'));
  console.log('## çevrimdışı');
  console.log(await s.toggle('Çevrimdışı provayı aç'));
  console.log('## davet');
  await s.tab('Hane');
  console.log(await s.tap('Birini davet et'));
  console.log('## geçmiş');
  await s.tab('Geçmiş');
  console.log(await s.screen());
});
