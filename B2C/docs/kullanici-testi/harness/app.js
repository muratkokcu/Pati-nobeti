/**
 * PatiNöbeti test harness.
 *
 *   const { withApp } = require('<harness-dizini>/harness/app');
 *   withApp('p1-ayse', async (s) => {
 *     await s.goto('/');            // open the app (fresh device state kept per persona)
 *     console.log(await s.screen()); // what is on the phone screen right now
 *     await s.tap('Yapıldı');        // tap a button / row by its visible label
 *     await s.shot('after-record');  // save a screenshot
 *   });
 */
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname.replace(/\/harness$/, '');
const EXEC = process.env.CHROMIUM_PATH || (() => {
  // Playwright sürümü güncellendiğinde klasör adı değişir; sabit sürüm yazmak harness'ı kırıyordu.
  const root = `${process.env.HOME}/.cache/ms-playwright`;
  const dir = fs.existsSync(root) ? fs.readdirSync(root).filter((name) => name.startsWith('chromium-')).sort().pop() : null;
  return dir ? `${root}/${dir}/chrome-linux64/chrome` : '';
})();
const BASE = process.env.APP_URL || 'http://localhost:4321';

async function withApp(persona, fn, opts = {}) {
  const dir = path.join(ROOT, 'sessions', persona);
  fs.mkdirSync(dir, { recursive: true });
  const context = await chromium.launchPersistentContext(path.join(dir, 'profile'), {
    executablePath: EXEC,
    headless: true,
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    locale: 'tr-TR',
    timezoneId: 'Europe/Istanbul',
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
    ...(opts.contextOptions || {}),
  });
  const page = context.pages()[0] || (await context.newPage());
  const problems = [];
  page.on('console', (m) => { if (m.type() === 'error') problems.push(`[console.error] ${m.text()}`); });
  page.on('pageerror', (e) => problems.push(`[pageerror] ${e.message}`));

  const s = {
    page,
    context,
    problems,
    async goto(route = '/') {
      await page.goto(BASE + route, { waitUntil: 'load' });
      await page.waitForTimeout(1200);
      return s.screen();
    },
    async wait(ms = 600) { await page.waitForTimeout(ms); },
    /** Everything the user can see, plus what is tappable. */
    async screen() {
      return page.evaluate(() => {
        // react-navigation keeps inactive tab screens mounted on web; they sit at z-index -1.
        const hidden = (el) => {
          const st = getComputedStyle(el);
          return st.display === 'none' || st.visibility === 'hidden' || st.opacity === '0' || st.zIndex === '-1' || el.getAttribute('aria-hidden') === 'true';
        };
        const lines = [];
        const walk = (el) => {
          for (const node of el.childNodes) {
            if (node.nodeType === 3) { const t = node.textContent.trim(); if (t) lines.push(t); }
            else if (node.nodeType === 1 && !hidden(node)) walk(node);
          }
        };
        walk(document.body);
        const onLiveBranch = (el) => { let cur = el; while (cur && cur !== document.body) { if (hidden(cur)) return false; cur = cur.parentElement; } return true; };
        const tappable = [...document.querySelectorAll('[role="button"], [role="tab"], [role="switch"], button, a, input, textarea')]
          .filter(onLiveBranch)
          .map((el) => {
            const role = el.getAttribute('role') || el.tagName.toLowerCase();
            const name = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('placeholder') || '').trim().replace(/\s+/g, ' ');
            const state = el.getAttribute('aria-checked') ?? el.getAttribute('aria-selected');
            return name ? `${role}: ${name}${state ? ` [${state}]` : ''}` : null;
          })
          .filter(Boolean);
        return `--- EKRAN (${location.pathname}) ---\n${lines.join('\n')}\n--- DOKUNULABİLİR ---\n${[...new Set(tappable)].map((t) => '• ' + t).join('\n')}`;
      });
    },
    /** Switch bottom tab: 'Bugün' | 'Planlar' | 'Geçmiş' | 'Hane'. */
    async tab(name) {
      const routes = { 'Bugün': '/', 'Planlar': '/plans', 'Geçmiş': '/history', 'Hane': '/household' };
      const t = page.getByRole('tab', { name, exact: false }).first();
      try {
        await t.click({ timeout: 2500 });
        await page.waitForTimeout(1100);
      } catch {
        // modal/stack screens have no tab bar: leave the modal first
        await page.goBack().catch(() => {});
        await page.waitForTimeout(800);
        try {
          await page.getByRole('tab', { name, exact: false }).first().click({ timeout: 2500 });
          await page.waitForTimeout(1100);
        } catch {
          await page.goto(BASE + (routes[name] || '/'), { waitUntil: 'load' });
          await page.waitForTimeout(1200);
        }
      }
      return s.screen();
    },
    /** Tap what a thumb would hit: the innermost live element whose label contains `label`. */
    async tap(label, { nth = 0 } = {}) {
      const box = await page.evaluate(({ label, nth }) => {
        const norm = (t) => (t || '').replace(/\s+/g, ' ').trim().toLocaleLowerCase('tr-TR');
        const want = norm(label);
        const hidden = (el) => {
          const st = getComputedStyle(el);
          return st.display === 'none' || st.visibility === 'hidden' || st.zIndex === '-1' || el.getAttribute('aria-hidden') === 'true';
        };
        const live = (el) => { let cur = el; while (cur && cur !== document.body) { if (hidden(cur)) return false; cur = cur.parentElement; } return true; };
        const interactive = [...document.querySelectorAll('[role="button"], [role="tab"], [role="switch"], [role="link"], button, a, input, textarea')];
        let pool = interactive.filter((el) => live(el) && norm(el.innerText || el.getAttribute('aria-label')).includes(want));
        if (!pool.length) pool = [...document.querySelectorAll('div, span, p')].filter((el) => live(el) && norm(el.innerText).includes(want) && ![...el.children].some((c) => norm(c.innerText).includes(want)));
        pool = pool.filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; });
        pool.sort((a, b) => { const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect(); return ra.width * ra.height - rb.width * rb.height; });
        const el = pool[nth];
        if (!el) return null;
        el.scrollIntoView({ block: 'center' });
        const r = el.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2, label: (el.innerText || '').trim().slice(0, 40) };
      }, { label, nth });
      if (!box) throw new Error(`Ekranda dokunulabilir "${label}" yok — önce screen() ile bak.`);
      await page.mouse.click(box.x, box.y);
      await page.waitForTimeout(900);
      return s.screen();
    },
    /** Flip a switch by its accessibility label (e.g. 'Çevrimdışı provayı aç'). */
    async toggle(ariaLabel) {
      const box = await page.evaluate((ariaLabel) => {
        const el = [...document.querySelectorAll('input, [role="switch"], [aria-label]')].find((e) => (e.getAttribute('aria-label') || '') === ariaLabel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
      }, ariaLabel);
      if (!box) throw new Error(`Anahtar bulunamadı: ${ariaLabel}`);
      await page.mouse.click(box.x, box.y);
      await page.waitForTimeout(900);
      return s.screen();
    },
    async type(label, value) {
      const box = page.getByPlaceholder(label).first();
      await box.fill(value);
      await page.waitForTimeout(300);
      return s.screen();
    },
    async back() { await page.goBack(); await page.waitForTimeout(800); return s.screen(); },
    async shot(name) {
      const file = path.join(dir, `${String(name).replace(/[^a-z0-9-_]/gi, '-')}.png`);
      await page.screenshot({ path: file });
      return file;
    },
  };

  try {
    await fn(s);
  } finally {
    if (problems.length) console.log('\n--- TARAYICI HATALARI ---\n' + problems.slice(0, 20).join('\n'));
    await context.close();
  }
}

module.exports = { withApp, BASE, ROOT };
