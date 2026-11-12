import { products } from '../data/products.js';

export function renderTestDrive(main) {
  main.innerHTML = /* HTML */ `<section class="container narrow">
    <p class="eyebrow">Chức năng bổ sung cho đồ án</p>
    <h1>Đăng ký lái thử mô phỏng</h1>
    <p>
      Không tạo lịch hẹn thật. Chỉ chọn mẫu xe, địa điểm và ngày giả lập; không
      yêu cầu tên, số điện thoại, email hay thông tin định danh.
    </p>
    <form id="test-drive" novalidate>
      <label
        >Mẫu xe<select id="model" required aria-describedby="model-error">
          <option value="">Chọn mẫu xe</option>
          ${products
            .filter((p) => p.group !== 'historical')
            .map((p) => /* HTML */ `<option value="${p.id}">${p.name}</option>`)
            .join('')}</select
        ><span class="error" id="model-error"></span></label
      ><label
        >Khu vực mô phỏng<select
          id="city"
          required
          aria-describedby="city-error"
        >
          <option value="">Chọn khu vực</option>
          <option>Hà Nội</option>
          <option>Đà Nẵng</option>
          <option>TP. Hồ Chí Minh</option></select
        ><span class="error" id="city-error"></span></label
      ><label
        >Ngày dự kiến<input
          id="date"
          type="date"
          required
          aria-describedby="date-error" /><span
          class="error"
          id="date-error"
        ></span></label
      ><label class="checkbox"
        ><input
          id="consent"
          type="checkbox"
          required
          aria-describedby="consent-error"
        />Tôi hiểu đây là mô phỏng học tập, không phải lịch hẹn thật.</label
      ><span class="error" id="consent-error"></span>
      <p id="form-status" role="status"></p>
      <div class="actions">
        <button type="submit">Kiểm tra đăng ký</button
        ><button type="reset" class="secondary">Nhập lại</button>
      </div>
    </form>
    <dialog aria-labelledby="success-title">
      <h2 id="success-title">Đã kiểm tra hợp lệ</h2>
      <p id="summary"></p>
      <p>Chỉ mô phỏng trên trình duyệt. Không gửi hoặc lưu đăng ký.</p>
      <button type="button" id="close-dialog">Đóng</button>
    </dialog>
  </section>`;
  const form = main.querySelector('form'),
    date = main.querySelector('#date'),
    dialog = main.querySelector('dialog');
  function dateText(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  function bounds() {
    const today = new Date(),
      last = new Date(today);
    last.setDate(today.getDate() + 30);
    date.min = dateText(today);
    date.max = dateText(last);
  }
  bounds();
  main.querySelector('#model').value =
    new URLSearchParams(location.search).get('model') || '';
  const errors = {
    model: 'Hãy chọn mẫu xe.',
    city: 'Hãy chọn khu vực.',
    date: 'Chọn ngày từ hôm nay đến 30 ngày tới.',
    consent: 'Bạn cần xác nhận hiểu đây là mô phỏng.',
  };
  function validate(input) {
    const valid = input.checkValidity();
    input.setAttribute('aria-invalid', String(!valid));
    main.querySelector('#' + input.id + '-error').textContent = valid
      ? ''
      : errors[input.id];
    return valid;
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    bounds();
    const invalid = [...form.querySelectorAll('[required]')].filter(
      (input) => !validate(input),
    );
    if (invalid.length) {
      main.querySelector('#form-status').textContent =
        `Có ${invalid.length} mục cần kiểm tra.`;
      invalid[0].focus();
      return;
    }
    main.querySelector('#form-status').textContent = 'Dữ liệu mô phỏng hợp lệ.';
    const model = products.find(
      (p) => p.id === main.querySelector('#model').value,
    );
    main.querySelector('#summary').textContent =
      `${model.name} · ${main.querySelector('#city').value} · ${date.value}`;
    dialog.showModal();
  });
  form.addEventListener('input', (e) => {
    if (e.target.matches('[required]')) validate(e.target);
    main.querySelector('#form-status').textContent = '';
  });
  form.addEventListener('reset', () => {
    form
      .querySelectorAll('[aria-invalid]')
      .forEach((e) => e.removeAttribute('aria-invalid'));
    main.querySelectorAll('.error').forEach((e) => (e.textContent = ''));
    main.querySelector('#form-status').textContent = '';
    dialog.close();
  });
  main
    .querySelector('#close-dialog')
    .addEventListener('click', () => dialog.close());
}
