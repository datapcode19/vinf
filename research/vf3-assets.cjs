const fs = require('node:fs');
const files = {
  hero: 'xe-dien-vinfast-vf3-anh-bia-chay-cao-toc-desktop',
  eco: 'xe-dien-vinfast-vf3-chon-mau-nen-trang-logo-desktop',
  plus: 'hinh-anh-vinfast-vf3-eco-text-logo-banner-desktop',
  white: 'hinh-anh-vinfast-vf3-ngoai-that-mau-trang-desktop',
  rear: 'xe-dien-vinfast-vf3-ngoai-that-phia-sau-mau-vang-desktop',
  front: 'xe-dien-vinfast-vf3-ngoai-that-mat-truoc-mau-do-do-thi-desktop',
  city: 'xe-dien-vinfast-vf3-ngoai-that-mat-truoc-mau-vang-do-thi-desktop',
  road: 'xe-dien-vinfast-vf3-chay-pho-mat-truoc-mau-vang-desktop',
  interior: 'xe-dien-vinfast-vf3-noi-that-khoang-lai-man-hinh-cam-ung-desktop',
  outdoors: 'xe-dien-vinfast-vf3-trai-nghiem-da-ngoai-thien-nhien-desktop',
};
(async () => {
  fs.mkdirSync('assets/vf3', { recursive: true });
  const records = [];
  for (const [name, file] of Object.entries(files)) {
    const source =
      'https://static-cms-prod.vinfastauto.com/statics/car/vf3/' +
      file +
      '.webp';
    const response = await fetch(source, {
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw Error(name + ': ' + response.status);
    const target = 'assets/vf3/' + name + '.webp';
    fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
    records.push({
      file: target,
      source,
      role: 'VF 3 / ' + name,
      permission: 'User confirmed educational image use, 2026-11-07',
      reference: 'https://vinfastauto.com/vn_vi/dat-coc-xe-dien-vf3',
      status: 'Downloaded; layout unverified',
    });
  }
  fs.writeFileSync(
    'assets/vf3/manifest.json',
    JSON.stringify(records, null, 2),
  );
  console.log(records.length + ' VF 3 images saved');
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
