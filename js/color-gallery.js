import { createSwipe } from './swipe.js';

export const arrowIcon = (direction) =>
  /* HTML */ ` <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="${direction === 'previous' ? 'M15 5 8 12l7 7' : 'm9 5 7 7-7 7'}"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`;

export function colorGalleryMarkup(id, colors) {
  return /* HTML */ `<div class="color-gallery" data-color-gallery="${id}">
    <div class="color-gallery-stage">
      <button
        type="button"
        class="gallery-arrow"
        data-color-previous
        aria-label="Màu trước"
      >
        ${arrowIcon('previous')}
      </button>
      <div data-color-viewport>
        ${colors.map((color) => /* HTML */ `<div><img src="${color.image}" alt="${color.name}" width="1074" height="1074" loading="lazy" /></div>`).join('')}
      </div>
      <button
        type="button"
        class="gallery-arrow"
        data-color-next
        aria-label="Màu tiếp theo"
      >
        ${arrowIcon('next')}
      </button>
    </div>
    <div class="swatches" aria-label="Chọn màu xe">
      ${colors.map((color, i) => /* HTML */ `<button type="button" data-color-index="${i}" aria-label="${color.name}" aria-pressed="${i === 0}" style="--swatch:${color.hex}"><span></span></button>`).join('')}
    </div>
    <p data-color-name role="status">${colors[0].name}</p>
  </div>`;
}

export function initColorGallery(root, colors) {
  const viewport = root.querySelector('[data-color-viewport]');
  const buttons = [...root.querySelectorAll('[data-color-index]')];
  const carousel = createSwipe(viewport, [...viewport.children], (index) => {
    buttons.forEach((button, i) =>
      button.setAttribute('aria-pressed', String(i === index)),
    );
    root.querySelector('[data-color-name]').textContent = colors[index].name;
  });
  buttons.forEach((button, i) =>
    button.addEventListener('click', () => carousel.go(i)),
  );
  root
    .querySelector('[data-color-previous]')
    .addEventListener('click', carousel.prev);
  root
    .querySelector('[data-color-next]')
    .addEventListener('click', carousel.next);
}
