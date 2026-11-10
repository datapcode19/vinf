const {
  chromium,
} = require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
const fs = require('node:fs');
(async () => {
  fs.mkdirSync('research/comparison', { recursive: true });
  const browser = await chromium.launch({ headless: true }),
    results = [];
  try {
    for (const [name, url] of [
      ['source', 'https://vinfastauto.com/vn_vi'],
      ['live', 'https://datapcode19.github.io/vinf/index.html'],
    ]) {
      const page = await browser.newPage({
        viewport: { width: 1440, height: 900 },
      });
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      try {
        const response = await page.goto(url, {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        });
        await page.waitForTimeout(4000);
        const html = await page.content(),
          body = await page.locator('body').innerText();
        const blocked =
          response.status() >= 400 ||
          /captcha|IM_UNDER_ATTACK|challenge-platform|verify you are human/i.test(
            html,
          );
        fs.writeFileSync(`research/comparison/${name}.html`, html);
        fs.writeFileSync(`research/comparison/${name}.txt`, body);
        results.push({
          name,
          url,
          status: response.status(),
          blocked,
          title: await page.title(),
          characters: body.length,
          errors,
        });
        for (const width of [1440, 390]) {
          await page.setViewportSize({ width, height: 900 });
          if (!blocked) {
            for (
              let y = 0;
              y <
              Math.min(
                await page.evaluate(() => document.body.scrollHeight),
                18000,
              );
              y += 700
            ) {
              await page.evaluate((y) => scrollTo(0, y), y);
              await page.waitForTimeout(70);
            }
          }
          await page.evaluate(() => scrollTo(0, 0));
          await page.screenshot({
            path: `research/comparison/${name}-${width}.png`,
            fullPage: true,
          });
          if (!blocked) {
            const sections = await page
              .locator('main>section, main>div, #site-header, #site-footer')
              .evaluateAll((nodes) =>
                nodes.map((n) => ({
                  tag: n.tagName,
                  id: n.id,
                  class: n.className,
                  text: n.innerText.slice(0, 900),
                  rect: { width: n.clientWidth, height: n.clientHeight },
                  font: getComputedStyle(n).fontFamily,
                })),
              );
            fs.writeFileSync(
              `research/comparison/${name}-${width}-sections.json`,
              JSON.stringify(sections, null, 2),
            );
          }
        }
        if (!blocked && name === 'source') {
          const media = await page
            .locator('img,video,source')
            .evaluateAll((nodes) =>
              nodes.map((n) => ({
                tag: n.tagName,
                src: n.currentSrc || n.src,
                alt: n.alt,
                poster: n.poster,
              })),
            );
          fs.writeFileSync(
            'research/comparison/source-media.json',
            JSON.stringify(media, null, 2),
          );
        }
      } catch (e) {
        results.push({ name, url, error: e.message });
      }
      await page.close();
    }
    const page = await browser.newPage();
    for (const path of [
      'pages/vf3.html',
      'pages/product.html?id=kinet',
      'js/swipe.js',
      'pages/reference.html?route=dat-coc-xe-dien-vf5',
    ]) {
      const url = 'https://datapcode19.github.io/vinf/' + path;
      try {
        const r = await page.request.get(url, { timeout: 20000 });
        results.push({ name: 'live-path', url, status: r.status() });
      } catch (e) {
        results.push({ url, error: e.message });
      }
    }
  } finally {
    await browser.close();
    fs.writeFileSync(
      'research/comparison/access.json',
      JSON.stringify(results, null, 2),
    );
    console.log(JSON.stringify(results, null, 2));
  }
})();
