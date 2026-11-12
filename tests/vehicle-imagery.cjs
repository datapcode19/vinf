const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE ||
    'C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package',
);
const models = ['fadil', 'lux-a', 'lux-sa', 'president', 'ebus'];
const services = ['warranty', 'maintenance', 'repair', 'rescue', 'documents'];
const output = path.join(os.tmpdir(), 'vinf-imagery-verification');
let browser, server;
let checks = 0;
const errors = [];
async function images(root) {
  const failures = await root.locator('img').evaluateAll(async (nodes) => {
    // Include offscreen related cards and hidden color slides in the audit.
    nodes.forEach((img) => {
      img.loading = 'eager';
    });
    await Promise.all(nodes.map((img) => img.decode().catch(() => {})));
    return nodes
      .filter((img) => !img.naturalWidth || !img.complete)
      .map((img) => img.src);
  });
  assert.deepEqual(failures, [], 'All image sources must decode');
  checks++;
}
async function noOverflow(page) {
  assert(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
    'Horizontal overflow',
  );
  checks++;
}
(async () => {
  fs.mkdirSync(output, { recursive: true });
  server = await require('./static-server.cjs').start('/vinf');
  browser = await chromium.launch({ headless: true });
  for (const width of [1440, 768, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      hasTouch: width === 390,
    });
    const page = await context.newPage();
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => {
      if (response.url().startsWith(server.base) && response.status() >= 400)
        errors.push(response.status() + ' ' + response.url());
    });
    await page.goto(server.base + '/vinf/index.html');
    await page.locator('#main-nav').waitFor({ state: 'attached' });
    if (width < 1051) await page.locator('.menu-toggle').click();
    await page.getByRole('button', { name: 'Ô tô', exact: true }).click();
    for (const [tab, ids] of [
      ['Động cơ xăng', models.slice(0, 4)],
      ['Xe dịch vụ', ['ebus']],
    ]) {
      await page
        .locator('#main-nav')
        .getByRole('tab', { name: tab, exact: true })
        .click();
      for (const id of ids) {
        const card = page.locator(
          `.mega-product-card[href$="/pages/${id}.html"]`,
        );
        assert.equal(await card.count(), 1);
        assert.equal(
          await card.locator('img').count(),
          1,
          id + ' menu image missing',
        );
        await card.scrollIntoViewIfNeeded();
        await images(card);
        assert(await card.isVisible());
        assert(!(await card.getAttribute('class')).includes('mega-text-card'));
        checks++;
      }
      await noOverflow(page);
      await page.screenshot({
        path: path.join(
          output,
          `menu-${tab === 'Động cơ xăng' ? 'history' : 'service'}-${width}.png`,
        ),
      });
    }
    await page.locator('.mega-product-card[href$="/pages/ebus.html"]').click();
    await page.waitForURL('**/vinf/pages/ebus.html');
    checks++;
    for (const id of models) {
      await page.goto(
        server.base +
          '/vinf/pages/catalog.html?q=' +
          encodeURIComponent(
            id === 'lux-a' ? 'Lux A2.0' : id === 'lux-sa' ? 'Lux SA2.0' : id,
          ),
      );
      const card = page.locator('#results .product-card');
      assert.equal(await card.count(), 1, id + ' catalog entry');
      await images(card);
      assert(
        (await card.locator('img').getAttribute('src')).includes(
          `extended/${id}/`,
        ),
      );
      await card.locator('a').click();
      await page.waitForURL('**/vinf/pages/' + id + '.html');
      await page.locator('.destination-product-hero').waitFor();
      await images(page.locator('main'));
      await noOverflow(page);
      const hero = page.locator('.destination-product-hero > img');
      assert(
        new URL(await hero.getAttribute('src')).pathname.startsWith(
          '/vinf/assets/extended/' + id + '/',
        ),
      );
      const gallery = page.locator('main .detail-gallery');
      assert.equal(await gallery.count(), 1, id + ' gallery missing');
      const slides = gallery.locator('[data-slide]');
      assert((await slides.count()) >= 2);
      for (let i = 0; i < (await slides.count()); i++) {
        await gallery.locator(`[data-slide-to="${i}"]`).click();
        await page.waitForTimeout(360);
        assert.equal(
          await gallery
            .locator(`[data-slide-to="${i}"]`)
            .getAttribute('aria-pressed'),
          'true',
        );
        assert(
          (await slides.nth(i).locator('img').getAttribute('src')).includes(
            `/extended/${id}/`,
          ),
        );
        assert((await slides.nth(i).locator('h3').innerText()).trim());
        assert(!(await slides.nth(i).innerText()).includes('undefined'));
        await images(slides.nth(i));
      }
      await gallery.locator('[data-next]').click();
      await page.waitForTimeout(360);
      assert.equal(
        await gallery
          .locator('[data-slide-to="0"]')
          .getAttribute('aria-pressed'),
        'true',
      );
      await gallery.locator('[data-prev]').click();
      await page.waitForTimeout(360);
      assert.equal(
        await gallery
          .locator(`[data-slide-to="${(await slides.count()) - 1}"]`)
          .getAttribute('aria-pressed'),
        'true',
      );
      if (id !== 'ebus') {
        for (const swatch of await page.locator('[data-color-index]').all()) {
          await swatch.click();
          assert.equal(await swatch.getAttribute('aria-pressed'), 'true');
        }
        await images(page.locator('[data-color-gallery]'));
      }
      if (width === 390) {
        await gallery.locator('[data-slide-to="0"]').click();
        await page.waitForTimeout(360);
        await gallery.scrollIntoViewIfNeeded();
        const box = await slides.first().locator('img').boundingBox();
        const cdp = await context.newCDPSession(page);
        const y = box.y + box.height / 2;
        await cdp.send('Input.dispatchTouchEvent', {
          type: 'touchStart',
          touchPoints: [{ x: box.x + box.width * 0.8, y }],
        });
        for (let step = 1; step <= 5; step++)
          await cdp.send('Input.dispatchTouchEvent', {
            type: 'touchMove',
            touchPoints: [{ x: box.x + box.width * (0.8 - step * 0.12), y }],
          });
        await cdp.send('Input.dispatchTouchEvent', {
          type: 'touchEnd',
          touchPoints: [],
        });
        await page.waitForTimeout(360);
        assert.equal(
          await gallery
            .locator('[data-slide-to="1"]')
            .getAttribute('aria-pressed'),
          'true',
          id + ' touch swipe',
        );
        await cdp.detach();
        checks++;
      }
      await noOverflow(page);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: path.join(output, `${id}-${width}.png`),
        fullPage: true,
      });
      checks++;
    }
    for (const suffix of services) {
      await page.goto(server.base + '/vinf/pages/ebus-' + suffix + '.html');
      await page.locator('main h1').waitFor();
      assert((await page.locator('main').innerText()).length > 600);
      assert.equal(
        await page.locator('main a[href*="reference.html"]').count(),
        0,
      );
      await images(page.locator('main'));
      await noOverflow(page);
      if (suffix === 'documents')
        assert.equal(await page.locator('[data-results] article').count(), 3);
      else {
        const accordion = page.locator('main [data-accordion]').first();
        await accordion.click();
        assert.equal(await accordion.getAttribute('aria-expanded'), 'true');
      }
      checks++;
    }
    await context.close();
    console.log(
      `PASS: ${width}px menu, catalog, five vehicle galleries and five EBus support pages`,
    );
  }
  assert.deepEqual(errors, [], 'No JS errors or failed local requests');
  console.log(
    JSON.stringify(
      {
        checks,
        widths: [1440, 768, 390],
        models,
        ebusServicePages: services,
        errors,
        screenshots: output,
      },
      null,
      2,
    ),
  );
})()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (browser) await browser.close();
    if (server) await server.close();
  });
