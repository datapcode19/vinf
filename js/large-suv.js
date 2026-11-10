import { localURL } from './routes.js';
import { tabsMarkup } from './components.js';
import { createSwipe } from './swipe.js';
import { imageGalleryMarkup, specTableMarkup } from './product-markup.js';
import { arrowIcon } from './color-gallery.js';

// Snapshot of the public VF 8 / VF 9 product pages, 2026-11-10.
const models = {
  vf8: {
    name: 'VF 8',
    tagline: 'Chuẩn D-SUV mới dành cho gia đình Việt',
    startingPrice: '898 triệu đồng',
    summary: 'Sẵn sàng cho mọi hành trình',
    cycle: 'NEDC',
    battery: '87,7 kWh',
    versions: [
      {
        id: 'eco',
        name: 'Eco',
        range: '635 km',
        torque: '310 Nm',
        price: '898.000.000 VNĐ',
      },
      {
        id: 'plus',
        name: 'Plus',
        range: '475 km',
        torque: '620 Nm',
        price: '1.079.000.000 VNĐ',
      },
    ],
    exterior: 'Thăng hạng đẳng cấp',
    features: [
      ['body', 'Thiết kế khí động học'],
      ['mirror', 'Gương chiếu hậu'],
      ['roof', 'Cửa sổ trời toàn cảnh'],
    ],
    interior: 'Không gian nội thất khoáng đạt',
    cabin: [
      ['Không gian 5 chỗ', 'Chiều dài cơ sở 2.950 mm.'],
      ['Màn hình 15,6 inch', 'Điều khiển và giải trí trên màn hình trung tâm.'],
      ['Điều hòa 2 vùng', 'Lọc không khí cabin Combi 1.0.'],
    ],
    specifications: [
      {
        title: 'Kích thước',
        rows: [
          ['Dài × Rộng × Cao', '4.750 × 1.934 × 1.667 mm'],
          ['Chiều dài cơ sở', '2.950 mm'],
          ['Số chỗ ngồi', '5'],
          ['Mô-men xoắn Eco / Plus', '310 / 620 Nm'],
        ],
      },
      {
        title: 'Pin & Sạc',
        rows: [
          ['Quãng đường NEDC Eco / Plus', '635 / 475 km'],
          ['Dung lượng pin khả dụng', '87,7 kWh'],
          ['Sạc AC 1 pha / 3 pha', '6,6 / 11 kW'],
          ['Sạc DC tối đa', '149 kW'],
        ],
      },
      {
        title: 'Trang bị',
        rows: [
          ['Điều hòa', 'Tự động 2 vùng'],
          ['Lọc không khí cabin', 'Combi 1.0'],
          ['Túi khí', '11'],
          ['Màn hình trung tâm', '15,6 inch'],
        ],
      },
    ],
  },
  vf9: {
    name: 'VF 9',
    tagline: 'Bản lĩnh dẫn đầu',
    startingPrice: '1,348 tỷ đồng',
    summary: 'Hai phiên bản, không gian 7 chỗ',
    cycle: 'WLTP',
    battery: '123 kWh',
    versions: [
      {
        id: 'eco',
        name: 'Eco',
        range: '626 km',
        torque: '620 Nm',
        price: '1.348.000.000 VNĐ',
      },
      {
        id: 'plus',
        name: 'Plus',
        range: '602 km',
        torque: '620 Nm',
        price: '1.529.000.000 VNĐ',
      },
    ],
    exterior: 'Thiết kế Cân bằng động',
    features: [
      ['roof', 'Đường nét mui xe'],
      ['led', 'Dải đèn LED nhận diện'],
      ['inlet', 'Hốc hút gió phía trước'],
    ],
    interior: 'Không gian cho mọi hành trình',
    cabin: [
      ['Ba hàng ghế', '7 chỗ ngồi, chiều dài cơ sở 3.149 mm.'],
      ['Điều hòa 3 vùng', 'Kiểm soát chất lượng không khí và ion hóa.'],
      [
        'Màn hình hàng ghế sau',
        'Phiên bản Plus có thêm màn hình 8 inch phía sau.',
      ],
    ],
    specifications: [
      {
        title: 'Vận hành',
        rows: [
          ['Dẫn động', 'Hai cầu AWD'],
          ['Mô-men xoắn', '620 Nm'],
          ['Chiều dài cơ sở', '3.149 mm'],
          ['Số chỗ ngồi', '7'],
        ],
      },
      {
        title: 'Pin & Sạc',
        rows: [
          ['Quãng đường WLTP Eco / Plus', '626 / 602 km'],
          ['Dung lượng pin khả dụng', '123 kWh'],
          ['Sạc AC 1 pha / 3 pha', '6,6 / 11 kW'],
          ['Sạc nhanh 10–70%', '35 phút'],
        ],
      },
      {
        title: 'Trang bị',
        rows: [
          ['Điều hòa', 'Tự động 3 vùng'],
          ['Lọc không khí cabin', 'Combi 1.0'],
          ['Túi khí', '11'],
          ['Màn hình trung tâm', '15,6 inch'],
          ['Màn hình phía sau bản Plus', '8 inch'],
        ],
      },
    ],
  },
};

