const fs = require('node:fs');
const {
  chromium,
} = require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
const entries = [
  ['battery-cover', 'EEP71061000'],
  ['robot-vf9', 'ACS10000246'],
  ['umbrella', 'ACS40000094'],
  ['charger', 'EEP69072176AB'],
];
(async () => {
  fs.mkdirSync('assets/accessories', { recursive: true });
  const manifest = [];
  for (const [name, id] of entries) {
    const source = `https://shop.vinfastauto.com/vn_vi/${id}.html`;
    const r = await fetch(source, { signal: AbortSignal.timeout(20000) });
    const html = await r.text();
    if (!r.ok || !html.includes('product-detail')) {
      manifest.push({ name, source, status: 'BLOCKED' });
      continue;
    }
    const tags = html.match(/<img\b[^>]+>/g) || [];
    const folder = id === 'ACS10000246' ? 'VINFASTVF9BUILDINGBLOCKS' : id;
    const tag = tags.find(
      (t) =>
        t.includes('/images/Accessory/' + folder + '/') && /\bsrc=/.test(t),
    );
    const url = tag?.match(/\bsrc="([^"]+)"/)?.[1]?.replace(/&amp;/g, '&');
    if (!url) {
      manifest.push({ name, source, status: 'BLOCKED: no image' });
      continue;
    }
    const imageUrl = new URL(url, source).href;
    const image = await fetch(imageUrl, { signal: AbortSignal.timeout(20000) });
    if (!image.ok) throw Error(name + ' image ' + image.status);
    const file = `assets/accessories/${name}.png`;
    fs.writeFileSync(file, Buffer.from(await image.arrayBuffer()));
    manifest.push({
      name,
      file,
      source: imageUrl,
      reference: source,
      status: 'downloaded',
      role: 'Khối phụ kiện trang chủ; ảnh đúng sản phẩm từ shop chính thức, chưa xác minh là ảnh home hiện hành',
      permission: 'Người dùng xác nhận quyền sử dụng ảnh cho đồ án học tập.',
    });
  }
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  try {
    await page.goto('https://shop.vinfastauto.com/vn_vi/phu-kien', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'research/current/shop-1440.png' });
    const layout = await page
      .locator('header')
      .first()
      .evaluate((node) => ({
        height: node.getBoundingClientRect().height,
        font: getComputedStyle(node).fontFamily,
        text: node.innerText.slice(0, 1000),
      }));
    fs.writeFileSync(
      'research/current/shop-layout.json',
      JSON.stringify(layout, null, 2),
    );
    console.log('Public shop rendered', JSON.stringify(layout));
  } catch (e) {
    console.log('Public shop visual unavailable', e.message);
  }
  for (const asset of manifest.filter((a) => a.status === 'downloaded')) {
    const data = fs.readFileSync(asset.file).toString('base64');
    Object.assign(
      asset,
      await page.evaluate(async (d) => {
        const i = new Image();
        i.src = 'data:image/png;base64,' + d;
        await i.decode();
        return { width: i.naturalWidth, height: i.naturalHeight };
      }, data),
    );
  }
  fs.writeFileSync(
    'assets/accessories/manifest.json',
    JSON.stringify(manifest, null, 2),
  );
  console.log(
    JSON.stringify(
      manifest.map(({ name, status, file }) => ({ name, status, file })),
    ),
  );
  await browser.close();
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
