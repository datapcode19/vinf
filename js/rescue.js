import { localURL } from './routes.js';

export function renderRescue(main) {
  document.title = 'Cứu hộ ô tô — VinFast mô phỏng';
  main.innerHTML = /* HTML */ `<section class="page-heading">
      <div class="container"><h1>Thông tin cứu hộ</h1></div>
    </section>
    <div class="container article-layout">
      <nav aria-label="Mục lục cứu hộ">
        <a href="#rescue-info">Thông tin cứu hộ</a
        ><a href="#rescue-guides">Hướng dẫn ứng phó khẩn cấp</a
        ><a href="#rescue-support">Thông tin hỗ trợ</a>
      </nav>
      <article>
        <section id="rescue-info">
          <h2>Thông tin cứu hộ</h2>
          <img
            src="${localURL('assets/rescue/roadside.jpg')}"
            alt="Cứu hộ VinFast 24/7"
            width="1200"
            height="700"
            loading="lazy"
            style="width:100%;height:auto"
          />
          <h3>Cứu hộ 24/7</h3>
          <p>
            Nguồn giới thiệu dịch vụ kéo xe đến xưởng ủy quyền; xe hết năng
            lượng có thể được đưa tới điểm sạc hoặc nhà khách hàng theo điều
            kiện áp dụng.
          </p>
          <p>
            Chủ xe hoặc tài xế được ủy quyền có thể liên hệ qua tổng đài, màn
            hình xe hoặc ứng dụng VinFast.
          </p>
          <img
            src="${localURL('assets/rescue/ecall.jpg')}"
            alt="Hệ thống eCall"
            width="1200"
            height="700"
            loading="lazy"
            style="width:100%;height:auto"
          />
          <h3>Hỗ trợ khẩn cấp eCall</h3>
          <p>
            Nút SOS kết nối trung tâm hỗ trợ trên những dòng xe được trang bị
            tính năng này.
          </p>
        </section>
        <section id="rescue-guides">
          <h2>Hướng dẫn ứng phó khẩn cấp</h2>
          <p>
            Nguồn liệt kê tài liệu riêng cho VF 3, VF 5, VF 6, VF 7, VF 8, VF 9,
            VF e34, Limo Green/VF Limo và Minio Green.
          </p>
          <p class="muted">
            Chưa tải và xác minh các tài liệu này. Bản dựng không cung cấp hướng
            dẫn thao tác cứu hộ.
          </p>
        </section>
        <section id="rescue-support">
          <h2>Thông tin hỗ trợ</h2>
          <p>Tổng đài được công bố: 1900 23 23 89.</p>
          <p class="muted">
            Trang mô phỏng không kết nối tổng đài, không tiếp nhận yêu cầu cứu
            hộ.
          </p>
        </section>
      </article>
    </div>`;
}
