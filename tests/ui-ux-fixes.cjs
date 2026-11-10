const {
  chromium,
} = require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
const fs = require('node:fs'),
  assert = require('node:assert/strict');
let browser, server;
const results = [];
async function check(name, fn) {
  try {
    await fn();
    results.push({ name, status: 'PASS' });
    console.log('PASS', name);
  } catch (e) {
    results.push({ name, status: 'FAIL', error: e.message });
    console.error('FAIL', name, e.message);
  }
}
async function gesture(page, viewport, { lateFonts = false } = {}) {
  await viewport.scrollIntoViewIfNeeded();
  const b = await viewport.boundingBox(),
    x = b.x + b.width * 0.75,
    y = b.y + Math.min(b.height * 0.5, 180);
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x, y, id: 1 }],
  });
  for (const [dx, dy] of [
    [-9, -8],
    [-30, -10],
    [-60, -12],
    [-100, -14],
    [-140, -16],
  ]) {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: x + dx, y: y + dy, id: 1 }],
    });
    if (lateFonts && dx === -60) {
      await page.evaluate(() => window.finishTestFonts());
      await page.waitForTimeout(40);
    }
    await page.waitForTimeout(20);
  }
  const moving = await viewport
    .locator('.swipe-slide:not([hidden])')
    .first()
    .evaluate((e) => getComputedStyle(e).transform);
  assert.notEqual(moving, 'matrix(1, 0, 0, 1, 0, 0)');
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });
  const duration = await viewport
    .locator('.swipe-slide:not([hidden])')
    .first()
    .evaluate((e) => getComputedStyle(e).transitionDuration);
  assert.equal(duration, '0.25s');
  await page.waitForTimeout(320);
  await cdp.detach();
}
(async () => {
  fs.mkdirSync('tests/ui-ux-fixes', { recursive: true });
  server = await require('./static-server.cjs').start('/vinf');
  browser = await chromium.launch();
  for (const width of [1440, 1366, 768, 390, 375]) {
    const mobile = width <= 768,
      context = await browser.newContext({
        viewport: { width, height: 950 },
        hasTouch: mobile,
        isMobile: mobile,
      });
    const page = await context.newPage(),
      errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(server.base + '/vinf/index.html');
    await check(
      width + ' menu arrow, layout stability, hover/focus or real touch tap',
      async () => {
        if (mobile) await page.locator('.menu-toggle').tap();
        const button = page
            .locator('.nav-trigger')
            .filter({ has: page.locator('[aria-hidden]') })
            .nth(1),
          arrow = button.locator('.nav-chevron');
        const before = await button.boundingBox();
        if (mobile) {
          assert.equal(
            await arrow.evaluate((e) => getComputedStyle(e).opacity),
            '1',
          );
          await button.tap();
        } else {
          assert.equal(
            await arrow.evaluate((e) => getComputedStyle(e).opacity),
            '0',
          );
          await button.hover();
          await page.waitForTimeout(170);
          assert.equal(
            await arrow.evaluate((e) => getComputedStyle(e).opacity),
            '1',
          );
        }
        assert.equal(await button.getAttribute('aria-expanded'), 'true');
        const after = await button.boundingBox();
        assert.equal(before.x, after.x);
        assert.equal(before.width, after.width);
        const menu = page.locator(
          '#' + (await button.getAttribute('aria-controls')),
        );
        assert(await menu.isVisible());
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
        );
        await page.keyboard.press('Escape');
        if (!mobile) {
          await page.mouse.move(1, 800);
          await button.focus();
          await page.waitForTimeout(170);
          assert.equal(
            await arrow.evaluate((e) => getComputedStyle(e).opacity),
            '1',
          );
        }
        if (mobile) await page.locator('.menu-toggle').tap();
      },
    );
    await check(
      width + ' VF3 home cutout subject centered and not cropped',
      async () => {
        const root = page.locator('[data-showcase="cars-0"]');
        await root.locator('[data-model="4"]').click();
        await page.waitForTimeout(320);
        const img = root.locator('[data-model-image]');
        await img.evaluate((i) => i.decode());
        const centered = await img.evaluate((i) => {
          const r = i.getBoundingClientRect(),
            s = getComputedStyle(i),
            scale = Math.min(
              r.width / i.naturalWidth,
              r.height / i.naturalHeight,
            );
          return {
            fit: s.objectFit,
            position: s.objectPosition,
            offset: Math.abs((198 + 1002) / 2 - i.naturalWidth / 2) * scale,
            wholeWidth: 804 * scale <= r.width,
            wholeHeight: 431 * scale <= r.height,
          };
        });
        assert.equal(centered.fit, 'contain');
        assert.equal(centered.position, '50% 50%');
        assert(
          centered.offset < 2 && centered.wholeWidth && centered.wholeHeight,
        );
        await root.screenshot({
          path: `tests/ui-ux-fixes/${width}-vf3-home.png`,
        });
      },
    );
    await page.goto(server.base + '/vinf/pages/vf3.html');
    await check(
      width + ' VF3 hero and gallery preserve full source ratio',
      async () => {
        for (const selector of [
          '.vf3-hero>img',
          '.vf3-gallery .swipe-slide:not([hidden]) img',
        ]) {
          const img = page.locator(selector);
          await img.evaluate((i) => i.decode());
          const state = await img.evaluate((i) => ({
            fit: getComputedStyle(i).objectFit,
            ratio: i.clientWidth / i.clientHeight,
            natural: i.naturalWidth / i.naturalHeight,
          }));
          assert.equal(state.fit, 'contain');
          assert(Math.abs(state.ratio - state.natural) < 0.02);
        }
        await page
          .locator('.vf3-hero')
          .screenshot({ path: `tests/ui-ux-fixes/${width}-vf3-hero.png` });
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
        );
      },
    );
    await page.goto(server.base + '/vinf/pages/product.html?id=kinet');
    await check(
      width + ' Kinet image centered, intact and no page overflow',
      async () => {
        const img = page.locator('#vehicle-image');
        await img.evaluate((i) => i.decode());
        assert.equal(
          await img.evaluate((i) => getComputedStyle(i).objectFit),
          'contain',
        );
        assert.equal(
          await img.evaluate((i) => getComputedStyle(i).objectPosition),
          '50% 50%',
        );
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
        );
        await page
          .locator('.vehicle-stage')
          .screenshot({ path: `tests/ui-ux-fixes/${width}-kinet.png` });
      },
    );
    await check(width + ' no JavaScript errors', async () =>
      assert.deepEqual(errors, []),
    );
    await context.close();
  }
  const context = await browser.newContext({
      viewport: { width: 390, height: 950 },
      hasTouch: true,
      isMobile: true,
    }),
    page = await context.newPage();
  for (const [path, selector] of [
    ['index.html', '.home-hero .swipe-viewport'],
    ['index.html', '[data-showcase="cars-0"] .swipe-viewport'],
    ['index.html', '[data-showcase="scooters-0"] .swipe-viewport'],
    ['pages/vf3.html', '.vf3-gallery .swipe-viewport'],
  ]) {
    await page.goto(server.base + '/vinf/' + path);
    const viewport = page.locator(selector);
    await viewport
      .locator('img')
      .evaluateAll((imgs) => Promise.all(imgs.map((i) => i.decode())));
    await check(
      selector + ' slight diagonal touch start still swipes; 250ms settle',
      async () => {
        await gesture(page, viewport);
        assert.equal(await viewport.getAttribute('data-swipe-index'), '1');
      },
    );
  }
  await page.addInitScript(() => {
    let done;
    Object.defineProperty(document.fonts, 'ready', {
      value: new Promise((resolve) => (done = resolve)),
    });
    window.finishTestFonts = done;
  });
  await page.goto(server.base + '/vinf/index.html');
  const viewport = page.locator('.home-hero .swipe-viewport');
  await viewport
    .locator('img')
    .evaluateAll((imgs) => Promise.all(imgs.map((i) => i.decode())));
  await check(
    'Font readiness in mid-gesture does not cancel touch',
    async () => {
      await gesture(page, viewport, { lateFonts: true });
      assert.equal(await viewport.getAttribute('data-swipe-index'), '1');
    },
  );
  await context.close();
})()
  .catch((e) => {
    results.push({ name: 'runner', status: 'FAIL', error: e.stack });
    console.error(e);
  })
  .finally(async () => {
    fs.writeFileSync(
      'tests/ui-ux-fixes/results.json',
      JSON.stringify({ date: '2026-11-08', results }, null, 2),
    );
    if (browser) await browser.close();
    if (server) await server.close();
    if (results.some((r) => r.status === 'FAIL')) process.exitCode = 1;
  });
