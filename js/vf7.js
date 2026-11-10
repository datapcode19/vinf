import { localURL } from './routes.js';
import { tabsMarkup } from './components.js';
import { createSwipe } from './swipe.js';
import { imageGalleryMarkup, specTableMarkup } from './product-markup.js';

const asset = (file) => localURL(`assets/vf7/${file}.webp`);
const photo = (file, alt) =>
  /* HTML */ `<img src="${asset(file)}" alt="${alt}" loading="lazy" />`;
const versions = [
  {
    id: 'eco',
    name: 'VF 7 Eco',
    range: '440 km',
    price: '740.000.000 VNĐ',
    battery: '59,6 kWh',
    torque: '250 Nm',
  },
  {
    id: 'plus',
    name: 'VF 7 Plus FWD',
    range: '500,5 km',
    price: '830.000.000 VNĐ',
    battery: '70 kWh',
    torque: '310 Nm',
  },
];

export function renderVF7(main) {
  document.title = 'VF 7 — VinFast mô phỏng';
  main.innerHTML = /* HTML */ ` <section class="verified-car-hero">
      <img
        src="${asset('hero')}"
        alt="VF 7 màu đỏ trong không gian đô thị"
        width="5760"
        height="2400"
        fetchpriority="high"
      />
      <div>
        <h1>VF 7</h1>
        <p>Chọn khác biệt. Chọn dẫn đầu</p>
        <p class="price">Từ 740 triệu đồng</p>
        <a class="button" href="#vf7-versions">Khám phá phiên bản</a>
      </div>
    </section>
    <section class="container detail-summary" id="vf7-versions">
      <h2>Dấu ấn của thế hệ tiên phong</h2>
      <div class="choice-row version-picker" aria-label="Phiên bản VF 7">
        ${versions.map((version, i) => /* HTML */ `<button type="button" data-vf7-version="${i}" aria-pressed="${i === 0}">${version.name}</button>`).join('')}
      </div>
      <div data-vf7-scenes>
        ${versions
          .map(
            (version) =>
              /* HTML */ `<div class="verified-version-scene">
                ${photo(version.id, version.name)}
                <h3>${version.name}</h3>
                <dl class="specs">
                  <div>
                    <dt>Quãng đường NEDC</dt>
                    <dd>${version.range}</dd>
                  </div>
                  <div>
                    <dt>Pin khả dụng</dt>
                    <dd>${version.battery}</dd>
                  </div>
                  <div>
                    <dt>Mô-men xoắn</dt>
                    <dd>${version.torque}</dd>
                  </div>
                </dl>
                <p class="price">${version.price}</p>
              </div>`,
          )
          .join('')}
      </div>
      <p data-vf7-status role="status" class="visually-hidden"></p>
      <p>Bảo hành 7 năm hoặc 160.000 km, tùy mốc đến trước.</p>
      <a class="button" href="${localURL('pages/test-drive.html?model=vf7')}"
        >Lái thử VF 7 — mô phỏng</a
      >
    </section>
    <section class="container">
      <h2>Thiết kế “Vũ trụ phi đối xứng”</h2>
      ${imageGalleryMarkup(
        'Ngoại thất VF 7',
        [1, 2, 3, 4].map((n) => ({
          image: asset(`gallery-${n}`),
          alt: `Ngoại thất VF 7 · góc ${n}`,
        })),
      )}
      <div class="detail-feature-images vf7-exterior-details">
        <article>
          ${photo('body', 'Thân xe VF 7')}
          <h3>Khí động học</h3>
          <p>Nắp capo thấp, đường mui hạ dần về phía sau.</p>
        </article>
        <article>
          ${photo('handle', 'Tay nắm cửa VF 7')}
          <h3>Tay nắm cửa ẩn</h3>
          <p>Thiết kế liền mạch với thân xe.</p>
        </article>
      </div>
    </section>
    <section class="container verified-interior">
      <h2>Nội thất hướng tới người lái</h2>
      ${photo('interior', 'Toàn cảnh nội thất VF 7')}
      <div class="detail-feature-images vf7-exterior-details">
        <article>
          ${photo('seats', 'Màn hình trung tâm VF 7')}
          <h3>Màn hình trung tâm</h3>
          <p>Màn hình cảm ứng 12,9 inch.</p>
        </article>
        <article>
          ${photo('console', 'Khoang lái VF 7 nhìn từ phía sau')}
          <h3>Không gian khoang lái</h3>
          <p>Thiết kế hướng tới người lái.</p>
        </article>
      </div>
    </section>
    <section class="container verified-specifications" id="vf7-specifications">
      <h2>Thông số kỹ thuật</h2>
      ${tabsMarkup('vf7-specs', [
        {
          title: 'Kích thước',
          content: specTableMarkup([
            ['Dài × Rộng × Cao', '4.545 × 1.890 × 1.635,75 mm'],
            ['Chiều dài cơ sở', '2.840 mm'],
            ['Số chỗ', '5'],
            ['Mô-men xoắn Eco / Plus FWD / Plus AWD', '250 / 310 / 500 Nm'],
          ]),
        },
        {
          title: 'Pin & Sạc',
          content: specTableMarkup([
            [
              'Quãng đường NEDC Eco / Plus FWD / Plus AWD',
              '440 / 500,5 / 469 km',
            ],
            ['Pin khả dụng Eco / Plus', '59,6 / 70 kWh'],
            ['Sạc AC tối đa', '7,2 kW'],
            ['Sạc DC tối đa Eco / Plus', '100 / 110 kW'],
          ]),
        },
        {
          title: 'Trang bị',
          content: specTableMarkup([
            ['Điều hòa', 'Tự động 2 vùng'],
            ['Màn hình cảm ứng', '12,9 inch'],
            ['Túi khí Eco / Plus', '4 / 7'],
            ['Lọc cabin Eco', 'Bụi / phấn hoa'],
            ['Lọc cabin Plus', 'Combi 1.0'],
          ]),
        },
      ])}
      <p class="muted">
        Quãng đường thực tế phụ thuộc tải trọng, đường đi và cách sử dụng. Giá
        là dữ liệu tham chiếu, không phải báo giá. Thông số Plus FWD và AWD được
        tách riêng.
      </p>
    </section>
    <section class="container detail-links">
      <h2>Đồng hành cùng VF 7</h2>
      <a class="button secondary" href="${localURL('pages/warranty.html')}"
        >Chính sách bảo hành</a
      >
      <a class="button secondary" href="${localURL('pages/maintenance.html')}"
        >Bảo dưỡng ô tô</a
      >
      <a class="button" href="${localURL('pages/test-drive.html?model=vf7')}"
        >Đăng ký lái thử mô phỏng</a
      >
    </section>`;
  const viewport = main.querySelector('[data-vf7-scenes]');
  const buttons = [...main.querySelectorAll('[data-vf7-version]')];
  const carousel = createSwipe(viewport, [...viewport.children], (index) => {
    buttons.forEach((button, i) =>
      button.setAttribute('aria-pressed', String(index === i)),
    );
    main.querySelector('[data-vf7-status]').textContent = versions[index].name;
  });
  buttons.forEach((button, i) =>
    button.addEventListener('click', () => carousel.go(i)),
  );
}
