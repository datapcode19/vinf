> Cập nhật 08/11/2026: xem [trạng thái giai đoạn 1](PHASE_1_STATUS.md) và [độ bao phủ URL](URL_COVERAGE.md). Các ghi nhận bên dưới là lịch sử; không thay thế kết quả mới. Giai đoạn 1 chưa hoàn thành.

| Trang phụ mới | JavaScript | Cách hoạt động và kiểm thử |
|---|---|---|
| Giới thiệu, Vingroup, dịch vụ, pin, bảo hành | `support-pages.js`, `company-pages.js`, `components.js` | Render nội dung riêng; tabs đồng bộ panel, accordion mở/đóng. Kiểm tra tabs lịch sử bằng End, tabs sửa chữa đổi đúng ảnh. |
| Bảng bảo dưỡng | `maintenance-chart.js` | Select ánh xạ 6 mẫu tới 6 ảnh nguồn; đổi ảnh/alt/liên kết cùng lúc. Kiểm tra lần lượt cả 6, ảnh decode và đường dẫn khớp. |
| Phụ kiện | `accessories.js`, `data/accessories.js` | Tabs nhóm và bốn nội dung theo ID; mô tả thu gọn trên mobile, modal mua mô phỏng. Kiểm tra nhóm sạc chỉ có một sản phẩm, điều hướng/reload/Back/Forward và Escape. |
| Đặt lịch dịch vụ mô phỏng | `support-pages.js` | HTML constraints, min ngày địa phương, preventDefault, thông báo textContent và reset. Thử rỗng/ngày quá khứ/hợp lệ; không POST/storage. |

Nguồn, giới hạn và ảnh kiểm tra mới: [SUPPORT_PAGES_STATUS.md](SUPPORT_PAGES_STATUS.md).

| Chức năng cập nhật | JavaScript | Hoạt động / kiểm thử |
|---|---|---|
| Điều hướng cục bộ | `routes.js`, `home-chrome.js` | URL dựa trên `import.meta.url`, giữ `/vinf/`; ánh xạ nguồn sang entrypoint hoặc trang trạng thái. Kiểm tra 94 URL; không coi trang trạng thái là clone. |
| Header chung | `navigation.js`, `components.js` | Không còn `.notice`; menu trên cả trang con; tabs thêm Up/Down. Kiểm tra Enter, ArrowDown, Escape và reduced motion. |
| Phiên bản VF 3 | `vf3.js` | Eco/Plus đồng bộ ảnh, giá và `aria-pressed`; kiểm tra Plus 296 triệu, ảnh Plus, reload về Eco. |
| Gallery VF 3 | `vf3.js`, `components.js` | 4 ảnh riêng, trước/sau/dots, trạng thái chỉ số. Kiểm tra ảnh thứ hai là xe đỏ; slide ẩn không nhận focus. |
| CTA đặt cọc VF 3 | `vf3.js` | Dialog chỉ báo mô phỏng, không tạo đơn hàng hoặc dữ liệu; kiểm tra mở và Escape đóng. |
| Kinet / cứu hộ | `kinet-sections.js`, `rescue.js` | Các section nội dung và ảnh nguồn; giữ bộ 5 màu Kinet, mục lục cứu hộ dùng anchor HTML. Không mô phỏng gọi cứu hộ. |

Kiểm thử mới: `tests/phase-one.cjs`, `tests/home-interactions.cjs`. Những chuyển động đang triển khai chưa được xác nhận giống hành vi nguồn.

# Báo cáo chức năng JavaScript

Ngày: 07/11/2026. Dự án chạy bằng HTML5, CSS3 và ES modules JavaScript thuần trên static server. Không có framework, backend, database, thư viện UI hoặc bước build bắt buộc.

## Phân biệt với website tham chiếu

