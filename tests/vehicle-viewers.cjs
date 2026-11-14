const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { chromium } = require(
  process.env.PLAYWRIGHT_PATH ||
    'C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package',
);
const { start } = require('./static-server.cjs');

(async () => {
  const { vehicleViewers } = await import('../data/vehicle-viewers.js');
  const server = await start('/vinf21');
  const browser = await chromium.launch({ headless: true });
  const output = path.join(os.tmpdir(), 'vinf-viewer-verification');
  fs.mkdirSync(output, { recursive: true });
  const results = [];
  try {
    for (const width of (process.env.VIEWER_WIDTHS || '1440,768,390')
      .split(',')
      .map(Number)) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        hasTouch: width === 390,
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      let errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      for (const vehicle of vehicleViewers) {
        errors = [];
        const row = { id: vehicle.id, width, colors: [], status: 'PASS' };
        try {
          await page.goto(`${server.base}/vinf21/${vehicle.route}`);
          const viewer = page.locator('[data-vehicle-viewer]');
          await viewer.waitFor();
          await viewer.scrollIntoViewIfNeeded();
          await page.evaluate(async () => {
            const images = [...document.querySelectorAll('main img')];
            images.forEach((image) => {
              image.loading = 'eager';
            });
            await Promise.all(
              images.map((image) => image.decode().catch(() => {})),
            );
          });
          assert.equal(await viewer.getAttribute('data-viewer-mode'), '2d');
          const broken = await page
            .locator('main img')
            .evaluateAll((images) =>
              images
                .filter((image) => !image.naturalWidth)
                .map((image) => image.src),
            );
          assert.deepEqual(broken, [], 'Broken images');
          assert.equal(
            await page.evaluate(
              () => document.documentElement.scrollWidth > innerWidth + 1,
            ),
            false,
            'Horizontal overflow',
          );
          const swatches = viewer.locator('.swatches button');
          row.colors = await swatches.evaluateAll((buttons) =>
            buttons.map((button) => button.getAttribute('aria-label')),
          );
          for (let index = 0; index < row.colors.length; index++) {
            if (width === 390) await swatches.nth(index).tap();
            else await swatches.nth(index).click();
            await page.waitForFunction(
              ({ id, index }) => {
                const root = document.querySelector(
                  `[data-vehicle-viewer="${id}"]`,
                );
                return (
                  root
                    .querySelectorAll('.swatches button')
                    [index].getAttribute('aria-pressed') === 'true'
                );
              },
              { id: vehicle.id, index },
            );
            await page.waitForTimeout(50);
            const selection = await viewer.evaluate((root) => ({
              name: root.querySelector(
                '[data-color-name], [data-viper-color-name], #selection',
              )?.textContent,
              index: root.querySelector(
                '.viewer-stage [data-swipe-index], .viewer-stage[data-swipe-index]',
              )?.dataset.swipeIndex,
            }));
            assert.equal(selection.name, row.colors[index], 'Color name');
            assert.equal(Number(selection.index), index, 'Image follows color');
          }
          if (row.colors.length > 1) {
            await swatches.last().focus();
            await page.keyboard.press('Home');
            await page.waitForFunction(
              () =>
                document
                  .querySelector('[data-vehicle-viewer] .swatches button')
                  .getAttribute('aria-pressed') === 'true',
            );
            await viewer.evaluate((root) => {
              const buttons = [...root.querySelectorAll('.swatches button')];
              for (let i = 0; i < 15; i++) buttons[i % buttons.length].click();
              buttons.at(-1).click();
            });
            await page.waitForFunction(
              () =>
                [
                  ...document.querySelectorAll(
                    '[data-vehicle-viewer] .swatches button',
                  ),
                ]
                  .at(-1)
                  .getAttribute('aria-pressed') === 'true',
            );
          }
          await viewer.locator('[data-viewer-zoom-in]').click();
          assert.equal(
            await viewer
              .locator('.viewer-stage')
              .evaluate((node) => node.style.getPropertyValue('--viewer-zoom')),
            '1.25',
          );
          await viewer.locator('[data-viewer-reset]').click();
          assert.equal(
            await viewer
              .locator('.viewer-stage')
              .evaluate((node) => node.style.getPropertyValue('--viewer-zoom')),
            '1',
          );
          if (width === 390) {
            const stage = viewer.locator('.viewer-stage');
            await stage.scrollIntoViewIfNeeded();
            const box = await stage.boundingBox();
            const x = box.x + box.width / 2,
              y = box.y + box.height / 2;
            const session = await context.newCDPSession(page);
            const points = (distance) => [
              { x: x - distance, y, id: 1 },
              { x: x + distance, y, id: 2 },
            ];
            await session.send('Input.dispatchTouchEvent', {
              type: 'touchStart',
              touchPoints: points(25),
            });
            for (const distance of [35, 45, 60])
              await session.send('Input.dispatchTouchEvent', {
                type: 'touchMove',
                touchPoints: points(distance),
              });
            await session.send('Input.dispatchTouchEvent', {
              type: 'touchEnd',
              touchPoints: [],
            });
            assert.ok(
              Number(
                await stage.evaluate((node) =>
                  node.style.getPropertyValue('--viewer-zoom'),
                ),
              ) > 1,
              'Pinch zoom',
            );
            await session.detach();
            await viewer.locator('[data-viewer-reset]').tap();
          }
          assert.equal(
            await viewer.locator('[data-viewer-mode-button]').count(),
            0,
            'No fake rotation options',
          );
          const gallery = page.locator('main [data-slider]').first();
          if (
            (await gallery.count()) &&
            (await gallery.locator('[data-next]').count())
          ) {
            await gallery.locator('[data-next]').click();
            await page.waitForFunction(
              () =>
                document.querySelector('main [data-slider] [data-swipe-index]')
                  ?.dataset.swipeIndex === '1',
            );
            await gallery.locator('[data-prev]').click();
            await page.waitForFunction(
              () =>
                document.querySelector('main [data-slider] [data-swipe-index]')
                  ?.dataset.swipeIndex === '0',
            );
            assert.ok(
              await gallery.locator('img').count(),
              'Original gallery retained',
            );
          }
          assert.deepEqual(errors, [], 'Console errors');
          if (['vf3', 'kinet', 'ebus', 'president'].includes(vehicle.id)) {
            await viewer.scrollIntoViewIfNeeded();
            await page.screenshot({
              path: path.join(output, `${vehicle.id}-${width}.png`),
            });
          }
        } catch (error) {
          row.status = 'FAIL';
          row.error = error.message;
        }
        results.push(row);
        console.log(
          `${row.status} ${vehicle.id} ${width}${row.error ? ': ' + row.error : ''}`,
        );
      }
      await context.close();
    }
  } finally {
    fs.writeFileSync(
      path.join(output, 'results.json'),
      JSON.stringify(results, null, 2),
    );
    await browser.close();
    await server.close();
  }
  assert.equal(results.filter((row) => row.status === 'FAIL').length, 0);
  console.log(`PASS ${results.length} vehicle/viewport checks. ${output}`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
