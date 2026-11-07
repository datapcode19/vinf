> Cập nhật 08/11/2026: xem [trạng thái giai đoạn 1](PHASE_1_STATUS.md) và [độ bao phủ URL](URL_COVERAGE.md). Các ghi nhận bên dưới là lịch sử; không thay thế kết quả mới. Giai đoạn 1 chưa hoàn thành.

Kết quả mới: **84 tổ hợp (12 URL × 7 viewport), 94 URL liên kết cục bộ, không tràn ngang/ảnh lỗi/lỗi JS trong các lượt đã chạy**. Có 34 screenshot tại `tests/phase-one/index.html`. Kiểm thử tương tác VF 3, VF 6, 5 màu Kinet, accordion, refresh/Back/Forward và menu/reduced motion đạt; trang chủ 8/8 nhóm đạt. Đã xem trực quan VF 3 desktop/mobile, Kinet mobile, cứu hộ desktop và trang chủ tablet. Không suy ra tương đồng nguồn từ các kết quả này.

GitHub Pages được kiểm tra riêng: home/VF 6 HTTP 200, VF 3 HTTP 404 vì chưa xuất bản bản mới. Chi tiết `research/current/live-pages.json`. Chưa push.

# Báo cáo kiểm thử thực tế

> Lần dựng lại thân trang: kiểm tra mới ở `tests/home-visual/results.json`, `interactions.json`; 8/8 nhóm tương tác đạt, gồm 37 lựa chọn xe, menu, bàn phím, nhận tin mô phỏng và điều hướng. 70 tài sản được đọc kiểm tra; ảnh và font chạy cục bộ. Đã sửa lỗi dải chọn xe dài và chiều cao ảnh phụ kiện qua kiểm tra trực quan. Các kết quả dưới đây giữ làm lịch sử, không được dùng để khẳng định giao diện mới khớp production.

> Cập nhật giai đoạn ưu tiên trang chủ: kết quả mới ở `tests/home-visual/results.json` và ảnh ở `tests/home-visual/`. Đã chụp trang chủ/menu/footer ở 1440, 1366, 768, 390px; không tràn ngang hoặc lỗi JS. Chưa có screenshot nguồn để đối chiếu, chưa section nào được xác nhận clone xong. Kết quả 16/16 bên dưới là lịch sử trước lần sửa menu/footer, không chứng minh giao diện hiện tại khớp nguồn.

Ngày: 07/11/2026. Công cụ: Playwright + Chromium có sẵn; HTTP static server tạm, chỉ phục vụ file cục bộ. Server được đóng sau kiểm thử. Lệnh: `node tests/browser.cjs`. Exit code lần cuối: **0**.

## Kết quả

**16/16 nhóm kiểm tra PASS.** Chi tiết máy đọc được: `tests/results.json`.

| Nhóm | Trạng thái | Phạm vi đã trực tiếp chạy |
|---|---|---|
| Trang chủ, slider, tabs | PASS | Sau/trước vòng qua biên; ArrowRight chuyển tab và panel |
| Menu desktop | PASS | Mở nhóm và cấp con, Escape, click ngoài |
| VF 6 | PASS | Plus cập nhật 699 triệu, 460 km và bảng thông số |
| Kinet | PASS | Click cả năm màu; ảnh decode được; alt, nhãn và trạng thái chọn khớp |
| Accordion | PASS | Enter mở, Space đóng |
| Tìm kiếm/lọc | PASS | `vf6`, refresh, truy vấn không khớp có dấu `< >`, reset, nhóm và phân khúc |
| So sánh | PASS | Bảng hai xe, thông báo trùng xe, cột WLTP |
| Form/modal | PASS | Thiếu trường, ngày quá khứ, dữ liệu hợp lệ, Escape đóng, reset; storage/cookie rỗng |
| Điều hướng | PASS | Liên kết trang chủ → VF 6, reload, Back/Forward |
| 404 | PASS | ID sản phẩm sai và trang `404.html` |
| Responsive 1440px | PASS | 9 trạng thái trang; không tràn ngang, ảnh tải, liên kết nội bộ phản hồi 200 |
| Responsive 1366px | PASS | Như trên |
| Responsive 768px | PASS | Như trên |
| Responsive 390px | PASS | Như trên |
| Mobile menu | PASS | Mở menu/cấp con, vào Kinet, Escape, resize desktop dọn trạng thái |
| Console và mạng | PASS | Không có `pageerror`; không có yêu cầu mạng ra ngoài origin trong các luồng đã chạy |
| Cú pháp JS | PASS | `node --check` cho 8 module runtime |
| So sánh screenshot với giao diện gốc | BLOCKED | Trình duyệt nguồn chỉ thấy màn hình tải/chống tự động hóa; không có cặp ảnh hợp lệ |
| Firefox, Safari, thiết bị cảm ứng thật | NOT TESTED | Chỉ Chromium trong môi trường hiện tại |
| Screen reader / kiểm toán accessibility đầy đủ | NOT TESTED | Mới kiểm tra một số thao tác bàn phím và thuộc tính DOM |
| Toàn bộ trang VinFast | NOT TESTED | Ngoài các trang đã dựng; danh sách thiếu ở `SITE_MAP.md` |

