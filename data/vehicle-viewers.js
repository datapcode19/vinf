import { products } from './products.js';
import { extendedProducts } from './extended-products.js';

// Chỉ dùng ảnh đúng mẫu xe đã có nguồn trong các manifest của assets/.
// Tên màu cơ bản mô tả ảnh tham chiếu, không phải mã sơn để đặt mua.
const color = (name, hex, image) => ({ name, hex, image: `assets/${image}` });
const additionalColors = {
  vf2: [
    color('Trắng', '#eee', 'vf2/white.webp'),
    color('Vàng be', '#d6bf78', 'vf2/front.webp'),
  ],
  vf3: [
    color('Trắng', '#eee', 'vf3/white.webp'),
    color('Đỏ', '#b82129', 'vf3/front.webp'),
    color('Vàng', '#dfb429', 'vf3/rear.webp'),
  ],
  vf5: [
    color('Trắng', '#eee', 'vf5/white.webp'),
    color('Đỏ', '#b82129', 'vf5/exterior.webp'),
    color('Xám', '#888', 'vf5/front.webp'),
  ],
  vf6: [
    color('Đỏ', '#b82129', 'vf6/eco.webp'),
    color('Xanh rêu', '#657661', 'vf6/plus.webp'),
  ],
  vf7: [
    color('Đen', '#222', 'vf7/eco.webp'),
    color('Trắng', '#eee', 'vf7/plus.webp'),
  ],
  vf8: [
    color('Đỏ', '#b82129', 'vf8/hero.webp'),
    color('Xanh rêu', '#657661', 'vf8/plus.webp'),
  ],
  vf9: [
    color('Trắng', '#eee', 'vf9/eco.webp'),
    color('Xám', '#888', 'vf9/plus.webp'),
  ],
  'vf8-new': [
    color('Trắng', '#eee', 'vf8-new/white.webp'),
    color('Đỏ', '#b82129', 'vf8-new/front.webp'),
  ],
  'vf-mpv7': [
    color('Trắng', '#eee', 'vf-mpv7/white.webp'),
    color('Xanh', '#497482', 'vf-mpv7/exterior-1.webp'),
    color('Nâu', '#806950', 'vf-mpv7/exterior-2.webp'),
    color('Đỏ', '#b82129', 'vf-mpv7/exterior-3.webp'),
    color('Đen', '#222', 'vf-mpv7/exterior-5.webp'),
  ],
};

const singleColors = {
  'minio-green': ['Hồng', '#daa1ab'],
  'herio-green': ['Xám', '#888'],
  'nerio-green': ['Xám', '#888'],
  'limo-green': ['Xám', '#888'],
  'ec-van': ['Trắng', '#eee'],
  'feliz-ii': ['Đỏ đen', '#a91e29'],
  kyo: ['Nâu', '#806950'],
  'feliz-2025': ['Xanh', '#497482'],
  'feliz-2027': ['Trắng', '#eee'],
  'evo-grand-limited': ['Xanh', '#497482'],
  'evo-grand-ii': ['Đỏ', '#b82129'],
  evo: ['Đỏ', '#b82129'],
  amio: ['Xám', '#888'],
  'amio-s': ['Trắng', '#eee'],
  flazz: ['Đỏ', '#b82129'],
  'flazz-max': ['Cam', '#e27f33'],
  zgoo: ['Xanh', '#497482'],
  'evo-lite': ['Xanh', '#497482'],
  drgnfly: ['Đen', '#222'],
  'evo-grand-lite': ['Tím', '#94729d'],
  'evo-lite-neo': ['Xanh', '#497482'],
};
const referenceSources = {
  vf5: 'dat-coc-xe-dien-vf5',
  vf7: 'dat-coc-xe-dien-vf7',
  viper: 'xe-may-dien-vinfast-viper',
  'evo-grand': 'xe-may-dien-evo-grand',
};

export const vehicleViewers = products.map((product) => {
  const id = product.detailPath || product.id;
  const extended = extendedProducts.find((item) => item.id === id);
  return {
    id,
    name: product.name,
    route: product.detailPath
      ? `pages/${id}.html`
      : `pages/product.html?id=${id}`,
    image: `assets/${product.image}`,
    source:
      product.source ||
      extended?.source ||
      `https://vinfastauto.com/vn_vi/${referenceSources[id] || 'dat-coc-xe-' + id}`,
    colors:
      additionalColors[id] ||
      (singleColors[id] ? [color(...singleColors[id], product.image)] : []),
    // Chỉ điền model/frames sau khi kiểm tra đúng xe, giấy phép và đủ vòng xoay.
    model: null,
    missing: 'Chưa có tệp 3D hoặc chuỗi ảnh đủ 360° đã xác minh để tích hợp.',
  };
});
