import { products, money, normalize } from '../data/products.js';
import { prefix, pageURL } from './navigation.js';

export function card(p) {
  return /* HTML */ `<article class="product-card">
    ${p.image ? /* HTML */ `<img src="${prefix}assets/${p.image}" alt="${p.name}" loading="lazy" />` : ''}
    <p class="eyebrow">${p.segment}</p>
    <h3>${p.name}</h3>
    <p>Từ ${money(p.price)}</p>
    ${p.detail || p.detailPath ? /* HTML */ `<a class="text-link" href="${p.detailPath ? pageURL(p.detailPath) : pageURL('product', '?id=' + p.id)}">Khám phá ${p.name} →</a>` : '<p class="muted">Đã có dữ liệu danh mục; chưa tái tạo trang chi tiết.</p>'}
  </article>`;
}

export function renderCatalog(main) {
  const params = new URLSearchParams(location.search);
  main.innerHTML = /* HTML */ `<section class="container">
    <p class="eyebrow">Khám phá sản phẩm</p>
    <h1>Các dòng xe VinFast</h1>
    <p class="muted">
      Bộ lọc và tìm kiếm là chức năng bổ sung cho đồ án. Danh mục hiện có
      ${products.length} mẫu; chưa bao phủ toàn bộ menu gốc.
    </p>
    <form class="filters" role="search">
      <label
        >Tìm mẫu xe<input
          id="search"
          type="search"
          maxlength="80"
          placeholder="Ví dụ: VF 6, Kinet"
          autocomplete="off" /></label
      ><label
        >Nhóm xe<select id="group">
          <option value="">Tất cả</option>
          <option value="personal">Xe cá nhân</option>
          <option value="service">Xe dịch vụ</option>
          <option value="scooter">Xe máy điện</option>
        </select></label
      ><label
        >Phân khúc<select id="segment">
          <option value="">Tất cả</option>
          ${[...new Set(products.map((p) => p.segment))].map((s) => /* HTML */ `<option>${s}</option>`).join('')}
        </select></label
      ><button type="reset" class="secondary">Xóa bộ lọc</button>
    </form>
    <p id="result-count" role="status"></p>
    <div id="results" class="product-grid"></div>
  </section>`;
  const form = main.querySelector('form'),
    search = main.querySelector('#search'),
    group = main.querySelector('#group'),
    segment = main.querySelector('#segment');
  group.value = params.get('group') || '';
  segment.value = params.get('segment') || '';
  search.value = params.get('q') || '';
  function filter() {
    const result = products.filter(
      (p) =>
        (!group.value || p.group === group.value) &&
        (!segment.value || p.segment === segment.value) &&
        normalize(p.name)
          .replace(/\s/g, '')
          .includes(normalize(search.value).replace(/\s/g, '')),
    );
    main.querySelector('#result-count').textContent =
      `${result.length} mẫu xe phù hợp`;
    main.querySelector('#results').innerHTML = result.length
      ? result.map(card).join('')
      : '<p>Không tìm thấy mẫu xe. Hãy thử tên khác hoặc xóa bộ lọc.</p>';
    const query = new URLSearchParams();
    if (group.value) query.set('group', group.value);
    if (segment.value) query.set('segment', segment.value);
    if (search.value.trim()) query.set('q', search.value.trim());
    history.replaceState(
      null,
      '',
      location.pathname + (query.size ? '?' + query : ''),
    );
  }
  form.addEventListener('submit', (e) => e.preventDefault());
  form.addEventListener('input', filter);
  form.addEventListener('reset', () => setTimeout(filter, 0));
  filter();
}
