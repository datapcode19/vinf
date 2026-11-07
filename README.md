# VinFast — Bản mô phỏng đồ án

Trạng thái mới nhất: trang chủ đã có các section ô tô, xe máy, hậu mãi, tương lai xanh, hệ sinh thái, hỗ trợ mua xe, phụ kiện/VF eStore, nhận tin và footer. Xem `HOME_SECTIONS.md`. Hero thực tế và đối chiếu production còn BLOCKED; đây chưa phải clone hoàn thành. Ảnh mới ở `tests/home-visual/`; chạy `node tests/home-visual.cjs` và `node tests/home-interactions.cjs` để kiểm tra phần trang chủ hiện tại. Bộ `tests/browser.cjs` phía dưới là bộ kiểm thử trước khi thay giao diện.

Frontend HTML5, CSS3, JavaScript ES6 modules. Không framework, không backend, không npm/build cho runtime, không gửi form tới dịch vụ thật.

## Chạy

1. Mở thư mục dự án trong VS Code.
2. Dùng Live Server mở `index.html`.
3. Duyệt menu để tới trang con. Không mở bằng `file://` vì ES modules cần HTTP.

Có thể dùng bất kỳ HTTP static server nào. Với đường dẫn không tồn tại, cấu hình host trả `404.html` nếu muốn trang lỗi tùy chỉnh; Live Server không tự bảo đảm điều này.

## Đã có

- 8 file HTML, 9 trạng thái trang kiểm thử (product có VF 6 và Kinet).
- Menu đa cấp/mobile; slider; tabs; accordion; VF 6 Eco/Plus; 5 màu Kinet.
- Danh mục tĩnh 13 mẫu; tìm kiếm/lọc; so sánh xe; form lái thử mô phỏng.
- 13 ảnh cục bộ có nguồn, không dùng CDN trong runtime.
- Nhãn học thuật trên mọi trang. Không thu thập thông tin cá nhân.

## Đọc tài liệu

- `FUNCTIONALITY_REPORT.md`: chức năng, file xử lý, cơ chế, kiểm thử và gợi ý bảo vệ đồ án.
- `SITE_MAP.md`: trang đã dựng và những nhánh còn thiếu.
- `TEST_REPORT.md`, `tests/results.json`: kết quả thực chạy.
- `assets/manifest.json`: nguồn ảnh và giới hạn quyền sử dụng.

## Cấu trúc

`index.html`, `pages/`, `404.html`: entrypoint tĩnh. `js/`: logic chia theo chức năng. `data/`: dữ liệu tĩnh. `css/`: responsive CSS. `assets/`: ảnh. `research/`: công cụ/ghi chép khảo sát. `tests/`: công cụ phát triển, không được import vào frontend.

## Kiểm thử phát triển

`node tests/browser.cjs` sử dụng Playwright có sẵn trên máy hiện tại, mở một HTTP static server tạm trên loopback và tự đóng khi xong. Đường dẫn `require` Playwright trong script là đường dẫn của môi trường thực hiện, cần sửa nếu chạy trên máy khác. Website không cần Node hay Playwright để chạy qua Live Server.

Ảnh kiểm thử lưu trong `tests/screenshots/`; không phải ảnh đối chiếu thành công với bản gốc. `research/reference-*.png` chỉ chụp màn hình tải của VinFast, không được dùng để kết luận giống thiết kế.

## Tình trạng đồ án

Đây là bản dựng chức năng có nhiều trang, **chưa phải bản clone đầy đủ website VinFast**. Đã đọc 5 trang tham chiếu qua công cụ đọc web; trình duyệt trực tiếp bị dừng ở màn hình tải/chống tự động hóa. Chưa đối chiếu thị giác được. Các trang ngoài VF 6/Kinet mới có dữ liệu danh mục hoặc chưa triển khai; xem `SITE_MAP.md`. Font hệ thống và chữ thương hiệu hiện là bản dựng, chưa xác minh typography/logo so với tham chiếu.
