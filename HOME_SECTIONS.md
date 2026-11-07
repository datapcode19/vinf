# Trang chủ — trạng thái triển khai

Ngày: 07/11/2026. Bản cũ được giữ tại `backups/before-homepage-rebuild/`.

| Section theo thứ tự nguồn | Trạng thái | Căn cứ và giới hạn |
|---|---|---|
| Header / mega menu | IMPLEMENTED — UNVERIFIED | Đủ 42 mẫu xe theo menu; sidebar, thumbnail, hover/click, bàn phím và mobile. Đã đo DOM header shop chính thức (84px, Mulish); chưa đối chiếu trang chủ production. |
| Hero / slide | BLOCKED | Ảnh sản phẩm đang dùng là phương án tạm. Chưa xác định được banner hero thực tế; không gọi ảnh danh mục là hero nguồn. |
| Ô tô cá nhân / dịch vụ | IMPLEMENTED — UNVERIFIED | 10 xe cá nhân, 5 xe dịch vụ; ảnh và số liệu từ trang chủ. Tabs, bộ chọn mẫu, trước/sau đã kiểm tra. |
| Xe máy cao cấp / trung cấp / phổ thông | IMPLEMENTED — UNVERIFIED | 22 mẫu, đúng ảnh riêng từng mẫu và thứ tự nội dung nguồn; đã kiểm tra cả 22 lựa chọn. |
| Hậu mãi | IMPLEMENTED — UNVERIFIED | Cả ba nội dung với ảnh showcase-bh-1/2/3. |
| Mãnh liệt vì tương lai xanh | IMPLEMENTED — UNVERIFIED | Ảnh chiến dịch nguồn, tiêu đề và nội dung diễn giải ngắn. |
| Ảnh VF 9 chuyển tiếp | IMPLEMENTED — UNVERIFIED | Sau phần tương lai xanh theo thứ tự ảnh trong nguồn. Chưa xác minh hiệu ứng cuộn/độ cao. |
| Hệ sinh thái toàn diện | IMPLEMENTED — UNVERIFIED | Ảnh bản đồ, ba icon/nội dung, liên kết showroom/trạm sạc. |
| Mua xe dễ dàng hơn | IMPLEMENTED — UNVERIFIED | Năm liên kết công cụ từ nguồn, icon chính thức; không tạo công cụ mới. |
| Nâng tầm phong cách / VF eStore | IMPLEMENTED — UNVERIFIED | Bốn ảnh đúng phụ kiện từ shop, ảnh Smart Connect từ trang chủ. Chưa xác minh ảnh/crop home trùng shop. |
| Đăng ký nhận thông tin | IMPLEMENTED — UNVERIFIED | Email + đồng ý, validation; mô phỏng không gửi/lưu. |
| Footer | IMPLEMENTED — UNVERIFIED | Logo, doanh nghiệp, chính sách, tin tức, hệ sinh thái. Email/icon mạng xã hội nguồn chưa xác minh đầy đủ. |
| Thành phần nổi theo thời điểm | BLOCKED | Nội dung đọc được chứa chương trình đã hết hạn; chưa xác nhận còn hiển thị, không đưa lên như ưu đãi hiện tại. |

Nguồn nội dung: https://vinfastauto.com/vn_vi. Thứ tự được xác minh qua công cụ đọc web; bố cục, độ cao và responsive của thân trang chưa có screenshot production để đối chiếu. Không section nào được gắn COMPLETED.

Khảo sát tự động: production Việt/Anh, sitemap gốc và hai sitemap khai báo trong robots đều trả 403 hoặc không đọc được. Trang tham chiếu khác được tìm kiếm lập chỉ mục bị timeout; không vượt hạn chế. robots.txt và shop chính thức đọc được. Log: `research/current/`. Screenshot shop có ảnh tải lỗi; không coi là screenshot trang chủ.

Ảnh cục bộ: `tests/home-visual/home-{1440,1366,768,390}.png`, menu/footer và từng section. Đã xem ảnh để sửa khoảng trắng phụ kiện và dải chọn mẫu xe dài. Các viewport không tràn ngang, không lỗi JS. Kiểm thử mới: `tests/home-visual/interactions.json`.

Manifest: `assets/manifest.json` (70 tài sản: 69 ảnh, 1 font), có nguồn, vai trò, quyền và kích thước. Mulish kèm SIL Open Font License tại `assets/fonts/OFL.txt`. Ảnh dùng theo xác nhận quyền dùng cho đồ án học tập của người dùng.

Các trang con hiện hữu được giữ nguyên. Chưa mở rộng sang trang con mới khi hero và đối chiếu trang chủ vẫn BLOCKED, theo thứ tự ưu tiên đã yêu cầu.
