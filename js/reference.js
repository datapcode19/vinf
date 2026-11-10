import { homeMenus, footerGroups } from '../data/home-menu.js';
import { localURL, resolveRoute } from './routes.js';
// A missing reference is explicitly a missing page, never a completed clone.

export function renderReference(main) {
  const slug = new URLSearchParams(location.search).get('route') || '';
  const resolved = resolveRoute('https://vinfastauto.com/vn_vi/' + slug);
  if (slug && !new URL(resolved).pathname.endsWith('/reference.html')) {
    location.replace(resolved);
    return;
  }
  const entries = [
    ...homeMenus.filter((m) => m.url),
    ...homeMenus.flatMap((m) => m.groups || []).flatMap((g) => g.items),
    ...footerGroups.flatMap((g) => g.items),
  ];
  const item = entries.find((i) => {
    try {
      return (
        new URL(i.url).pathname.replace(/^\/vn_vi\/?/, '') +
          new URL(i.url).search ===
        slug
      );
    } catch {
      return false;
    }
  });
  main.innerHTML = /* HTML */ `<section class="container narrow">
    <p class="eyebrow">Bản mô phỏng · Chưa triển khai</p>
    <h1></h1>
    <p>
      Trang này chưa có đủ nội dung và hình ảnh tham chiếu.
    </p>
    <p>Không nhận đặt cọc, thanh toán, tài khoản hoặc thông tin cá nhân.</p>
    <a class="button" href="${localURL('index.html')}">Về trang chủ</a>
  </section>`;
  main.querySelector('h1').textContent =
    item?.name || 'Nội dung đang được hoàn thiện';
  document.title = (item?.name || 'Chưa triển khai') + ' — VinFast mô phỏng';
}