- **Đã xác nhận từ nội dung tham chiếu:** menu nhiều nhóm xe, các mục xe cá nhân/dịch vụ, phiên bản VF 6 Eco/Plus, năm màu Kinet, liên kết nội bộ và liên kết lái thử/so sánh sang shop.
- **Bổ sung hoặc điều chỉnh cho đồ án:** tìm kiếm/lọc dữ liệu tĩnh, bảng so sánh hai mẫu, form lái thử không có thông tin cá nhân, thông báo mô phỏng, 404, bộ tabs thông tin và accordion tóm tắt. Không gọi đây là bản sao chính xác hành vi website gốc.
- **Chưa xác nhận bằng tương tác trực tiếp trên bản gốc:** cách đóng menu, bàn phím, slider, kiểu tabs/accordion, responsive và chuyển động. Trình duyệt trực tiếp chỉ thấy màn hình tải; HTML trả về dấu hiệu chống tự động hóa. Không vượt cơ chế bảo vệ. Các tính năng này được xây bằng cách triển khai độc lập, không sao chép mã nguồn.
- Banner trang chủ dùng ảnh sản phẩm VF 6/VF 3 đã được xác nhận nguồn, không phải bản sao chiến dịch hero hiện tại. Giao diện hiện là bản dựng chức năng, chưa hoàn thành toàn bộ yêu cầu clone trong đề bài đính kèm.

## Chức năng, cách hoạt động và kiểm thử

