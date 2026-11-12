import { createSwipe } from './swipe.js';
import { initScrollMotion } from './motion.js';
import { resolveRoute } from './routes.js';
import { carGroups, scooterGroups } from '../data/home-products.js';
import { homeMenus } from '../data/home-menu.js';
import { tabsMarkup } from './components.js';
import { arrowIcon } from './color-gallery.js';

const assets = './assets/home/';
const official = (path) => 'https://vinfastauto.com/vn_vi/' + path;
const shop = (path) => 'https://shop.vinfastauto.com/vn_vi/' + path;

function productLink(product) {
  const aliases = {
    'vf-wild': 'VF Wild',
    'vf8-new': 'VF 8 Thế hệ mới',
    'vf-mpv7': 'VF MPV 7',
    ecvan: 'EC Van',
    'feliz-2025': 'Feliz 2025',
    drgnfly: 'VF DrgnFly',
    zgoo: 'ZGoo',
  };
  const entry = homeMenus
    .flatMap((m) => m.groups || [])
    .flatMap((g) => g.items)
    .find((i) => i.name === (aliases[product.id] || product.name));
  return resolveRoute(entry?.url || official('mua-xe-o-to-dien-truc-tuyen'));
}

function rangeMarkup(product) {
  return /* HTML */ `<dl class="home-specs">
    ${product.stats
      .map(
        ([label, value]) =>
          /* HTML */ `<div>
            <dd>${value}</dd>
            <dt>${label}</dt>
          </div>`,
      )
      .join('')}
  </dl>`;
}

function displayPrice(price) {
  return price >= 1000
    ? `${String(price / 1000).replace('.', ',')} tỷ đồng`
    : `${String(price).replace('.', ',')} triệu đồng`;
}

function showcase(id, group) {
  return /* HTML */ `<div class="home-showcase" data-showcase="${id}">
    <div class="model-picker" aria-label="Chọn mẫu xe">
      ${group.items.map((p, i) => /* HTML */ `<button type="button" data-model="${i}" aria-pressed="${i === 0}">${p.name}</button>`).join('')}
    </div>
    <div class="showcase-vehicle">
      <button type="button" data-model-prev aria-label="Mẫu xe trước">
        ${arrowIcon('previous')}
      </button>
      <div class="showcase-content">
        <div class="showcase-viewport">
          <div class="showcase-scene">
            <div class="showcase-image">
              <img
                data-model-image
                src="./${group.items[0].image}"
                alt="${group.items[0].name}"
                width="1200"
                height="637"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div class="showcase-details">
          <div class="showcase-info" aria-hidden="false">
            <!-- prettier-ignore -->
            <h3 class="visually-hidden" data-model-name>${group.items[0].name}</h3>
            <div data-model-specs>${rangeMarkup(group.items[0])}</div>
            <p class="home-price" data-model-price>
              Giá niêm yết ${displayPrice(group.items[0].price)}
            </p>
            <a
              class="button"
              data-model-link
              href="${productLink(group.items[0])}"
              ${productLink(group.items[0]).startsWith('https:') ? 'target="_blank" rel="noopener noreferrer"' : ''}
              >Xem chi tiết</a
            ><span
              class="visually-hidden"
              data-model-status
              role="status"
            ></span>
          </div>
        </div>
      </div>
      <button type="button" data-model-next aria-label="Mẫu xe tiếp theo">
        ${arrowIcon('next')}
      </button>
    </div>
  </div>`;
}

const supportTools = [
  ['Đăng ký lái thử', shop('dang-ky-lai-thu.html'), 'drive.webp'],
  ['So sánh xe', shop('so-sanh-xe-vinfast'), 'compare.webp'],
  ['Dự toán chi phí lăn bánh', shop('chi-phi-lan-banh'), 'installment.webp'],
  [
    'Tính chi phí sử dụng xe máy điện',
    official('tinh-chi-phi-su-dung-xmd'),
    'payments.webp',
  ],
  [
    'Dự toán chi phí trả góp',
    shop('du-toan-chi-phi-tra-gop'),
    'calculations.webp',
  ],
];
const accessories = [
  ['Tấm che pin cao áp', 'battery-cover.png', 'EEP71061000.html'],
  ['Bộ Xếp Hình Robot VinFast VF 9', 'robot-vf9.png', 'ACS10000246.html'],
  ['Ô cao cấp', 'umbrella.png', 'ACS40000094.html'],
  ['Sạc tại nhà 3KW', 'charger.png', 'EEP69072176AB.html'],
];

