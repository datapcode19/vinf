import { localURL } from './routes.js';

export const escapeHTML = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[char],
  );

export const officialLink = (url, title) =>
  `<a data-official href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(title)} ↗</a>`;

export function pageHeading(page, description = '') {
  document.title = `${page.title} — VinFast mô phỏng`;
  return `<section class="page-heading"><div class="container">
    <p class="eyebrow"><a href="${localURL('index.html')}">VinFast mô phỏng</a></p>
    <h1>${page.title}</h1>${description ? `<p>${description}</p>` : ''}
  </div></section>`;
}

export function sourceMarkup(page, additional = []) {
  return `<section class="container destination-sources" aria-label="Nguồn thông tin">
    <h2>Nguồn và phạm vi thông tin</h2>
    <p>Đối chiếu ngày 12/11/2026. Nội dung được diễn giải phục vụ học tập; giá, trang bị và điều kiện áp dụng cần xác nhận với đơn vị cung cấp.</p>
    <ul><li>${officialLink(page.source, page.title + ' — nguồn VinFast')}</li>
    ${additional.map((source) => `<li>${officialLink(source.url, source.title)}</li>`).join('')}</ul>
  </section>`;
}

export function filterCards(main, render, items) {
  const form = main.querySelector('[data-search-form]');
  const search = form.querySelector('input[type="search"]');
  const category = form.querySelector('select');
  const normalize = (value) =>
    value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/đ/g, 'd');
  const update = () => {
    const query = normalize(search.value.trim());
    const result = items.filter(
      (item) =>
        (!category?.value || item.category === category.value) &&
        normalize(
          [item.title, item.model, item.address, item.description, item.date]
            .filter(Boolean)
            .join(' '),
        ).includes(query),
    );
    main.querySelector('[data-results]').innerHTML = result.length
      ? result.map(render).join('')
      : '<p>Không có kết quả phù hợp. Hãy thử từ khóa khác hoặc xóa bộ lọc.</p>';
    main.querySelector('[data-result-count]').textContent =
      `${result.length} kết quả`;
  };
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('input', update);
  form.addEventListener('reset', () => setTimeout(update, 0));
  update();
}
