// Chỉ mở trang tham chiếu riêng được công cụ tìm kiếm lập chỉ mục công khai.
// Không thay Host, không dùng cookie đăng nhập, proxy, chế độ stealth hoặc vượt challenge.
const fs = require('node:fs');
const {
  chromium,
} = require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
(async () => {
  const url = 'https://stg-cms-v2.vinfastauto.com/vn_en';
  const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
  const html = await response.text();
  const blocked =
    !response.ok || /IM_UNDER_ATTACK|captcha|challenge-platform/i.test(html);
  fs.writeFileSync(
    'research/current/indexed-reference-status.json',
    JSON.stringify(
      { url, status: response.status, blocked, length: html.length },
      null,
      2,
    ),
  );
  if (blocked) {
    console.log('Public reference unavailable; stopped.');
    return;
  }
  fs.writeFileSync('research/current/indexed-reference.html', html);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);
  const media = await page.locator('img,video,source').evaluateAll((ns) =>
    ns.map((n) => ({
      tag: n.tagName,
      alt: n.alt || '',
      src: n.currentSrc || n.src || n.getAttribute('srcset') || '',
      poster: n.poster || '',
    })),
  );
  fs.writeFileSync(
    'research/current/indexed-media.json',
    JSON.stringify(media, null, 2),
  );
  for (const width of [1440, 1366, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (
      let y = 0;
      y < (await page.evaluate(() => document.body.scrollHeight));
      y += 900
    ) {
      await page.evaluate((y) => scrollTo(0, y), y);
      await page.waitForTimeout(90);
    }
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({
      path: `research/current/indexed-${width}.png`,
      fullPage: true,
    });
  }
  console.log(
    JSON.stringify({ title: await page.title(), images: media.length }),
  );
  await browser.close();
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
