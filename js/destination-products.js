import { extendedProducts } from '../data/extended-products.js';
import { localURL } from './routes.js';
import { tabsMarkup, accordionMarkup } from './components.js';
import { specTableMarkup, imageGalleryMarkup } from './product-markup.js';
import { colorGalleryMarkup, initColorGallery } from './color-gallery.js';
import { pageHeading, sourceMarkup } from './destination-shared.js';

const historySource = {
  title: 'Thông báo dừng kinh doanh ô tô xăng ngày 15/07/2022',
  url: 'https://vinfastauto.com/vn_vi/vinfast-chinh-thuc-dung-kinh-doanh-xe-o-to-chay-xang',
};

export function renderDestinationProduct(main, page) {
  const model = extendedProducts.find((product) => product.id === page.id);
  const historical = page.kind === 'historical';
  const scooter = page.kind === 'scooter';
  const bus = page.id === 'ebus';
  const docs = scooter
    ? 'scooter-documents'
    : bus
      ? 'ebus-documents'
      : 'car-documents';
  const warranty = historical
    ? 'car-documents'
    : scooter
      ? 'scooter-warranty'
      : bus
        ? 'ebus-warranty'
        : 'warranty';
  const asset = (file) => localURL(`assets/extended/${page.id}/${file}`);
  const colors = model.colors?.map(([name, hex, file]) => ({
    name,
    hex,
    image: asset(file),
  }));
  const related = extendedProducts
    .filter((product) => product.kind === page.kind && product.id !== page.id)
    .slice(0, 3);
  main.innerHTML =
    pageHeading(
      page,
      historical
        ? 'Hồ sơ sản phẩm lịch sử · Đã dừng kinh doanh xe mới'
        : 'Khám phá thiết kế, trang bị và thông số sản phẩm',
    ) +
    `
    <section class="container detail-intro destination-product-hero">
      <div><h2>${historical ? 'Dấu ấn sản phẩm' : 'Tổng quan'}</h2><p>${model.summary}</p>
        ${historical ? '<p class="info">VinFast thông báo dừng kinh doanh ô tô xăng từ 15/07/2022. Trang này lưu thông tin lịch sử; không cung cấp cấu hình mua xe mới hoặc đặt cọc.</p>' : '<p class="muted">Thông số theo nguồn được đối chiếu ngày 12/11/2026. Giá bán và ưu đãi xem tại nguồn chính thức.</p>'}
        <a class="button" href="#specifications">Xem thông số</a>
      </div>
      <img src="${localURL(model.image)}" alt="${page.title}" fetchpriority="high" />
    </section>
    ${model.note ? `<aside class="container info"><p>${model.note}</p></aside>` : ''}
    ${colors ? `<section class="container"><h2>Ảnh màu xe trong hồ sơ</h2><p>Ảnh lưu trữ có thể thuộc các phiên bản trang bị khác nhau; đây không phải bộ cấu hình đặt mua.</p>${colorGalleryMarkup(page.id, colors)}</section>` : ''}
    ${
      model.gallery?.length
        ? `<section class="container"><h2>Hình ảnh ${page.title}</h2>${
            model.gallery.length === 1
              ? `<img class="destination-presentation" src="${asset(model.gallery[0])}" alt="${page.title} — hình giới thiệu chính thức" loading="lazy" />`
              : imageGalleryMarkup(
                  'Hình ảnh ' + page.title,
                  model.gallery.map((file, index) => ({
                    image: asset(file),
                    alt: `${page.title} — ${file.startsWith('interior') ? 'nội thất' : file.startsWith('exterior') ? 'ngoại thất' : 'hình ảnh sản phẩm ' + (index + 1)}`,
                  })),
                )
          }</section>`
        : ''
    }
    <section class="container" id="specifications"><h2>Thông số và trang bị</h2>
      ${tabsMarkup(page.id + '-specs', [
        { title: 'Kích thước', content: specTableMarkup(model.dimensions) },
        { title: 'Vận hành', content: specTableMarkup(model.performance) },
        ...(model.battery.length
          ? [{ title: 'Pin và sạc', content: specTableMarkup(model.battery) }]
          : []),
        { title: 'Trang bị', content: specTableMarkup(model.equipment) },
      ])}
      <p class="muted">${historical ? 'Trang bị phụ thuộc phiên bản và năm sản xuất. Thông tin lưu trữ không xác nhận tình trạng của một xe đã qua sử dụng.' : 'Quãng đường và thời gian sạc là số liệu thử nghiệm của nhà sản xuất, phụ thuộc cấu hình pin, tải trọng, điều kiện đường và thiết bị sạc. NEDC không phải quãng đường được bảo đảm trong mọi điều kiện.'}</p>
    </section>
    <section class="container"><h2>Sử dụng và chăm sóc xe</h2>
      ${accordionMarkup(page.id + '-documents', 'Chọn đúng tài liệu cho xe', `<p>Đối chiếu tên xe, phiên bản, năm sản xuất và cấu hình pin trước khi dùng tài liệu. Sổ bảo hành và hướng dẫn sử dụng có mục đích khác nhau.</p><a href="${localURL('pages/' + docs + '.html')}">Tra cứu tài liệu ${scooter ? 'xe máy điện' : bus ? 'EBus' : 'ô tô'}</a>`)}
      ${accordionMarkup(page.id + '-warranty', 'Kiểm tra bảo hành và dịch vụ', `<p>Phạm vi bảo hành phụ thuộc hồ sơ xe, ngày kích hoạt và điều kiện sử dụng. Hãy đối chiếu sổ bảo hành, nhất là với xe lịch sử hoặc xe sử dụng cho dịch vụ.</p><a href="${localURL('pages/' + warranty + '.html')}">Thông tin bảo hành</a> · <a href="${localURL('pages/locations.html')}">Tra cứu đơn vị dịch vụ</a>`)}
      <div class="detail-links"><a class="button secondary" href="${localURL('pages/' + docs + '.html')}">Tài liệu xe</a>
      ${historical || bus ? `<a class="button" href="${localURL('pages/service-booking.html')}">Đặt lịch dịch vụ mô phỏng</a>` : `<a class="button" href="${localURL('pages/' + (scooter ? 'buy-scooter' : 'buy-car') + '.html?model=' + page.productId)}">Trải nghiệm chọn xe — mô phỏng</a>`}</div>
    </section>
    <section class="container"><h2>Sản phẩm liên quan</h2><div class="product-grid">${related.map((product) => `<article class="product-card"><img src="${localURL(product.image)}" alt="${product.title}" loading="lazy" /><h3>${product.title}</h3><a class="text-link" href="${localURL('pages/' + product.id + '.html')}">Khám phá ${product.title} →</a></article>`).join('')}</div></section>
    ${sourceMarkup(page, [...(model.documents || []), ...(historical ? [historySource] : [])])}`;
  if (colors)
    initColorGallery(main.querySelector('[data-color-gallery]'), colors);
}
