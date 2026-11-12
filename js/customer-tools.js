import { products, money } from '../data/products.js';
import { localURL } from './routes.js';
import {
  onRoadCost,
  loanSchedule,
  operatingCost,
} from './cost-calculations.js';
import { pageHeading, sourceMarkup, escapeHTML } from './destination-shared.js';

const activeProducts = () =>
  products.filter(
    (product) =>
      product.group !== 'historical' &&
      Number.isFinite(product.price) &&
      product.price > 0,
  );
const numeric = (name, label, value, max = 1e10, step = 'any') =>
  `<label>${label}<input name="${name}" type="number" min="0" max="${max}" step="${step}" value="${value}" required /></label>`;
const sampleModels = () =>
  `<label>Điền giá từ snapshot danh mục (tùy chọn)<select data-price-model><option value="">Tự nhập giá giả định</option>${activeProducts()
    .map((product) => `<option value="${product.id}">${product.name}</option>`)
    .join(
      '',
    )}</select></label><p class="muted">Giá danh mục là snapshot của đồ án, không phải báo giá hiện tại. Có thể sửa số tiền bên dưới.</p>`;
const actions =
  '<div class="destination-inline"><button class="button" type="submit">Tính dự toán</button><button class="button secondary" type="reset">Đặt lại giả định</button></div>';

