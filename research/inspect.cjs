const {
  chromium,
} = require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });
  await page.goto('https://vinfastauto.com/vn_vi', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });
  await page.locator('a[href]').first().waitFor({ timeout: 45000 });
  await page.waitForTimeout(4000);
  const links = await page.locator('a[href]').evaluateAll((nodes) =>
    nodes
      .map((a) => ({
        text: a.textContent.trim().replace(/\s+/g, ' '),
        url: a.href,
      }))
      .filter((a) => a.text),
  );
  fs.writeFileSync('research/links.json', JSON.stringify(links, null, 2));
  fs.writeFileSync(
    'research/home-images.json',
    JSON.stringify(
      await page
        .locator('img')
        .evaluateAll((ns) =>
          ns.map((n) => ({ alt: n.alt, src: n.currentSrc || n.src })),
        ),
      null,
      2,
    ),
  );
  await page.screenshot({
    path: 'research/reference-desktop.png',
    fullPage: true,
  });
  for (
    let y = 0;
    y < (await page.evaluate(() => document.body.scrollHeight));
    y += 800
  ) {
    await page.evaluate((y) => scrollTo(0, y), y);
    await page.waitForTimeout(80);
  }
  await page.screenshot({
    path: 'research/reference-desktop.png',
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: 'research/reference-mobile.png',
    fullPage: true,
  });
  console.log(
    JSON.stringify({ title: await page.title(), links: links.length }),
  );
  await browser.close();
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
