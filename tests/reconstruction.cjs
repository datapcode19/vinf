const {
  chromium,
} = require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const directory = 'tests/reconstruction';
const viewports = [
  { width: 1440, height: 900 },
  { width: 1366, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
];
const results = {
  date: '2026-11-10',
  reference:
    'Browser HTTP 403; source geometry and screenshot comparison UNVERIFIED',
  pages: [],
  links: [],
  interactions: [],
  errors: [],
  missing: [],
};
let server, browser;
const wait = (page) => page.waitForTimeout(320);

async function touch(page, locator, dx, dy = 0, duration = 160) {
  await locator.scrollIntoViewIfNeeded();
  const box = await locator.boundingBox();
  const x = box.x + box.width / 2,
    y = box.y + Math.min(box.height / 2, 170);
  const session = await page.context().newCDPSession(page);
  await session.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x, y, id: 1 }],
  });
  const steps = duration < 60 ? 2 : 8;
  for (let step = 1; step <= steps; step++) {
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [
        { x: x + (dx * step) / steps, y: y + (dy * step) / steps, id: 1 },
      ],
    });
    await page.waitForTimeout(duration / steps);
  }
  await session.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });
  await wait(page);
  await session.detach();
}

(async () => {
  fs.mkdirSync(directory, { recursive: true });
  server = await require('./static-server.cjs').start('/vinf');
  browser = await chromium.launch();
  const paths = [
    'index.html',
    ...fs
      .readdirSync('pages')
      .filter(
        (file) =>
          file.endsWith('.html') &&
          !['product.html', 'accessory.html'].includes(file),
      )
      .map((file) => 'pages/' + file),
    'pages/product.html?id=vf6',
    'pages/product.html?id=kinet',
    ...['EEP71061000', 'ACS10000246', 'ACS40000094', 'EEP69072176AB'].map(
      (id) => 'pages/accessory.html?id=' + id,
    ),
  ];
  const links = new Set(),
    placeholders = new Set();
  for (const viewport of viewports) {
    const page = await browser.newPage({
      viewport,
      hasTouch: true,
      isMobile: viewport.width <= 768,
    });
    page.on('pageerror', (error) => results.errors.push(error.message));
    page.on('response', (response) => {
      if (response.status() >= 400) results.missing.push(response.url());
    });
    for (const pathname of paths) {
      await page.goto(`${server.base}/vinf/${pathname}`);
      await page.locator('main h1').waitFor();
      await page.locator('img').evaluateAll((images) =>
        Promise.all(
          images.map((image) => {
            image.loading = 'eager';
            return image.decode();
          }),
        ),
      );
      await page.evaluate(() => document.fonts.ready);
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `Overflow: ${pathname} ${viewport.width}`,
      );
      const hrefs = await page
        .locator('a[href]')
        .evaluateAll((elements) => elements.map((element) => element.href));
      for (const href of hrefs) {
        if (href.startsWith(server.base)) links.add(href.split('#')[0]);
        if (href.includes('/pages/reference.html?route='))
          placeholders.add(new URL(href).searchParams.get('route'));
      }
      const sections = await page
        .locator('main > section, #site-header, #site-footer')
        .evaluateAll((elements) =>
          elements.map((element) => {
            const box = element.getBoundingClientRect(),
              style = getComputedStyle(element);
            return {
              id: element.id,
              className: element.className,
              x: box.x,
              width: box.width,
              height: box.height,
              font: style.fontFamily,
              fontSize: style.fontSize,
              lineHeight: style.lineHeight,
              padding: style.padding,
              margin: style.margin,
              gap: style.gap,
              color: style.color,
            };
          }),
        );
      const important =
        /index.html|vf[35789].html|viper.html|evo-grand(?:-premia)?.html|product.html/.test(
          pathname,
        );
      if (important) {
        for (
          let y = 0;
          y < (await page.evaluate(() => document.body.scrollHeight));
          y += 750
        )
          await page.evaluate((y) => scrollTo(0, y), y);
        await page.evaluate(() => scrollTo(0, 0));
        await page.waitForTimeout(450);
        await page.screenshot({
          path: `${directory}/${viewport.width}-${pathname.replace(/[^a-z0-9-]/gi, '_')}.png`,
          fullPage: true,
        });
      }
      results.pages.push({ pathname, viewport, status: 'PASS', sections });
    }
    for (const [id, range, price] of [
      ['vf8', '475 km', '1.079.000.000'],
      ['vf9', '602 km', '1.529.000.000'],
    ]) {
      await page.goto(
        `${server.base}/vinf/pages/reference.html?route=dat-coc-xe-${id}`,
      );
      await page.waitForURL(`**/vinf/pages/${id}.html`);
      const scenes = page.locator('[data-suv-scenes]');
      const status = page.locator('[data-suv-status]');
      await touch(page, scenes, -140);
      assert.match(await status.textContent(), /Plus$/);
      const selected = await page
        .locator('[data-suv-scenes] > [aria-hidden="false"]')
        .innerText();
      assert(selected.includes(range));
      assert(selected.includes(price));
      await touch(page, scenes, 140);
      assert.match(await status.textContent(), /Eco$/);
      await page.locator('[data-suv-prev]').click();
      await wait(page);
      assert.match(await status.textContent(), /Plus$/);
      await page.locator('[data-suv-next]').click();
      await wait(page);
      assert.match(await status.textContent(), /Eco$/);
      await page.locator('.detail-gallery [data-slide-to="4"]').click();
      await wait(page);
      await touch(page, page.locator('.detail-gallery .swipe-viewport'), -140);
      assert.equal(
        await page.locator('.detail-gallery [data-slide-status]').textContent(),
        '1 / 5',
      );
      await page.locator(`#${id}-specs-tab-1`).click();
      assert.match(
        await page.locator(`#${id}-specs-panel-1`).innerText(),
        id === 'vf8' ? /149 kW/ : /35 phút/,
      );
      await page
        .getByRole('link', { name: 'Đăng ký lái thử mô phỏng', exact: true })
        .click();
      assert.equal(await page.locator('#model').inputValue(), id);
    }
    await page.goto(
      `${server.base}/vinf/pages/reference.html?route=dat-coc-xe-dien-vf7`,
    );
    await page.waitForURL('**/vinf/pages/vf7.html');
    await page.locator('[data-vf7-version="1"]').click();
    await wait(page);
    assert.equal(
      await page.locator('[data-vf7-status]').textContent(),
      'VF 7 Plus FWD',
    );
    assert.match(
      await page
        .locator('[data-vf7-scenes] > [aria-hidden="false"]')
        .innerText(),
      /500,5 km/,
    );
    await touch(page, page.locator('[data-vf7-scenes]'), 140);
    assert.equal(
      await page.locator('[data-vf7-status]').textContent(),
      'VF 7 Eco',
    );
    assert.match(
      await page
        .locator('[data-vf7-scenes] > [aria-hidden="false"]')
        .innerText(),
      /440 km/,
    );
    await page.locator('#vf7-specs-tab-1').click();
    assert.match(await page.locator('#vf7-specs-panel-1').innerText(), /469/);
    await page.locator('.detail-gallery [data-slide-to="3"]').click();
    await wait(page);
    await touch(page, page.locator('.detail-gallery .swipe-viewport'), -140);
    assert.equal(
      await page.locator('.detail-gallery [data-slide-status]').textContent(),
      '1 / 4',
    );
    await page.goto(
      `${server.base}/vinf/pages/reference.html?route=xe-may-dien-evo-grand`,
    );
    await page.waitForURL('**/vinf/pages/evo-grand.html');
    await page.locator('[data-color-index="3"]').click();
    await wait(page);
    assert.equal(await page.locator('[data-color-name]').textContent(), 'Đen');
    await page.locator('[data-color-next]').click();
    await wait(page);
    assert.equal(
      await page.locator('[data-color-name]').textContent(),
      'Đỏ tươi',
    );
    await touch(page, page.locator('[data-color-viewport]'), -140);
    assert.equal(
      await page.locator('[data-color-name]').textContent(),
      'Xanh Oliu',
    );
    await touch(page, page.locator('[data-color-viewport]'), 140);
    assert.equal(
      await page.locator('[data-color-name]').textContent(),
      'Đỏ tươi',
    );
    assert.match(
      await page.locator('#evo-grand-specs-panel-0').innerText(),
      /683/,
    );
    await touch(
      page,
      page.locator('.scooter-feature-gallery .swipe-viewport'),
      -140,
    );
    assert.equal(
      await page
        .locator('.scooter-feature-gallery [data-slide-status]')
        .textContent(),
      '2 / 4',
    );
    await page
      .getByRole('link', { name: 'Lái thử Evo Grand — mô phỏng', exact: true })
      .click();
    assert.equal(await page.locator('#model').inputValue(), 'evo-grand');
    await page.goto(`${server.base}/vinf/pages/product.html?id=vf6`);
    await page.locator('[data-version="1"]').click();
    await wait(page);
    assert.match(
      await page.locator('#vehicle-image').getAttribute('src'),
      /vf6\/plus.webp$/,
    );
    assert.match(await page.locator('#price').textContent(), /699/);
    assert.match(await page.locator('#range').textContent(), /460/);
    await touch(page, page.locator('.vehicle-stage .swipe-viewport'), 140);
    assert.match(
      await page.locator('#vehicle-image').getAttribute('src'),
      /vf6\/eco.webp$/,
    );
    assert.match(await page.locator('#price').textContent(), /646/);
    for (const pathname of ['product.html?id=vf6', 'vf5.html']) {
      await page.goto(`${server.base}/vinf/pages/${pathname}`);
      const gallery = page.locator('.detail-gallery');
      await gallery.locator('[data-slide-to="4"]').click();
      await wait(page);
      assert.equal(
        await gallery.locator('[data-slide-status]').textContent(),
        '5 / 5',
      );
      await touch(page, gallery.locator('.swipe-viewport'), -140);
      assert.equal(
        await gallery.locator('[data-slide-status]').textContent(),
        '1 / 5',
      );
    }
    await page.goto(`${server.base}/vinf/index.html`);
    if (viewport.width <= 1050) await page.locator('.menu-toggle').tap();
    await page
      .getByRole('button', { name: 'Xe máy điện', exact: true })
      .click();
    await page
      .locator('#menu-2')
      .getByRole('tab', { name: 'Xe phổ thông', exact: true })
      .click();
    await page
      .locator('#menu-2')
      .getByRole('link', { name: /Evo Grand Premia/ })
      .click();
    assert.match(page.url(), /\/vinf\/pages\/evo-grand-premia.html$/);
    const color = page.locator('[data-color-viewport]'),
      label = page.locator('[data-color-name]');
    const colorHeight = (await color.boundingBox()).height;
    await touch(page, color, -110);
    assert.equal(await label.textContent(), 'Xanh Oliu');
    await touch(page, color, 110);
    assert.equal(await label.textContent(), 'Nâu Titanium');
    await touch(page, color, -8, 0, 250);
    assert.equal(await label.textContent(), 'Nâu Titanium');
    await touch(page, color, -90, 0, 32);
    assert.equal(await label.textContent(), 'Xanh Oliu');
    await page.locator('[data-color-index="2"]').click();
    await wait(page);
    assert.equal(await label.textContent(), 'Đen Bóng Mới');
    await page.locator('[data-color-next]').click();
    await wait(page);
    assert.equal(await label.textContent(), 'Nâu Titanium');
    const b = await color.boundingBox();
    await page.mouse.move(b.x + b.width * 0.7, b.y + b.height / 2);
    await page.mouse.down();
    await page.mouse.move(b.x + b.width * 0.2, b.y + b.height / 2, {
      steps: 12,
    });
    await page.mouse.up();
    await wait(page);
    assert.equal(await label.textContent(), 'Xanh Oliu');
    assert.equal((await color.boundingBox()).height, colorHeight);
    await color.scrollIntoViewIfNeeded();
    const scrollBefore = await page.evaluate(() => scrollY);
    await touch(page, color, 3, -130);
    assert.equal(await label.textContent(), 'Xanh Oliu');
    assert(await page.evaluate((y) => scrollY > y + 20, scrollBefore));
    const gallery = page.locator('.premia-feature-slider');
    const galleryViewport = gallery.locator('.swipe-viewport');
    await touch(page, galleryViewport, -110);
    assert.equal(
      await gallery.locator('[data-slide-status]').textContent(),
      '2 / 6',
    );
    await touch(page, galleryViewport, 110);
    assert.equal(
      await gallery.locator('[data-slide-status]').textContent(),
      '1 / 6',
    );
    await page.locator('#premia-specs-tab-1').click();
    assert.match(
      await page.locator('#premia-specs-panel-1').innerText(),
      /2,4 kWh/,
    );
    const arrow = page.locator('[data-color-next]');
    const arrowBox = await arrow.boundingBox(),
      svgBox = await arrow.locator('svg').boundingBox();
    assert.equal(arrowBox.width, arrowBox.height);
    assert(
      Math.abs(
        svgBox.x + svgBox.width / 2 - (arrowBox.x + arrowBox.width / 2),
      ) < 1,
    );
    assert(
      Math.abs(
        svgBox.y + svgBox.height / 2 - (arrowBox.y + arrowBox.height / 2),
      ) < 1,
    );
    await page
      .getByRole('link', { name: 'Đăng ký lái thử mô phỏng', exact: true })
      .click();
    assert.equal(await page.locator('#model').inputValue(), 'evo-grand-premia');
    results.interactions.push({
      viewport,
      status: 'PASS',
      checks:
        'VF8/VF9 versions, touch both ways, arrows, specs, gallery and CTA; VF7 versions/specs/gallery; Evo Grand colors/specs/gallery; legacy redirects; VF6 versions and gallery; VF5 gallery; Premia menu, touch both ways, short/fast/vertical, mouse drag, colors/arrows/loop, stable height, gallery, tabs, CTA',
    });
    await page.close();
    console.log('PASS viewport', viewport);
  }
  const page = await browser.newPage();
  for (const url of links) {
    const response = await page.request.get(url);
    assert(response.ok(), url);
    results.links.push({
      path: url.replace(server.base, ''),
      status: response.status(),
    });
  }
  results.placeholders = [...placeholders].sort();
  assert.deepEqual(results.errors, []);
  assert.deepEqual(results.missing, []);
  console.log(
    JSON.stringify({
      pages: results.pages.length,
      interactions: results.interactions.length,
      links: results.links.length,
      placeholders: results.placeholders.length,
      errors: results.errors,
    }),
  );
})()
  .catch((error) => {
    results.failure = error.stack;
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    fs.writeFileSync(
      `${directory}/results.json`,
      JSON.stringify(results, null, 2),
    );
    if (browser) await browser.close();
    if (server) await server.close();
  });
