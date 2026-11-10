const fs = require('node:fs');
const path = require('node:path');

// URLs observed on the public product page, not inferred desktop variants.
const base =
  'https://static-cms-prod.vinfastauto.com/statics/e-scooter/evo-grand-premia/';
const files = {
  logo: 'hinh-anh-vinfast-evo-grand-premia-hero-text-logo.webp',
  hero: 'hinh-anh-vinfast-evo-grand-premia-hero-banner-mobile.webp',
  brown: 'hinh-anh-vinfast-evo-grand-premia-mau-nau-mobile.webp',
  olive: 'hinh-anh-vinfast-evo-grand-premia-mau-xanh-mint-mobile.webp',
  black: 'hinh-anh-vinfast-evo-grand-premia-mau-den-mobile.webp',
  front: 'hinh-anh-vinfast-evo-grand-premia-front-view-mobile.webp',
  battery: 'hinh-anh-vinfast-evo-grand-premia-slider-banner-mobile.webp',
  screen: 'hinh-anh-vinfast-evo-grand-premia-man-hinh-led-mobile.webp',
  headlight:
    'hinh-anh-vinfast-evo-grand-premia-den-pha-led-projector-mobile.webp',
  placement: 'hinh-anh-vinfast-evo-grand-premia-vi-tri-de-pin-mobile.webp',
  storage: 'hinh-anh-vinfast-evo-grand-premia-the-tich-cop-mobile.webp',
  suspension:
    'hinh-anh-vinfast-evo-grand-premia-ong-long-giam-chan-thuy-luc-mobile.webp',
  key: 'hinh-anh-vinfast-evo-grand-premia-chia-khoa-co-mobile.webp',
};

