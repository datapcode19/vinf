import { localURL } from './routes.js';
import { arrowIcon } from './color-gallery.js';

const photo = (file, alt) =>
  /* HTML */ `<img
    src="${localURL(`assets/vf6/${file}.webp`)}"
    alt="${alt}"
    loading="lazy"
  />`;

export function extendVF6(main) {
  const section = document.createElement('section');
  section.className = 'container vf6-details';
  section.innerHTML = /* HTML */ `<h2>Vững vàng trong từng đường nét</h2>
    <div class="detail-gallery" data-slider aria-label="Hình ảnh VF 6">
      ${[1, 2, 3, 4, 5].map((n, i) => /* HTML */ `<div data-slide ${i ? 'hidden' : ''}>${photo(`gallery-${n}`, `Ngoại thất VF 6 · ảnh ${n}`)}</div>`).join('')}
      <div class="slider-controls">
        <button type="button" data-prev aria-label="Ảnh trước">
          ${arrowIcon('previous')}
        </button>
        ${[0, 1, 2, 3, 4].map((i) => /* HTML */ `<button type="button" data-slide-to="${i}" aria-label="Ảnh ${i + 1}" aria-pressed="${i === 0}">${i + 1}</button>`).join('')}
        <button type="button" data-next aria-label="Ảnh tiếp theo">
          ${arrowIcon('next')}
        </button>
        <span data-slide-status role="status"></span>
      </div>
    </div>
    <div class="detail-feature-images">
      <article>
        ${photo('led', 'Dải đèn định vị LED VF 6')}
        <h3>Dải đèn định vị LED</h3>
        <p>Nhận diện hình cánh chim của VinFast.</p>
      </article>
      <article>
        ${photo('headlight', 'Đèn pha VF 6 Plus')}
        <h3>Đèn pha tự động</h3>
        <p>Trang bị trên phiên bản VF 6 Plus.</p>
      </article>
      <article>
        ${photo('wheel', 'La-zăng VF 6')}
        <h3>Thiết kế bánh xe</h3>
        <p>Ảnh ngoại thất tham chiếu từ mẫu VF 6.</p>
      </article>
    </div>
    <h2>Không gian nội thất</h2>
    ${photo('interior', 'Khoang nội thất VinFast VF 6')}
    <div class="detail-features">
      <article>
        <h3>Sạc nhanh</h3>
        <p>Khoảng 25 phút từ 10% đến 70%.</p>
      </article>
      <article>
        <h3>Quãng đường NEDC</h3>
        <p>Eco: 485 km. Plus: 460 km.</p>
      </article>
      <article>
        <h3>Bảo hành</h3>
        <p>7 năm hoặc 160.000 km, tùy mốc đến trước.</p>
      </article>
    </div>`;
  main.querySelector('.configuration').after(section);
}
