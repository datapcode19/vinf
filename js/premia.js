import { tabsMarkup } from './components.js';
import {
  colorGalleryMarkup,
  initColorGallery,
  arrowIcon,
} from './color-gallery.js';
import { localURL } from './routes.js';

const asset = (file) => localURL(`assets/premia/${file}.webp`);
const colors = [
  { name: 'Nâu Titanium', hex: '#827963', image: asset('brown') },
  { name: 'Xanh Oliu', hex: '#7e8979', image: asset('olive') },
  { name: 'Đen Bóng Mới', hex: '#202322', image: asset('black') },
];
const features = [
  ['screen', 'Màn hình', 'Thông tin vận hành hiển thị trên màn hình xe.'],
  ['headlight', 'Đèn LED Projector', 'Cụm đèn pha phía trước.'],
  [
    'placement',
    'Hai vị trí đặt pin',
    'Pin chính dưới sàn; pin phụ tùy chọn trong cốp.',
  ],
  ['storage', 'Cốp 35 lít', 'Còn 16 lít khi lắp pin phụ.'],
  [
    'suspension',
    'Hệ thống giảm xóc',
    'Phía trước ống lồng; phía sau giảm xóc đôi.',
  ],
  ['key', 'Chìa khóa cơ', 'Khởi động xe bằng chìa khóa cơ.'],
];
const table = (rows) =>
  /* HTML */ `<table>
    <tbody>
      ${rows
        .map(
          ([label, value]) =>
            /* HTML */ `<tr>
              <th scope="row">${label}</th>
              <td>${value}</td>
            </tr>`,
        )
        .join('')}
    </tbody>
  </table>`;

