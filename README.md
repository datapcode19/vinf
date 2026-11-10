# VinFast — Bản mô phỏng đồ án

Ngày 10/11/2026: bổ sung trang Evo Grand Premia, Evo Grand, VF 7, VF 8, VF 9; mở rộng gallery VF 5/VF 6, ảnh riêng Eco/Plus của VF 6, ảnh danh mục còn thiếu và mũi tên SVG cho carousel trang chủ. Đây vẫn là bản mô phỏng đang hoàn thiện, không phải bản sao đầy đủ website VinFast.

Frontend HTML5, CSS3, JavaScript ES6 modules. Không framework, không backend, không npm/build cho runtime, không gửi form tới dịch vụ thật.

## Chạy

1. Mở thư mục dự án trong VS Code.
2. Dùng Live Server mở `index.html`.
3. Duyệt menu để tới trang con. Không mở bằng `file://` vì ES modules cần HTTP.

Có thể dùng bất kỳ HTTP static server nào. Với đường dẫn không tồn tại, cấu hình host trả `404.html` nếu muốn trang lỗi tùy chỉnh; Live Server không tự bảo đảm điều này.

## Đã có

- Trang chủ; các trang VF 3, VF 5, VF 6, VF 7, VF 8, VF 9, Kinet, Viper, Evo Grand và Evo Grand Premia; trang giới thiệu, phụ kiện, hậu mãi, bảo hành, pin và các biểu mẫu mô phỏng.
- Menu desktop/mobile, tab, accordion; module swipe dùng chung hỗ trợ cảm ứng, chuột và reduced motion. Premia có 3 màu, Evo Grand 4 màu, Kinet 5 màu, Viper 4 màu; VF 6/7/8/9 đổi ảnh và thông số theo phiên bản. Gallery VF 5/6/8/9 có 5 ảnh mỗi mẫu, VF 7 có 4 ảnh.
- Danh mục tĩnh, tìm kiếm/lọc, so sánh xe và đăng ký lái thử mô phỏng.
- 197 ảnh và 1 font đã kiểm tra trong manifest; tài sản runtime tải từ dự án, không phụ thuộc CDN.
- Nhãn học thuật trên mọi trang. Không thu thập thông tin cá nhân.

## Đọc tài liệu

- `tests/reconstruction/results.json`: kết quả kiểm tra toàn bộ entrypoint hiện có, viewport, kích thước section, liên kết và các route còn giữ chỗ.
- `tests/reconstruction/`: screenshot local tại 1440×900, 1366×768, 768×1024 và 390×844; không phải bằng chứng khớp pixel với nguồn.
- `research/comparison/product-access.json`: kết quả truy cập trình duyệt nguồn.
- `assets/manifest.json`: nguồn ảnh và giới hạn quyền sử dụng.

## Cấu trúc

`index.html`, `pages/`, `404.html`: entrypoint tĩnh. `js/`: logic chia theo chức năng. `data/`: dữ liệu tĩnh. `css/`: responsive CSS. `assets/`: ảnh. `research/`: công cụ/ghi chép khảo sát. `tests/`: công cụ phát triển, không được import vào frontend.

## Kiểm thử phát triển

Các script dùng Playwright có sẵn trên máy hiện tại, mở HTTP server tạm ở loopback với đường dẫn `/vinf/`. Đường dẫn `require` Playwright cần chỉnh nếu chạy trên máy khác. Website không cần Node hay Playwright khi chạy qua Live Server hoặc GitHub Pages.

Lượt kiểm thử ngày 10/11/2026: 120 tổ hợp trang/viewport, 102 liên kết nội bộ và các nhóm tương tác tại cả 4 viewport đều đạt; không ghi nhận lỗi JavaScript, ảnh thiếu hoặc tràn ngang. Còn 59 route giữ chỗ, không tính vào mức độ hoàn thiện. Kéo chuột VF 7/8/9 được kiểm tra thêm ở 375px, 430px và 1440px. Kết quả này xác nhận hoạt động local, không xác nhận giống pixel với website nguồn.

```sh
npm ci
npm run format
npm run format:check
node tests/reconstruction.cjs
node tests/home-interactions.cjs
node tests/comparison-interactions.cjs
node tests/swipe.cjs
```

Giữ mã nguồn dễ đọc với Prettier, 2 spaces. Không minify. `node_modules` chỉ phục vụ phát triển, không cần đưa lên GitHub Pages. Không thay đường dẫn tương đối bằng đường dẫn tuyệt đối từ `/`.

## Tình trạng đồ án

**Chưa hoàn thành toàn bộ phạm vi.** Trình duyệt trực tiếp nhận HTTP 403 ở trang chủ và cả 6 trang sản phẩm đã kiểm tra. Công cụ đọc web cung cấp nội dung/URL ảnh công khai nhưng không cung cấp computed styles; không tuyên bố đã so sánh pixel, đo nút hoặc breakpoint từ nguồn.

Hero trang chủ còn tạm; bộ màu đầy đủ của các trang ô tô, công cụ tính chi phí và nhiều route `reference.html` còn thiếu. Các trang sản phẩm đã dựng vẫn chưa khớp toàn bộ bố cục nguồn. VF 7 tách thông số Eco, Plus FWD và AWD, nhưng chưa có ảnh riêng để chọn AWD. Form tư vấn/đặt cọc chính thức được thay bằng tương tác mô phỏng, không gửi dữ liệu. Danh sách route giữ chỗ nằm trong kết quả kiểm thử JSON và không được tính là trang đã hoàn thiện dù HTTP 200. Cảm ứng được kiểm tra bằng Chromium/CDP, chưa kiểm tra trên điện thoại thật.

Nguồn sản phẩm mới: [Evo Grand Premia](https://vinfastauto.com/vn_vi/xe-may-dien-evo-grand-premia), [Evo Grand](https://vinfastauto.com/vn_vi/xe-may-dien-evo-grand), [VF 5](https://vinfastauto.com/vn_vi/dat-coc-xe-dien-vf5), [VF 6](https://vinfastauto.com/vn_vi/dat-coc-xe-dien-vf6), [VF 7](https://vinfastauto.com/vn_vi/dat-coc-xe-dien-vf7), [VF 8](https://vinfastauto.com/vn_vi/dat-coc-xe-vf8), [VF 9](https://vinfastauto.com/vn_vi/dat-coc-xe-vf9). Manifest lưu URL từng ảnh và quyền sử dụng cho đồ án do người dùng xác nhận. Thay đổi trong workspace chưa được xuất bản bởi lượt làm việc này.