export function renderLargeSUV(main, id) {
  const model = models[id];
  const asset = (file) => localURL(`assets/${id}/${file}.webp`);
  const photo = (file, alt) =>
    /* HTML */ `<img src="${asset(file)}" alt="${alt}" loading="lazy" />`;
  document.title = `${model.name} — VinFast mô phỏng`;
  main.innerHTML = /* HTML */ `
    <section class="verified-car-hero">
      <img src="${asset('hero')}" alt="${model.name}" fetchpriority="high" />
      <div>
        <h1>${model.name}</h1>
        <p>${model.tagline}</p>
        <p class="price">Từ ${model.startingPrice}</p>
        <a class="button" href="#${id}-versions">Khám phá phiên bản</a>
      </div>
    </section>
    <section class="container detail-summary" id="${id}-versions">
      <h2>${model.summary}</h2>
      <div
        class="choice-row version-picker"
        aria-label="Phiên bản ${model.name}"
      >
        ${model.versions.map((version, i) => /* HTML */ `<button type="button" data-suv-version="${i}" aria-pressed="${i === 0}">${model.name} ${version.name}</button>`).join('')}
      </div>
      <div data-suv-scenes aria-label="Các phiên bản ${model.name}">
        ${model.versions
          .map(
            (version) =>
              /* HTML */ `<div class="verified-version-scene">
                ${photo(version.id, `${model.name} ${version.name}`)}
                <h3>${model.name} ${version.name}</h3>
                <dl class="specs">
                  <div>
                    <dt>Quãng đường ${model.cycle}</dt>
                    <dd>${version.range}</dd>
                  </div>
                  <div>
                    <dt>Pin khả dụng</dt>
                    <dd>${model.battery}</dd>
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
      <div class="version-controls">
        <button type="button" data-suv-prev aria-label="Phiên bản trước">
          ${arrowIcon('previous')}
        </button>
        <span data-suv-status role="status"></span>
        <button type="button" data-suv-next aria-label="Phiên bản tiếp theo">
          ${arrowIcon('next')}
        </button>
      </div>
      <p>Bảo hành 10 năm hoặc 200.000 km, tùy mốc đến trước.</p>
      <a class="button" href="${localURL(`pages/test-drive.html?model=${id}`)}"
        >Lái thử ${model.name} — mô phỏng</a
      >
    </section>
    <section class="container">
      <h2>${model.exterior}</h2>
      ${imageGalleryMarkup(
        `Ngoại thất ${model.name}`,
        [1, 2, 3, 4, 5].map((n) => ({
          image: asset(`gallery-${n}`),
          alt: `${model.name} · ngoại thất ${n}`,
        })),
      )}
      <div class="detail-feature-images">
        ${model.features
          .map(
            ([file, title]) =>
              /* HTML */ `<article>
                ${photo(file, `${model.name} — ${title}`)}
                <h3>${title}</h3>
              </article>`,
          )
          .join('')}
      </div>
    </section>
    <section class="container verified-interior">
      <h2>${model.interior}</h2>
      ${photo('interior', `Nội thất ${model.name}`)}
      <div class="detail-features">
        ${model.cabin
          .map(
            ([title, description]) =>
              /* HTML */ `<article>
                <h3>${title}</h3>
                <p>${description}</p>
              </article>`,
          )
          .join('')}
      </div>
    </section>
    <section class="container verified-specifications">
      <h2>Thông số kỹ thuật ${model.name}</h2>
      ${tabsMarkup(
        `${id}-specs`,
        model.specifications.map(({ title, rows }) => ({
          title,
          content: specTableMarkup(rows),
        })),
      )}
      <p class="muted">
        Quãng đường thực tế phụ thuộc tải trọng, điều kiện đường và cách sử
        dụng. Giá và thông số là dữ liệu tham chiếu cho đồ án, không phải báo
        giá.
      </p>
    </section>
    <section class="container detail-links">
      <h2>Đồng hành cùng ${model.name}</h2>
      <a class="button secondary" href="${localURL('pages/warranty.html')}"
        >Chính sách bảo hành</a
      >
      <a class="button secondary" href="${localURL('pages/maintenance.html')}"
        >Dịch vụ bảo dưỡng</a
      >
      <a class="button" href="${localURL(`pages/test-drive.html?model=${id}`)}"
        >Đăng ký lái thử mô phỏng</a
      >
    </section>
  `;
  const viewport = main.querySelector('[data-suv-scenes]');
  const buttons = [...main.querySelectorAll('[data-suv-version]')];
  const carousel = createSwipe(viewport, [...viewport.children], (index) => {
    buttons.forEach((button, i) =>
      button.setAttribute('aria-pressed', String(i === index)),
    );
    main.querySelector('[data-suv-status]').textContent =
      `${model.name} ${model.versions[index].name}`;
  });
  buttons.forEach((button, i) =>
    button.addEventListener('click', () => carousel.go(i)),
  );
  main
    .querySelector('[data-suv-prev]')
    .addEventListener('click', () => carousel.prev());
  main
    .querySelector('[data-suv-next]')
    .addEventListener('click', () => carousel.next());
}
