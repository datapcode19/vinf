import { newCars } from '../data/new-cars.js';
import { money } from '../data/products.js';
import { localURL } from './routes.js';
import { tabsMarkup } from './components.js';
import { imageGalleryMarkup, specTableMarkup } from './product-markup.js';

export function productServicesMarkup(id) {
  return /* HTML */ `<section class="container product-services">
    <h2>Hệ sinh thái VinFast</h2>
    <img
      src="${localURL('assets/home/hinh-anh-he-sinh-thai-toan-dien-desktop-0210.webp')}"
      alt="Hệ sinh thái VinFast"
      loading="lazy"
    />
    <div class="detail-links">
      <a class="button secondary" href="${localURL('pages/warranty.html')}"
        >Bảo hành ô tô</a
      >
      <a class="button secondary" href="${localURL('pages/battery.html')}"
        >Pin và trạm sạc</a
      >
      <a class="button" href="${localURL(`pages/test-drive.html?model=${id}`)}"
        >Đăng ký lái thử mô phỏng</a
      >
    </div>
  </section>`;
}

export function renderNewCar(main, id) {
  const model = newCars[id];
  const asset = (name) => localURL(`assets/${id}/${name}.webp`);
  const photo = (name, alt) =>
    /* HTML */ `<img src="${asset(name)}" alt="${alt}" loading="lazy" />`;
  document.title = `${model.name} — VinFast mô phỏng`;
  main.innerHTML = /* HTML */ `
    <section class="verified-car-hero new-car-hero">
      <img src="${asset('hero')}" alt="${model.name}" fetchpriority="high" />
      <div>
        <h1>${model.name}</h1>
        <p class="price">Từ ${money(model.price)}</p>
        <a class="button" href="#product-summary">Khám phá xe</a>
      </div>
    </section>
    <section class="container detail-summary" id="product-summary">
      <h2>${model.summary}</h2>
      <div class="verified-version-scene">${photo('summary', model.name)}</div>
      <dl class="specs">
        <div>
          <dt>Quãng đường</dt>
          <dd>${model.range}</dd>
        </div>
        <div>
          <dt>Số chỗ ngồi</dt>
          <dd>${model.seats}</dd>
        </div>
        <div>
          <dt>Bảo hành xe*</dt>
          <dd>${model.warranty}</dd>
        </div>
      </dl>
      <p class="muted">
        *Tùy mốc đến trước. Giá tham chiếu phục vụ đồ án, không phải báo giá.
      </p>
      <a class="button" href="${localURL(`pages/test-drive.html?model=${id}`)}"
        >Lái thử ${model.name} — mô phỏng</a
      >
    </section>
    <section class="container car-color-preview">
      <h2>Màu sắc ${model.name}</h2>
      ${photo('white', `${model.name} — Infinity Blanc`)}
      <p>Infinity Blanc</p>
  
    </section>
    <section class="container">
      <h2>So sánh xe</h2>
      <p>
        Công cụ tính chi phí sử dụng của trang gốc chưa được tái tạo. Bạn có thể
        so sánh thông số các mẫu xe trong đồ án.
      </p>
      <a class="button secondary" href="${localURL('pages/compare.html')}"
        >So sánh thông số</a
      >
    </section>
    <section class="container" id="exterior">
      <h2>Ngoại thất ${model.name}</h2>
      ${imageGalleryMarkup(
        `Ngoại thất ${model.name}`,
        Array.from({ length: model.exteriorCount }, (_, i) => ({
          image: asset(`exterior-${i + 1}`),
          alt: `${model.name} — ngoại thất ${i + 1}`,
        })),
        'car-exterior-gallery',
      )}
      <div class="detail-feature-images">
        ${model.features
          .map(
            ([file, title, description]) =>
              /* HTML */ `<article>
                ${photo(file, `${model.name} — ${title}`)}
                <h3>${title}</h3>
                <p>${description}</p>
              </article>`,
          )
          .join('')}
      </div>
    </section>
    <section class="container verified-interior" id="interior">
      <h2>Nội thất ${model.name}</h2>
      ${photo('interior', `Khoang lái ${model.name}`)}
      ${imageGalleryMarkup(
        `Chi tiết nội thất ${model.name}`,
        model.interiorLabels.map((label, i) => ({
          image: asset(`interior-${i + 1}`),
          alt: `${model.name} — ${label}`,
          title: label,
          description: '',
        })),
        'car-interior-gallery',
      )}
    </section>
    <section class="container verified-specifications" id="specifications">
      <h2>Thông số kỹ thuật</h2>
      ${tabsMarkup(`${id}-specs`, [
        { title: 'Kích thước', content: specTableMarkup(model.dimensions) },
        { title: 'Pin & Sạc', content: specTableMarkup(model.battery) },
        { title: 'Trang bị', content: specTableMarkup(model.equipment) },
      ])}
      <p class="muted">
        Quãng đường thực tế phụ thuộc điều kiện vận hành, tải trọng và cách sử
        dụng. Nội dung là dữ liệu tham chiếu ngày 10/11/2026.
      </p>
    </section>
    ${productServicesMarkup(id)}
  `;
}
