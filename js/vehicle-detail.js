// Module này chỉ được nạp bởi các trang chi tiết xe, không nạp ở trang chủ.
import './app.js';
import { vehicleViewers } from '../data/vehicle-viewers.js';
import { colorGalleryMarkup, initColorGallery } from './color-gallery.js';
import { localURL } from './routes.js';
import { mountVehicleViewer } from './vehicle-viewer.js';

const id =
  document.body.dataset.page === 'product'
    ? new URLSearchParams(location.search).get('id')
    : document.body.dataset.page;
const config = vehicleViewers.find((item) => item.id === id);
const main = document.querySelector('main');
if (config) {
  let root = main.querySelector('[data-color-gallery]');
  let stage = root?.querySelector('.color-gallery-stage');
  let swatches = root?.querySelector('.swatches');
  let name = root?.querySelector('[data-color-name]');
  if (id === 'viper') {
    root = main.querySelector('.viper-colors');
    stage = root.querySelector('[data-viper-colors]');
    swatches = root.querySelector('.swatches');
    name = root.querySelector('[data-viper-color-name]');
  } else if (id === 'kinet') {
    root = main.querySelector('.configuration');
    stage = root.querySelector('.vehicle-stage');
    swatches = root.querySelector('.swatches');
    name = root.querySelector('#selection');
  }
  if (!root) {
    root = document.createElement('section');
    root.className = 'container vehicle-configurator';
    const colors = config.colors.map((item) => ({
      ...item,
      image: localURL(item.image),
    }));
    root.innerHTML =
      `<h2>Khám phá ${config.name}</h2>` +
      (colors.length
        ? colorGalleryMarkup(id, colors)
        : `<div class="vehicle-still"><img src="${localURL(config.image)}" alt="${config.name}" loading="lazy" /></div>`);
    const firstSection = main.querySelector('section');
    if (firstSection) firstSection.after(root);
    else main.append(root);
    if (colors.length)
      initColorGallery(root.querySelector('[data-color-gallery]'), colors);
    stage = root.querySelector('.color-gallery-stage, .vehicle-still');
    swatches = root.querySelector('.swatches');
    name = root.querySelector('[data-color-name]');
  }
  mountVehicleViewer(root, config, { stage, swatches, name });
}
