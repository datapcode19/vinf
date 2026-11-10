import { products, money } from '../data/products.js';

export function renderCompare(main) {
  const cars = products.filter((p) => p.group === 'personal');
  main.innerHTML = /* HTML */ `<section class="container">
    <p class="eyebrow">Chức năng bổ sung cho đồ án</p>
    <h1>So sánh hai mẫu xe</h1>
    <p>
      So sánh dữ liệu tĩnh của phiên bản cơ sở. Không tái tạo công cụ tính chi
      phí vận hành của VinFast. NEDC và WLTP là hai chuẩn đo khác nhau, không so
      sánh trực tiếp quãng đường.
    </p>
    <div class="filters">
      ${['left', 'right']
        .map(
          (id, i) =>
            /* HTML */ `<label
              >Xe ${i + 1}<select id="${id}">
                ${cars.map((p, j) => /* HTML */ `<option value="${p.id}" ${j === i ? 'selected' : ''}>${p.name}</option>`).join('')}
              </select></label
            >`,
        )
        .join('')}
    </div>
    <p id="compare-status" role="status"></p>
    <div class="table-scroll" id="comparison"></div>
  </section>`;
  function compare() {
    const [a, b] = ['left', 'right'].map((id) =>
      cars.find((p) => p.id === main.querySelector('#' + id).value),
    );
    const duplicate = a === b;
    main.querySelector('#compare-status').textContent = duplicate
      ? 'Hãy chọn hai mẫu xe khác nhau.'
      : `Đang so sánh ${a.name} và ${b.name}.`;
    main.querySelector('#comparison').innerHTML = duplicate
      ? ''
      : /* HTML */ `<table>
          <caption>
            Thông số tham chiếu ngày 07/11/2026
          </caption>
          <thead>
            <tr>
              <th scope="col">Tiêu chí</th>
              <th scope="col">${a.name}</th>
              <th scope="col">${b.name}</th>
            </tr>
          </thead>
          <tbody>
            ${[
              ['Phân khúc', 'segment'],
              ['Số chỗ', 'seats'],
              ['Quãng đường / chuẩn đo', 'range'],
              ['Giá từ', 'price'],
            ]
              .map(
                ([label, key]) =>
                  /* HTML */ `<tr>
                    <th scope="row">${label}</th>
                    <td>${key === 'price' ? money(a[key]) : a[key]}</td>
                    <td>${key === 'price' ? money(b[key]) : b[key]}</td>
                  </tr>`,
              )
              .join('')}
          </tbody>
        </table>`;
  }
  main
    .querySelectorAll('select')
    .forEach((select) => select.addEventListener('change', compare));
  compare();
}
