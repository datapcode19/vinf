# Giai đoạn 1 — đang thực hiện

> Cập nhật mới hơn: [12 URL trang phụ](SUPPORT_PAGES_STATUS.md), 17 PARTIAL / 65 NOT STARTED trong kiểm kê header/footer. Những số 9/73 và giới hạn bên dưới giữ làm lịch sử trước lần bổ sung này.

Cập nhật 08/11/2026. **Chưa chuyển sang giai đoạn 2 hoặc 3.**

- Đã bỏ phần tử `.notice` khỏi JavaScript và CSS thừa. Footer giữ thông báo mô phỏng.
- Header/logo/mega menu/footer dùng chung cho các entrypoint. Hover, click, Escape, click ngoài, mobile và bàn phím tabs; chuyển động ngắn tắt theo reduced motion. Chưa xác minh animation nguồn.
- `js/routes.js` ánh xạ liên kết nguồn sang URL cục bộ, giữ prefix `/vinf/`. Các trang thiếu dẫn đến thông báo **chưa triển khai**, không được tính là trang hoàn thành. Các liên kết hệ sinh thái ngoài phạm vi vẫn mở ngoài.
- VF 3: hero đúng nguồn, Eco/Plus, ảnh phiên bản, gallery 4 ảnh, nội thất, tabs thông số, khối hệ sinh thái, CTA mô phỏng. **PARTIAL**: thiếu bộ màu đầy đủ, công cụ chi phí, brochure, form tư vấn gốc; bố cục chưa đối chiếu production.
- Kinet: giữ 5 màu; thêm ảnh hero, bảo hành, thiết kế và 4 khối trang bị. **PARTIAL**: chưa đầy đủ bảng thông số và bố cục/hiệu ứng nguồn.
- Cứu hộ ô tô: mục lục, 2 ảnh chính thức, nội dung dịch vụ/eCall/hỗ trợ. **PARTIAL**: chưa có tài liệu ứng phó từng xe, chưa đối chiếu bố cục.
- Bản cũ được giữ trong `backups/before-shared-navigation/`.

## Kiểm chứng và giới hạn

- `tests/phase-one.cjs`: kiểm tra các entrypoint dưới `/vinf/` tại 1920, 1440, 1366, 1024, 768, 390, 375px; ảnh, overflow, lỗi JS, URL cục bộ; tương tác VF 3/VF 6/Kinet/bảo hành và refresh/Back/Forward.
- `tests/home-interactions.cjs`: 8 nhóm trang chủ, gồm 37 lựa chọn xe. Kết quả ở `tests/home-visual/interactions.json`.
- Screenshot và kết quả mới: `tests/phase-one/index.html`, `results.json`. Ảnh cũ trong `tests/home-visual` là lịch sử trước lần đồng bộ header.
- Kiểm tra **site thật trên GitHub Pages**: trang chủ và VF 6 trả 200 ở 1440/390px; VF 3 trả 404. Log `research/current/live-pages.json`. Đây là bản đã xuất bản trước thay đổi cục bộ; chưa push thay đổi mới.
- Tài sản: `assets/manifest.json`, thêm 18 ảnh VF 3/Kinet/cứu hộ đúng nguồn; quyền dùng học tập theo xác nhận người dùng.

## Còn thiếu — không được coi là đã clone

1. Hero trang chủ vẫn dùng ảnh sản phẩm tạm; chưa lấy được hero chiến dịch thực tế. **BLOCKED ở cấp section**.
2. Đối chiếu screenshot production desktop/mobile vẫn bị chặn; không có trang VERIFIED COMPLETE.
3. `URL_COVERAGE.md`: 82 đích duy nhất từ header/footer hiện có; 9 PARTIAL, 73 NOT STARTED. Không phải toàn bộ sitemap; chưa bao gồm tất cả CTA thân trang. Trang trạng thái không làm tăng độ bao phủ triển khai.
4. Còn nhiều trang sản phẩm, giới thiệu, bảo dưỡng, sửa chữa, pin xe máy, phụ kiện và chính sách chưa dựng; không quy toàn bộ các trang này thành BLOCKED. Nguồn văn bản bảo dưỡng/giới thiệu đã đọc được nhưng chưa triển khai.
5. Chưa đo độ tương đồng, Core Web Vitals hoặc thử Firefox/Safari. Không đưa tỷ lệ giống hay tuyên bố toàn website PASS.

Tiếp tục giai đoạn 1: hoàn thiện nội dung/section còn thiếu theo nguồn hợp lệ, ưu tiên trang chủ và các nhánh menu; hoàn thiện từng trang trước khi mở rộng dữ liệu toàn bộ xe.
