import { localURL } from './routes.js';
// Product-specific source sections; no substitution with another scooter.

export function extendKinet(main) {
  const heading = main.querySelector('.kinet-heading');
  heading.className = 'kinet-source-hero';
  heading.innerHTML = /* HTML */ `<img
      src="${localURL('assets/kinet/hero.webp')}"
      alt="VinFast Kinet"
      width="1200"
      height="1600"
      fetchpriority="high"
    />
    <div>
      <h1>VinFast Kinet</h1>
      <p>Uy lực mạnh mẽ<br />Dẫn đầu phố thị</p>
      <a class="button" href="#configuration">Khám phá màu xe</a>
    </div>`;
  const details = [
    ['screen', 'Màn hình TFT', 'Kết nối Bluetooth, thông báo cuộc gọi.'],
    ['storage', 'Cốp xe 22 L', 'Không gian chứa đồ dưới yên.'],
    ['suspension', 'Hệ thống giảm xóc', 'Giảm chấn thủy lực.'],
    ['brake', 'Hỗ trợ ngang dốc', 'Tính năng auto hold.'],
  ];
  main.querySelector('#configuration').insertAdjacentHTML(
    'afterend',
    /* HTML */ `<section class="container kinet-warranty">
        <h2>Thời hạn bảo hành</h2>
        <div class="split">
          <article>
            <h3>Xe: 6 năm</h3>
            <p>Không giới hạn số km.</p>
          </article>
          <article>
            <h3>Pin: 8 năm</h3>
            <p>Không giới hạn số km.</p>
          </article>
        </div>
      </section>
      <section class="container kinet-feature">
        <img
          src="${localURL('assets/kinet/front.webp')}"
          alt="Thiết kế phía trước Kinet"
          width="1200"
          height="1600"
          loading="lazy"
        />
        <div>
          <h2>Xe điện thể thao thế hệ mới</h2>
          <h3>Hiệu năng</h3>
          <p>Tăng tốc 0–50 km/h dưới 6 giây.</p>
          <h3>Kết nối</h3>
          <p>GPS, tìm xe từ xa, quản lý qua ứng dụng.</p>
          <h3>Pin LFP</h3>
          <p>Sạc tiêu chuẩn 0–100% khoảng 9 giờ.</p>
          <p class="muted">
            Thông tin tham chiếu; kết quả thực tế phụ thuộc điều kiện sử dụng.
          </p>
        </div>
      </section>
      <section class="container">
        <h2>Trang bị Kinet</h2>
        <div class="kinet-details">
          ${details
            .map(
              ([file, title, text]) =>
                /* HTML */ `<article>
                  <img
                    src="${localURL('assets/kinet/' + file + '.webp')}"
                    alt="${title} trên Kinet"
                    width="1200"
                    height="1600"
                    loading="lazy"
                  />
                  <h3>${title}</h3>
                  <p>${text}</p>
                </article>`,
            )
            .join('')}
        </div>
      </section>`,
  );
}
