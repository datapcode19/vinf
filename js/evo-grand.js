import { localURL } from './routes.js';
import { tabsMarkup } from './components.js';
import { colorGalleryMarkup, initColorGallery } from './color-gallery.js';
import { imageGalleryMarkup, specTableMarkup } from './product-markup.js';

const asset = (file) => localURL(`assets/evo-grand/${file}.webp`);
const colors = [
  { name: 'Đỏ tươi', hex: '#be2632', image: asset('red') },
  { name: 'Xanh Oliu', hex: '#83917a', image: asset('olive') },
  { name: 'Trắng Ngọc Trai', hex: '#eeeae4', image: asset('white') },
  { name: 'Đen', hex: '#232526', image: asset('black') },
];

export function renderEvoGrand(main) {
  document.title = 'Evo Grand — VinFast mô phỏng';
  main.innerHTML = /* HTML */ ` <section
      class="detail-intro container scooter-product-hero"
    >
      <div>
        <p class="eyebrow">Xe máy điện 2 pin</p>
        <h1>VinFast Evo Grand</h1>
        <p>Vận hành bền bỉ</p>
        <a class="button" href="#evo-grand-colors">Khám phá màu xe</a>
      </div>
      <img
        src="${asset('hero')}"
        alt="VinFast Evo Grand"
        width="1170"
        height="960"
        fetchpriority="high"
      />
    </section>
    <section class="container detail-summary" id="evo-grand-colors">
      <h2>Màu xe Evo Grand</h2>
      ${colorGalleryMarkup('evo-grand', colors)}
      <dl class="specs">
        <div>
          <dt>Tốc độ tối đa · 65 kg, Sport</dt>
          <dd>70 km/h</dd>
        </div>
        <div>
          <dt>Quãng đường khi lắp pin phụ</dt>
          <dd>262 km/lần sạc</dd>
        </div>
        <div>
          <dt>Bảo hành pin</dt>
          <dd>8 năm</dd>
        </div>
      </dl>
      <p class="price">Giá niêm yết 22,5 triệu đồng</p>
      <a
        class="button"
        href="${localURL('pages/test-drive.html?model=evo-grand')}"
        >Lái thử Evo Grand — mô phỏng</a
      >
    </section>
    <section class="container detail-summary">
      <h2>Thời hạn bảo hành</h2>
      <div class="detail-warranty">
        <article>
          <h3>Xe máy điện</h3>
          <p>6 năm, không giới hạn số km.</p>
        </article>
        <article>
          <h3>Pin</h3>
          <p>8 năm, không giới hạn số km.</p>
        </article>
      </div>
    </section>
    <section class="container scooter-energy">
      <h2>Gấp đôi năng lượng</h2>
      <img src="${asset('front')}" alt="Mặt trước Evo Grand" loading="lazy" />
      <div class="detail-features">
        <article>
          <h3>Eco và Sport</h3>
          <p>Hai chế độ vận hành.</p>
        </article>
        <article>
          <h3>Động cơ IP67</h3>
          <p>Điều kiện thử nghiệm nước sâu 0,5 m trong 30 phút.</p>
        </article>
        <article>
          <h3>Pin phụ tùy chọn</h3>
          <p>Pin LFP chính dưới sàn, pin phụ trong cốp.</p>
        </article>
      </div>
    </section>
    <section class="container detail-intro scooter-battery-feature">
      <img
        src="${asset('battery')}"
        alt="Evo Grand và hệ thống 2 pin"
        loading="lazy"
      />
      <div>
        <h2>Linh hoạt nâng cấp 2 pin</h2>
        <p>Mỗi pin có dung lượng 2,4 kWh.</p>
        <p>
          Quãng đường 262 km được thử nghiệm với 2 pin ở tốc độ 30 km/h. Thực tế
          phụ thuộc điều kiện sử dụng.
        </p>
      </div>
    </section>
    <section class="container">
      <h2>Thanh lịch mọi hành trình</h2>
      ${imageGalleryMarkup(
        'Trang bị Evo Grand',
        [
          {
            image: asset('storage'),
            alt: 'Cốp xe Evo Grand',
            title: 'Cốp 35 lít',
            description: 'Còn 16 lít khi lắp thêm pin phụ.',
          },
          {
            image: asset('placement'),
            alt: 'Vị trí pin Evo Grand',
            title: 'Bố trí pin',
            description: 'Pin chính dưới sàn để chân; pin phụ trong cốp.',
          },
          {
            image: asset('brake'),
            alt: 'Phanh Evo Grand',
            title: 'Phanh cơ',
            description: 'Trang bị phanh của Evo Grand.',
          },
          {
            image: asset('motor'),
            alt: 'Động cơ Evo Grand',
            title: 'Động cơ Inhub',
            description: 'Công suất tối đa 2.250 W.',
          },
        ],
        'scooter-feature-gallery',
      )}
    </section>
    <section
      class="container verified-specifications"
      id="evo-grand-specifications"
    >
      <h2>Thông số sản phẩm</h2>
      ${tabsMarkup('evo-grand-specs', [
        {
          title: 'Kích thước',
          content: specTableMarkup([
            ['Dài × Rộng × Cao', '1856 × 683 × 1133 mm'],
            ['Chiều cao yên', '770 mm'],
            ['Khoảng sáng gầm', '133 mm'],
            ['Thể tích cốp', '35 lít; 16 lít với pin phụ'],
            ['Công suất tối đa', '2250 W'],
          ]),
        },
        {
          title: 'Pin & Sạc',
          content: specTableMarkup([
            ['Pin', 'LFP · 2,4 kWh; tùy chọn thêm 2,4 kWh'],
            ['Quãng đường với 2 pin', '262 km; thử nghiệm ở 30 km/h'],
            ['Tốc độ tối đa', '70 km/h · 1 người 65 kg, Sport'],
            ['Tăng tốc 0–50 km/h', 'Dưới 16 giây · 1 người 65 kg'],
          ]),
        },
        {
          title: 'Kết nối',
          content: specTableMarkup([
            ['Ứng dụng E-Scooter (tùy chọn)', 'Tìm xe từ xa'],
            [
              'Định vị (tùy chọn)',
              'Lịch sử hành trình, quãng đường, vùng an toàn',
            ],
            ['Thông tin pin (tùy chọn)', 'Hiển thị qua ứng dụng'],
          ]),
        },
      ])}
      <p class="muted">
        Dữ liệu tham chiếu ngày 10/11/2026. Hình ảnh minh họa; giá không phải
        báo giá.
      </p>
    </section>
    <section class="container detail-links">
      <h2>Đồng hành cùng Evo Grand</h2>
      <a
        class="button secondary"
        href="${localURL('pages/scooter-warranty.html')}"
        >Bảo hành xe máy điện</a
      ><a
        class="button secondary"
        href="${localURL('pages/scooter-battery.html')}"
        >Dịch vụ pin</a
      ><a
        class="button"
        href="${localURL('pages/test-drive.html?model=evo-grand')}"
        >Đăng ký lái thử mô phỏng</a
      >
    </section>`;
  initColorGallery(
    main.querySelector('[data-color-gallery="evo-grand"]'),
    colors,
  );
}