export function renderPremia(main) {
  document.title = 'Evo Grand Premia — VinFast mô phỏng';
  main.innerHTML = /* HTML */ ` <section class="premia-hero">
      <div class="premia-hero-copy">
        <p class="eyebrow">VinFast</p>
        <h1>Evo Grand Premia</h1>
        <p>Tinh tế hơn. Tiện lợi hơn</p>
        <a class="button" href="#premia-colors">Khám phá màu xe</a>
      </div>
      <img
        src="${asset('hero')}"
        alt="Evo Grand Premia màu Nâu Titanium"
        width="1170"
        height="960"
        fetchpriority="high"
      />
    </section>
    <nav class="product-section-nav" aria-label="Nội dung Evo Grand Premia">
      <a href="#premia-colors">Màu xe</a>
      <a href="#premia-energy">Vận hành</a>
      <a href="#premia-features">Tiện ích</a>
      <a href="#premia-specifications">Thông số</a>
    </nav>
    <section class="container premia-colors" id="premia-colors">
      <h2>VinFast Evo Grand Premia</h2>
      ${colorGalleryMarkup('premia', colors)}
      <dl class="specs premia-summary">
        <div>
          <dd>70 <small>km/h</small></dd>
          <dt>Tốc độ tối đa · 1 người 65 kg, Sport</dt>
        </div>
        <div>
          <dd>~262 <small>km/lần sạc</small></dd>
          <dt>Khi lắp 2 pin, thử nghiệm ở 30 km/h</dt>
        </div>
        <div>
          <dd>8 <small>năm</small></dd>
          <dt>Bảo hành pin</dt>
        </div>
      </dl>
      <div class="premia-price">
        <p>Giá niêm yết <strong>27,9 triệu đồng</strong></p>
        <a
          class="button"
          href="${localURL('pages/test-drive.html?model=evo-grand-premia')}"
          >Đăng ký lái thử mô phỏng</a
        >
      </div>
    </section>
    <section class="premia-warranty">
      <div class="container">
        <h2>Thời hạn bảo hành</h2>
        <div class="detail-warranty">
          <article>
            <h3>Xe máy điện</h3>
            <p><strong>6 năm</strong> / không giới hạn số km</p>
          </article>
          <article>
            <h3>Pin</h3>
            <p><strong>8 năm</strong> / không giới hạn số km</p>
          </article>
        </div>
        <a class="text-link" href="${localURL('pages/scooter-warranty.html')}"
          >Xem chính sách bảo hành →</a
        >
      </div>
    </section>
    <section class="container premia-energy" id="premia-energy">
      <h2>Gấp đôi năng lượng</h2>
      <p>Nâng tầm hiệu suất</p>
      <img
        src="${asset('front')}"
        alt="Thiết kế mặt trước Evo Grand Premia"
        width="1170"
        height="612"
        loading="lazy"
      />
      <div class="premia-facts">
        <article>
          <h3>Quãng đường</h3>
          <p>Tới 262 km với pin phụ, theo điều kiện thử nghiệm.</p>
        </article>
        <article>
          <h3>Thời gian sạc</h3>
          <p>Khoảng 6 giờ 30 phút từ 0 đến 100%.</p>
        </article>
        <article>
          <h3>Thiết kế</h3>
          <p>Đường nét lấy cảm hứng cổ điển.</p>
        </article>
        <article>
          <h3>Động cơ IP67</h3>
          <p>Điều kiện thử nghiệm nước sâu 0,5 m trong 30 phút.</p>
        </article>
      </div>
    </section>
    <section class="container premia-battery">
      <img
        src="${asset('battery')}"
        alt="Pin và thiết kế Evo Grand Premia"
        width="1170"
        height="960"
        loading="lazy"
      />
      <div>
        <h2>Linh hoạt nâng cấp 2 pin</h2>
        <p>Pin LFP 2,4 kWh; có thể bổ sung pin 2,4 kWh thứ hai.</p>
        <h3>Giảm xóc trước và sau</h3>
        <p>Giảm chấn thủy lực hỗ trợ vận hành.</p>
      </div>
    </section>
    <section class="container premia-features" id="premia-features">
      <h2>Tiện lợi trong từng trải nghiệm</h2>
      <div
        class="premia-feature-slider"
        data-slider
        aria-label="Tiện ích Evo Grand Premia"
      >
        ${features
          .map(
            ([file, title, description], i) =>
              /* HTML */ `<article data-slide ${i ? 'hidden' : ''}>
                <img
                  src="${asset(file)}"
                  alt="${title} Evo Grand Premia"
                  width="1074"
                  height="806"
                  loading="lazy"
                />
                <div>
                  <h3>${title}</h3>
                  <p>${description}</p>
                </div>
              </article>`,
          )
          .join('')}
        <div class="slider-controls">
          <button type="button" data-prev aria-label="Tiện ích trước">
            ${arrowIcon('previous')}
          </button>
          ${features.map(([, title], i) => /* HTML */ `<button type="button" data-slide-to="${i}" aria-label="${title}" aria-pressed="${i === 0}">${i + 1}</button>`).join('')}
          <button type="button" data-next aria-label="Tiện ích tiếp theo">
            ${arrowIcon('next')}
          </button>
          <span data-slide-status role="status"></span>
        </div>
      </div>
    </section>
    <section class="container premia-specifications" id="premia-specifications">
      <h2>Thông số sản phẩm</h2>
      ${tabsMarkup('premia-specs', [
        {
          title: 'Kích thước',
          content: table([
            ['Dài × Rộng × Cao', '1856 × 675 × 1133 mm'],
            ['Chiều cao yên', '770 mm'],
            ['Khoảng sáng gầm', '133 mm'],
            ['Thể tích cốp', '35 lít; 16 lít khi lắp pin phụ'],
            ['Công suất tối đa', '2250 W'],
          ]),
        },
        {
          title: 'Pin & Sạc',
          content: table([
            ['Loại pin', 'LFP'],
            ['Dung lượng', '2,4 kWh; tùy chọn thêm 2,4 kWh'],
            ['Tốc độ tối đa', '70 km/h · 1 người 65 kg, Sport'],
            ['Quãng đường', '262 km với 2 pin · thử nghiệm 30 km/h'],
            ['Tăng tốc 0–40 km/h', 'Dưới 16 giây · 1 người 65 kg'],
          ]),
        },
        {
          title: 'Công nghệ',
          content: table([
            ['Trang bị', 'Số lùi'],
            ['Tùy chọn', 'Hỗ trợ đỗ ngang dốc'],
            [
              'Ứng dụng E-Scooter (tùy chọn)',
              'Tìm xe, định vị, lịch sử hành trình, vùng an toàn, thông tin pin',
            ],
          ]),
        },
      ])}
      <p class="muted">
        Quãng đường thực tế phụ thuộc tải trọng, địa hình, tốc độ và điều kiện
        sử dụng. Dữ liệu tham chiếu ngày 10/11/2026; giá hiển thị không phải báo
        giá.
      </p>
    </section>
    <section class="container premia-services">
      <h2>Hệ sinh thái toàn diện</h2>
      <div class="detail-warranty">
        <article>
          <h3>Đồng hành cùng khách hàng</h3>
          <a class="text-link" href="${localURL('pages/service-booking.html')}"
            >Đặt lịch dịch vụ mô phỏng →</a
          >
        </article>
        <article>
          <h3>Năng lượng cho hành trình</h3>
          <a class="text-link" href="${localURL('pages/scooter-battery.html')}"
            >Dịch vụ pin xe máy điện →</a
          >
        </article>
      </div>
    </section>
    <section class="premia-consultation container">
      <h2>Đăng ký tư vấn</h2>
      <p>Bản mô phỏng học tập không gửi yêu cầu tư vấn hay nhận đặt cọc.</p>
      <a
        class="button"
        href="${localURL('pages/test-drive.html?model=evo-grand-premia')}"
        >Trải nghiệm đăng ký lái thử</a
      >
    </section>`;
  initColorGallery(main.querySelector('[data-color-gallery="premia"]'), colors);
}
