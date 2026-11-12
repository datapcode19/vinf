const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE ||
    'C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package',
);

let browser, server;
const results = {
  date: '2026-11-12',
  pages: [],
  interactions: [],
  localLinks: [],
  externalLinks: [],
  failures: [],
};
const moduleAt = (file) => import(pathToFileURL(path.resolve(file)).href);
const near = (actual, expected, message) =>
  assert(
    Math.abs(actual - expected) < 0.01,
    message || `${actual} != ${expected}`,
  );

async function check(name, task) {
  try {
    await task();
    results.interactions.push({ name, status: 'PASS' });
  } catch (error) {
    results.failures.push({ name, error: error.message });
    console.error('FAIL', name, error.message);
  }
}

(async () => {
  const { destinations } = await moduleAt('data/destinations.js');
  const { onRoadCost, loanSchedule, operatingCost } = await moduleAt(
    'js/cost-calculations.js',
  );
  await check(
    'Financial calculations: independent fixtures, boundaries and repayment conservation',
    async () => {
      near(
        onRoadCost({
          price: 100000000,
          registrationRate: 10,
          plate: 20000000,
          inspection: 100000,
          road: 1500000,
          insurance: 400000,
          other: 200000,
        }).total,
        132200000,
      );
      for (const method of ['annuity', 'principal']) {
        const zero = loanSchedule({
          price: 120000000,
          downPayment: 0,
          annualRate: 0,
          months: 12,
          method,
        });
        near(zero.schedule[0].payment, 10000000);
        near(zero.totalInterest, 0);
        const loan = loanSchedule({
          price: 150000000,
          downPayment: 30000000,
          annualRate: 12,
          months: 12,
          method,
        });
        near(loan.schedule[0].interest, 1200000);
        near(loan.schedule.at(-1).balance, 0);
        near(
          loan.schedule.reduce((sum, row) => sum + row.principal, 0),
          120000000,
        );
        if (method === 'principal') near(loan.totalInterest, 7800000);
        else near(loan.schedule[0].payment, 10661854.6414);
        assert(loan.schedule.every((row) => row.balance >= 0));
      }
      assert.throws(() =>
        loanSchedule({
          price: 100,
          downPayment: 101,
          annualRate: 1,
          months: 12,
        }),
      );
      assert.throws(() =>
        loanSchedule({ price: 100, downPayment: 0, annualRate: 1, months: 0 }),
      );
      assert.throws(() =>
        loanSchedule({
          price: 100,
          downPayment: 0,
          annualRate: 1,
          months: 1.5,
        }),
      );
      assert.throws(() =>
        onRoadCost({
          price: NaN,
          registrationRate: 0,
          plate: 0,
          inspection: 0,
          road: 0,
          insurance: 0,
          other: 0,
        }),
      );
      const paid = loanSchedule({
        price: 100,
        downPayment: 100,
        annualRate: 8,
        months: 12,
      });
      near(paid.total, 0);
      const costs = operatingCost({
        monthlyKm: 1000,
        years: 3,
        kwhPer100: 3,
        electricityPrice: 3000,
        litresPer100: 2,
        petrolPrice: 22000,
        electricMaintenance: 0,
        petrolMaintenance: 0,
      });
      near(costs.distance, 36000);
      near(costs.electricTotal, 3240000);
      near(costs.petrolTotal, 15840000);
      near(costs.difference, 12600000);
    },
  );
  server = await require('./static-server.cjs').start('/vinf');
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  let pageErrors = [];
  const writes = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('request', (request) => {
    if (request.method() !== 'GET') writes.push(request.url());
  });
  const links = new Set();
  const external = new Map();
  const visit = async (url, width, isNew) => {
    pageErrors = [];
    const response = await page.goto(url);
    assert.equal(response.status(), 200, url);
    await page.locator('main h1').first().waitFor();
    assert.equal(await page.locator('#site-header .brand').count(), 1);
    assert.equal(await page.locator('#site-footer').count(), 1);
    assert(
      !/404|Không tìm thấy|đang được hoàn thiện/.test(
        await page.locator('main h1').first().textContent(),
      ),
      url,
    );
    const broken = await page.locator('img').evaluateAll(async (imgs) => {
      await Promise.all(
        imgs.map((img) => {
          img.loading = 'eager';
          return img.decode().catch(() => {});
        }),
      );
      return imgs
        .filter((img) => !img.complete || !img.naturalWidth)
        .map((img) => img.getAttribute('src'));
    });
    assert.deepEqual(broken, [], url + ' broken images');
    const content = await page.locator('main').innerText();
    if (isNew) assert(content.length > 550, url + ' insufficient content');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - innerWidth,
    );
    assert(
      overflow <= 1,
      url + ' page overflow ' + overflow + 'px at ' + width,
    );
    const anchors = await page.locator('a[href]').evaluateAll((nodes) =>
      nodes.map((a) => ({
        href: a.href,
        official: a.hasAttribute('data-official'),
        text: a.textContent.trim(),
      })),
    );
    for (const a of anchors) {
      const u = new URL(a.href);
      if (u.origin === server.base) {
        assert(u.pathname.startsWith('/vinf/'), 'lost base path ' + a.href);
        if (u.pathname.endsWith('.html')) links.add(u.pathname + u.search);
      } else
        external.set(a.href, {
          url: a.href,
          role: a.official
            ? 'official source / live service'
            : 'external navigation',
          label: a.text,
        });
    }
    assert.deepEqual(pageErrors, [], url + ' JS errors');
    results.pages.push({
      url: new URL(url).pathname + new URL(url).search,
      width,
      status: 'PASS',
      contentLength: content.length,
      images: await page.locator('img').count(),
    });
  };
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const entry of destinations) {
      await check(
        `${entry.id}: content, images, chrome and overflow at ${width}px`,
        () =>
          visit(server.base + '/vinf/pages/' + entry.id + '.html', width, true),
      );
    }
    console.log(`Checked all ${destinations.length} new pages at ${width}px`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  // Seed every existing HTML entry, then follow all reachable internal destinations.
  for (const file of fs
    .readdirSync('pages')
    .filter(
      (file) =>
        file.endsWith('.html') &&
        !['product.html', 'reference.html', 'accessory.html'].includes(file),
    ))
    links.add('/vinf/pages/' + file);
  links.add('/vinf/index.html');
  const visited = new Set(results.pages.map((row) => row.url));
  for (const url of links) {
    if (visited.has(url)) continue;
    visited.add(url);
    await check('Reachable route ' + url, () =>
      visit(server.base + url, 1440, false),
    );
  }
  results.localLinks = [...links].sort();
  results.externalLinks = [...external.values()].sort((a, b) =>
    a.url.localeCompare(b.url),
  );
  assert(
    ![...links].some((url) => url.includes('reference.html')),
    'Reachable placeholder route remains',
  );
  await check(
    'All 55 legacy reference links redirect to their dedicated local page',
    async () => {
      for (const entry of destinations) {
        await page.goto(
          server.base +
            '/vinf/pages/reference.html?route=' +
            encodeURIComponent(entry.slug),
        );
        await page.waitForURL('**/pages/' + entry.id + '.html');
        await page.locator('main h1').waitFor();
      }
    },
  );
  await check(
    'Product tabs, accordions, color selector and galleries',
    async () => {
      for (const id of [
        'minio-green',
        'herio-green',
        'limo-green',
        'ec-van',
        'ebus',
        'president',
        'fadil',
        'lux-a',
        'lux-sa',
        'evo-lite-neo',
        'drgnfly',
      ]) {
        await page.goto(server.base + '/vinf/pages/' + id + '.html');
        const tabs = page.locator('main [role="tab"]');
        for (let i = 0; i < (await tabs.count()); i++) {
          await tabs.nth(i).click();
          assert.equal(await tabs.nth(i).getAttribute('aria-selected'), 'true');
          const panel = await tabs.nth(i).getAttribute('aria-controls');
          assert(await page.locator('#' + panel).isVisible());
        }
        const accordion = page.locator('main [data-accordion]').first();
        await accordion.click();
        assert.equal(await accordion.getAttribute('aria-expanded'), 'true');
        await accordion.click();
        assert.equal(await accordion.getAttribute('aria-expanded'), 'false');
        if (await page.locator('main [data-slider]').count()) {
          await page
            .locator('main [data-slider] img')
            .evaluateAll((imgs) => Promise.all(imgs.map((i) => i.decode())));
          await page.locator('main [data-next]').click();
          assert.equal(
            await page
              .locator('main [data-slider] .swipe-viewport')
              .getAttribute('data-swipe-index'),
            '1',
          );
        }
        if (await page.locator('main [data-color-gallery]').count()) {
          await page
            .locator('main [data-color-gallery] img')
            .evaluateAll((imgs) => Promise.all(imgs.map((i) => i.decode())));
          await page.locator('[data-color-index="1"]').click();
          assert.equal(
            await page
              .locator('[data-color-index="1"]')
              .getAttribute('aria-pressed'),
            'true',
          );
          assert.notEqual(
            await page.locator('[data-color-name]').textContent(),
            'Đỏ',
          );
        }
      }
    },
  );
  await check(
    'Searches, empty states, reset and preserved official document links',
    async () => {
      for (const [id, term] of [
        ['car-documents', 'Limo'],
        ['scooter-documents', 'Feliz'],
        ['ebus-documents', 'EB6'],
        ['locations', 'Hà Nội'],
        ['contracts', '2025'],
        ['company-news', 'Vietbuild'],
        ['car-news', 'VF 8'],
        ['scooter-news', 'bảo dưỡng'],
      ]) {
        await page.goto(server.base + '/vinf/pages/' + id + '.html');
        const input = page.locator('main input[type="search"]');
        await input.fill(term);
        assert((await page.locator('[data-results] article').count()) > 0);
        await input.fill('no-matching-item-xyz');
        assert.equal(await page.locator('[data-results] article').count(), 0);
        await page.locator('main button[type="reset"]').click();
        await page.waitForFunction(() =>
          document.querySelector('[data-results] article'),
        );
        assert(
          (await page.locator('[data-results] a[data-official]').count()) > 0,
        );
        assert(
          !(
            await page
              .locator('[data-results] a[data-official]')
              .first()
              .getAttribute('href')
          ).includes('reference.html'),
        );
      }
    },
  );
  await check(
    'Calculators: UI results, invalid loan, CSV export and stale-result reset',
    async () => {
      await page.goto(server.base + '/vinf/pages/on-road-cost.html');
      await page.locator('[name="price"]').fill('100000000');
      await page.locator('[name="registrationRate"]').fill('10');
      await page.locator('main button[type="submit"]').click();
      assert(
        (await page.locator('[data-cost-result]').textContent()).includes(
          '110.000.000',
        ),
      );
      await page.goto(server.base + '/vinf/pages/installment.html');
      await page.locator('[name="price"]').fill('120000000');
      await page.locator('[name="downPayment"]').fill('0');
      await page.locator('[name="annualRate"]').fill('0');
      await page.locator('[name="months"]').fill('12');
      await page.locator('main button[type="submit"]').click();
      assert.equal(await page.locator('[data-schedule] tbody tr').count(), 12);
      assert(
        (await page.locator('[data-cost-result]').textContent()).includes(
          '10.000.000',
        ),
      );
      const downloadPromise = page.waitForEvent('download');
      await page.locator('[data-download-schedule]').click();
      const download = await downloadPromise;
      assert.equal(download.suggestedFilename(), 'lich-tra-gop-mo-phong.csv');
      await page.locator('[name="downPayment"]').fill('120000001');
      assert(await page.locator('[data-download-schedule]').isHidden());
      await page.locator('main button[type="submit"]').click();
      assert(
        (await page.locator('[data-cost-result]').textContent()).includes(
          'không được vượt',
        ),
      );
      await page.goto(server.base + '/vinf/pages/operating-cost.html');
      await page.locator('main button[type="submit"]').click();
      assert(
        (await page.locator('[data-cost-result]').textContent()).includes(
          '12.600.000',
        ),
      );
      await page.locator('main button[type="reset"]').click();
      await page.waitForTimeout(20);
      assert(
        (await page.locator('[data-cost-result]').textContent()).includes(
          'cập nhật',
        ),
      );
    },
  );
  await check(
    'Shopping simulations: preselect, versions, review, export, reset and historical exclusion',
    async () => {
      for (const [id, model] of [
        ['buy-car', 'vf6'],
        ['buy-scooter', 'kyo'],
      ]) {
        await page.goto(
          server.base + '/vinf/pages/' + id + '.html?model=' + model,
        );
        assert.equal(await page.locator('[name="model"]').inputValue(), model);
        assert.equal(
          await page
            .locator('[name="model"] option[value="president"]')
            .count(),
          0,
        );
        if (id === 'buy-car') {
          await page.locator('[name="version"]').selectOption('1');
          assert(
            (await page.locator('[data-shop-preview]').textContent()).includes(
              '699.000.000',
            ),
          );
        }
        await page.locator('[name="simulation"]').check();
        await page.locator('main button[type="submit"]').click();
        assert(await page.locator('[data-shop-summary]').isVisible());
        assert(
          (await page.locator('[data-shop-status]').textContent()).includes(
            'không có đơn hàng thật',
          ),
        );
        const downloadPromise = page.waitForEvent('download');
        await page.locator('[data-download-selection]').click();
        assert.equal(
          (await downloadPromise).suggestedFilename(),
          'lua-chon-xe-mo-phong.json',
        );
        await page.locator('main button[type="reset"]').click();
        await page.waitForTimeout(20);
        assert(await page.locator('[data-shop-summary]').isHidden());
      }
    },
  );
  await check(
    'No form submissions, account storage or payment requests',
    async () => {
      assert.deepEqual(writes, []);
      assert.equal(
        await page.evaluate(() => localStorage.length + sessionStorage.length),
        0,
      );
    },
  );
  await check(
    'Existing home carousel still slides images and fades stationary details',
    async () => {
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await page.goto(server.base + '/vinf/index.html');
      const root = page.locator('[data-showcase="cars-0"]');
      await root.scrollIntoViewIfNeeded();
      await root
        .locator('img')
        .evaluateAll((imgs) => Promise.all(imgs.map((i) => i.decode())));
      await page.waitForTimeout(300);
      const sample = await root.evaluate(async (root) => {
        const panel = root.querySelector('.showcase-info[aria-hidden="false"]');
        const image = root.querySelector('[data-model-image]');
        const before = panel.getBoundingClientRect().x;
        const imageBefore = image.getBoundingClientRect().x;
        root.querySelector('[data-model-next]').click();
        await new Promise((r) => setTimeout(r, 90));
        return {
          before,
          after: panel.getBoundingClientRect().x,
          imageBefore,
          imageAfter: image.getBoundingClientRect().x,
          opacity: +getComputedStyle(panel).opacity,
        };
      });
      assert.equal(sample.before, sample.after);
      assert(sample.imageAfter < sample.imageBefore);
      assert(sample.opacity > 0 && sample.opacity < 1);
    },
  );
  await check(
    'Touch galleries, mobile navigation and narrow-screen calculators',
    async () => {
      const mobile = await browser.newContext({
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true,
      });
      const phone = await mobile.newPage();
      const errors = [];
      phone.on('pageerror', (error) => errors.push(error.message));
      const cdp = await mobile.newCDPSession(phone);
      for (const [id, selector] of [
        ['limo-green', 'main [data-slider] .swipe-viewport'],
        ['president', 'main [data-color-viewport]'],
      ]) {
        await phone.goto(server.base + '/vinf/pages/' + id + '.html');
        const gallery = phone.locator(selector);
        await gallery
          .locator('img')
          .evaluateAll((imgs) => Promise.all(imgs.map((img) => img.decode())));
        await gallery.scrollIntoViewIfNeeded();
        const box = await gallery.boundingBox();
        const x = box.x + box.width * 0.85,
          y = box.y + box.height * 0.5;
        await cdp.send('Input.dispatchTouchEvent', {
          type: 'touchStart',
          touchPoints: [{ x, y, id: 1 }],
        });
        for (let step = 1; step <= 6; step++)
          await cdp.send('Input.dispatchTouchEvent', {
            type: 'touchMove',
            touchPoints: [{ x: x - (box.width * 0.7 * step) / 6, y, id: 1 }],
          });
        await cdp.send('Input.dispatchTouchEvent', {
          type: 'touchEnd',
          touchPoints: [],
        });
        await phone.waitForTimeout(350);
        assert.equal(await gallery.getAttribute('data-swipe-index'), '1');
      }
      await phone.goto(server.base + '/vinf/pages/on-road-cost.html');
      await phone.locator('main button[type="submit"]').click();
      assert(
        (await phone.locator('[data-cost-result]').textContent()).includes(
          '500.000.000',
        ),
      );
      assert(
        await phone.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      );
      await phone.locator('.menu-toggle').click();
      await phone.getByRole('button', { name: 'Ô tô', exact: true }).click();
      await phone
        .locator('#menu-1')
        .getByRole('tab', { name: 'Xe dịch vụ', exact: true })
        .click();
      await phone
        .locator('#menu-1')
        .getByRole('link', { name: /Limo Green/ })
        .click();
      await phone.waitForURL('**/pages/limo-green.html');
      assert.equal(await phone.locator('main h1').textContent(), 'Limo Green');
      assert.deepEqual(errors, []);
      await mobile.close();
    },
  );
  await check(
    'All 37 home model links point to the corresponding product',
    async () => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(server.base + '/vinf/index.html');
      const { carGroups, scooterGroups } = await moduleAt(
        'data/home-products.js',
      );
      const { products } = await moduleAt('data/products.js');
      for (const [type, groups] of [
        ['cars', carGroups],
        ['scooters', scooterGroups],
      ]) {
        for (const [groupIndex, group] of groups.entries()) {
          await page.locator('#home-' + type + '-tab-' + groupIndex).click();
          const root = page.locator(
            '[data-showcase="' + type + '-' + groupIndex + '"]',
          );
          await root
            .locator('img')
            .evaluateAll((imgs) =>
              Promise.all(imgs.map((img) => img.decode())),
            );
          for (const [index, model] of group.items.entries()) {
            await root.locator('[data-model="' + index + '"]').click();
            const product = products.find((product) => product.id === model.id);
            assert(product, model.name + ' missing catalog record');
            const expected =
              server.base +
              '/vinf/pages/' +
              (product.detailPath
                ? product.detailPath + '.html'
                : 'product.html?id=' + product.id);
            assert.equal(
              await root.locator('[data-model-link]').getAttribute('href'),
              expected,
              model.name,
            );
            assert.equal(
              await root.locator('[data-model-image]').getAttribute('alt'),
              model.name,
            );
          }
        }
      }
    },
  );
  // Capture representative final pages for visual inspection, not every permutation.
  fs.mkdirSync('tests/destination-visual', { recursive: true });
  for (const [id, width] of [
    ['limo-green', 1440],
    ['president', 390],
    ['installment', 390],
    ['scooter-documents', 768],
    ['locations', 390],
  ]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(server.base + '/vinf/pages/' + id + '.html');
    await page.screenshot({
      path: `tests/destination-visual/${id}-${width}.png`,
      fullPage: true,
    });
  }
  console.log(
    JSON.stringify(
      {
        pages: results.pages.length,
        localRoutes: results.localLinks.length,
        externalDestinations: results.externalLinks.length,
        checks: results.interactions.length,
        failures: results.failures,
      },
      null,
      2,
    ),
  );
})()
  .catch((error) => {
    results.failures.push({ name: 'Test runner', error: error.stack });
    console.error(error);
  })
  .finally(async () => {
    fs.writeFileSync(
      'tests/destination-results.json',
      JSON.stringify(results, null, 2),
    );
    if (browser) await browser.close();
    if (server) await server.close();
    if (results.failures.length) process.exitCode = 1;
  });
