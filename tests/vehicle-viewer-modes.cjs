// Dữ liệu hình học/khung màu dưới đây chỉ là fixture, không phải xe VinFast.
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
  const server = await start('/vinf21');
  const browser = await chromium.launch({
    headless: true,
    env: {
      ...process.env,
      CHROME_LOG_FILE: path.join(os.tmpdir(), 'vinf-viewer-chromium.log'),
    },
    args: [
      '--enable-unsafe-swiftshader',
      '--log-file=' + path.join(os.tmpdir(), 'vinf-viewer-chromium.log'),
    ],
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
    });
    const page = await context.newPage();
    const library = path.join(os.tmpdir(), 'vinf-model-viewer-test.js');
    // Có thể dùng bản thư viện đã tải vào TEMP để chạy hoàn toàn offline.
    if (fs.existsSync(library))
      await page.route(
        'https://cdn.jsdelivr.net/npm/@google/model-viewer@4.1.0/dist/model-viewer.min.js',
        (route) =>
          route.fulfill({
            body: fs.readFileSync(library),
            contentType: 'text/javascript',
            headers: { 'access-control-allow-origin': '*' },
          }),
      );
    const vertices = new Float32Array([-1, -1, 0, 1, -1, 0, 0, 1, 0]);
    const buffer = Buffer.from(vertices.buffer);
    const fixture = {
      asset: { version: '2.0' },
      scene: 0,
      scenes: [{ nodes: [0] }],
      nodes: [{ mesh: 0 }],
      meshes: [{ primitives: [{ attributes: { POSITION: 0 }, material: 0 }] }],
      materials: [
        {
          name: 'Body',
          doubleSided: true,
          pbrMetallicRoughness: { baseColorFactor: [1, 0, 0, 1] },
        },
      ],
      buffers: [
        {
          uri:
            'data:application/octet-stream;base64,' + buffer.toString('base64'),
          byteLength: buffer.length,
        },
      ],
      bufferViews: [{ buffer: 0, byteLength: buffer.length }],
      accessors: [
        {
          bufferView: 0,
          componentType: 5126,
          count: 3,
          type: 'VEC3',
          min: [-1, -1, 0],
          max: [1, 1, 0],
        },
      ],
    };
    await page.route('**/fixture.gltf', (route) =>
      route.fulfill({ json: fixture }),
    );
    await page.goto(`${server.base}/vinf21/pages/vf3.html`);
    await page.locator('[data-vehicle-viewer]').waitFor();
    await page.evaluate(async () => {
      const { mountVehicleViewer } = await import('../js/vehicle-viewer.js');
      document.querySelector('main').innerHTML =
        '<section id="fixture" class="container"><div id="stage"><img src="../assets/vf3/white.webp" alt="2D test fixture" /></div><div class="swatches"><button aria-pressed="true">A</button><button aria-pressed="false">B</button></div><p id="color-name">A</p></section>';
      const root = document.querySelector('#fixture');
      const swatches = root.querySelector('.swatches');
      swatches.querySelectorAll('button').forEach(
        (button) =>
          (button.onclick = () => {
            swatches
              .querySelectorAll('button')
              .forEach((b) =>
                b.setAttribute('aria-pressed', String(b === button)),
              );
          }),
      );
      const colors = ['red', 'blue'].map((color, i) => ({
        name: color,
        materialColor: i ? [0, 0, 1, 1] : [1, 0, 0, 1],
        source: 'test fixture only',
        framesLicense: 'test-generated',
        fullCircle: true,
        frames: Array.from(
          { length: 12 },
          (_, j) =>
            'data:image/svg+xml,' +
            encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="${color}"/><text x="10" y="50">TEST ${j}</text></svg>`,
            ),
        ),
      }));
      mountVehicleViewer(
        root,
        {
          id: 'fixture',
          name: 'Test geometry',
          colors,
          image: 'assets/vf3/white.webp',
          missing: '',
          model: {
            src: 'fixture.gltf',
            source: 'test fixture only',
            license: 'test-generated',
            bodyMaterials: ['Body'],
          },
        },
        {
          stage: root.querySelector('#stage'),
          swatches,
          name: root.querySelector('#color-name'),
        },
      );
    });
    await page.locator('[data-viewer-mode-button="360"]').click();
    await page.locator('.viewer-interactive img').waitFor();
    await page.locator('.viewer-interactive').focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForFunction(() =>
      document.querySelector('.viewer-interactive img')?.alt.includes('2/12'),
    );
    await page.locator('.swatches button').last().click();
    await page.waitForFunction(() =>
      document.querySelector('.viewer-interactive img')?.alt.includes('blue'),
    );
    const before = await page
      .locator('.viewer-interactive img')
      .getAttribute('src');
    const box = await page.locator('.viewer-interactive').boundingBox();
    await page.mouse.move(box.x + 100, box.y + 100);
    await page.mouse.down();
    await page.mouse.move(box.x + 170, box.y + 100, { steps: 4 });
    await page.mouse.up();
    await page.waitForFunction(
      (before) =>
        document.querySelector('.viewer-interactive img')?.src !== before,
      before,
    );
    await page.locator('[data-viewer-mode-button="2d"]').click();
    assert.equal(
      await page
        .locator('.swatches button')
        .last()
        .getAttribute('aria-pressed'),
      'true',
    );
    await page.locator('[data-viewer-mode-button="3d"]').click();
    await page.waitForFunction(
      () => document.querySelector('model-viewer')?.loaded,
      { timeout: 20000 },
    );
    assert.deepEqual(
      await page
        .locator('model-viewer')
        .evaluate(
          (model) =>
            model.model.materials[0].pbrMetallicRoughness.baseColorFactor,
        ),
      [0, 0, 1, 1],
    );
    await page.locator('.viewer-interactive').focus();
    const orbit = await page
      .locator('model-viewer')
      .evaluate((model) => model.getCameraOrbit().theta);
    await page.keyboard.press('ArrowRight');
    await page.waitForFunction(
      (theta) =>
        Math.abs(
          document.querySelector('model-viewer').getCameraOrbit().theta - theta,
        ) > 0.05,
      orbit,
    );
    await page.locator('[data-viewer-zoom-in]').click();
    await page.locator('[data-viewer-auto]').click();
    assert.equal(
      await page.locator('model-viewer').evaluate((model) => model.autoRotate),
      true,
    );
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(
      () => !document.querySelector('model-viewer').autoRotate,
    );
    await page
      .locator('model-viewer')
      .evaluate((model) => model.dispatchEvent(new Event('error')));
    await page.waitForFunction(
      () => document.querySelector('#fixture').dataset.viewerMode === '2d',
    );
    assert.equal(
      await page
        .locator('.swatches button')
        .last()
        .getAttribute('aria-pressed'),
      'true',
    );
    console.log(
      'PASS component fixtures: sequence drag/keyboard/color, persistent color, real WebGL load/material/orbit/zoom, auto-rotation/reduced-motion, error fallback',
    );
    await context.close();
  } finally {
    await browser.close();
    await server.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