## Screenshot

36 ảnh tại `tests/screenshots/{width}-{index}.png`. Viewport cao 900px, full-page capture.

| Index | Trang |
|---|---|
| 0 | Trang chủ |
| 1 | Danh mục |
| 2 | VF 6 |
| 3 | Kinet |
| 4 | Bảo hành |
| 5 | Pin ô tô |
| 6 | So sánh |
| 7 | Form lái thử |
| 8 | 404 |

Đã xem trực tiếp ảnh trang chủ desktop và Kinet mobile. Phát hiện chữ trắng banner thiếu tương phản, đã thêm gradient, chạy lại toàn bộ bộ kiểm tra và tạo lại ảnh. Không xem thủ công toàn bộ 36 ảnh, không suy ra điểm giống bản gốc từ ảnh cục bộ.

## Lỗi kiểm thử đã giải quyết

Hai lần trước kiểm tra resize mobile bị FAIL do locator mặc định không tìm nút ẩn ở desktop, sau đó kiểm tra trạng thái quá sớm trước callback `matchMedia`. Sửa bộ kiểm thử để cho phép truy vấn phần tử ẩn và đợi trạng thái thực tế. Lần cuối xác nhận trạng thái đóng đúng; không nới điều kiện mong đợi.

## Giới hạn

- PASS áp dụng cho tình huống đã chạy, không bảo đảm mọi trường hợp của browser hay mọi URL gốc.
- Bốn kích thước không tràn ngang ở cấp tài liệu. Bảng so sánh mobile có vùng cuộn ngang chủ động.
- Bộ kiểm thử đọc tất cả liên kết nội bộ đang render; không tự suy ra các nhánh chưa triển khai.
- 404 HTML có giao diện hoạt động; phản hồi HTTP của đường dẫn bất kỳ phụ thuộc cấu hình static host. Không tuyên bố đã cấu hình fallback cho VS Code Live Server.
- Validation ngày >30 ngày có `max` trong code và hướng dẫn kiểm thử thủ công, nhưng kịch bản tự động lần này mới thử ngày quá khứ và ngày hợp lệ.

## Thống kê phạm vi

- Đọc nội dung tham chiếu: **5 trang**; kiểm thử tương tác trực tiếp trên nguồn thành công: **0 trang**.
- Bản dựng: **8 HTML entrypoint / 9 trạng thái trang**; có template chi tiết cho **2 mẫu xe** và dữ liệu danh mục **13 mẫu**.
- Kiểm thử cục bộ: **9 trạng thái × 4 viewport**, cộng luồng tương tác nêu trên.
- Trong 36 mẫu có liên kết nội bộ được nhận diện ở menu tham chiếu (10 cá nhân, 4 dịch vụ, 22 xe máy), còn **34 trang chi tiết chưa dựng**. Các nhánh thông tin/hậu mãi/footer còn thiếu ghi riêng ở sitemap; tổng số toàn website chưa chốt do không crawl được trình duyệt trực tiếp.
- Độ tương đồng thị giác: **chưa đo, chưa xác nhận**. Không đạt tiêu chí hoàn thành clone toàn bộ theo đề bài đính kèm.