| Chức năng / phân loại | File xử lý | Cách hoạt động | Cách kiểm thử thủ công |
|---|---|---|---|
| Menu nhiều cấp; cấu trúc nhóm có trên tham chiếu, hành vi triển khai riêng | `js/navigation.js` | Header/footer dùng chung. Click nút cập nhật `aria-expanded` và `hidden`; cấp hai dùng HTML `details/summary`. Một menu cấp một mở tại một thời điểm. Click ngoài, Escape hoặc đưa focus ra khỏi header đóng menu. | Trang chủ → Ô tô → Xe cá nhân → VF 6. Mở lại rồi click vùng nội dung; mở lại rồi Escape. Tab đến menu, Enter mở và Tab đến liên kết. |
| Mobile navigation; triển khai responsive riêng | `js/navigation.js`, `css/styles.css` | Nút Menu bật lớp `is-open`. `matchMedia` dọn trạng thái khi qua mốc 1050px. Escape đóng cấp đang mở trước và trả focus về nút tương ứng. | 390px → Menu → Xe máy điện → Cao cấp → Kinet. Quay lại, mở menu rồi đổi sang 1440px: menu di động phải đóng. |
| Slider/banner; điều khiển bổ sung, nội dung hero điều chỉnh | `js/components.js` → `initSlider`, `js/app.js` → `home` | Giữ chỉ số `current`, dùng modulo để vòng từ cuối về đầu. Chỉ slide hiện tại hiển thị; liên kết trong slide ẩn không nhận focus. Nút trước/sau và 01/02 cập nhật `aria-pressed` cùng thông báo thứ tự. Không tự chạy nên không gây chuyển cảnh bất ngờ. | Trang chủ → Sau hai lần trở lại slide 1; Trước từ slide 1 về slide 2; bấm 01/02; CTA từng slide đến đúng trang. |
| Chọn phiên bản VF 6; có trên tham chiếu | `js/product.js`, `data/products.js` | Lấy đối tượng Eco hoặc Plus theo `data-version`; đồng bộ tên, giá, quãng đường và bảng thông số. Nút được chọn có `aria-pressed=true`. | `/pages/product.html?id=vf6`: Eco là 646 triệu / 485 km NEDC; Plus là 699 triệu / 460 km NEDC. Chuyển tab Thông số để kiểm tra đồng bộ. Ảnh dùng chung được ghi rõ chỉ minh họa mẫu xe. |
| Chọn màu Kinet; có trên tham chiếu | `js/product.js`, `data/products.js` | Mỗi màu ánh xạ tới một ảnh riêng. Click đổi `src`, `alt`, nhãn trạng thái, bảng thông tin và nút đang chọn. Không nhuộm ảnh bằng CSS để giả màu. | `/pages/product.html?id=kinet`: lần lượt chọn Đỏ Đen, Xám Xi Măng, Trắng Ngọc Trai, Đen Bóng, Nâu Ánh Kim. Ảnh và tên phải khớp, không có ảnh hỏng. |
| Tabs; nhóm xe có trên tham chiếu, tabs thông tin/pin bổ sung | `js/components.js` → `initTabs`, `tabsMarkup` | `role=tablist/tab/tabpanel`; `aria-controls` nối đúng panel. Chỉ tab được chọn có `tabindex=0`; Left/Right, Home/End chuyển lựa chọn và focus. | Trang chủ → Xe dịch vụ: ẩn nhóm cá nhân; bàn phím Right/Left đổi tab; Home/End tới đầu/cuối. Kiểm tra tương tự ở trang VF 6 và Pin. |
| Accordion; phần tóm tắt bổ sung | `js/components.js` → `initAccordions`, `accordionMarkup` | Nút gắn panel qua ID; click/Enter/Space đảo `aria-expanded` và `hidden`. Mỗi accordion độc lập. | Bảo hành → câu hỏi đầu → Enter mở, Space đóng. Thử câu hỏi thứ hai; nội dung phải tương ứng đúng tiêu đề. |
| Điều hướng, Back/Forward, refresh | `js/navigation.js`, `js/app.js`, các file HTML trong `pages/` | Liên kết HTML thật. Query `id` chọn sản phẩm, `group` chọn danh mục. Browser tự quản lý lịch sử; không dùng router cần server fallback. Không có `href="#"` làm nút giả. | Trang chủ → VF 6 → refresh → Back → Forward; URL phản ánh đúng trang. Mở trực tiếp URL sản phẩm từ tab mới. |
| Anchor / mục lục | `js/app.js`, `css/styles.css` | Liên kết `#scope`, `#period`, `#questions`, `#configuration` dùng hành vi HTML. `scroll-margin-top` tránh header che tiêu đề. CSS tôn trọng reduced motion. Không cần JS riêng. | Trang Bảo hành → Thời hạn; tiêu đề xuất hiện dưới header. VF 6 → Khám phá phiên bản cuộn đến bộ chọn. |
| Tìm kiếm và lọc; bổ sung | `js/catalog.js`, `data/products.js` | `filter()` kết hợp tên, nhóm, phân khúc. Chuẩn hóa dấu và khoảng trắng (`vf6` tìm được `VF 6`). `history.replaceState` ghi bộ lọc vào URL để refresh giữ kết quả. Chỉ dựng HTML từ dữ liệu tĩnh; chuỗi tìm kiếm không được chèn bằng `innerHTML`. | Danh mục → gõ `vf6`: 1 kết quả; gõ chuỗi không tồn tại: thông báo rỗng; lọc xe máy/Trung cấp: Feliz II; Xóa bộ lọc trả 13 mẫu; refresh giữ truy vấn. Nhập `<script>` chỉ là dữ liệu tìm kiếm. |
| So sánh hai xe; bổ sung | `js/compare.js` | Hai select lấy dữ liệu tĩnh của các mẫu ô tô. Đổi lựa chọn cập nhật bảng. Trùng mẫu: ẩn bảng, yêu cầu chọn khác. Không tính khoản vay/chi phí thật, không xếp hạng NEDC với WLTP. | Chọn VF 3/VF 9: hai cột đúng; chọn VF 3/VF 3: báo cần khác nhau; chọn lại khác: bảng xuất hiện. |
| Form lái thử mô phỏng; bổ sung, khác form thật | `js/forms.js` | `submit.preventDefault()`, HTML constraints và `checkValidity()` kiểm tra mẫu xe, khu vực, ngày từ hôm nay đến 30 ngày tới, checkbox xác nhận. Hiển thị lỗi cạnh trường với `aria-describedby`, focus trường lỗi đầu. Ngày dùng múi giờ cục bộ trình duyệt. Không hỏi tên, điện thoại, email, tài khoản. | Gửi rỗng: lỗi; chọn ngày quá khứ hoặc >30 ngày: lỗi; bỏ checkbox: lỗi; điền hợp lệ: dialog xác nhận mô phỏng. Mở DevTools Network/Storage để xác nhận không có POST, cookie hoặc dữ liệu lưu. |
| Modal kết quả / reset; bổ sung | `js/forms.js` | `dialog.showModal()` dùng focus trap có sẵn của trình duyệt. Nút Đóng/Escape đóng. Reset xóa dữ liệu, lỗi và thông báo; không gửi request. Nội dung kết quả dùng `textContent`. | Gửi form hợp lệ → Tab chỉ đi trong dialog; Escape đóng; Nhập lại → trường và lỗi trở về rỗng. |
| 404 / sản phẩm không có | `js/product.js`, `js/app.js`, `404.html` | ID không tồn tại hoặc không có trang chi tiết hiển thị thông báo và liên kết danh mục. Có trang 404 độc lập; phản hồi HTTP cho đường dẫn sai tùy static host. | `pages/product.html?id=unknown`: thông báo 404, không lỗi JS; `404.html`: có nút về trang chủ. |

