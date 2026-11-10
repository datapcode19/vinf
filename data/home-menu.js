// Các nhóm và đường dẫn được đọc từ menu trang chủ ngày 07/11/2026.
// Đây là dữ liệu điều hướng; không tạo trang con mới.
const official = (path) => 'https://vinfastauto.com/vn_vi/' + path;
const shop = (path) => 'https://shop.vinfastauto.com/vn_vi/' + path;
const entry = (name, path) => ({ name, url: official(path) });
export const homeMenus = [
  { name: 'Giới thiệu', url: official('ve-chung-toi') },
  {
    name: 'Ô tô',
    groups: [
      {
        name: 'Xe cá nhân',
        items: [
          entry('VF 2', 'dat-coc-xe-vf2'),
          entry('VF 3', 'dat-coc-xe-dien-vf3'),
          entry('VF 5', 'dat-coc-xe-dien-vf5'),
          { name: 'VF 6', url: './pages/product.html?id=vf6' },
          entry('VF 7', 'dat-coc-xe-dien-vf7'),
          entry('VF MPV 7', 'dat-coc-xe-vf-mpv7'),
          entry('VF 8', 'dat-coc-xe-vf8'),
          entry('VF 8 Thế hệ mới', 'dat-coc-xe-vf8-the-all-new-2026'),
          entry('VF 9', 'dat-coc-xe-vf9'),
          entry('VF Wild', 'dat-coc-xe-vf-wild'),
        ],
      },
      {
        name: 'Xe dịch vụ',
        items: [
          entry('Minio Green', 'minio-green'),
          entry('Herio Green', 'herio-green'),
          { name: 'Nerio Green', url: shop('nerio-green.html') },
          entry('Limo Green', 'limo-green'),
          entry('EC Van', 'vinfast-ecvan'),
          { name: 'EBus', url: shop('ebus.html') },
        ],
      },
      {
        name: 'Động cơ xăng',
        items: [
          ['VinFast Fadil', 'fadil'],
          ['VinFast Lux A2.0', 'lux-a'],
          ['VinFast Lux SA2.0', 'lux-sa'],
          ['VinFast President', 'president'],
        ].map(([name, slug]) => ({
          name,
          url: shop('o-to-vinfast-' + slug + '.html'),
        })),
      },
    ],
  },
  {
    name: 'Xe máy điện',
    groups: [
      {
        name: 'Xe cao cấp',
        items: [
          { name: 'Kinet', url: './pages/product.html?id=kinet' },
          entry('Viper', 'xe-may-dien-vinfast-viper'),
          entry('Vero X', 'xe-may-dien-verox'),
        ],
      },
      {
        name: 'Xe trung cấp',
        items: [
          entry('Kyo', 'xe-may-dien-vinfast-kyo'),
          entry('Feliz II', 'xe-may-dien-vinfast-feliz-II'),
          entry('Feliz 2025', 'xe-may-dien-feliz'),
          entry('Feliz 2027', 'xe-may-dien-feliz-the-he-moi'),
        ],
      },
      {
        name: 'Xe phổ thông',
        items: [
          entry('Evo Grand Limited', 'xe-may-dien-evo-grand-limited'),
          entry('Evo Grand Premia', 'xe-may-dien-evo-grand-premia'),
          entry('Evo Grand II', 'xe-may-dien-vinfast-evo-grand-ii'),
          entry('Evo', 'xe-may-dien-evo'),
          entry('Evo Grand', 'xe-may-dien-evo-grand'),
          entry('Amio', 'xe-may-dien-vinfast-amio'),
          entry('Amio S', 'xe-may-dien-vinfast-amio-s'),
          entry('Amio S2', 'xe-may-dien-vinfast-amio-S2'),
        ],
      },
    ],
  },
  { name: 'Phụ kiện xe', url: shop('phu-kien') },
  {
    name: 'Dịch vụ hậu mãi',
    groups: [
      ...[
        ['Ô tô điện', 'oto', 'o-to'],
        ['Xe máy điện', 'xe-may-dien', 'xe-may-dien'],
        ['Xe bus', 'ebus', 'ebus'],
      ].map(([name, slug, docs]) => ({
        name,
        items: [
          {
            name: 'Chính sách bảo hành',
            url:
              slug === 'oto'
                ? './pages/warranty.html'
                : official('chinh-sach-bao-hanh-' + slug),
          },
          entry('Dịch vụ bảo dưỡng', 'dich-vu-bao-duong-' + slug),
          entry('Dịch vụ sửa chữa', 'dich-vu-sua-chua-' + slug),
          ...(slug === 'xe-may-dien'
            ? []
            : [entry('Thông tin cứu hộ', 'thong-tin-cuu-ho-' + slug)]),
          entry('Tra cứu tài liệu hướng dẫn', 'tai-lieu-' + docs),
        ],
      })),
      {
        name: 'Tra cứu',
        items: [
          entry('Tra cứu xưởng dịch vụ', 'tim-kiem-showroom-tram-sac'),
          {
            name: 'Đặt lịch dịch vụ',
            url: shop('dat-lich-dich-vu-bao-duong.html'),
          },
        ],
      },
    ],
  },
  {
    name: 'Pin và trạm sạc',
    groups: [
      {
        name: 'Thông tin',
        items: [
          { name: 'Pin và trạm sạc Ô tô điện', url: './pages/battery.html' },
          entry('Pin và trạm sạc Xe máy điện', 'dich-vu-pin-xe-may-dien'),
        ],
      },
    ],
  },
  { name: 'Lưu trữ năng lượng', url: official('vf-energy') },
];
export const footerGroups = [
  {
    name: 'VinFast',
    items: [
      entry('Về VinFast', 've-chung-toi'),
      entry('Về Vingroup', 've-vingroup'),
      entry('Showroom & Đại lý', 'tim-kiem-showroom-tram-sac'),
    ],
  },
  {
    name: 'Tin tức',
    items: [
      entry('Công ty', 'tin-tuc/cong-ty'),
      entry('Ô tô', 'tin-tuc/o-to-dien'),
      entry('Xe máy điện', 'tin-tuc/xe-may-dien'),
    ],
  },
  {
    name: 'Điều khoản chính sách',
    items: [
      entry('Chính sách bảo vệ dữ liệu cá nhân', 'privacy-policy'),
      entry(
        'Chính sách vận chuyển',
        'dieu-khoan-phap-ly?collapseId=collapse-6',
      ),
      entry('Chính sách đổi trả', 'dieu-khoan-phap-ly?collapseId=collapse-5'),
      entry('Miễn trừ trách nhiệm', 'dieu-khoan-phap-ly?collapseId=collapse-3'),
      entry(
        'Điều khoản ký kết thỏa thuận đặt cọc mua Ô tô VinFast',
        'dieu-khoan-phap-ly?collapseId=collapse-4',
      ),
      entry('Hợp đồng và chính sách', 'hop-dong-va-chinh-sach'),
      entry(
        'Quy trình tiếp nhận, phản hồi thông tin và giải quyết phản ánh, yêu cầu, khiếu nại của khách hàng',
        'dieu-khoan-phap-ly?collapseId=collapse-10',
      ),
    ],
  },
];
homeMenus[2].groups[2].items.push(
  entry('Flazz', 'xe-may-dien-flazz'),
  entry('Flazz Max', 'xe-may-dien-vinfast-flazz-max'),
  entry('ZGoo', 'xe-may-dien-zgoo'),
  entry('Evo Lite', 'xe-may-dien-evo-lite'),
  entry('VF DrgnFly', 'xe-dap-dien-drgnfly'),
  entry('Evo Grand Lite', 'xe-may-dien-evo-grand-lite'),
  entry('Evo Lite Neo', 'xe-may-dien-evo-lite-neo'),
);
homeMenus[1].groups.push({
  name: 'Công cụ hỗ trợ khách hàng',
  items: [
    { name: 'So sánh xe', url: shop('so-sanh-xe-vinfast') },
    { name: 'Đăng ký lái thử', url: shop('dang-ky-lai-thu.html') },
    { name: 'Dự toán chi phí lăn bánh', url: shop('chi-phi-lan-banh') },
    { name: 'Dự toán vay trả góp', url: shop('du-toan-chi-phi-tra-gop') },
    entry('Mua xe trực tuyến', 'mua-xe-o-to-dien-truc-tuyen'),
  ],
});
homeMenus[2].groups.push({
  name: 'Công cụ hỗ trợ khách hàng',
  items: [
    entry('Tính chi phí sử dụng', 'tinh-chi-phi-su-dung-xmd'),
    { name: 'Đăng ký lái thử', url: shop('dang-ky-lai-thu.html') },
    entry('Mua xe trực tuyến', 'mua-xe-may-dien-truc-tuyen'),
  ],
});
