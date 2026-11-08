# Kiểm toán sai lệch — 08–09/11/2026

## Kết luận và giới hạn bằng chứng

Đây là lượt sửa mã thực tế, **không phải xác nhận clone hoàn chỉnh**. Không dùng PASS chức năng để suy ra độ tương đồng. Không đo tỷ lệ giống hoặc tuyên bố pixel-perfect.

- Đã đọc `HOME_SECTIONS.md`, `PHASE_1_STATUS.md`, `URL_COVERAGE.md`, `SITE_MAP.md`, `TEST_REPORT.md` và kiểm tra lại code.
- Chromium truy cập trực tiếp `https://vinfastauto.com/vn_vi` nhận **403**. Dừng tại đó, không vượt cơ chế bảo vệ. `research/comparison/source-*.png` là ảnh phản hồi bị chặn, **không phải screenshot thiết kế nguồn**.
- Công cụ đọc web vẫn trả nội dung công khai của [trang chủ](https://vinfastauto.com/vn_vi), [VF 5](https://vinfastauto.com/vn_vi/dat-coc-xe-dien-vf5), [Viper](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-viper). Dùng để xác minh thứ tự nội dung, số liệu, URL ảnh và liên kết; không suy ra CSS/responsive từ văn bản.
- Ảnh chụp màn hình người dùng đã cung cấp là bằng chứng cho cấu trúc desktop của carousel xe máy và phần mở đầu hậu mãi. Không có ảnh nguồn đầy đủ cho các section khác/mobile.
- Đã chụp bản GitHub Pages và cục bộ ở 1440/390; bản cục bộ còn kiểm tra 1366/768/375. Không có cặp screenshot clone–production hợp lệ để đo pixel.

## Kiểm kê từng section từ trên xuống

Trong bảng: **nội dung xác minh** = công cụ đọc web/ảnh người dùng; **UNVERIFIED** = chưa có bằng chứng thiết kế, không đồng nghĩa không tồn tại. Thứ tự bên dưới sau hero khớp thứ tự nội dung nguồn đọc được.

| Section | Tồn tại / thứ tự | Nội dung và ảnh | Kích thước, font, khoảng cách, căn lề | Tương tác / responsive | Xử lý |
|---|---|---|---|---|---|
| Header / mega menu | Xác minh tên nhóm và menu | Menu xe máy đang hiện tốc độ thay cho giá; xe ô tô hiện phân khúc thay cho số chỗ/mô tả. Đã sửa. Thiếu ảnh một số xe xăng/EBus. | Font Mulish đang dùng; thông số header lịch sử lấy từ shop, không phải bằng chứng trang chủ. Kích thước nguồn UNVERIFIED. | Hover/click, Escape, bàn phím, tap cục bộ hoạt động; hành vi nguồn UNVERIFIED. | Sửa metadata đúng ngữ cảnh; giữ bố cục hiện hữu, không tự thay cấu trúc menu chưa quan sát. |
| Hero trang chủ | Không xác minh được chiến dịch đang hiển thị | VF 6/VF 8 hiện là ảnh tạm. Công cụ đọc nội dung không cung cấp hero đủ căn cứ. | Toàn bộ UNVERIFIED. | Swipe cục bộ kiểm thử; hiệu ứng nguồn UNVERIFIED. | Giữ BLOCKED; không lấy hero VF 5 của trang con gắn sai vào home. |
| Carousel ô tô | 10 cá nhân + 5 dịch vụ, đúng thứ tự văn bản nguồn | Giá VF 9 đang ghi 1300 triệu; sửa thành 1,3 tỷ. Giữ dữ liệu home theo ngữ cảnh, không trộn thông số trang chi tiết. | Bỏ tên xe lớn lặp dưới ảnh; hàng thông số/giá/CTA dựa cấu trúc ảnh người dùng. Kích thước pixel nguồn UNVERIFIED. | 37 lựa chọn chung vẫn kiểm thử; swipe ảnh + thông số cùng một scene. Mobile layout cục bộ kiểm thử, nguồn UNVERIFIED. | Thu gọn chiều cao bằng cấu trúc, không kéo/crop xe. VF 5 dẫn đến trang thật cục bộ. |
| Carousel xe máy | 3 nhóm, 22 xe, thứ tự đúng | Sửa đơn vị `km/lần sạc`; chuyển điều kiện 2 pin sang nhãn, tránh chuỗi sai `262 (2 pin) km`. Giá trong menu tách khỏi thông số home. | Stats trái, giá/CTA phải; nền nhạt trên/trắng dưới theo ảnh người dùng. Font/khoảng cách chính xác UNVERIFIED. | Vuốt dùng chung 250 ms; không tuyên bố thời lượng này lấy từ nguồn. Mobile UNVERIFIED về thiết kế. | Bỏ heading xe lặp, giữ accessible name; Viper có trang riêng. CTA chi tiết vẫn là điều hướng mô phỏng, không giao dịch thật. |
| Hậu mãi | Tồn tại sau xe máy; 3 thẻ đúng thứ tự | Khôi phục đoạn mở đầu từ ảnh người dùng và mô tả ngắn đã đối chiếu. 3 ảnh showcase đúng nguồn. | Liên kết nền nhạt theo ảnh người dùng. Đoạn đầy đủ làm section cao hơn bản tóm tắt. Kích thước chính xác UNVERIFIED. | Link ô tô/xe máy về trang bảo hành cục bộ; mobile không tràn. | Sửa nội dung, bố cục liên kết; không tự đổi ảnh. |
| Tương lai xanh | Tồn tại, thứ tự xác minh | Ảnh chiến dịch đúng URL; đoạn văn còn tóm tắt, chưa trùng toàn văn. | Chiều cao/crop/font/spacing UNVERIFIED. | Hiệu ứng cuộn cục bộ, nguồn UNVERIFIED. | Giữ ảnh; ghi rõ sai lệch văn bản còn lại. |
| Ảnh VF 9 chuyển tiếp | Có sau tương lai xanh theo luồng nội dung | Đúng tài sản VF 9 top-view | Độ cao/crop/parallax UNVERIFIED, chưa sửa theo suy đoán. | Không có carousel; không thêm swipe. | Giữ nguyên. |
| Hệ sinh thái | Tồn tại, 3 nội dung/icon + ảnh bản đồ | Đúng ảnh/icon; văn bản tóm tắt, số lượng cổng sạc/tủ pin có căn cứ. Chưa khớp toàn văn. | Hình học, font, khoảng trắng, vị trí bản đồ nguồn UNVERIFIED. | Link showroom còn là trang thiếu; không coi hoàn thành. | Không thay ảnh đúng bằng ảnh khác; ghi thiếu bản đồ/trang tra cứu. |
| Công cụ mua xe | 5 công cụ, đúng thứ tự | Tên/link đối chiếu được; đoạn mở đầu tóm tắt. Icon cục bộ có nguồn. | Grid, kích thước icon, spacing nguồn UNVERIFIED. | Lái thử/so sánh có mô phỏng; các công cụ chi phí còn thiếu. | Không tự tạo công thức tài chính hoặc công cụ ngoài phạm vi. |
| Phụ kiện | 4 sản phẩm đúng thứ tự | Ảnh từ shop có quyền dùng; crop ảnh home chưa đối chiếu. Nguồn home dẫn về danh mục phụ kiện, clone dẫn chi tiết từng món. | Chiều rộng/spacing/grid nguồn UNVERIFIED. | Đã đưa link home về danh mục cục bộ; từ danh mục vẫn vào chi tiết được. | Sửa đích link, giữ nội dung/ảnh hiện có. |
| VF eStore | Đúng vị trí sau phụ kiện | Ảnh Smart Connect và URL đúng; heading bổ sung của clone chưa được xác minh. | Bố cục ảnh/text, khoảng trắng UNVERIFIED. | Trang eStore còn thiếu, CTA vẫn vào trang thiếu có ghi rõ. | Không tự dựng giao diện gói trả phí khi thiếu đối chiếu. |
| Nhận thông tin | Tồn tại trước footer | Email/checkbox có trên nguồn; bản clone giữ thông báo và xử lý mô phỏng. | Font, kích thước, căn lề, responsive nguồn UNVERIFIED. | Validation cục bộ có kiểm thử; không gửi dữ liệu thật. | Giữ chức năng hiện hữu, ghi khác biệt chủ ý. |
| Footer | Nhóm doanh nghiệp/chính sách/dịch vụ/hệ sinh thái có trên nguồn | Thông tin doanh nghiệp đang rút gọn; email bị che ở bộ đọc, social links chưa xác minh. Hotline xác minh được. | Số cột, khoảng trắng, font nguồn UNVERIFIED. | Thêm `tel:` cho hotline; nhiều trang chính sách vẫn NOT STARTED. | Không bịa email/social hoặc sao chép trạng thái “website thử nghiệm” vào clone. |

## Kích thước cục bộ trước/sau (không phải đo nguồn)

| Section | 1440px trước → sau | 390px trước → sau |
|---|---:|---:|
| Carousel ô tô | 935 → 765px | 700 → 652px |
| Carousel xe máy | 935 → 765px | 700 → 652px |
| Hậu mãi | 696 → 775px | 1393 → 1543px |

Chiều rộng, chiều cao, font và nội dung từng section được ghi tại `tests/comparison/{before,after}/results.json`. Ảnh toàn trang và ảnh từng section tại cùng thư mục. Các section không đủ bằng chứng được giữ nguyên thay vì tự thiết kế lại.

## Hai trang chi tiết mới — PARTIAL, không đánh dấu hoàn chỉnh

- **VF 5** (`pages/vf5.html`): hero đúng URL trang VF 5; ảnh màu trắng; gallery ghế sau/cốp/ngoại thất; ảnh đầu/đuôi/la-zăng; nội thất; bảng kích thước/pin/trang bị; liên kết lái thử có chọn đúng mẫu. Còn thiếu 5 màu và điều khiển màu đầy đủ, 2 ảnh gallery còn lại, công cụ chi phí, brochure/form tư vấn, đối chiếu CSS nguồn. Nguồn ghi đơn vị công suất mơ hồ “100 kW/hp”; không tự sửa thành một giá trị phỏng đoán.
- **Viper** (`pages/viper.html`): ảnh hero riêng; 4 màu với swipe và chọn màu đồng bộ; thông số có điều kiện thử; bảo hành xe/pin; pin phụ; 4 ảnh trang bị; bảng kích thước/pin/kết nối. Còn thiếu bố cục chiến dịch đầy đủ, một số ảnh/tính năng, form tư vấn, đối chiếu CSS nguồn.
- Menu, home và danh mục dẫn tới các trang mới. URL giữ chỗ cũ của các trang đã triển khai chuyển tới trang thật; trang thiếu khác vẫn giữ thông báo rõ ràng.
- 18 ảnh bổ sung có URL gốc và xác nhận quyền dùng đồ án của người dùng trong `assets/vf5/manifest.json`, `assets/viper/manifest.json`; không suy rộng thành quyền thương mại. Manifest tổng kiểm tra 125 tài sản.
- Kiểm kê header/footer hiện tại: **19 PARTIAL / 63 NOT STARTED / 0 VERIFIED COMPLETE**. Mỗi dòng thiếu nằm trong `URL_COVERAGE.md`; `reference.html` không tính là triển khai. VF 2, VF 7, VF MPV 7, VF 8, VF 8 mới, VF 9, VF Wild, các xe dịch vụ và phần lớn xe máy còn thiếu trang riêng.

## Bản GitHub Pages khác workspace

Kiểm tra trực tiếp ngày 09/11/2026 (`research/comparison/live-paths-final.json`):

| Đường dẫn | HTTP |
|---|---:|
| `/vinf/index.html` | 200 |
| `/vinf/pages/vf3.html` | 200 |
| `/vinf/pages/product.html?id=kinet` | 200 |
| `/vinf/js/swipe.js` | **404** |
| `/vinf/pages/vf5.html` | **404** |
| `/vinf/pages/viper.html` | **404** |

Các sửa nằm trong workspace; chưa xuất bản. Không thay Git author/lịch sử, không force push. Screenshot live lưu ở `research/comparison/live-{1440,390}.png`. Đây là bằng chứng deployment thiếu file, không phải lỗi có thể sửa chỉ bằng CSS trên bản live cũ.

## Kiểm thử thực tế của lượt sửa

- `node tests/comparison-local.cjs before`: 5 viewport, baseline trước sửa.
- `node tests/comparison-local.cjs after`: **15/15** tổ hợp (home/VF 5/Viper × 1440/1366/768/390/375), ảnh decode, không tràn ngang/JS error; chụp toàn trang và từng section home.
- `node tests/comparison-interactions.cjs`: kết quả mới trong `tests/comparison/interactions.json`; màu Viper, gallery VF 5, thông số riêng, menu metadata, link CTA, mounted paths.
- `node tests/home-interactions.cjs`: **8/8** nhóm đạt, gồm 37 lựa chọn xe, menu, tab, form, link nội bộ.
- `node tests/swipe-edge.cjs`: **5/5** trường hợp đạt: ảnh chậm, hủy touch, kéo CTA, liên tiếp, đồng bộ xe máy.
- `node tests/swipe.cjs`: kết quả mới trong `tests/swipe/results.json`; chuột và Chromium CDP touch được kiểm thử riêng. Không gọi click chuột là kiểm thử cảm ứng.
- Chưa thử thiết bị vật lý, Safari/Firefox, hoặc tương tác live VinFast do 403. Không có kiểm thử nào bên trên chứng minh độ giống pixel.

## File triển khai chính

`js/home.js`, `js/home-chrome.js`, `css/home.css`, `data/home-products.js`, `data/products.js`, `js/routes.js`, `js/reference.js`, `js/app.js`, `js/vf5.js`, `js/viper.js`, `pages/vf5.html`, `pages/viper.html`, `css/verified-products.css`, `assets/vf5/`, `assets/viper/`, manifest và các script kiểm thử/khảo sát tương ứng.