## Giải thích ngắn khi bảo vệ đồ án

1. **DOM và sự kiện:** `querySelector` tìm phần tử; `addEventListener` đăng ký thao tác. Callback chỉ thay phần DOM liên quan.
2. **Trạng thái:** slider giữ số thứ tự; phiên bản/màu ánh xạ tới phần tử trong mảng dữ liệu. `aria-*` biểu diễn trạng thái cho công cụ hỗ trợ truy cập, còn `hidden` điều khiển hiển thị.
3. **Dữ liệu và giao diện:** `data/products.js` chứa dữ liệu; các module khác dựng giao diện và xử lý sự kiện. `Intl.NumberFormat` định dạng tiền.
4. **Tái sử dụng:** header/footer và các hàm tabs/accordion/slider dùng chung. Từng HTML chỉ chọn trang qua `data-page`.
5. **Validation:** `required`, `min`, `max` mô tả điều kiện; `checkValidity()` kiểm tra; JavaScript cung cấp thông báo và focus. Validation trình duyệt ở đây chỉ phục vụ mô phỏng, không thay thế xác thực server cho một dịch vụ thật.
6. **An toàn dữ liệu:** không có API ghi dữ liệu, storage hoặc trường thông tin cá nhân. Dữ liệu người nhập chỉ tồn tại tạm thời trong bộ nhớ/DOM.
7. **Routing:** nhiều file HTML chạy trực tiếp trên Live Server. Query string không yêu cầu cấu hình rewrite. Browser xử lý Back/Forward tự nhiên.

## Nguồn và giới hạn

- [Trang chủ và danh mục trong menu](https://vinfastauto.com/vn_vi).
- [VF 6 — phiên bản và thông số](https://vinfastauto.com/vn_vi/dat-coc-xe-dien-vf6).
- [Kinet — màu sắc và thông số](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-kinet).
- [Chính sách bảo hành ô tô](https://vinfastauto.com/vn_vi/chinh-sach-bao-hanh-oto).
- [Pin ô tô](https://vinfastauto.com/vn_vi/dich-vu-pin-oto-dien).

Ảnh đã tải cục bộ, nguồn và quyền sử dụng ghi trong `assets/manifest.json`. Người dùng xác nhận được phép dùng ảnh/logo cho đồ án học tập; không coi đó là giấy phép thương mại.

**Chưa hoàn thành:** màu VF 6, ảnh theo phiên bản VF 6, các trang chi tiết ngoài VF 6/Kinet, đầy đủ nhánh hậu mãi/pin/giới thiệu/footer, toàn bộ section và hiệu ứng riêng của mỗi trang. Không có tuyên bố đạt 99,9% tương đồng.

Kết quả kiểm thử thực tế nằm ở `TEST_REPORT.md` và `tests/results.json`; các thao tác trong bảng trên là hướng dẫn kiểm thử, không mặc định mọi biến thể đã được tự động kiểm tra.
