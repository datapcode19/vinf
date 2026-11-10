// Chỉ tải những URL ảnh được nhận diện trong trang chủ, không đoán tên tài sản.
const fs = require('node:fs');
const names = [
  'vinfast-vf-wild-mau-xam-home.webp',
  'vinfast-vf2-mau-vang-home_0.webp',
  'vinfast-vf8-all-new-mau-do-home.webp',
  'vinfast-vf-mpv7-mau-nau-home.webp',
  'vinfast-minio-green-mau-hong-ngang-home.webp',
  'vinfast-herio-green-mau-xam-ngang-home.webp',
  'vinfast-ec-van-mau-trang-home.webp',
  'vinfast-nerio-green-mau-xam-ngang-home.webp',
  'vinfast-limo-green-mau-xam-home.webp',
  'hinh-nen-xe-may-dien-mobile.webp',
  'vinfast-viper-home.webp',
  'vinfast-kinet-mau-xam-ngang-home.webp',
  'vinfast-verox-home.webp',
  'vinfast-kyo-mau-nau-ngang-home.webp',
  'vinfast-feliz-2027-mau-trang-ngang-home.webp',
  'vinfast-feliz-mau-xanh-ngang-home.webp',
  'vinfast-feliz-ii-mau-do-den-ngang-home.webp',
  'vinfast-evo-grand-ii-mau-do-home.webp',
  'vinfast-evo-grand-limited-mau-xanh-home_0.webp',
  'vinfast-evo-grand-premia-mau-nau-home.webp',
  'vinfast-evo-grand-mau-xanh-ngang-home.webp',
  'vinfast-evo-mau-do-ngang-home.webp',
  'vinfast-evo-lite-mau-xanh-ngang-home.webp',
  'vinfast-evo-grand-lite-mau-tim-ngang-home.webp',
  'vinfast-evo-lite-neo-mau-xanh-ngang-home.webp',
  'vinfast-flazz-mau-do-ngang-home.webp',
  'vinfast-flazz-max-mau-cam-ngang-home.webp',
  'vinfast-zgoo-mau-xanh-ngang-home.webp',
  'vinfast-amio-mau-xam-ngang-home.webp',
  'vinfast-amio-s-mau-trang-ngang-home.webp',
  'vinfast-amio-s2-home_0.webp',
  'vinfast-drgnfly-mau-den-ngang-home.webp',
  'showcase-bh-1.webp',
  'showcase-bh-2.webp',
  'showcase-bh-3.webp',
  'hinh-anh-manh-liet-vi-tuong-lai-xanh-2709.webp',
  'vinfast-vf9-top-home.webp',
  'icon-car-filled.webp',
  'icon-after-sales-filled.webp',
  'thunderbolt-icon.webp',
  'hinh-anh-he-sinh-thai-toan-dien-desktop-0210.webp',
  'hinh-anh-trai-nghiem-smart-connect-desktop-0210.webp',
  'statics/logo-footer-v2.webp',
];
(async () => {
  fs.mkdirSync('assets/home', { recursive: true });
  const manifest = [];
  for (const name of names) {
    const source = 'https://static-cms-prod.vinfastauto.com/' + name;
    const file = 'assets/home/' + name.split('/').pop();
    try {
      const r = await fetch(source, { signal: AbortSignal.timeout(20000) });
      if (!r.ok) throw Error('HTTP ' + r.status);
      fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
      manifest.push({
        source,
        file,
        status: 'downloaded',
        reference: 'https://vinfastauto.com/vn_vi',
        permission:
          'Người dùng xác nhận quyền dùng trong đồ án học tập; không suy rộng sang thương mại.',
      });
    } catch (e) {
      manifest.push({ source, file, status: 'blocked', error: e.message });
    }
  }
  fs.writeFileSync(
    'assets/home/manifest.json',
    JSON.stringify(manifest, null, 2),
  );
  console.log(
    JSON.stringify({
      downloaded: manifest.filter((a) => a.status === 'downloaded').length,
      blocked: manifest.filter((a) => a.status === 'blocked'),
    }),
  );
})();
