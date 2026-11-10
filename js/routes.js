// Resolve against the module, so /vinf/ is preserved on every entrypoint.
export const siteRoot = new URL('../', import.meta.url);
export const localURL = (path) => new URL(path, siteRoot).href;
const known = {
  'dat-coc-xe-dien-vf5': 'vf5.html',
  'xe-may-dien-vinfast-viper': 'viper.html',
  've-chung-toi': 'about.html',
  've-vingroup': 'vingroup.html',
  'chinh-sach-bao-hanh-xe-may-dien': 'scooter-warranty.html',
  'dich-vu-bao-duong-oto': 'maintenance.html',
  'dich-vu-sua-chua-oto': 'repair.html',
  'dich-vu-pin-xe-may-dien': 'scooter-battery.html',
  'dat-lich-dich-vu-bao-duong.html': 'service-booking.html',
  'phu-kien': 'accessories.html',
  'EEP71061000.html': 'accessory.html?id=EEP71061000',
  'ACS10000246.html': 'accessory.html?id=ACS10000246',
  'ACS40000094.html': 'accessory.html?id=ACS40000094',
  'EEP69072176AB.html': 'accessory.html?id=EEP69072176AB',
  'dat-coc-xe-dien-vf3': 'vf3.html',
  'dat-coc-xe-dien-vf6': 'product.html?id=vf6',
  'xe-may-dien-vinfast-kinet': 'product.html?id=kinet',
  'chinh-sach-bao-hanh-oto': 'warranty.html',
  'dich-vu-pin-oto-dien': 'battery.html',
  'thong-tin-cuu-ho-oto': 'rescue.html',
  'dang-ky-lai-thu.html': 'test-drive.html',
  'so-sanh-xe-vinfast': 'compare.html',
};

export function resolveRoute(raw) {
  if (raw.startsWith('./')) return localURL(raw.slice(2));
  const url = new URL(raw, siteRoot);
  if (!['vinfastauto.com', 'shop.vinfastauto.com'].includes(url.hostname))
    return raw;
  const slug = url.pathname.replace(/^\/vn_vi\/?/, '').replace(/\/$/, '');
  if (!slug) return localURL('index.html');
  return localURL(
    'pages/' +
      (known[slug] ||
        'reference.html?route=' + encodeURIComponent(slug + url.search)),
  );
}

export function localizeLinks(root = document) {
  root.querySelectorAll('a[href]').forEach((a) => {
    if (/tham chiếu/.test(a.textContent) && /vinfastauto\.com/.test(a.href)) {
      const source = document.createElement('p');
      source.className = 'muted';
      source.textContent = 'Nguồn nội dung: ' + a.href;
      source.style.overflowWrap = 'anywhere';
      a.replaceWith(source);
      return;
    }
    const before = a.href,
      after = resolveRoute(before);
    if (after !== before) {
      a.href = after;
      a.removeAttribute('title');
      a.querySelector('.external-marker')?.remove();
    }
    if (a.origin === location.origin) {
      a.removeAttribute('target');
      a.removeAttribute('rel');
      a.childNodes.forEach((n) => {
        if (n.nodeType === Node.TEXT_NODE)
          n.textContent = n.textContent.replace(/\s*↗/g, '');
      });
    }
  });
}
