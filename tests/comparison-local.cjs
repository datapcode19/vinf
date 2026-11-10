const {
  chromium,
} = require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
const fs = require('node:fs'),
  assert = require('node:assert/strict');
const phase = process.argv[2] || 'after',
  directory = 'tests/comparison/' + phase;
let server, browser;
const results = [];
(async () => {
  fs.mkdirSync(directory, { recursive: true });
  server = await require('./static-server.cjs').start('/vinf');
  browser = await chromium.launch();
  for (const width of [1440, 1366, 768, 390, 375]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } }),
      errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const paths =
      phase === 'before'
        ? ['index.html']
        : ['index.html', 'pages/vf5.html', 'pages/viper.html'];
    for (const path of paths) {
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
      const sections = await page
        .locator('main>section,main>div,#site-header,#site-footer')
        .evaluateAll((nodes) =>
          nodes.map((n) => ({
            id: n.id,
            class: n.className,
            text: n.innerText,
            box: { width: n.clientWidth, height: n.clientHeight },
            font: getComputedStyle(n).fontFamily,
          })),
        );
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        width + ' ' + path + ' overflow',
      );
      for (const element of await page.locator('main>section,main>div').all()) {
        await element.scrollIntoViewIfNeeded();
        await page.waitForTimeout(90);
      }
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForTimeout(700);
      const name = path.split('/').pop().replace('.html', '');
      await page.screenshot({
        path: `${directory}/${width}-${name}.png`,
        fullPage: true,
      });
      if (path === 'index.html' && [1440, 390].includes(width)) {
        for (const id of [
          'oto',
          'xe-may-dien',
          'hau-mai',
          'tuong-lai-xanh',
          'he-sinh-thai',
          'ho-tro-mua-xe',
          'phu-kien',
          'nhan-thong-tin',
          'site-footer',
        ]) {
          const element = page.locator('#' + id);
          await element.scrollIntoViewIfNeeded();
          await page.waitForTimeout(700);
          await element.screenshot({ path: `${directory}/${width}-${id}.png` });
        }
      }
      results.push({
        path,
        width,
        status: 'PASS',
        sections,
        errors: [...errors],
      });
      assert.deepEqual(errors, []);
    }
    await page.close();
  }
  console.log(
    results.map((r) => ({ path: r.path, width: r.width, status: r.status })),
  );
})()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
    results.push({ status: 'FAIL', error: e.stack });
  })
  .finally(async () => {
    fs.writeFileSync(
      directory + '/results.json',
      JSON.stringify(results, null, 2),
    );
    if (browser) await browser.close();
    if (server) await server.close();
  });
