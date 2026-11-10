const {
  chromium,
} = require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
const fs = require('node:fs'),
  assert = require('node:assert/strict');
const pages = [
  'index.html',
  'pages/vf3.html',
  'pages/product.html?id=vf6',
  'pages/product.html?id=kinet',
  'pages/warranty.html',
  'pages/battery.html',
  'pages/catalog.html',
  'pages/compare.html',
  'pages/test-drive.html',
  'pages/reference.html?route=ve-chung-toi',
  '404.html',
  'pages/rescue.html',
];
let browser, server;
const results = [],
  errors = [],
  broken = [],
  links = new Set();
(async () => {
  fs.mkdirSync('tests/phase-one', { recursive: true });
  server = await require('./static-server.cjs').start('/vinf');
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('response', (r) => {
    if (r.status() >= 400) broken.push(r.url());
  });
  for (const width of [1920, 1440, 1366, 1024, 768, 390, 375]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [i, path] of pages.entries()) {
      await page.goto(server.base + '/vinf/' + path);
      await page.locator('main h1').waitFor();
      await page.locator('img').evaluateAll((imgs) =>
        Promise.all(
          imgs.map((i) => {
            i.loading = 'eager';
            return i.decode();
          }),
        ),
      );
      await page.evaluate(() => document.fonts.ready);
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        notice: !!document.querySelector('#site-header .notice'),
        top: document.querySelector('#site-header').getBoundingClientRect().top,
        external: [...document.querySelectorAll('a')].filter((a) =>
          /^(shop\.)?vinfastauto\.com$/.test(new URL(a.href).hostname),
        ).length,
      }));
      assert.equal(state.overflow, false, width + ' ' + path);
      assert.equal(state.notice, false);
      assert.equal(state.top, 0);
      assert.equal(state.external, 0);
      for (const link of await page
        .locator('a[href]')
        .evaluateAll((as) => as.map((a) => a.href)))
        if (link.startsWith(server.base)) links.add(link.split('#')[0]);
      results.push({ width, path, ...state });
      if (i < 2 || [1440, 390].includes(width))
        await page.screenshot({
          path: `tests/phase-one/${width}-${i}.png`,
          fullPage: true,
        });
    }
  }
  for (const link of links) {
    assert(new URL(link).pathname.startsWith('/vinf/'), link);
    assert((await page.request.get(link)).ok(), link);
  }
  await page.goto(server.base + '/vinf/pages/vf3.html');
  await page.getByRole('button', { name: 'VF 3 Plus', exact: true }).click();
  assert.equal(
    await page.locator('#vf3-price').textContent(),
    '296.000.000 VNĐ',
  );
  assert.match(
    await page.locator('#vf3-version-image img').getAttribute('src'),
    /plus.webp$/,
  );
  await page
    .getByRole('button', { name: 'Ảnh tiếp theo', exact: true })
    .click();
  assert.match(
    await page
      .locator('.vf3-gallery [data-slide]:visible img')
      .getAttribute('alt'),
    /đỏ/,
  );
  await page.getByRole('tab', { name: 'Pin & Sạc', exact: true }).click();
  assert.match(await page.locator('#vf3-specs-panel-1').textContent(), /24 kW/);
  await page.getByRole('button', { name: 'Đặt cọc — mô phỏng' }).click();
  assert(await page.locator('#vf3-purchase').isVisible());
  await page.keyboard.press('Escape');
  assert(await page.locator('#vf3-purchase').isHidden());
  await page.reload();
  assert.equal(
    await page.locator('#vf3-price').textContent(),
    '285.000.000 VNĐ',
  );
  await page
    .getByRole('link', { name: 'VinFast mô phỏng - Trang chủ', exact: true })
    .click();
  await page.goBack();
  assert.match(page.url(), /vf3.html$/);
  await page.goForward();
  assert.match(page.url(), /index.html$/);
  await page.goto(server.base + '/vinf/pages/product.html?id=kinet');
  for (const button of await page.locator('[data-color]').all()) {
    await button.click();
    await page.locator('#vehicle-image').evaluate((i) => i.decode());
    assert.equal(await button.getAttribute('aria-pressed'), 'true');
  }
  await page.goto(server.base + '/vinf/pages/product.html?id=vf6');
  await page.getByRole('button', { name: 'Plus', exact: true }).click();
  assert.match(await page.locator('#range').textContent(), /460/);
  await page.goto(server.base + '/vinf/pages/warranty.html');
  const accordion = page.locator('[data-accordion]').first();
  await accordion.click();
  assert.equal(await accordion.getAttribute('aria-expanded'), 'true');
  await accordion.press('Space');
  assert.equal(await accordion.getAttribute('aria-expanded'), 'false');
  assert.deepEqual(errors, []);
  assert.deepEqual(broken, []);
  fs.writeFileSync(
    'tests/phase-one/results.json',
    JSON.stringify(
      {
        results,
        links: links.size,
        errors,
        broken,
        interactions:
          'VF3 version/gallery/tabs/modal/refresh/history; Kinet 5 colors; VF6 Plus; warranty accordion PASS',
        visualComparison: 'UNVERIFIED: no production screenshot',
      },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify({
      states: results.length,
      links: links.size,
      errors,
      broken,
    }),
  );
})()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
    fs.writeFileSync(
      'tests/phase-one/failure.json',
      JSON.stringify({ error: e.message, results, errors, broken }, null, 2),
    );
  })
  .finally(async () => {
    if (browser) await browser.close();
    if (server) await server.close();
  });
