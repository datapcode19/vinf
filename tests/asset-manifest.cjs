const fs = require('node:fs');
const {
  chromium,
} = require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
(async () => {
  const inputs = [
    'assets/vf8/manifest.json',
    'assets/vf9/manifest.json',
    'assets/vf7/manifest.json',
    'assets/evo-grand/manifest.json',
    'assets/premia/manifest.json',
    'assets/vf6/manifest.json',
    'assets/vf5/manifest.json',
    'assets/viper/manifest.json',
    'assets/company/manifest.json',
    'assets/maintenance/manifest.json',
    'assets/support/manifest.json',
    'assets/rescue/manifest.json',
    'assets/kinet/manifest.json',
    'assets/manifest.json',
    'assets/vf3/manifest.json',
    'assets/home/manifest.json',
    'assets/accessories/manifest.json',
    'assets/shared/manifest.json',
    'assets/fonts/manifest.json',
  ];
  const assets = new Map();
  for (const file of inputs) {
    for (const asset of JSON.parse(fs.readFileSync(file, 'utf8'))) {
      if (asset.file && fs.existsSync(asset.file))
        assets.set(asset.file, {
          ...asset,
          role: asset.role || asset.usage || role(asset.file),
          status: asset.status || 'downloaded',
        });
    }
  }
  const browser = await chromium.launch({ headless: true }),
    page = await browser.newPage();
  for (const asset of assets.values()) {
    if (/\.(png|webp|jpg)$/i.test(asset.file)) {
      const data = fs.readFileSync(asset.file).toString('base64');
      const mime = asset.file.endsWith('.png')
        ? 'image/png'
        : asset.file.endsWith('.jpg')
          ? 'image/jpeg'
          : 'image/webp';
      Object.assign(
        asset,
        await page.evaluate(
          async ({ data, mime }) => {
            const i = new Image();
            i.src = `data:${mime};base64,${data}`;
            await i.decode();
            return {
              width: i.naturalWidth,
              height: i.naturalHeight,
              aspectRatio: Number(
                (i.naturalWidth / i.naturalHeight).toFixed(4),
              ),
            };
          },
          { data, mime },
        ),
      );
    }
    asset.bytes = fs.statSync(asset.file).size;
  }
  fs.writeFileSync(
    'assets/manifest.json',
    JSON.stringify([...assets.values()], null, 2),
  );
  await browser.close();
  console.log(
    assets.size +
      ' assets verified, including ' +
      [...assets.values()].filter((a) => a.width).length +
      ' images',
  );
})();
function role(file) {
  if (file.includes('showcase-bh')) return 'Trang chủ — hậu mãi';
  if (file.includes('tuong-lai-xanh'))
    return 'Trang chủ — truyền thông tương lai xanh';
  if (file.includes('he-sinh-thai') || file.includes('vf9-top'))
    return 'Trang chủ — hệ sinh thái';
  if (file.includes('smart-connect')) return 'Trang chủ — VF eStore';
  if (file.includes('icon-') || file.includes('thunderbolt'))
    return 'Icon hệ sinh thái';
  if (file.includes('logo')) return 'Logo thương hiệu';
  return 'Ảnh danh mục sản phẩm trang chủ và menu';
}