function download(filename, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function renderCostTool(main, page) {
  const loan = page.id === 'installment';
  const operating = page.id === 'operating-cost';
  const fields = operating
    ? numeric('monthlyKm', 'Quãng đường mỗi tháng (km)', 1000, 20000) +
      numeric('years', 'Thời gian sử dụng (năm)', 3, 30) +
      numeric(
        'kwhPer100',
        'Điện tiêu thụ tại công tơ (kWh/100 km) — giả định',
        3,
        100,
      ) +
      numeric(
        'electricityPrice',
        'Đơn giá điện giả định (đồng/kWh)',
        3000,
        100000,
      ) +
      numeric('litresPer100', 'Xăng tiêu thụ (lít/100 km) — giả định', 2, 100) +
      numeric('petrolPrice', 'Giá xăng giả định (đồng/lít)', 22000, 1000000) +
      numeric(
        'electricMaintenance',
        'Bảo dưỡng xe điện giả định (đồng/năm)',
        0,
      ) +
      numeric('petrolMaintenance', 'Bảo dưỡng xe xăng giả định (đồng/năm)', 0)
    : sampleModels() +
      numeric('price', 'Giá xe giả định (đồng)', 500000000) +
      (loan
        ? numeric('downPayment', 'Số tiền trả trước (đồng)', 150000000) +
          numeric('annualRate', 'Lãi suất cố định giả định (%/năm)', 8, 100) +
          numeric('months', 'Thời hạn (tháng)', 60, 120, '1') +
          '<label>Phương pháp tính<select name="method"><option value="annuity">Tổng trả mỗi tháng bằng nhau</option><option value="principal">Gốc trả đều, lãi trên dư nợ giảm dần</option></select></label>'
        : numeric(
            'registrationRate',
            'Tỷ lệ lệ phí trước bạ giả định (%)',
            0,
            100,
          ) +
          numeric('plate', 'Phí biển số giả định (đồng)', 0) +
          numeric('inspection', 'Phí đăng kiểm giả định (đồng)', 0) +
          numeric('road', 'Phí đường bộ giả định (đồng)', 0) +
          numeric('insurance', 'Bảo hiểm giả định (đồng)', 0) +
          numeric('other', 'Chi phí khác giả định (đồng)', 0));
  const explanation = operating
    ? 'Quãng đường = km/tháng × 12 × số năm. Chi phí năng lượng = quãng đường / 100 × mức tiêu thụ × đơn giá. Cộng bảo dưỡng theo số năm. Chưa gồm giá mua xe, khấu hao, pin thay thế, thuê/đổi pin hay giá trị bán lại.'
    : loan
      ? 'Lãi tháng = dư nợ đầu kỳ × lãi suất năm / 12. Hai phương pháp khác nhau ở cách phân bổ gốc. Lãi suất được giữ cố định toàn kỳ; chưa gồm phí vay, bảo hiểm khoản vay, ưu đãi hoặc phạt trả trước.'
      : 'Tổng = giá xe + giá xe × tỷ lệ trước bạ / 100 + các khoản phí đã nhập. Giá trị 0 mặc định không khẳng định một khoản phí được miễn; người dùng cần điền giả định phù hợp.';
  main.innerHTML =
    pageHeading(
      page,
      'Mô phỏng học tập · Tính toán trong trình duyệt, không gửi hồ sơ hoặc tạo giao dịch',
    ) +
    `<section class="container"><aside class="info"><h2>Giả định do bạn quyết định</h2><p>Các giá trị ví dụ không phải biểu phí, lãi suất ngân hàng hay mức tiêu thụ được bảo đảm của một mẫu xe. Kết quả chỉ minh họa phép tính.</p></aside></section>
    <section class="container destination-tools"><form data-cost-form>${fields}${actions}</form>
      <aside class="destination-result"><h2>Kết quả dự toán</h2><div data-cost-result role="status"><p>Nhập giả định và chọn “Tính dự toán”.</p></div>
      <button type="button" class="button secondary" data-download-schedule hidden>Tải lịch trả góp CSV</button></aside></section>
    <section class="container"><h2>Cách tính và phạm vi</h2><p>${explanation}</p><div class="destination-table" data-schedule></div></section>${sourceMarkup(page)}`;
  const form = main.querySelector('[data-cost-form]');
  const result = main.querySelector('[data-cost-result]');
  const scheduleHost = main.querySelector('[data-schedule]');
  const exportButton = main.querySelector('[data-download-schedule]');
  let schedule = null;
  form
    .querySelector('[data-price-model]')
    ?.addEventListener('change', (event) => {
      const product = activeProducts().find(
        (product) => product.id === event.target.value,
      );
      if (product) form.elements.price.value = product.price;
      clearResult();
    });
  function clearResult() {
    result.textContent =
      'Giả định đã thay đổi. Chọn “Tính dự toán” để cập nhật.';
    scheduleHost.replaceChildren();
    exportButton.hidden = true;
    schedule = null;
  }
  form.addEventListener('input', clearResult);
  form.addEventListener('change', clearResult);
  form.addEventListener('reset', () => setTimeout(clearResult, 0));
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = Object.fromEntries(
      [...new FormData(form)].map(([key, value]) => [
        key,
        key === 'method' ? value : Number(value),
      ]),
    );
    try {
      if (loan) {
        const calculated = loanSchedule(values);
        schedule = calculated.schedule;
        result.innerHTML = `<p>Tiền vay: <strong>${money(calculated.principal)}</strong></p><p>Tổng lãi: ${money(calculated.totalInterest)}</p><p>Tổng gốc và lãi: <strong>${money(calculated.total)}</strong></p><p>Tổng gồm trả trước: ${money(calculated.total + values.downPayment)}</p><p>Kỳ đầu / kỳ cuối: ${money(schedule[0].payment)} / ${money(schedule.at(-1).payment)}</p>`;
        scheduleHost.innerHTML = `<h3>Lịch trả góp minh họa</h3><table><thead><tr><th scope="col">Tháng</th><th scope="col">Dư nợ đầu kỳ</th><th scope="col">Gốc</th><th scope="col">Lãi</th><th scope="col">Thanh toán</th><th scope="col">Dư nợ cuối kỳ</th></tr></thead><tbody>${schedule.map((row) => `<tr><th scope="row">${row.month}</th>${['opening', 'principal', 'interest', 'payment', 'balance'].map((key) => `<td>${money(row[key])}</td>`).join('')}</tr>`).join('')}</tbody></table><p class="muted">Hiển thị làm tròn đến đồng; phép tính nội bộ dùng độ chính xác đầy đủ.</p>`;
        exportButton.hidden = false;
      } else if (operating) {
        const calculated = operatingCost(values);
        result.innerHTML = `<p>Quãng đường: ${calculated.distance.toLocaleString('vi-VN')} km</p><p>Điện: ${money(calculated.electricEnergy)}; xăng: ${money(calculated.petrolEnergy)}</p><p>Tổng vận hành xe điện: <strong>${money(calculated.electricTotal)}</strong></p><p>Tổng vận hành xe xăng: <strong>${money(calculated.petrolTotal)}</strong></p><p>${calculated.difference >= 0 ? 'Xe điện thấp hơn' : 'Xe điện cao hơn'}: ${money(Math.abs(calculated.difference))}</p>`;
      } else {
        const calculated = onRoadCost(values);
        result.innerHTML = `<p>Giá xe: ${money(values.price)}</p><p>Trước bạ theo giả định: ${money(calculated.registration)}</p><p>Biển số: ${money(values.plate)}</p><p>Đăng kiểm: ${money(values.inspection)}</p><p>Đường bộ: ${money(values.road)}</p><p>Bảo hiểm: ${money(values.insurance)}</p><p>Khác: ${money(values.other)}</p><p>Tổng dự toán</p><p class="price">${money(calculated.total)}</p>`;
      }
    } catch (error) {
      clearResult();
      result.textContent = error.message;
    }
  });
  exportButton.addEventListener('click', () => {
    if (!schedule) return;
    const rows = schedule.map((row) =>
      [
        row.month,
        row.opening,
        row.principal,
        row.interest,
        row.payment,
        row.balance,
      ]
        .map((value) => Math.round(value))
        .join(','),
    );
    download(
      'lich-tra-gop-mo-phong.csv',
      '\ufeffThang,Du no dau ky,Goc,Lai,Thanh toan,Du no cuoi ky\r\n' +
        rows.join('\r\n'),
      'text/csv;charset=utf-8',
    );
  });
}

