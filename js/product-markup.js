import { arrowIcon } from './color-gallery.js';

export function specTableMarkup(rows) {
  return /* HTML */ `<table>
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
}

export function imageGalleryMarkup(label, items, className = '') {
  return /* HTML */ `<div
    class="detail-gallery ${className}"
    data-slider
    aria-label="${label}"
  >
    ${items
      .map(
        (item, index) =>
          /* HTML */ `<article data-slide ${index ? 'hidden' : ''}>
            <img src="${item.image}" alt="${item.alt}" loading="lazy" />${
              item.title
                ? /* HTML */ `<h3>${item.title}</h3>
                    <p>${item.description}</p>`
                : ''
            }
          </article>`,
      )
      .join('')}
    <div class="slider-controls">
      <button type="button" data-prev aria-label="Ảnh trước">
        ${arrowIcon('previous')}
      </button>
      ${items.map((item, index) => /* HTML */ `<button type="button" data-slide-to="${index}" aria-label="Ảnh ${index + 1}" aria-pressed="${index === 0}">${index + 1}</button>`).join('')}
      <button type="button" data-next aria-label="Ảnh tiếp theo">
        ${arrowIcon('next')}
      </button>
      <span data-slide-status role="status"></span>
    </div>
  </div>`;
}
