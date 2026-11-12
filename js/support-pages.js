import { addMaintenanceChart } from './maintenance-chart.js';
import { localURL } from './routes.js';
import { tabsMarkup, accordionMarkup } from './components.js';
import { officialLink } from './destination-shared.js';

const photo = (file, alt) =>
  /* HTML */ `<img
    class="support-photo"
    src="${localURL('assets/support/' + file)}"
    alt="${alt}"
    width="1200"
    height="720"
    loading="lazy"
  />`;
const booking = () =>
  /* HTML */ `<a class="button" href="${localURL('pages/service-booking.html')}"
    >Đặt lịch dịch vụ</a
  >`;
const support = () =>
  /* HTML */ `<section id="support-contact">
    <h2>Thông tin hỗ trợ</h2>
    <p>1900 23 23 89 — Nhánh 1</p>
    <p class="muted">Bản mô phỏng không tiếp nhận yêu cầu dịch vụ thật.</p>
  </section>`;

function heading(title, description = '') {
  return /* HTML */ `<section class="page-heading">
    <div class="container">
      <h1>${title}</h1>
      ${description ? /* HTML */ `<p>${description}</p>` : ''}
    </div>
  </section>`;
}

function article(title, items, content) {
  return (
    heading(title) +
    /* HTML */ `<div class="container support-layout">
      <nav aria-label="Mục lục">
        ${items.map(([id, name]) => /* HTML */ `<a href="#${id}">${name}</a>`).join('')}${booking()}
      </nav>
      <article>${content}${support()}</article>
    </div>`
  );
}

const steps = [
  ['Đặt hẹn', 'Chọn dịch vụ và thời gian dự kiến.'],
  ['Tiếp nhận', 'Ghi nhận yêu cầu, tư vấn và thống nhất công việc.'],
  ['Thực hiện', 'Kiểm tra xe và thực hiện công việc đã thống nhất.'],
  ['Bàn giao', 'Kiểm tra kết quả và bàn giao xe.'],
  ['Chăm sóc', 'Tiếp nhận phản hồi sau dịch vụ.'],
];

function process(id) {
  return /* HTML */ `<div class="service-process">
    ${steps.map(([title, text], i) => accordionMarkup(`${id}-${i}`, `${i + 1}. ${title}`, /* HTML */ `<p>${text}</p>`)).join('')}
  </div>`;
}

export function renderAbout(main) {
  document.title = 'Giới thiệu VinFast — Bản mô phỏng';
  main.innerHTML = `${heading('Giới thiệu về Công ty VinFast', 'Thành viên của Tập đoàn Vingroup.')}<div class="about-banner">${photo('about.png', 'Giới thiệu VinFast')}</div><section class="container about-values">${[
    [
      'Tầm nhìn',
      'Phát triển thương hiệu xe điện thông minh trên thị trường toàn cầu.',
    ],
    ['Sứ mệnh', 'Hướng tới giao thông xanh.'],
    ['Triết lý thương hiệu', 'Lấy trải nghiệm khách hàng làm trọng tâm.'],
    ['Giá trị cốt lõi', 'Chất lượng sản phẩm, giá bán và dịch vụ hậu mãi.'],
  ]
    .map(
      ([title, text]) =>
        /* HTML */ `<article>
          <h2>${title}</h2>
          <p>${text}</p>
        </article>`,
    )
    .join(
      '',
    )}</section><section class="container"><h2>Dấu chân toàn cầu</h2><p>Phát triển thị trường và hợp tác với các đối tác trong ngành ô tô.</p>${photo('factory.jpg', 'Nhà máy VinFast')}</section><section class="container"><h2>Lịch sử thương hiệu</h2>${tabsMarkup(
    'history',
    [
      {
        title: '2023',
        content:
          photo('nasdaq.png', 'VinFast tại Nasdaq') +
          '<h3>15.08.2023</h3><p>Niêm yết trên Nasdaq Global Select Market.</p>',
      },
      {
        title: '2019',
        content:
          '<h3>14.06.2019</h3><p>Nhà máy ô tô tại Cát Hải, Hải Phòng đi vào vận hành.</p>',
      },
      {
        title: '2017',
        content:
          '<h3>02.09.2017</h3><p>Khởi công xây dựng nhà máy VinFast.</p>',
      },
    ],
  )}<p class="muted">Các mốc tiêu biểu trong lịch sử thương hiệu.</p></section><section class="container"><h2>Giải thưởng và đánh giá an toàn</h2><ul><li>2019: Lux A2.0 và Lux SA2.0 đạt 5 sao ASEAN NCAP; Fadil đạt 4 sao theo công bố tại thời điểm đó.</li><li>2020: giải Grand Prix của ASEAN NCAP về cam kết an toàn của hãng xe mới.</li><li>2021: được ghi nhận về chất lượng dịch vụ tại Car Awards do VnExpress-Xe tổ chức.</li></ul><p>Đây là các ghi nhận lịch sử, không phải đánh giá cho mọi phiên bản hiện tại.</p><p>${officialLink('https://vinfastauto.com/vn_vi/ve-chung-toi', 'Lịch sử và giải thưởng tại nguồn VinFast')}</p><div class="inline-links"><a class="button secondary" href="${localURL('index.html#oto')}">Khám phá các dòng xe</a><a href="${localURL('pages/company-news.html')}">Tin công ty</a></div></section>`;
}