export function renderShopSimulation(main, page) {
  const scooter = page.id === 'buy-scooter';
  const choices = activeProducts().filter((product) =>
    scooter
      ? product.group === 'scooter'
      : ['personal', 'service'].includes(product.group),
  );
  main.innerHTML =
    pageHeading(
      page,
      'Trải nghiệm chọn xe và kiểm tra cấu hình · Không đặt hàng hoặc thanh toán thật',
    ) +
    `
    <section class="container"><ol class="destination-steps"><li>Chọn mẫu xe trong danh mục.</li><li>Đọc thông tin và xác nhận đây là mô phỏng.</li><li>Tạo phiếu lựa chọn để xem hoặc tải về máy.</li></ol></section>
    <section class="container destination-tools"><form data-shop-form>
      <label>Mẫu xe<select name="model" required><option value="">Chọn mẫu xe</option>${choices.map((product) => `<option value="${product.id}">${product.name}</option>`).join('')}</select></label>
      <div data-model-options></div><label class="checkbox"><input type="checkbox" name="simulation" required /> Tôi hiểu phiếu này không tạo đơn hàng, không giữ xe và không phát sinh nghĩa vụ thanh toán.</label>
      <div class="destination-inline"><button class="button" type="submit">Tạo phiếu lựa chọn mô phỏng</button><button class="button secondary" type="reset">Chọn lại</button></div>
    </form><div class="destination-card" data-shop-preview><p>Chọn mẫu xe để xem thông tin.</p></div></section>
    <section class="container" data-shop-summary hidden><h2>Phiếu lựa chọn mô phỏng</h2><div role="status" data-shop-status></div><button class="button secondary" data-download-selection>Tải phiếu JSON</button></section>
    <section class="container"><h2>Phạm vi trải nghiệm</h2><p>Giá danh mục là dữ liệu tham khảo của đồ án, chưa gồm phí và không xác nhận ưu đãi, tồn kho hoặc ngày giao. Phiếu chỉ chứa lựa chọn xe; không thu thập tên, địa chỉ, tài khoản hoặc thông tin thanh toán.</p><div class="detail-links"><a href="${localURL('pages/on-road-cost.html')}">Mô phỏng chi phí lăn bánh</a><a href="${localURL('pages/installment.html')}">Mô phỏng trả góp</a><a href="${localURL('pages/deposit-terms.html')}">Tìm hiểu điều khoản đặt cọc</a></div></section>${sourceMarkup(page)}`;
  const form = main.querySelector('[data-shop-form]');
  const preview = main.querySelector('[data-shop-preview]');
  const options = main.querySelector('[data-model-options]');
  const summary = main.querySelector('[data-shop-summary]');
  let selection = null;
  const selected = () =>
    choices.find((product) => product.id === form.elements.model.value);
  function invalidate() {
    summary.hidden = true;
    selection = null;
  }
  function configure() {
    invalidate();
    form.elements.simulation.checked = false;
    const product = selected();
    options.innerHTML = product?.versions
      ? `<label>Phiên bản<select name="version">${product.versions.map((version, index) => `<option value="${index}">${version.name}</option>`).join('')}</select></label>`
      : '';
    updatePreview();
  }
  function updatePreview() {
    invalidate();
    const product = selected();
    if (!product) {
      preview.innerHTML = '<p>Chọn mẫu xe để xem thông tin.</p>';
      return;
    }
    const version =
      product.versions?.[Number(form.elements.version?.value || 0)];
    const detail = product.detailPath
      ? product.detailPath + '.html'
      : 'product.html?id=' + product.id;
    preview.innerHTML = `<img src="${localURL('assets/' + product.image)}" alt="${product.name}" /><h2>${product.name}${version ? ' — ' + version.name : ''}</h2><p>Giá snapshot danh mục: ${money(version?.price ?? product.price)}</p><p>${escapeHTML(version?.range || product.range || product.segment)}</p><a class="button secondary" href="${localURL('pages/' + detail)}">Xem chi tiết ${product.name}</a>`;
  }
  form.elements.model.addEventListener('change', configure);
  options.addEventListener('change', updatePreview);
  form.elements.simulation.addEventListener('change', invalidate);
  form.addEventListener('reset', () => setTimeout(configure, 0));
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const product = selected();
    if (!product) return;
    const version =
      product.versions?.[Number(form.elements.version?.value || 0)];
    selection = {
      simulation: true,
      model: product.name,
      version: version?.name || null,
      referencePriceVND: version?.price ?? product.price,
      note: 'Phiếu học tập; không phải đơn hàng, báo giá hay thỏa thuận đặt cọc.',
    };
    main.querySelector('[data-shop-status]').textContent =
      `${product.name}${version ? ' — ' + version.name : ''}. Giá snapshot: ${money(selection.referencePriceVND)}. Đã tạo phiếu học tập; không có đơn hàng thật.`;
    summary.hidden = false;
  });
  main
    .querySelector('[data-download-selection]')
    .addEventListener('click', () => {
      if (selection)
        download(
          'lua-chon-xe-mo-phong.json',
          JSON.stringify(selection, null, 2),
          'application/json',
        );
    });
  const initial = new URLSearchParams(location.search).get('model');
  if (choices.some((product) => product.id === initial))
    form.elements.model.value = initial;
  configure();
}
