> Cập nhật 08/11/2026: xem [trạng thái giai đoạn 1](PHASE_1_STATUS.md) và [độ bao phủ URL](URL_COVERAGE.md). Các ghi nhận bên dưới là lịch sử; không thay thế kết quả mới. Giai đoạn 1 chưa hoàn thành.

# Sơ đồ website và phạm vi khảo sát

> Cập nhật giai đoạn hiện tại: trang chủ là **IMPLEMENTED — UNVERIFIED**, hero và đối chiếu thị giác **BLOCKED**. Các trang con có sẵn giữ ở **IMPLEMENTED — UNVERIFIED** (nội dung tóm tắt; chưa clone đầy đủ), các trang chưa dựng là **NOT STARTED**. Không có trang **COMPLETED**. Chưa mở rộng trang con mới trước khi giải quyết giới hạn trang chủ. Chi tiết từng section ở `HOME_SECTIONS.md`; danh sách PASS cục bộ bên dưới chỉ phản ánh kiểm thử chức năng, không phải hoàn thành clone.

Ngày khảo sát: 07/11/2026. Nguồn: https://vinfastauto.com/vn_vi.
Đây là sổ theo dõi, không phải tuyên bố đã tái tạo toàn bộ website.

| Trang/nhóm | URL gốc | URL cục bộ dự kiến | Cha / liên kết đến | Template / tương tác | Khảo sát | Triển khai | Kiểm thử |
|---|---|---|---|---|---|---|---|
| Trang chủ | /vn_vi | /index.html | Logo | Trang chủ; slider, tabs | Đọc nội dung; hình ảnh đối chiếu BLOCKED | Bản chức năng | PASS cục bộ, chưa đối chiếu ảnh |
| Xe cá nhân / dịch vụ | Menu trang chủ | /pages/catalog.html?group=personal hoặc service | Ô tô | Danh mục; tìm kiếm, lọc | Đọc menu | Bản chức năng | PASS cục bộ, chưa đối chiếu ảnh |
| Xe máy điện | Menu trang chủ | /pages/catalog.html?group=scooter | Xe máy điện | Danh mục; lọc phân khúc | Đọc menu | Bản chức năng | PASS cục bộ, chưa đối chiếu ảnh |
| VF 6 | /vn_vi/dat-coc-xe-dien-vf6 | /pages/product.html?id=vf6 | Menu, danh mục, trang chủ | Chi tiết; màu, Eco/Plus, tabs | Đọc trang chi tiết | Bản chức năng | PASS cục bộ, chưa đối chiếu ảnh |
| Kinet | /vn_vi/xe-may-dien-vinfast-kinet | /pages/product.html?id=kinet | Menu, danh mục | Chi tiết xe máy; màu | Đọc trang chi tiết | Bản chức năng | PASS cục bộ, chưa đối chiếu ảnh |
| Bảo hành ô tô | /vn_vi/chinh-sach-bao-hanh-oto | /pages/warranty.html | Hậu mãi, footer | Nội dung; mục lục, accordion | Đọc nội dung | Bản chức năng | PASS cục bộ, chưa đối chiếu ảnh |
| Pin ô tô | /vn_vi/dich-vu-pin-oto-dien | /pages/battery.html | Pin và trạm sạc | Nội dung; tabs | Đọc nội dung | Bản chức năng | PASS cục bộ, chưa đối chiếu ảnh |
| So sánh | shop.vinfastauto.com (liên kết ngoài) | /pages/compare.html | Công cụ học tập | So sánh tĩnh tự bổ sung | Chỉ xác nhận liên kết | Bản chức năng | PASS cục bộ, chưa đối chiếu ảnh |
| Lái thử | shop.vinfastauto.com (liên kết ngoài) | /pages/test-drive.html | CTA | Form mô phỏng tự bổ sung | Chỉ xác nhận liên kết | Bản chức năng | PASS cục bộ, chưa đối chiếu ảnh |
| 404 | Không áp dụng | /404.html; ID sản phẩm không tồn tại | URL sai | Thông báo + về trang chủ | Không áp dụng | Bản chức năng | PASS cục bộ, chưa đối chiếu ảnh |

## Các nhánh phát hiện từ menu, chưa được xem là hoàn thành

- Cá nhân: VF 2, VF 3, VF 5, VF 6, VF 7, VF MPV 7, VF 8, VF 8 Thế hệ mới, VF 9, VF Wild.
- Dịch vụ: Minio Green, Herio Green, Nerio Green (shop), Limo Green, EC Van, EBus (shop).
- Xe xăng: Fadil, Lux A2.0, Lux SA2.0, President (shop).
- Cao cấp: Kinet, Viper, Vero X. Trung cấp: Kyo, Feliz II, Feliz 2025, Feliz 2027.
- Phổ thông: Evo Grand Limited, Evo Grand Premia, Evo Grand II, Evo, Evo Grand, Amio, Amio S, Amio S2, Flazz, Flazz Max, ZGoo, Evo Lite, VF DrgnFly, Evo Grand Lite, Evo Lite Neo.
- Hậu mãi: bảo hành, bảo dưỡng, sửa chữa cho ô tô/xe máy/xe bus; cứu hộ ô tô/xe bus; tra cứu xưởng; tài liệu hướng dẫn.
- Pin xe máy, lưu trữ năng lượng, giới thiệu, showroom, tin tức, điều khoản và các chính sách footer.
- Ngoài phạm vi giao dịch: đăng nhập, đặt cọc, phụ kiện, eStore, vay, đặt lịch dịch vụ. Không triển khai thanh toán hay tài khoản.

Danh sách URL cụ thể thu được bằng trình duyệt (nếu thành công) nằm ở `research/links.json`. Không tạo trang chi tiết giả cho các mẫu chưa khảo sát; danh mục ghi rõ mức độ hỗ trợ.
