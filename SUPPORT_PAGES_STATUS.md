# Trang phụ — cập nhật 08/11/2026

Giai đoạn 1 tiếp tục. 12 URL mới có nội dung; chưa gọi là clone hoàn chỉnh.

| URL cục bộ | Nội dung/tương tác đã dựng | Giới hạn |
|---|---|---|
| `pages/about.html` | Giới thiệu, 4 định hướng, nhà máy, timeline tabs, giải thưởng | Timeline/giải thưởng còn tóm tắt; layout chưa đối chiếu |
| `pages/vingroup.html` | Lịch sử, 3 lĩnh vực, hệ sinh thái, 6 tabs giá trị | Nội dung diễn giải ngắn; layout chưa đối chiếu |
| `pages/maintenance.html` | 3 nhóm xe, 6 bảng ảnh lịch bảo dưỡng, ưu điểm, quy trình accordion, hỗ trợ | Chưa đủ lịch cho mọi mẫu; điều khiển chọn bảng là triển khai riêng |
| `pages/repair.html` | Quy trình, tabs sửa chữa/đồng sơn, thời gian, phụ tùng, hỗ trợ | Chưa đầy đủ điều kiện chính sách |
| `pages/scooter-battery.html` | Lợi ích, trả trước/trả sau, accordion, thông tin sạc | Chưa đầy đủ biểu phí lịch sử và thông số trạm |
| `pages/scooter-warranty.html` | Phạm vi, thời hạn, giới hạn, phụ tùng, loại trừ, FAQ | Bản tóm tắt; chưa có đủ sổ bảo hành/tài liệu |
| `pages/service-booking.html` | Chọn nhóm xe/dịch vụ/ngày, validation và reset | Mô phỏng an toàn; không thu thông tin liên hệ, không tạo lịch thật |
| `pages/accessories.html` | 4 phụ kiện, tabs nhóm, liên kết chi tiết | Chưa bao phủ toàn bộ cửa hàng |
| `pages/accessory.html?id=EEP71061000` | Tấm che pin VF 7: ảnh, giá, điều kiện phiên bản, thông số, modal | Chưa đủ gallery |
| `pages/accessory.html?id=ACS10000246` | Robot VF 9: ảnh, tên/mã, modal | Giá và thông số chi tiết chưa xác minh |
| `pages/accessory.html?id=ACS40000094` | Ô: ảnh, giá, vật liệu/kích thước, modal | Chưa đủ gallery |
| `pages/accessory.html?id=EEP69072176AB` | Sạc 3 kW: ảnh, giá, điện áp/giao diện, modal | Đối chiếu được một phần layout; ảnh nguồn tải lỗi |

Trạng thái các URL trên: **PARTIAL**. Các nút mua chỉ mở thông báo mô phỏng.

## Kiểm thử

- `node tests/support-pages.cjs`: 12 URL × 7 viewport = **84** tổ hợp đạt; **87** URL cục bộ trong phạm vi lượt kiểm tra trả thành công, không lỗi JS/request lỗi/tràn ngang.
- Kiểm tra kết quả 6 lựa chọn bảng, accordion, tabs ảnh và lịch sử, lọc nhóm phụ kiện, modal, reload/Back/Forward, form rỗng/ngày quá khứ/hợp lệ/reset. Không POST và không lưu storage.
- Đã sửa lỗi grid chứa bảng tràn ở 768px. Kết quả thất bại ban đầu giữ ở `tests/support-pages/failure.json` để truy vết; kết quả cuối ở `results.json`.
- 24 screenshot desktop/mobile: `tests/support-pages/index.html`. Đã xem bảo dưỡng desktop, phụ kiện sạc desktop/mobile, giới thiệu và bảo hành mobile.
- Trang chủ chạy lại 8/8 nhóm đạt sau thay đổi ánh xạ URL.

## Đối chiếu nguồn

Trang shop sạc 3 kW truy cập được HTTP 200 ở 1440/390px. Đã đo h1 (desktop 20px, mobile 18px), quan sát ba cột desktop và phần mô tả thu gọn mobile rồi sửa bản dựng. Chỉ 4/136 và 2/134 ảnh nguồn tải được: không dùng pixel diff hoặc tuyên bố tương đồng toàn trang. Screenshot/log: `research/current/charger-*`.

Nguồn: `/vn_vi/ve-chung-toi`, `ve-vingroup`, `dich-vu-bao-duong-oto`, `dich-vu-sua-chua-oto`, `dich-vu-pin-xe-may-dien`, `chinh-sach-bao-hanh-xe-may-dien` trên vinfastauto.com; bốn mã phụ kiện trên shop.vinfastauto.com. 19 ảnh mới có nguồn trong manifest; tổng 107 tài sản gồm 106 ảnh và 1 font.

Kiểm kê header/footer hiện tại: **17 PARTIAL, 65 NOT STARTED / 82 đích**. Bốn chi tiết phụ kiện nằm ở CTA thân trang nên ngoài số 82 này. Vẫn còn nhiều trang thiếu; chưa chuyển sang giai đoạn mở rộng dữ liệu mọi mẫu xe. Chưa push bản mới lên GitHub Pages.