export function renderHome(main) {
  main.innerHTML = /* HTML */ `<h1 class="visually-hidden">
      VinFast Việt Nam — Bản mô phỏng học tập
    </h1>
    <section class="home-hero" aria-label="Video giới thiệu VinFast">
      <div data-slide>
        <video id="vinfastIntro" autoplay muted playsinline preload="auto">
          <source src="./assets/videos/vinfast-intro.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
    <section class="home-section home-cars" id="oto" aria-label="Danh mục ô tô">
      ${tabsMarkup(
        'home-cars',
        carGroups.map((group, i) => ({
          title: group.title,
          content: showcase('cars-' + i, group),
        })),
      )}
    </section>
    <section
      class="home-section home-scooters"
      id="xe-may-dien"
      aria-label="Danh mục xe máy điện"
    >
      ${tabsMarkup(
        'home-scooters',
        scooterGroups.map((group, i) => ({
          title: group.title,
          content: showcase('scooters-' + i, group),
        })),
      )}
    </section>
    <section class="home-section home-after-sales" id="hau-mai">
      <div class="section-intro">
        <h2>Đồng hành dài lâu - An tâm mọi cung đường</h2>
        <p>
          Đặt khách hàng làm trung tâm, VinFast không ngừng hoàn thiện hệ sinh
          thái hậu mãi toàn diện với chính sách bảo hành hàng đầu, mạng lưới
          dịch vụ phủ rộng và đội ngũ hỗ trợ luôn sẵn sàng, mang đến sự an tâm
          trong suốt hành trình sở hữu xe.
        </p>
        <div class="inline-links">
          <a href="./pages/warranty.html">Chính sách bảo hành ô tô</a
          ><a
            href="${official('chinh-sach-bao-hanh-xe-may-dien')}"
            target="_blank"
            rel="noopener noreferrer"
            >Chính sách bảo hành xe máy ↗</a
          >
        </div>
      </div>
      <div class="after-sales-grid">
        ${[
          [
            'showcase-bh-1.webp',
            'Bảo hành đến 10 năm',
            'Tùy từng dòng xe và pin.*',
          ],
          [
            'showcase-bh-2.webp',
            'Cam kết thời gian sửa chữa',
            'Minh bạch, đúng thời gian cam kết.*',
          ],
          [
            'showcase-bh-3.webp',
            'Xưởng dịch vụ toàn quốc',
            'Luôn sẵn sàng phục vụ khách hàng.',
          ],
        ]
          .map(
            ([image, title, text]) =>
              /* HTML */ `<article>
                <img
                  src="${assets + image}"
                  alt="${title}"
                  width="1920"
                  height="1441"
                  loading="lazy"
                />
                <h3>${title}</h3>
                <p>${text}</p>
              </article>`,
          )
          .join('')}
      </div>
    </section>
    <section class="home-section home-green" id="tuong-lai-xanh">
      <div class="section-intro">
        <h2>Mãnh liệt vì tương lai xanh</h2>
        <p>
          Hành trình chuyển đổi sang xe điện, hướng đến phát triển bền vững và
          giao thông xanh tại Việt Nam.
        </p>
      </div>
      <img
        class="green-campaign"
        src="${assets}hinh-anh-manh-liet-vi-tuong-lai-xanh-2709.webp"
        alt="Mãnh liệt vì tương lai xanh"
        width="1602"
        height="604"
        loading="lazy"
      />
    </section>
    <div class="home-transition-image">
      <img
        src="${assets}vinfast-vf9-top-home.webp"
        alt="VinFast VF 9 nhìn từ trên cao"
        width="1920"
        height="966"
        loading="lazy"
      />
    </div>
    <section class="home-section home-ecosystem" id="he-sinh-thai">
      <div class="ecosystem-content">
        <h2>Hệ sinh thái toàn diện</h2>
        <p>
          Các dịch vụ đồng hành cùng khách hàng từ mua xe đến sử dụng hằng ngày.
        </p>
        ${[
          [
            'icon-car-filled.webp',
            'Mua xe thuận tiện',
            'Đại lý trên toàn quốc và nền tảng mua xe trực tuyến.',
          ],
          [
            'icon-after-sales-filled.webp',
            'An tâm hậu mãi',
            'Xưởng dịch vụ, bảo hành và hỗ trợ khách hàng.',
          ],
          [
            'thunderbolt-icon.webp',
            'Nạp năng lượng dễ dàng',
            '155.000+ cổng sạc / tủ đổi pin theo nội dung tham chiếu.',
          ],
        ]
          .map(
            ([icon, title, text]) =>
              /* HTML */ `<article>
                <img
                  src="${assets + icon}"
                  alt=""
                  width="48"
                  height="48"
                  loading="lazy"
                />
                <div>
                  <h3>${title}</h3>
                  <p>${text}</p>
                </div>
              </article>`,
          )
          .join('')}<a
          class="button secondary"
          href="${official('tim-kiem-showroom-tram-sac')}"
          target="_blank"
          rel="noopener noreferrer"
          >Tìm Showroom & Trạm sạc ↗</a
        >
      </div>
      <img
        class="ecosystem-image"
        src="${assets}hinh-anh-he-sinh-thai-toan-dien-desktop-0210.webp"
        alt="Hệ sinh thái VinFast"
        width="1920"
        height="1920"
        loading="lazy"
      />
    </section>
    <section class="home-section home-buy-tools" id="ho-tro-mua-xe">
      <div class="section-intro">
        <h2>Mua xe dễ dàng hơn</h2>
        <p>
          Các công cụ hỗ trợ lựa chọn, trải nghiệm và dự tính chi phí sở hữu xe.
        </p>
      </div>
      <div class="buy-tools-grid">
        ${supportTools
          .map(
            ([title, url, icon]) =>
              /* HTML */ `<a
                href="${url}"
                target="_blank"
                rel="noopener noreferrer"
                ><img
                  class="tool-icon"
                  src="./assets/shared/${icon}"
                  alt=""
                  width="48"
                  height="48"
                  loading="lazy"
                />
                <h3>${title}</h3>
                <span class="tool-arrow" aria-hidden="true">↗</span></a
              >`,
          )
          .join('')}
      </div>
    </section>
    <section class="home-section home-lifestyle" id="phu-kien">
      <div class="section-intro">
        <h2>Nâng tầm phong cách</h2>
        <p>Phụ kiện chính hãng và dịch vụ kết nối dành cho xe VinFast.</p>
      </div>
      <div class="accessory-list">
        ${accessories
          .map(
            ([name, image, url]) =>
              /* HTML */ `<article>
                <a
                  href="${shop('phu-kien')}"
                  target="_blank"
                  rel="noopener noreferrer"
                  ><img
                    src="./assets/accessories/${image}"
                    alt="${name}"
                    width="600"
                    height="600"
                    loading="lazy"
                  />
                  <h3>${name}</h3></a
                ><a
                  class="text-link"
                  href="${shop('phu-kien')}"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Xem thêm ↗</a
                >
              </article>`,
          )
          .join('')}
      </div>
      <div class="estore">
        <img
          src="${assets}hinh-anh-trai-nghiem-smart-connect-desktop-0210.webp"
          alt="VF eStore — trải nghiệm Smart Connect"
          width="1920"
          height="1553"
          loading="lazy"
        />
        <div>
          <p class="eyebrow">VF eStore</p>
          <h3>Dịch vụ kết nối thông minh</h3>
          <a
            class="button"
            href="${official('vinfast-estore.html')}"
            target="_blank"
            rel="noopener noreferrer"
            >Khám phá ngay ↗</a
          >
        </div>
      </div>
    </section>
    <section class="home-newsletter" id="nhan-thong-tin">
      <div>
        <h2>Đăng ký nhận thông tin</h2>
        <p>Thông tin về chương trình khuyến mãi và dịch vụ VinFast.</p>
        <small
          >Bản mô phỏng: dùng email ví dụ; thông tin không được gửi hoặc
          lưu.</small
        >
      </div>
      <form id="newsletter-form">
        <label class="visually-hidden" for="newsletter-email"
          >Email mô phỏng</label
        >
        <div class="newsletter-field">
          <input
            id="newsletter-email"
            type="email"
            placeholder="Nhập email của bạn"
            autocomplete="off"
            required
            maxlength="254"
            aria-describedby="newsletter-status"
          /><button type="submit" aria-label="Đăng ký nhận thông tin mô phỏng">
            →
          </button>
        </div>
        <label class="newsletter-consent"
          ><input type="checkbox" id="newsletter-consent" required /><span
            >Tôi đã đọc
            <a
              href="${official('privacy-policy')}"
              target="_blank"
              rel="noopener noreferrer"
              >Chính sách Quyền riêng tư ↗</a
            >
            và hiểu đây là mô phỏng.</span
          ></label
        >
        <p id="newsletter-status" role="status"></p>
      </form>
    </section>`;
  const groups = [
    ...carGroups.map((group, i) => ['cars-' + i, group]),
    ...scooterGroups.map((group, i) => ['scooters-' + i, group]),
  ];
  for (const [id, group] of groups) {
    const root = main.querySelector(`[data-showcase="${id}"]`),
      buttons = [...root.querySelectorAll('[data-model]')];
    const viewport = root.querySelector('.showcase-viewport');
    const details = root.querySelector('.showcase-details');
    const fields = ['image', 'name', 'specs', 'price', 'link', 'status'];
    const panels = [];
    const scenes = group.items.map((product) => {
      const template = document.createElement('template');
      template.innerHTML = showcase(id, { items: [product] });
      const scene = template.content.querySelector('.showcase-scene');
      const panel = template.content.querySelector('.showcase-info');
      panels.push(panel);
      fields.forEach((field) => {
        const node = template.content.querySelector(
          '[data-model-' + field + ']',
        );
        node.removeAttribute('data-model-' + field);
        node.setAttribute('data-scene-' + field, '');
      });
      return scene;
    });
    viewport.replaceChildren(...scenes);
    details.replaceChildren(...panels);
    const updateSelection = (index) => {
      buttons.forEach((button, i) =>
        button.setAttribute('aria-pressed', String(i === index)),
      );
      scenes.forEach((scene, i) => {
        const panel = panels[i];
        // CSS handles interrupted fades; only the latest selection is interactive.
        panel.inert = i !== index;
        panel.setAttribute('aria-hidden', String(i !== index));
        fields.forEach((field) => {
          const node = (field === 'image' ? scene : panel).querySelector(
            '[data-scene-' + field + ']',
          );
          if (i === index) node.setAttribute('data-model-' + field, '');
          else node.removeAttribute('data-model-' + field);
        });
      });
      root.querySelector('[data-model-status]').textContent =
        group.items[index].name +
        ', ' +
        (index + 1) +
        ' / ' +
        group.items.length;
      const picker = root.querySelector('.model-picker'),
        button = buttons[index];
      picker.scrollTo({
        left:
          picker.scrollLeft +
          button.getBoundingClientRect().left -
          picker.getBoundingClientRect().left -
          (picker.clientWidth - button.clientWidth) / 2,
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });
    };
    // Preserve swiping across both the image and the stationary details.
    const carousel = createSwipe(
      viewport,
      scenes,
      updateSelection,
      root.querySelector('.showcase-content'),
    );
    buttons.forEach((button, i) =>
      button.addEventListener('click', () => carousel.go(i)),
    );
    root
      .querySelector('[data-model-prev]')
      .addEventListener('click', carousel.prev);
    root
      .querySelector('[data-model-next]')
      .addEventListener('click', carousel.next);
  }
  const intro = main.querySelector('#vinfastIntro');
  if (intro) {
    intro.addEventListener('ended', () => {
      intro.pause();
    });
  }
  initScrollMotion(main);
  const form = main.querySelector('#newsletter-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    main.querySelector('#newsletter-status').textContent =
      'Đã kiểm tra email hợp lệ. Đây là mô phỏng, không có đăng ký thật.';
    form.reset();
  });
}