(async () => {
  fs.mkdirSync('assets/premia', { recursive: true });
  const manifest = [];
  for (const [name, filename] of Object.entries(files)) {
    const url = base + filename;
    const file = `assets/premia/${name}.webp`;
    if (!fs.existsSync(file)) {
      const response = await fetch(url);
      if (
        !response.ok ||
        !response.headers.get('content-type')?.startsWith('image/')
      )
        throw Error(`${response.status} ${url}`);
      fs.writeFileSync(file, Buffer.from(await response.arrayBuffer()));
    }
    manifest.push({
      file,
      source: url,
      reference: 'https://vinfastauto.com/vn_vi/xe-may-dien-evo-grand-premia',
      accessed: '2026-11-10',
      permission: 'User-authorized VinFast images for this educational project',
      role: name,
    });
    console.log(path.basename(file));
  }
  fs.writeFileSync(
    'assets/premia/manifest.json',
    JSON.stringify(manifest, null, 2) + '\n',
  );
  for (const [model, additions] of Object.entries({
    vf8: {
      hero: 'https://static-cms-prod.vinfastauto.com/statics/car/VF-8/hinh-anh-xe-VinFast-vf8-lai-xe-do-thi-mau-do-01.webp',
      eco: 'hinh-anh-vinfast-vf8-eco-text-logo-banner-desktop.webp',
      plus: 'https://static-cms-prod.vinfastauto.com/statics/car/VF-8/hinh-anh-xe-VinFast-vf8-ngoai-that-mau-xanh-reu-02.webp',
      'gallery-1':
        'https://static-cms-prod.vinfastauto.com/statics/car/VF-8/hinh-anh-xe-VinFast-vf8-gia-dinh-len-xe-pho-co-01.webp',
      'gallery-2':
        'https://static-cms-prod.vinfastauto.com/statics/car/VF-8/hinh-anh-xe-VinFast-vf8-ngoai-that-mau-do-khu-biet-thu-01.webp',
      'gallery-3':
        'https://static-cms-prod.vinfastauto.com/statics/car/VF-8/hinh-anh-xe-VinFast-vf8-gia-dinh-don-con-biet-thu-01.webp',
      'gallery-4':
        'https://static-cms-prod.vinfastauto.com/statics/car/VF-8/hinh-anh-xe-VinFast-vf8-gia-dinh-cop-xe-pho-01.webp',
      'gallery-5':
        'https://static-cms-prod.vinfastauto.com/statics/car/VF-8/hinh-anh-xe-VinFast-vf8-gia-dinh-dao-pho-chung-cu-01.webp',
      interior:
        'https://static-cms-prod.vinfastauto.com/statics/car/VF-8/hinh-anh-vinfast-vf8-interior-banner-desktop.webp',
      body: 'https://static-cms-prod.vinfastauto.com/statics/car/VF-8/hinh-anh-vinfast-vf8-exterior-detail-1-desktop.webp',
      mirror:
        'https://static-cms-prod.vinfastauto.com/statics/car/VF-8/hinh-anh-vinfast-vf8-exterior-detail-2-desktop.webp',
      roof: 'https://static-cms-prod.vinfastauto.com/statics/car/VF-8/hinh-anh-vinfast-vf8-exterior-detail-3-desktop.webp',
    },
    vf9: {
      hero: 'hinh-anh-vinfast-vf9-hero-banner-desktop-20260915.webp',
      eco: 'hinh-anh-vinfast-vf9-eco-text-logo-banner-desktop.webp',
      plus: 'hinh-anh-vinfast-vf9-product-summary-desktop.webp',
      'gallery-1': 'hinh-anh-vinfast-vf9-exterior-slider-1-desktop.webp',
      'gallery-2': 'hinh-anh-vinfast-vf9-exterior-slider-3-desktop.webp',
      'gallery-3': 'hinh-anh-vinfast-vf9-exterior-slider-4-desktop.webp',
      'gallery-4': 'hinh-anh-vinfast-vf9-exterior-slider-5-desktop.webp',
      'gallery-5': 'hinh-anh-vinfast-vf9-exterior-slider-6-desktop.webp',
      interior: 'hinh-anh-vinfast-vf9-interior-thumbnail-desktop.webp',
      roof: 'hinh-anh-vinfast-vf9-exterior-highlight-1-desktop-20260915.webp',
      led: 'hinh-anh-vinfast-vf9-exterior-highlight-3-desktop-20260915.webp',
      inlet: 'hinh-anh-vinfast-vf9-exterior-highlight-2-desktop.webp',
    },
    vf7: {
      hero: 'hinh-anh-vinfast-vf7-hero-banner-desktop.webp',
      eco: 'hinh-anh-vinfast-vf7-text-logo-banner-desktop.webp',
      plus: 'hinh-anh-vinfast-vf7-plus-text-logo-banner-desktop.webp',
      'gallery-1': 'hinh-anh-vinfast-vf7-exterior-slider-1-desktop.webp',
      'gallery-2': 'hinh-anh-vinfast-vf7-exterior-slider-2-desktop.webp',
      'gallery-3': 'hinh-anh-vinfast-vf7-exterior-slider-3-desktop.webp',
      'gallery-4': 'hinh-anh-vinfast-vf7-exterior-slider-4-desktop.webp',
      body: 'hinh-anh-vinfast-vf7-ngoai-that-mau-xam-than-xe-desktop.webp',
      handle: 'hinh-anh-vinfast-vf7-exterior-detail-2-desktop.webp',
      interior: 'hinh-anh-vinfast-vf7-interior-banner-desktop.webp',
      seats: 'hinh-anh-vinfast-vf7-interior-detail-1-desktop.webp',
      console: 'hinh-anh-vinfast-vf7-interior-detail-5-desktop.webp',
    },
    'evo-grand': {
      hero: 'hinh-anh-vinfast-evo-grand-hero-banner-mobile.webp',
      red: 'hinh-anh-vinfast-evo-grand-mau-do-goc-ngang-mobile.webp',
      olive: 'hinh-anh-vinfast-evo-grand-mau-xanh-mint-goc-ngang-mobile.webp',
      white: 'hinh-anh-vinfast-evo-grand-mau-trang-goc-ngang-mobile.webp',
      black: 'hinh-anh-vinfast-evo-grand-mau-den-goc-ngang-mobile.webp',
      front: 'hinh-anh-VinFast-Evo-Grand-front-view-mobile-20250910.webp',
      battery: 'hinh-anh-vinfast-evo-grand-slider-banner-mobile.webp',
      storage:
        'hinh-anh-VinFast-Evo-Grand-slider-content-1-mobile-20250910.webp',
      placement:
        'hinh-anh-VinFast-Evo-Grand-slider-content-2-mobile-20250910.webp',
      brake: 'hinh-anh-VinFast-Evo-Grand-slider-content-3-mobile-20250910.webp',
      motor: 'hinh-anh-VinFast-Evo-Grand-slider-content-4-mobile-20250910.webp',
    },
    vf5: {
      family:
        'xe-dien-vinfast-vf5-noi-that-gia-dinh-vui-ve-tren-xe-desktop.webp',
      sport: 'xe-dien-vinfast-vf5-mau-xam-ban-the-thao-padel-desktop.webp',
    },
    vf6: {
      eco: 'hinh-anh-xe-vinfast-vf6-logo-vf6-mau-do-desktop.webp',
      plus: 'hinh-anh-xe-vinfast-vf6-logo-vf6-mau-xanh-reu-desktop.webp',
      'gallery-1': 'hinh-anh-vinfast-vf6-exterior-slider-1-desktop.webp',
      'gallery-2':
        'hinh-anh-vinfast-vf6-ngoai-that-mau-do-ven-bien-desktop.webp',
      'gallery-3': 'hinh-anh-vinfast-vf6-exterior-slider-3-desktop.webp',
      'gallery-4': 'hinh-anh-vinfast-vf6-exterior-slider-4-desktop.webp',
      'gallery-5':
        'hinh-anh-xe-vinfast-vf6-mau-do-duong-ven-bien-01-desktop.webp',
      led: 'hinh-anh-vinfast-vf6-ngoai-that-mau-trang-den-led-desktop.webp',
      headlight: 'hinh-anh-vinfast-vf6-exterior-detail-2-desktop.webp',
      wheel: 'hinh-anh-vinfast-vf6-ngoai-that-mau-do-la-zang-desktop.webp',
      interior: 'hinh-anh-vinfast-vf6-interior-banner-desktop.webp',
    },
  })) {
    fs.mkdirSync(`assets/${model}`, { recursive: true });
    const manifestPath = `assets/${model}/manifest.json`;
    const entries = new Map(
      (fs.existsSync(manifestPath)
        ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
        : []
      ).map((entry) => [entry.file, entry]),
    );
    for (const [name, filename] of Object.entries(additions)) {
      const file = `assets/${model}/${name}.webp`;
      if (fs.existsSync(file) && entries.has(file)) continue;
      const category = model === 'evo-grand' ? 'e-scooter' : 'car';
      const source = filename.startsWith('https://')
        ? filename
        : `https://static-cms-prod.vinfastauto.com/statics/${category}/${model}/${filename}`;
      const response = await fetch(source);
      if (
        !response.ok ||
        !response.headers.get('content-type')?.startsWith('image/')
      )
        throw Error(`${response.status}: ${source}`);
      fs.writeFileSync(file, Buffer.from(await response.arrayBuffer()));
      entries.set(file, {
        file,
        source,
        reference: `https://vinfastauto.com/vn_vi/${['vf8', 'vf9'].includes(model) ? 'dat-coc-xe-' : category === 'car' ? 'dat-coc-xe-dien-' : 'xe-may-dien-'}${model}`,
        accessed: '2026-11-10',
        permission:
          'User-authorized VinFast images for this educational project',
        role: name,
      });
      console.log(file);
    }
    fs.writeFileSync(
      manifestPath,
      JSON.stringify([...entries.values()], null, 2) + '\n',
    );
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