export function renderMaintenanceContent(main) {
  document.title = 'Bảo dưỡng ô tô — VinFast mô phỏng';
  main.innerHTML = article(
    'Dịch vụ bảo dưỡng ô tô',
    [
      ['maintenance-schedule', 'Lịch trình bảo dưỡng'],
      ['maintenance-benefits', 'Ưu điểm'],
      ['maintenance-process', 'Quy trình'],
      ['support-contact', 'Thông tin hỗ trợ'],
    ],
    /* HTML */ `<section id="maintenance-schedule">
        <h2>Lịch trình & hạng mục bảo dưỡng</h2>
        <p>
          Chu kỳ được xác định theo thời gian hoặc quãng đường, tùy điều kiện
          đến trước.
        </p>
        ${tabsMarkup('maintenance-groups', [
          {
            title: 'Ô tô điện',
            content:
              '<h3>Hệ thống điện và vận hành</h3><p>Pin cao áp, cổng sạc, ắc quy 12V, gầm xe và hệ thống làm mát.</p>',
          },
          {
            title: 'Động cơ xăng',
            content:
              '<h3>Động cơ và truyền động</h3><p>Dầu, lọc dầu, lọc gió, bugi và hệ thống làm mát.</p>',
          },
          {
            title: 'Xe dịch vụ',
            content:
              '<h3>Lịch trình theo mẫu xe</h3><p>Minio Green, Herio Green, Nerio Green, EC Van và Limo Green có lịch trình riêng.</p>',
          },
        ])}
        <p class="muted">
          Bảng kỳ hạn từng mẫu chưa được ánh xạ chắc chắn từ nguồn; không áp
          dụng một lịch chung cho mọi xe.
        </p>
      </section>
      <section id="maintenance-benefits">
        <h2>Ưu điểm bảo dưỡng chính hãng</h2>
        <div class="support-pair">
          <article>
            ${photo('maintenance-quality.jpg', 'Bảo dưỡng tại xưởng')}
            <h3>Chất lượng dịch vụ</h3>
            <p>
              Quy trình chuẩn, kỹ thuật viên được đào tạo, phụ tùng chính hãng.
            </p>
          </article>
          <article>
            ${photo('maintenance-network.jpg', 'Mạng lưới xưởng dịch vụ')}
            <h3>Mạng lưới dịch vụ</h3>
            <p>Hệ thống xưởng hỗ trợ khách hàng trên toàn quốc.</p>
          </article>
        </div>
      </section>
      <section id="maintenance-process">
        <h2>Quy trình dịch vụ bảo dưỡng</h2>
        ${process('maintenance')}${booking()}
      </section>`,
  );
}

export function renderRepair(main) {
  document.title = 'Sửa chữa ô tô — VinFast mô phỏng';
  main.innerHTML = article(
    'Dịch vụ sửa chữa ô tô',
    [
      ['repair-process', 'Quy trình'],
      ['repair-types', 'Phân loại'],
      ['repair-time', 'Thời gian sửa chữa'],
      ['repair-parts', 'Phụ tùng'],
      ['support-contact', 'Hỗ trợ'],
    ],
    /* HTML */ `<section id="repair-process">
        <h2>Quy trình dịch vụ sửa chữa</h2>
        ${process('repair')}
      </section>
      <section id="repair-types">
        <h2>Phân loại dịch vụ sửa chữa</h2>
        ${tabsMarkup('repair-types', [
          {
            title: 'Sửa chữa chung',
            content:
              photo('repair-general.jpg', 'Dịch vụ sửa chữa chung') +
              '<h3>Chẩn đoán và sửa chữa</h3><p>Trang thiết bị chuyên dụng, kỹ thuật viên được đào tạo và quản lý lịch sử xe.</p>',
          },
          {
            title: 'Đồng sơn',
            content:
              photo('repair-body.jpg', 'Dịch vụ đồng sơn') +
              '<h3>Phục hồi thân vỏ</h3><p>Sửa chữa hư hỏng nhẹ, hư hỏng nặng, khung gầm, sơn và cân chỉnh bánh xe.</p>',
          },
        ])}
      </section>
      <section id="repair-time">
        <h2>Cam kết thời gian sửa chữa</h2>
        <p>
          Thời gian được tính từ khi khách hàng đồng ý phương án đến khi được
          thông báo hoàn tất.
        </p>
        <p class="muted">
          Mức hỗ trợ và loại trừ phụ thuộc điều kiện chính sách; bản dựng không
          xác định quyền lợi hay tính bồi hoàn.
        </p>
      </section>
      <section id="repair-parts">
        <h2>Phụ tùng chính hãng</h2>
        <p>Phụ tùng được lựa chọn theo yêu cầu kỹ thuật và mẫu xe.</p>
        ${booking()}
      </section>`,
  );
}

