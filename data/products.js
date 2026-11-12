import { newCars } from './new-cars.js';
import { extendedProducts } from './extended-products.js';

// Chỉ dữ liệu tĩnh; không gọi API VinFast. Các số liệu là snapshot khảo sát.
export const products = [
  ...Object.entries(newCars).map(([id, model]) => ({
    id,
    name: model.name,
    group: 'personal',
    segment: model.segment,
    seats: model.seats,
    range: model.range,
    price: model.price,
    image: `${id}/summary.webp`,
    detailPath: id,
    source: `https://vinfastauto.com/vn_vi/${model.route}`,
  })),
  {
    id: 'vf-wild',
    name: 'VF Wild',
    group: 'personal',
    segment: 'Bán tải REEV',
    seats: 5,
    range: 'Tới 1.000 km (kết hợp, NEDC)',
    price: 860000000,
    image: 'vf-wild/hero.webp',
    detailPath: 'vf-wild',
    source: 'https://vinfastauto.com/vn_vi/dat-coc-xe-vf-wild',
  },
  {
    id: 'evo-grand-premia',
    name: 'Evo Grand Premia',
    group: 'scooter',
    segment: 'Phổ thông',
    range: '~262 km/lần sạc (2 pin)',
    price: 27900000,
    image: 'premia/hero.webp',
    detailPath: 'evo-grand-premia',
    source: 'https://vinfastauto.com/vn_vi/xe-may-dien-evo-grand-premia',
  },
  {
    id: 'vf3',
    name: 'VF 3',
    group: 'personal',
    segment: 'MiniCar',
    seats: 4,
    range: '215 km (NEDC)',
    price: 285000000,
    image: 'vf3.webp',
    detailPath: 'vf3',
    source: 'https://vinfastauto.com/vn_vi/dat-coc-xe-dien-vf3',
  },
  {
    id: 'vf5',
    detailPath: 'vf5',
    name: 'VF 5',
    group: 'personal',
    segment: 'A-SUV',
    seats: 5,
    range: '326,4 km (NEDC)',
    price: 496000000,
    image: 'vf5.webp',
  },
  {
    id: 'vf6',
    name: 'VF 6',
    group: 'personal',
    segment: 'B-SUV',
    seats: 5,
    range: '485 km (NEDC)',
    price: 646000000,
    image: 'vf6-eco.webp',
    detail: true,
    source: 'https://vinfastauto.com/vn_vi/dat-coc-xe-dien-vf6',
    versions: [
      { name: 'Eco', price: 646000000, range: '485 km (NEDC)' },
      { name: 'Plus', price: 699000000, range: '460 km (NEDC)' },
    ],
  },
  {
    id: 'vf7',
    detailPath: 'vf7',
    name: 'VF 7',
    group: 'personal',
    segment: 'C-SUV',
    seats: 5,
    range: '440 km (NEDC, Eco)',
    price: 740000000,
    image: 'vf7.webp',
  },
  {
    id: 'vf8',
    detailPath: 'vf8',
    name: 'VF 8',
    group: 'personal',
    segment: 'D-SUV',
    seats: 5,
    range: '635 km (NEDC)',
    price: 898000000,
    image: 'vf8.webp',
  },
  {
    id: 'vf9',
    detailPath: 'vf9',
    name: 'VF 9',
    group: 'personal',
    segment: 'E-SUV',
    seats: 7,
    range: '626 km (WLTP)',
    price: 1348000000,
    image: 'vf9.webp',
  },
  {
    id: 'minio',
    image: 'home/vinfast-minio-green-mau-hong-ngang-home.webp',
    name: 'Minio Green',
    group: 'service',
    segment: 'MiniCar',
    seats: 4,
    range: '210 km (NEDC)',
    price: 188000000,
  },
  {
    id: 'herio',
    image: 'home/vinfast-herio-green-mau-xam-ngang-home.webp',
    name: 'Herio Green',
    group: 'service',
    segment: 'A-SUV',
    seats: 5,
    range: '326 km (NEDC)',
    price: 450000000,
  },
  {
    id: 'kinet',
    name: 'Kinet',
    group: 'scooter',
    segment: 'Cao cấp',
    range: '~145 km/lần sạc',
    price: 40000000,
    image: 'kinet-do.webp',
    detail: true,
    source: 'https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-kinet',
    colors: [
      ['Đỏ Đen', '#b62127', 'do'],
      ['Xám Xi Măng', '#888b8b', 'xi-mang'],
      ['Trắng Ngọc Trai', '#e9e7df', 'trang'],
      ['Đen Bóng', '#202124', 'den'],
      ['Nâu Ánh Kim', '#846b50', 'nau'],
    ],
  },
  {
    id: 'viper',
    image: 'home/vinfast-viper-home.webp',
    detailPath: 'viper',
    name: 'Viper',
    group: 'scooter',
    segment: 'Cao cấp',
    price: 35000000,
  },
  {
    id: 'vero-x',
    image: 'home/vinfast-verox-home.webp',
    name: 'Vero X',
    group: 'scooter',
    segment: 'Cao cấp',
    price: 34900000,
  },
  {
    id: 'feliz-ii',
    image: 'home/vinfast-feliz-ii-mau-do-den-ngang-home.webp',
    name: 'Feliz II',
    group: 'scooter',
    segment: 'Trung cấp',
    price: 23000000,
  },
  {
    id: 'evo-grand',
    detailPath: 'evo-grand',
    range: '262 km/lần sạc (2 pin)',
    image: 'home/vinfast-evo-grand-mau-xanh-ngang-home.webp',
    name: 'Evo Grand',
    group: 'scooter',
    segment: 'Phổ thông',
    price: 22500000,
  },
];
// Reuse existing catalog records; add only models not yet represented.
for (const model of extendedProducts) {
  const existing = products.find((product) => product.id === model.productId);
  if (existing) {
    existing.detailPath = model.id;
    continue;
  }
  products.push({
    id: model.productId,
    name: model.title,
    group:
      model.kind === 'historical'
        ? 'historical'
        : model.kind === 'scooter'
          ? 'scooter'
          : 'service',
    segment:
      model.kind === 'historical'
        ? 'Xe xăng lịch sử'
        : model.kind === 'scooter'
          ? 'Xe hai bánh điện'
          : 'Xe dịch vụ',
    price: model.snapshotPrice,
    image: (model.cardImage || model.image).replace(/^assets\//, ''),
    detailPath: model.id,
    source: model.source,
  });
}
export const money = (value) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
    value,
  );
export const normalize = (text) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .toLowerCase()
    .trim();
