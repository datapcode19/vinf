# Ghi chép khảo sát

Ngày báo cáo theo phiên làm việc: 07/11/2026.

## Nguồn đọc thành công

1. https://vinfastauto.com/vn_vi — cấu trúc menu, danh mục ô tô/xe máy, thông số tóm tắt, liên kết shop và footer.
2. https://vinfastauto.com/vn_vi/dat-coc-xe-dien-vf6 — phiên bản Eco/Plus, màu liệt kê, thông số, các mục nội/ngoại thất và công cụ so sánh chi phí.
3. https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-kinet — 5 màu và ảnh tương ứng, thông số, nội dung bảo hành.
4. https://vinfastauto.com/vn_vi/chinh-sach-bao-hanh-oto — mục lục, thời hạn và thông tin sổ điện tử.
5. https://vinfastauto.com/vn_vi/dich-vu-pin-oto-dien — thông báo dịch vụ, các mục về pin và giải pháp sạc.

Đọc bằng công cụ web không đồng nghĩa đã thử tương tác trên trang thật. Chỉ dùng các dữ liệu đã đọc để dựng bản chức năng độc lập.

## Trình duyệt trực tiếp

Playwright/Chromium đã có sẵn. Lần truy cập trong sandbox báo `ERR_NETWORK_ACCESS_DENIED`; khi được phép truy cập mạng, trang chỉ hiển thị logo tải. Đợi liên kết 45 giây vẫn timeout. Yêu cầu HTML trả về dấu hiệu `IM_UNDER_ATTACK_BOX`, không chứa nội dung sản phẩm. Đã dừng khảo sát trình duyệt, không vượt cơ chế bảo vệ.

`reference-desktop.png` và `reference-mobile.png` chỉ là bằng chứng màn hình tải. `links.json` rỗng, không phải sitemap hợp lệ. `vf6.html` là phản hồi lỗi/chống tự động hóa, không được nhúng hoặc dùng làm mã nguồn website.

## Tài sản

13 ảnh được nhận diện từ liên kết ảnh trong công cụ đọc web và tải trực tiếp từ `static-cms-prod.vinfastauto.com`. Người dùng xác nhận quyền dùng ảnh/logo trong phạm vi học tập. `assets/manifest.json` ghi URL, mục đích, kích thước và tỷ lệ thực. Không tải JS/CSS của website gốc, không sao chép mã độc quyền.

## Sai lệch đã biết

- Chưa có screenshot giao diện hoàn chỉnh của nguồn để so sánh cùng viewport.
- Home dùng banner ảnh sản phẩm, không khớp chiến dịch thực tế; danh mục dạng grid thay vì xác nhận được toàn bộ cơ chế carousel gốc.
- Thiếu nhiều nhánh menu và nội dung cuối trang. Bản dựng chỉ bao phủ các trang ghi rõ trong sitemap.
- Typography dùng font hệ thống, thương hiệu là chữ dựng lại, chưa dùng logo gốc.
- Trang VF 6/Kinet chỉ có phần cấu hình/thông số, chưa có toàn bộ thư viện ảnh/section riêng.
- Bảo hành/Pin là bản tóm tắt, không trình bày toàn bộ chính sách hoặc tất cả mẫu xe.
- Không tính điểm tương đồng, không tuyên bố 99,9%.