export function renderScooterBattery(main) {
  document.title = 'Pin xe máy điện — VinFast mô phỏng';
  main.innerHTML =
    heading('Pin và trạm sạc xe máy điện') +
    /* HTML */ `<section class="container support-pair">
        <div>
          <h2>Lợi ích của thuê pin</h2>
          <p>
            Giảm chi phí mua pin ban đầu, sử dụng mạng lưới sạc và hỗ trợ quản
            lý pin.
          </p>
          <a class="button secondary" href="#battery-policies"
            >Chính sách thuê pin</a
          >
        </div>
        ${photo('battery-rental.png', 'Lợi ích của thuê pin xe máy điện')}
      </section>
      <section class="container" id="battery-policies">
        <h2>Chính sách thuê pin</h2>
        ${tabsMarkup('scooter-battery', [
          {
            title: 'Trả trước',
            content:
              '<h3>Dòng MAX và pin rời</h3><p>Nguồn phân biệt chính sách MAX từ tháng 03/2026 và các dòng pin rời cũ. Chu kỳ MAX tính theo tháng dương lịch.</p>',
          },
          {
            title: 'Trả sau',
            content:
              '<h3>Chính sách theo thời điểm hợp đồng</h3><p>Nhóm pin LFP có các chính sách riêng theo ngày mua và kích hoạt hợp đồng. Không áp dụng cùng một gói cho mọi xe.</p>',
          },
        ])}${accordionMarkup('battery-existing', 'Khách hàng đã có hợp đồng', '<p>Điều kiện phụ thuộc mẫu xe, pin, ngày ký và chương trình tại thời điểm kích hoạt.</p>')}${accordionMarkup('battery-docs', 'Tài liệu sử dụng pin', `<p>Chọn đúng mẫu xe và cấu hình pin khi đọc hướng dẫn.</p><a href="${localURL('pages/scooter-documents.html')}">Tìm hướng dẫn xe máy điện</a>`)}
        <p class="muted">
          Biểu phí phụ thuộc loại pin và thời điểm hợp đồng. Không ký hợp đồng
          hoặc thanh toán tại đây.
        </p>
        <p>
          ${officialLink('https://vinfastauto.com/vn_vi/dich-vu-pin-xe-may-dien', 'Đọc biểu phí và điều kiện đúng phiên bản hợp đồng')}
        </p>
        <p>
          <a href="${localURL('pages/operating-cost.html')}"
            >Mô phỏng chi phí điện và bảo dưỡng</a
          >
        </p>
      </section>
      <section class="container">
        <h2>Trạm sạc</h2>
        <p>Thông tin tư vấn trạm sạc trên nguồn: 1900 23 23 89, phím 5.</p>
        <p>
          <a href="${localURL('pages/locations.html')}"
            >Tra cứu địa điểm và mở bản đồ chính thức</a
          >
        </p>
        <a class="button" href="${localURL('pages/service-booking.html')}"
          >Đặt lịch dịch vụ mô phỏng</a
        >
      </section>`;
}

export function renderServiceBooking(main) {
  document.title = 'Đặt lịch dịch vụ — Mô phỏng';
  main.innerHTML =
    heading(
      'Đặt lịch dịch vụ',
      'Mô phỏng thao tác chọn dịch vụ; không gửi yêu cầu thật.',
    ) +
    /* HTML */ `<section class="container narrow">
      <form id="service-booking">
        <label
          >Nhóm xe<select name="vehicle" required>
            <option value="">Chọn nhóm xe</option>
            <option>Ô tô điện</option>
            <option>Xe máy điện</option>
            <option>Xe bus</option>
          </select></label
        ><label
          >Dịch vụ<select name="service" required>
            <option value="">Chọn dịch vụ</option>
            <option>Bảo dưỡng</option>
            <option>Sửa chữa</option>
            <option>Kiểm tra pin</option>
          </select></label
        ><label>Ngày dự kiến<input type="date" name="date" required /></label
        ><label class="checkbox"
          ><input type="checkbox" required /> Tôi hiểu đây là mô phỏng, không có
          lịch hẹn thật.</label
        >
        <div class="actions">
          <button type="submit">Kiểm tra lựa chọn</button
          ><button type="reset" class="secondary">Nhập lại</button>
        </div>
        <p id="booking-status" role="status"></p>
      </form>
    </section>`;
  const form = main.querySelector('form'),
    date = form.elements.date;
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  date.min = today.toISOString().slice(0, 10);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    main.querySelector('#booking-status').textContent =
      `Đã kiểm tra: ${form.elements.vehicle.value}, ${form.elements.service.value}, ${date.value}. Không tạo lịch hẹn thật.`;
  });
  form.addEventListener(
    'reset',
    () => (main.querySelector('#booking-status').textContent = ''),
  );
}

export function renderMaintenance(main) {
  renderMaintenanceContent(main);
  addMaintenanceChart(main);
}
