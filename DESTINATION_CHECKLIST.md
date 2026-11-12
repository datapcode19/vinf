# Checklist hoàn thiện trang con VinFast

Đối chiếu **12/11/2026**, trực tiếp trong workspace local. **Không commit, push hoặc deploy.**

## Định nghĩa trạng thái

- **COMPLETE**: nội dung riêng có nguồn và chức năng cục bộ phù hợp mục đích trang, đã kiểm tra giao diện/ảnh/liên kết; không có nghĩa sao chép đầy đủ hệ thống production.
- **PARTIAL**: có nội dung/chức năng hữu ích nhưng còn thiếu khả năng hoặc dữ liệu quan trọng, được nêu rõ.
- **PLACEHOLDER**: chỉ tiêu đề hoặc khung trang.
- **MISSING**: không có đích nội dung hợp lệ.
- **EXTERNAL-ONLY**: cố ý để tại nguồn hoặc dịch vụ bên ngoài, không tính là trang cục bộ hoàn thành.

## Phạm vi

Crawl ban đầu: **104 URL nội bộ**, gồm biến thể query; **55 placeholder** = 54 mục bắt buộc + VF eStore. Đã kiểm tra data/home-menu.js, data/home-products.js, data/products.js, js/routes.js, js/app.js và toàn bộ pages/ cùng module/ảnh liên quan.

Kết quả inventory bắt buộc: **53 COMPLETE, 1 PARTIAL** (tra cứu địa điểm hiện hành). VF eStore thêm ngoài inventory: **COMPLETE**. Có **55 HTML entrypoint mới**, danh mục hợp nhất **42 mẫu**. Giữ nguyên snapshot thông số/giá trang chủ, cấu trúc và renderer sản phẩm đang hoạt động.

## Ô tô — 10

| # | Đích | Ban đầu | Hiện tại | Nội dung / giới hạn |
|---|---|---|---|---|
| 1 | [Minio Green](pages/minio-green.html) · [Nguồn](https://vinfastauto.com/vn_vi/minio-green) | PLACEHOLDER | **COMPLETE** | Cấu hình hiện tại 18,3 kWh / 210 km; phân biệt brochure 2025. |
| 2 | [Herio Green](pages/herio-green.html) · [Nguồn](https://vinfastauto.com/vn_vi/herio-green) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 3 | [Nerio Green](pages/nerio-green.html) · [Nguồn](https://shop.vinfastauto.com/vn_vi/nerio-green.html) | PLACEHOLDER | **COMPLETE** | Thông số theo brochure riêng; ghi rõ khác nhãn phân khúc ở snapshot trang chủ. |
| 4 | [Limo Green](pages/limo-green.html) · [Nguồn](https://vinfastauto.com/vn_vi/limo-green) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 5 | [EC Van](pages/ec-van.html) · [Nguồn](https://vinfastauto.com/vn_vi/vinfast-ecvan) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 6 | [EBus](pages/ebus.html) · [Nguồn](https://shop.vinfastauto.com/vn_vi/ebus.html) | PLACEHOLDER | **COMPLETE** | Cấu hình EBus 6,2 m; không gán nhãn 45 chỗ từ menu. |
| 7 | [VinFast Fadil](pages/fadil.html) · [Nguồn](https://shop.vinfastauto.com/vn_vi/o-to-vinfast-fadil.html) | PLACEHOLDER | **COMPLETE** | Hồ sơ xe xăng ngừng kinh doanh mới từ 15/07/2022; ảnh đúng xe, màu lưu trữ, thông số và tài liệu dịch vụ. |
| 8 | [VinFast Lux A2.0](pages/lux-a.html) · [Nguồn](https://shop.vinfastauto.com/vn_vi/o-to-vinfast-lux-a.html) | PLACEHOLDER | **COMPLETE** | Hồ sơ xe xăng ngừng kinh doanh mới từ 15/07/2022; ảnh đúng xe, màu lưu trữ, thông số và tài liệu dịch vụ. |
| 9 | [VinFast Lux SA2.0](pages/lux-sa.html) · [Nguồn](https://shop.vinfastauto.com/vn_vi/o-to-vinfast-lux-sa.html) | PLACEHOLDER | **COMPLETE** | Hồ sơ xe xăng ngừng kinh doanh mới từ 15/07/2022; ảnh đúng xe, màu lưu trữ, thông số và tài liệu dịch vụ. |
| 10 | [VinFast President](pages/president.html) · [Nguồn](https://shop.vinfastauto.com/vn_vi/o-to-vinfast-president.html) | PLACEHOLDER | **COMPLETE** | Hồ sơ xe xăng ngừng kinh doanh mới từ 15/07/2022; ảnh đúng xe, màu lưu trữ, thông số và tài liệu dịch vụ. |

## Xe máy điện và xe đạp — 18

| # | Đích | Ban đầu | Hiện tại | Nội dung / giới hạn |
|---|---|---|---|---|
| 11 | [Vero X](pages/vero-x.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-verox) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 12 | [Kyo](pages/kyo.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-kyo) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 13 | [Feliz II](pages/feliz-ii.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-feliz-II) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 14 | [Feliz 2025](pages/feliz-2025.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-feliz) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 15 | [Feliz 2027](pages/feliz-2027.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-feliz-the-he-moi) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 16 | [Evo Grand Limited](pages/evo-grand-limited.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-evo-grand-limited) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 17 | [Evo Grand II](pages/evo-grand-ii.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-evo-grand-ii) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 18 | [Evo](pages/evo.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-evo) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 19 | [Amio](pages/amio.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-amio) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 20 | [Amio S](pages/amio-s.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-amio-s) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 21 | [Amio S2](pages/amio-s2.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-amio-S2) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 22 | [Flazz](pages/flazz.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-flazz) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 23 | [Flazz Max](pages/flazz-max.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-flazz-max) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 24 | [ZGoo](pages/zgoo.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-zgoo) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 25 | [Evo Lite](pages/evo-lite.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-evo-lite) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 26 | [VF DrgnFly](pages/drgnfly.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-dap-dien-drgnfly) | PLACEHOLDER | **COMPLETE** | Phân biệt 110 km hỗ trợ đạp / 75 km chạy ga; ghi rõ mâu thuẫn nguồn bảo hành. |
| 27 | [Evo Grand Lite](pages/evo-grand-lite.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-evo-grand-lite) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |
| 28 | [Evo Lite Neo](pages/evo-lite-neo.html) · [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-evo-lite-neo) | PLACEHOLDER | **COMPLETE** | Ảnh đúng mẫu, tổng quan, tabs thông số, pin/trang bị, tài liệu, dịch vụ và sản phẩm liên quan. |

## Hậu mãi và dịch vụ — 10

| # | Đích | Ban đầu | Hiện tại | Nội dung / giới hạn |
|---|---|---|---|---|
| 29 | [Tra cứu tài liệu ô tô](pages/car-documents.html) · [Nguồn](https://vinfastauto.com/vn_vi/tai-lieu-o-to) | PLACEHOLDER | **COMPLETE** | Tìm kiếm 14 sổ bảo hành PDF chính thức; không giả làm hướng dẫn sử dụng. |
| 30 | [Bảo dưỡng xe máy điện](pages/scooter-maintenance.html) · [Nguồn](https://vinfastauto.com/vn_vi/dich-vu-bao-duong-xe-may-dien) | PLACEHOLDER | **COMPLETE** | Nội dung riêng theo dịch vụ, điều kiện, accordion, tài liệu và đặt lịch mô phỏng. |
| 31 | [Sửa chữa xe máy điện](pages/scooter-repair.html) · [Nguồn](https://vinfastauto.com/vn_vi/dich-vu-sua-chua-xe-may-dien) | PLACEHOLDER | **COMPLETE** | Nội dung riêng theo dịch vụ, điều kiện, accordion, tài liệu và đặt lịch mô phỏng. |
| 32 | [Tra cứu tài liệu xe máy điện](pages/scooter-documents.html) · [Nguồn](https://vinfastauto.com/vn_vi/tai-lieu-xe-may-dien) | PLACEHOLDER | **COMPLETE** | Tìm kiếm 8 hướng dẫn sử dụng PDF theo mẫu, liên kết tới danh mục đầy đủ. |
| 33 | [Bảo hành EBus](pages/ebus-warranty.html) · [Nguồn](https://vinfastauto.com/vn_vi/chinh-sach-bao-hanh-ebus) | PLACEHOLDER | **COMPLETE** | Nội dung riêng theo dịch vụ, điều kiện, accordion, tài liệu và đặt lịch mô phỏng. |
| 34 | [Bảo dưỡng EBus](pages/ebus-maintenance.html) · [Nguồn](https://vinfastauto.com/vn_vi/dich-vu-bao-duong-ebus) | PLACEHOLDER | **COMPLETE** | Nội dung riêng theo dịch vụ, điều kiện, accordion, tài liệu và đặt lịch mô phỏng. |
| 35 | [Sửa chữa EBus](pages/ebus-repair.html) · [Nguồn](https://vinfastauto.com/vn_vi/dich-vu-sua-chua-ebus) | PLACEHOLDER | **COMPLETE** | Nội dung riêng theo dịch vụ, điều kiện, accordion, tài liệu và đặt lịch mô phỏng. |
| 36 | [Cứu hộ EBus](pages/ebus-rescue.html) · [Nguồn](https://vinfastauto.com/vn_vi/thong-tin-cuu-ho-ebus) | PLACEHOLDER | **COMPLETE** | Nội dung riêng theo dịch vụ, điều kiện, accordion, tài liệu và đặt lịch mô phỏng. |
| 37 | [Tra cứu tài liệu EBus](pages/ebus-documents.html) · [Nguồn](https://vinfastauto.com/vn_vi/tai-lieu-ebus) | PLACEHOLDER | **COMPLETE** | Tìm kiếm 3 sổ bảo hành EB6/EB8/EB10, ghi đúng loại tài liệu. |
| 38 | [Showroom, đại lý, xưởng dịch vụ và trạm sạc](pages/locations.html) · [Nguồn](https://vinfastauto.com/vn_vi/tim-kiem-showroom-tram-sac) | PLACEHOLDER | **PARTIAL** | Tìm kiếm/lọc 6 địa điểm công bố năm 2022–2023, liên kết bản đồ và locator chính thức. Còn thiếu dữ liệu hiện hành/toàn quốc và trạng thái cổng sạc trực tiếp. |

## Công cụ khách hàng — 5

| # | Đích | Ban đầu | Hiện tại | Nội dung / giới hạn |
|---|---|---|---|---|
| 39 | [Dự toán chi phí lăn bánh](pages/on-road-cost.html) · [Nguồn](https://shop.vinfastauto.com/vn_vi/chi-phi-lan-banh) | PLACEHOLDER | **COMPLETE** | Giá + trước bạ + phí do người dùng nhập; không khẳng định biểu phí hiện hành. |
| 40 | [Dự toán vay trả góp](pages/installment.html) · [Nguồn](https://shop.vinfastauto.com/vn_vi/du-toan-chi-phi-tra-gop) | PLACEHOLDER | **COMPLETE** | Hai phương pháp trả góp, lịch từng tháng, kiểm tra dữ liệu và xuất CSV. |
| 41 | [Mua ô tô trực tuyến — mô phỏng](pages/buy-car.html) · [Nguồn](https://vinfastauto.com/vn_vi/mua-xe-o-to-dien-truc-tuyen) | PLACEHOLDER | **COMPLETE** | Chọn xe/phiên bản có dữ liệu, xem phiếu, tải JSON, đặt lại; không thanh toán thật. |
| 42 | [Tính chi phí sử dụng xe máy điện](pages/operating-cost.html) · [Nguồn](https://vinfastauto.com/vn_vi/tinh-chi-phi-su-dung-xmd) | PLACEHOLDER | **COMPLETE** | So sánh điện/xăng và bảo dưỡng theo giả định; công khai các khoản chưa tính. |
| 43 | [Mua xe máy điện trực tuyến — mô phỏng](pages/buy-scooter.html) · [Nguồn](https://vinfastauto.com/vn_vi/mua-xe-may-dien-truc-tuyen) | PLACEHOLDER | **COMPLETE** | Chọn xe, xem phiếu, tải JSON, đặt lại; không đặt hàng thật. |

## Trang khác — 11

| # | Đích | Ban đầu | Hiện tại | Nội dung / giới hạn |
|---|---|---|---|---|
| 44 | [VF Energy](pages/vf-energy.html) · [Nguồn](https://vinfastauto.com/vn_vi/vf-energy) | PLACEHOLDER | **COMPLETE** | Giới thiệu BESS, ba nhóm giải pháp, tabs và nguồn chính thức; không đặt công suất hoặc giá chưa xác minh. |
| 45 | [Tin công ty](pages/company-news.html) · [Nguồn](https://vinfastauto.com/vn_vi/tin-tuc/cong-ty) | PLACEHOLDER | **COMPLETE** | Hai tin có ngày công bố, tìm kiếm, chuyển chuyên mục và nguồn bài; snapshot, không phải feed trực tiếp. |
| 46 | [Tin ô tô](pages/car-news.html) · [Nguồn](https://vinfastauto.com/vn_vi/tin-tuc/o-to-dien) | PLACEHOLDER | **COMPLETE** | Hai tin có ngày công bố, tìm kiếm, chuyển chuyên mục và nguồn bài; snapshot, không phải feed trực tiếp. |
| 47 | [Tin xe máy điện](pages/scooter-news.html) · [Nguồn](https://vinfastauto.com/vn_vi/tin-tuc/xe-may-dien) | PLACEHOLDER | **COMPLETE** | Hai tin có ngày công bố, tìm kiếm, chuyển chuyên mục và nguồn bài; snapshot, không phải feed trực tiếp. |
| 48 | [Bảo vệ dữ liệu cá nhân](pages/privacy.html) · [Nguồn](https://vinfastauto.com/vn_vi/privacy-policy) | PLACEHOLDER | **COMPLETE** | Tổng quan chính sách hiệu lực 29/04/2025; phân biệt hành vi dữ liệu của mô phỏng. |
| 49 | [Chính sách vận chuyển](pages/shipping.html) · [Nguồn](https://vinfastauto.com/vn_vi/dieu-khoan-phap-ly?collapseId=collapse-6) | PLACEHOLDER | **COMPLETE** | Diễn giải có nguồn và đúng mục chính sách; không hư cấu toàn văn hợp đồng. |
| 50 | [Chính sách đổi trả](pages/returns.html) · [Nguồn](https://vinfastauto.com/vn_vi/dieu-khoan-phap-ly?collapseId=collapse-5) | PLACEHOLDER | **COMPLETE** | Diễn giải có nguồn và đúng mục chính sách; không hư cấu toàn văn hợp đồng. |
| 51 | [Miễn trừ trách nhiệm](pages/disclaimer.html) · [Nguồn](https://vinfastauto.com/vn_vi/dieu-khoan-phap-ly?collapseId=collapse-3) | PLACEHOLDER | **COMPLETE** | Diễn giải có nguồn và đúng mục chính sách; không hư cấu toàn văn hợp đồng. |
| 52 | [Điều khoản thỏa thuận đặt cọc ô tô](pages/deposit-terms.html) · [Nguồn](https://vinfastauto.com/vn_vi/dieu-khoan-phap-ly?collapseId=collapse-4) | PLACEHOLDER | **COMPLETE** | Diễn giải có nguồn và đúng mục chính sách; không hư cấu toàn văn hợp đồng. |
| 53 | [Hợp đồng và chính sách](pages/contracts.html) · [Nguồn](https://vinfastauto.com/vn_vi/hop-dong-va-chinh-sach) | PLACEHOLDER | **COMPLETE** | Tìm kiếm 2 tài liệu PDF đã xác minh, các mục chính sách và danh mục đầy đủ. |
| 54 | [Tiếp nhận và giải quyết khiếu nại](pages/complaints.html) · [Nguồn](https://vinfastauto.com/vn_vi/dieu-khoan-phap-ly?collapseId=collapse-10) | PLACEHOLDER | **COMPLETE** | Diễn giải có nguồn và đúng mục chính sách; không hư cấu toàn văn hợp đồng. |

## Phát hiện thêm — VF eStore

| # | Đích | Ban đầu | Hiện tại | Nội dung / giới hạn |
|---|---|---|---|---|
| 55 | [VF eStore](pages/estore.html) · [Nguồn](https://vinfastauto.com/vn_vi/vinfast-estore.html) | PLACEHOLDER | **COMPLETE** | Bốn nhóm tính năng bằng tabs, phạm vi tương thích và nguồn; không kích hoạt gói. |

## Các đích đã có được tái sử dụng

Không đánh giá hoàn thành chỉ dựa vào file tồn tại. Các trang dưới có nội dung/chức năng và đã được kiểm tra lại. Biến thể chọn mẫu/bộ lọc dùng chung renderer.

| Đích | Ban đầu | Hiện tại | Thực hiện |
|---|---|---|---|
| [VinFast Việt Nam — Bản mô phỏng học tập](index.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [Giới thiệu về Công ty VinFast](pages/about.html) | PARTIAL | COMPLETE | Bổ sung phần thiếu và liên kết nguồn/tài liệu/công cụ; giữ cấu trúc cũ. |
| [Phụ kiện xe](pages/accessories.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [Pin ô tô điện](pages/battery.html) | PARTIAL | COMPLETE | Bổ sung phần thiếu và liên kết nguồn/tài liệu/công cụ; giữ cấu trúc cũ. |
| [Các dòng xe VinFast](pages/catalog.html) | COMPLETE | COMPLETE | Mở rộng danh mục và nhóm xe xăng lịch sử. |
| [So sánh hai mẫu xe](pages/compare.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [Evo Grand Premia](pages/evo-grand-premia.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [VinFast Evo Grand](pages/evo-grand.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [Dịch vụ bảo dưỡng ô tô](pages/maintenance.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [Dịch vụ sửa chữa ô tô](pages/repair.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [Thông tin cứu hộ](pages/rescue.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [Pin và trạm sạc xe máy điện](pages/scooter-battery.html) | PARTIAL | COMPLETE | Bổ sung phần thiếu và liên kết nguồn/tài liệu/công cụ; giữ cấu trúc cũ. |
| [Chính sách bảo hành xe máy điện](pages/scooter-warranty.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [Đặt lịch dịch vụ](pages/service-booking.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [Đăng ký lái thử mô phỏng](pages/test-drive.html) | COMPLETE | COMPLETE | Giữ form, loại xe xăng ngừng kinh doanh khỏi lựa chọn lái thử xe mới. |
| [VF MPV 7](pages/vf-mpv7.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [VF Wild](pages/vf-wild.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [VF 2](pages/vf2.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [VF 3](pages/vf3.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [VF 5](pages/vf5.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [VF 7](pages/vf7.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [VF 8 Thế hệ mới](pages/vf8-new.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [VF 8](pages/vf8.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [VF 9](pages/vf9.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [Giới thiệu chung](pages/vingroup.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [VinFast Viper](pages/viper.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [Chính sách bảo hành](pages/warranty.html) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [VF 6](pages/product.html?id=vf6) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [VinFast Kinet](pages/product.html?id=kinet) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [Tấm che pin cao áp VF 7](pages/accessory.html?id=EEP71061000) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [Bộ xếp hình Robot VinFast VF 9](pages/accessory.html?id=ACS10000246) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [Ô cao cấp gập tự động màu đen](pages/accessory.html?id=ACS40000094) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |
| [Sạc tại nhà 3 kW](pages/accessory.html?id=EEP69072176AB) | COMPLETE | COMPLETE | Tái sử dụng; kiểm tra lại nội dung, ảnh và điều hướng. |

## Thay đổi mã nguồn

- HTML mới: 55 file được liệt kê ở bảng trên, dùng header/footer chung và data-page riêng.
- Dữ liệu mới: data/destinations.js (inventory/alias), data/extended-products.js (28 sản phẩm), data/destination-content.js (dịch vụ/tài liệu/chính sách/tin/địa điểm).
- Module mới: js/destinations.js, js/destination-products.js, js/destination-services.js, js/destination-shared.js, js/customer-tools.js, js/cost-calculations.js.
- Cập nhật: js/app.js (bổ sung registry/liên kết hỗ trợ, không viết lại), js/routes.js, data/products.js, js/catalog.js, js/forms.js, js/reference.js, js/support-pages.js; js/home.js chỉ bổ sung alias Zgoo → ZGoo để nút chi tiết dẫn đúng sản phẩm.
- CSS mới duy nhất: css/destinations.css. Tái sử dụng styles.css, home-reference.css, verified-products.css, support-pages.css và premia.css. Không sửa CSS cũ.
- Tái sử dụng swipe.js, components.js, color-gallery.js, product-markup.js. Không sửa swipe, menu, header/footer hoặc hiệu ứng chuyển xe trang chủ.
- 55 URL reference.html?route=... cũ chuyển tới đúng trang mới. Các collapseId chính sách được phân biệt. Giữ nguyên base path /vinf/.

## Ảnh bổ sung

Tái sử dụng ảnh đúng mẫu trong assets/home/. Bổ sung **24 ảnh gốc**, khoảng 5.67 MB. [Provenance, kích thước và SHA-256](assets/extended/sources.json).

| File | Kích thước | Nguồn |
|---|---|---|
| assets/extended/ebus/gallery-1.webp | 750 × 1200 | [Ảnh gốc](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc94d860f/landingpage/vgreen/ebus/ebus-img-05-sp.webp) |
| assets/extended/ebus/gallery-2.webp | 750 × 1200 | [Ảnh gốc](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwcf599335/landingpage/vgreen/ebus/ebus-img-06-sp.webp) |
| assets/extended/ebus/gallery-3.webp | 750 × 1200 | [Ảnh gốc](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwa640e82c/landingpage/vgreen/ebus/ebus-img-07-sp.webp) |
| assets/extended/ec-van/detail.webp | 5760 × 3240 | [Ảnh gốc](https://static-cms-prod.vinfastauto.com/statics/car/ec-van/hinh-anh-vinfast-ec-van-exterior-highlight-banner-deskstop.webp) |
| assets/extended/ec-van/exterior.webp | 4800 × 2700 | [Ảnh gốc](https://static-cms-prod.vinfastauto.com/statics/car/ec-van/hinh-anh-vinfast-ec-van-exterior-slider-1-deskstop.webp) |
| assets/extended/fadil/grey.png | 1400 × 816 | [Ảnh gốc](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dw59c6a445/images/Fadil/Hinh-anh-Mua-xe-VinFast-Fadil-tra-gop-ban-nang-cao-mau-xam-Grey.png) |
| assets/extended/fadil/hero.jpg | 1800 × 900 | [Ảnh gốc](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dw94c0c212/images/vfast/Hinh-anh-Dang-ky-lai-thu-o-to-VinFast-Fadil.jpg) |
| assets/extended/fadil/red.png | 1400 × 816 | [Ảnh gốc](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dw09a0985f/images/Fadil/Hinh-anh-Mua-xe-VinFast-Fadil-ban-nang-cao-tra-gop-mau-do-Red.png) |
| assets/extended/herio-green/exterior.webp | 4800 × 2700 | [Ảnh gốc](https://static-cms-prod.vinfastauto.com/statics/car/herio-green/hinh-anh-vinfast-herio-green-exterior-slider-1-desktop.webp) |
| assets/extended/herio-green/interior.webp | 5520 × 3240 | [Ảnh gốc](https://static-cms-prod.vinfastauto.com/statics/car/herio-green/hinh-anh-vinfast-herio-green-interior-banner-desktop.webp) |
| assets/extended/limo-green/exterior.webp | 4800 × 2700 | [Ảnh gốc](https://static-cms-prod.vinfastauto.com/statics/car/limo-green/hinh-anh-vinfast-limo-green-exterior-slider-1-desktop-26092026.webp) |
| assets/extended/limo-green/interior.webp | 5520 × 3240 | [Ảnh gốc](https://static-cms-prod.vinfastauto.com/statics/car/limo-green/limo-green-interior-day-desktop-20250910.webp) |
| assets/extended/lux-a/grey.png | 1400 × 816 | [Ảnh gốc](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dw885b7000/images/Lux-A/hinh-anh-tra-gop-Lux-A2.0-ban-base-mau-xam-neptune-grey.png) |
| assets/extended/lux-a/hero.png | 1440 × 791 | [Ảnh gốc](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dw2b079243/images/vfast/hinh-anh-dang-ky-lai-thu-VinFast-Lux-A2.0.png) |
| assets/extended/lux-a/red.png | 1400 × 816 | [Ảnh gốc](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwc1a7c1f3/images/Lux-A/hinh-anh-gia-xe-VinFast-Lux-A2.0-ban-tieu-chuan-mau-do-mystique-red.png) |
| assets/extended/lux-sa/grey.png | 1400 × 816 | [Ảnh gốc](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dw8e867a01/images/Lux-SA/hinh-anh-gia-VinFast-Lux-SA2.0-ban-nang-cao-plus-tra-gop-mau-xam-gray.png) |
| assets/extended/lux-sa/hero.png | 1440 × 791 | [Ảnh gốc](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwdc7ad02b/images/vfast/hinh-anh-VinFast-Lux-SA2.0-gia-danh-gia-noi-that-thong-so.png) |
| assets/extended/lux-sa/red.png | 1400 × 816 | [Ảnh gốc](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dw5c1adf16/images/Lux-SA/hinh-anh-gia-VinFast-Lux-SA2.0-ban-tieu-chuan-base-tra-gop-mau-do-red.png) |
| assets/extended/minio-green/exterior.webp | 4800 × 2700 | [Ảnh gốc](https://static-cms-prod.vinfastauto.com/statics/car/minio-green/hinh-anh-vinfast-minio-green-ngoai-that-mau-hong-canh-ho-nui-desktop.webp) |
| assets/extended/minio-green/interior.webp | 1840 × 1080 | [Ảnh gốc](https://static-cms-prod.vinfastauto.com/statics/car/minio-green/hinh-anh-VinFast-Minio-Green-noi-that-xe-mau-xanh-la-grid-thumb-2.webp) |
| assets/extended/nerio-green/presentation.webp | 750 × 1200 | [Ảnh gốc](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dw4819d823/landingpage/vgreen/nerio-green/nerio-green_update_sp.webp) |
| assets/extended/president/hero.jpg | 1440 × 778 | [Ảnh gốc](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dw6dac8f1c/images/vfast/Hinh-anh-xe-SUV-VinFast-President-gia-xe-thong-so-bang-mau-dong-co-v8.jpg) |
| assets/extended/president/red.png | 1400 × 816 | [Ảnh gốc](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dw7ed3c56b/images/President/hinh-anh-gia-VinFast-President-V8-mau-do-red.png) |
| assets/extended/president/white.png | 1400 × 816 | [Ảnh gốc](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwb4c29460/images/President/hinh-anh-xe-SUV-VinFast-President-V8-gia-xe-mau-trang-white.png) |

## Kiểm thử

- Bộ kiểm tra node tests/destinations.cjs và lượt kiểm tra bổ sung liên kết của 37 mẫu xe trang chủ tại 3 kích thước: **247 PASS, 0 lỗi**, 237 lượt trang/kích thước trong bộ kiểm tra chính.
- 55 trang mới tại **1440 / 768 / 390px**: nội dung, header/footer, ảnh, không tràn ngang, không lỗi JS.
- **127 URL nội bộ** được lần theo; không còn liên kết điều hướng vào placeholder reference.html.
- Tab, accordion, gallery, màu xe, tìm kiếm, không kết quả, reset; liên kết source/PDF được giữ ngoài hệ thống route.
- Fixture công thức độc lập: lãi 0%, hai phương pháp trả góp, bảo toàn tổng gốc, dư nợ cuối kỳ 0, dữ liệu sai; công cụ lăn bánh và vận hành.
- Form và xuất CSV; lựa chọn mẫu/phiên bản, phiếu JSON, reset; không ghi tài khoản/storage, không có request gửi form/thanh toán.
- Kiểm tra hình ảnh đại diện trong tests/destination-visual/; giữ hiệu ứng trượt ảnh/fade thông số trang chủ.
- Prettier cho các module/trang mới và file liên quan đã định dạng; kiểm tra cú pháp module và git diff --check đạt. Không định dạng lại toàn bộ js/home.js vì file có khác biệt định dạng từ trước và chỉ cần thêm một alias.
- Đã kiểm tra và sửa mã hóa UTF-8 của tiêu đề, mô tả, liên kết bỏ qua điều hướng và nội dung khi tắt JavaScript trong cả 55 HTML entrypoint.
- [Kết quả và link máy đọc được](tests/destination-results.json); [crawl trước thay đổi](research/destination-baseline.json).

- Touch giả lập Chromium: vuốt gallery ảnh/màu, menu mobile đến Limo Green và calculator màn hình hẹp đều PASS.

## Giới hạn được ghi nhận

1. **Locator: PARTIAL.** Có tra cứu/lọc địa chỉ có nguồn nhưng chỉ là danh mục lịch sử chọn lọc. Locator công khai không trả tập địa điểm hiện hành đọc được qua extraction và browser được phép đã thử. Không dựng trạng thái cổng sạc giả. Muốn hoàn thiện dữ liệu hiện hành cần bản xuất dữ liệu/API được cấp phép hoặc bộ dữ liệu cập nhật.
2. Kho tài liệu chọn lọc: 14 ô tô, 8 xe máy, 3 EBus; không phải toàn bộ tài liệu mọi đời xe. Cổng hướng dẫn ô tô/EBus không trả nội dung khi kiểm tra; vẫn cung cấp sổ bảo hành PDF thật và ghi đúng loại.
3. Chính sách là diễn giải dẫn tới văn bản đúng mục, không phải toàn văn/hợp đồng. Tin tức có ngày công bố và là snapshot, không phải feed tự cập nhật.
4. Khác biệt nguồn Minio theo năm, nhãn Nerio, kích thước EBus và bảo hành/giá DrgnFly được ghi rõ ở trang liên quan. Không sửa snapshot trang chủ hoặc trộn thông số nhiều phiên bản.
5. Public site có VF 5 Mới, VF 6 Mới, VF 5 Green nhưng chúng không thuộc điều hướng local ban đầu; không tính nhầm là route local đã hoàn thành.
6. Kiểm tra Chromium với viewport/touch giả lập; chưa kiểm tra trên thiết bị iOS/Android thật. Không triển khai lên production.

## Tất cả URL nội bộ đã kiểm tra

Query chỉ chọn sẵn dữ liệu; các URL có cùng renderer không phải HTML mới.

| URL | Trạng thái |
|---|---|
| /vinf/index.html | COMPLETE |
| /vinf/pages/about.html | COMPLETE |
| /vinf/pages/accessories.html | COMPLETE |
| /vinf/pages/accessory.html?id=ACS10000246 | COMPLETE |
| /vinf/pages/accessory.html?id=ACS40000094 | COMPLETE |
| /vinf/pages/accessory.html?id=EEP69072176AB | COMPLETE |
| /vinf/pages/accessory.html?id=EEP71061000 | COMPLETE |
| /vinf/pages/amio-s.html | COMPLETE |
| /vinf/pages/amio-s2.html | COMPLETE |
| /vinf/pages/amio.html | COMPLETE |
| /vinf/pages/battery.html | COMPLETE |
| /vinf/pages/buy-car.html | COMPLETE |
| /vinf/pages/buy-car.html?model=ecvan | COMPLETE |
| /vinf/pages/buy-car.html?model=herio | COMPLETE |
| /vinf/pages/buy-car.html?model=limo | COMPLETE |
| /vinf/pages/buy-car.html?model=minio | COMPLETE |
| /vinf/pages/buy-car.html?model=nerio | COMPLETE |
| /vinf/pages/buy-scooter.html | COMPLETE |
| /vinf/pages/buy-scooter.html?model=amio | COMPLETE |
| /vinf/pages/buy-scooter.html?model=amio-s | COMPLETE |
| /vinf/pages/buy-scooter.html?model=amio-s2 | COMPLETE |
| /vinf/pages/buy-scooter.html?model=drgnfly | COMPLETE |
| /vinf/pages/buy-scooter.html?model=evo | COMPLETE |
| /vinf/pages/buy-scooter.html?model=evo-grand-ii | COMPLETE |
| /vinf/pages/buy-scooter.html?model=evo-grand-limited | COMPLETE |
| /vinf/pages/buy-scooter.html?model=evo-grand-lite | COMPLETE |
| /vinf/pages/buy-scooter.html?model=evo-lite | COMPLETE |
| /vinf/pages/buy-scooter.html?model=evo-lite-neo | COMPLETE |
| /vinf/pages/buy-scooter.html?model=feliz-2025 | COMPLETE |
| /vinf/pages/buy-scooter.html?model=feliz-2027 | COMPLETE |
| /vinf/pages/buy-scooter.html?model=feliz-ii | COMPLETE |
| /vinf/pages/buy-scooter.html?model=flazz | COMPLETE |
| /vinf/pages/buy-scooter.html?model=flazz-max | COMPLETE |
| /vinf/pages/buy-scooter.html?model=kyo | COMPLETE |
| /vinf/pages/buy-scooter.html?model=vero-x | COMPLETE |
| /vinf/pages/buy-scooter.html?model=zgoo | COMPLETE |
| /vinf/pages/car-documents.html | COMPLETE |
| /vinf/pages/car-news.html | COMPLETE |
| /vinf/pages/catalog.html | COMPLETE |
| /vinf/pages/catalog.html?group=personal | COMPLETE |
| /vinf/pages/catalog.html?group=scooter | COMPLETE |
| /vinf/pages/company-news.html | COMPLETE |
| /vinf/pages/compare.html | COMPLETE |
| /vinf/pages/complaints.html | COMPLETE |
| /vinf/pages/contracts.html | COMPLETE |
| /vinf/pages/deposit-terms.html | COMPLETE |
| /vinf/pages/disclaimer.html | COMPLETE |
| /vinf/pages/drgnfly.html | COMPLETE |
| /vinf/pages/ebus-documents.html | COMPLETE |
| /vinf/pages/ebus-maintenance.html | COMPLETE |
| /vinf/pages/ebus-repair.html | COMPLETE |
| /vinf/pages/ebus-rescue.html | COMPLETE |
| /vinf/pages/ebus-warranty.html | COMPLETE |
| /vinf/pages/ebus.html | COMPLETE |
| /vinf/pages/ec-van.html | COMPLETE |
| /vinf/pages/estore.html | COMPLETE |
| /vinf/pages/evo-grand-ii.html | COMPLETE |
| /vinf/pages/evo-grand-limited.html | COMPLETE |
| /vinf/pages/evo-grand-lite.html | COMPLETE |
| /vinf/pages/evo-grand-premia.html | COMPLETE |
| /vinf/pages/evo-grand.html | COMPLETE |
| /vinf/pages/evo-lite-neo.html | COMPLETE |
| /vinf/pages/evo-lite.html | COMPLETE |
| /vinf/pages/evo.html | COMPLETE |
| /vinf/pages/fadil.html | COMPLETE |
| /vinf/pages/feliz-2025.html | COMPLETE |
| /vinf/pages/feliz-2027.html | COMPLETE |
| /vinf/pages/feliz-ii.html | COMPLETE |
| /vinf/pages/flazz-max.html | COMPLETE |
| /vinf/pages/flazz.html | COMPLETE |
| /vinf/pages/herio-green.html | COMPLETE |
| /vinf/pages/installment.html | COMPLETE |
| /vinf/pages/kyo.html | COMPLETE |
| /vinf/pages/limo-green.html | COMPLETE |
| /vinf/pages/locations.html | PARTIAL |
| /vinf/pages/lux-a.html | COMPLETE |
| /vinf/pages/lux-sa.html | COMPLETE |
| /vinf/pages/maintenance.html | COMPLETE |
| /vinf/pages/minio-green.html | COMPLETE |
| /vinf/pages/nerio-green.html | COMPLETE |
| /vinf/pages/on-road-cost.html | COMPLETE |
| /vinf/pages/operating-cost.html | COMPLETE |
| /vinf/pages/president.html | COMPLETE |
| /vinf/pages/privacy.html | COMPLETE |
| /vinf/pages/product.html?id=kinet | COMPLETE |
| /vinf/pages/product.html?id=vf6 | COMPLETE |
| /vinf/pages/repair.html | COMPLETE |
| /vinf/pages/rescue.html | COMPLETE |
| /vinf/pages/returns.html | COMPLETE |
| /vinf/pages/scooter-battery.html | COMPLETE |
| /vinf/pages/scooter-documents.html | COMPLETE |
| /vinf/pages/scooter-maintenance.html | COMPLETE |
| /vinf/pages/scooter-news.html | COMPLETE |
| /vinf/pages/scooter-repair.html | COMPLETE |
| /vinf/pages/scooter-warranty.html | COMPLETE |
| /vinf/pages/service-booking.html | COMPLETE |
| /vinf/pages/shipping.html | COMPLETE |
| /vinf/pages/test-drive.html | COMPLETE |
| /vinf/pages/test-drive.html?model=evo-grand | COMPLETE |
| /vinf/pages/test-drive.html?model=evo-grand-premia | COMPLETE |
| /vinf/pages/test-drive.html?model=kinet | COMPLETE |
| /vinf/pages/test-drive.html?model=vf-mpv7 | COMPLETE |
| /vinf/pages/test-drive.html?model=vf-wild | COMPLETE |
| /vinf/pages/test-drive.html?model=vf2 | COMPLETE |
| /vinf/pages/test-drive.html?model=vf3 | COMPLETE |
| /vinf/pages/test-drive.html?model=vf5 | COMPLETE |
| /vinf/pages/test-drive.html?model=vf6 | COMPLETE |
| /vinf/pages/test-drive.html?model=vf7 | COMPLETE |
| /vinf/pages/test-drive.html?model=vf8 | COMPLETE |
| /vinf/pages/test-drive.html?model=vf8-new | COMPLETE |
| /vinf/pages/test-drive.html?model=vf9 | COMPLETE |
| /vinf/pages/test-drive.html?model=viper | COMPLETE |
| /vinf/pages/vero-x.html | COMPLETE |
| /vinf/pages/vf-energy.html | COMPLETE |
| /vinf/pages/vf-mpv7.html | COMPLETE |
| /vinf/pages/vf-wild.html | COMPLETE |
| /vinf/pages/vf2.html | COMPLETE |
| /vinf/pages/vf3.html | COMPLETE |
| /vinf/pages/vf5.html | COMPLETE |
| /vinf/pages/vf7.html | COMPLETE |
| /vinf/pages/vf8-new.html | COMPLETE |
| /vinf/pages/vf8.html | COMPLETE |
| /vinf/pages/vf9.html | COMPLETE |
| /vinf/pages/vingroup.html | COMPLETE |
| /vinf/pages/viper.html | COMPLETE |
| /vinf/pages/warranty.html | COMPLETE |
| /vinf/pages/zgoo.html | COMPLETE |

## Đích ngoài được giữ có chủ đích

VinFast EthicsPoint, Vinhomes, Vinmec, Vinpearl là bốn đích điều hướng EXTERNAL-ONLY ban đầu. Những link nguồn, PDF, bản đồ và liên hệ bổ sung cũng được thống kê dưới đây; không tính là trang nội bộ hoàn thành.

| Đích | Trạng thái | Vai trò |
|---|---|---|
| [Brochure Nerio Green ↗](https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwe405bfd4/Document/250416_Brochure_Nerio_Green_VN.pdf) | EXTERNAL-ONLY | official source / live service |
| [Dự toán chi phí lăn bánh — nguồn VinFast ↗](https://shop.vinfastauto.com/vn_vi/chi-phi-lan-banh) | EXTERNAL-ONLY | official source / live service |
| [Dự toán vay trả góp — nguồn VinFast ↗](https://shop.vinfastauto.com/vn_vi/du-toan-chi-phi-tra-gop) | EXTERNAL-ONLY | official source / live service |
| [EBus — nguồn VinFast ↗](https://shop.vinfastauto.com/vn_vi/ebus.html) | EXTERNAL-ONLY | official source / live service |
| [Nerio Green — nguồn VinFast ↗](https://shop.vinfastauto.com/vn_vi/nerio-green.html) | EXTERNAL-ONLY | official source / live service |
| [VinFast Fadil — nguồn VinFast ↗](https://shop.vinfastauto.com/vn_vi/o-to-vinfast-fadil.html) | EXTERNAL-ONLY | official source / live service |
| [VinFast Lux A2.0 — nguồn VinFast ↗](https://shop.vinfastauto.com/vn_vi/o-to-vinfast-lux-a.html) | EXTERNAL-ONLY | official source / live service |
| [VinFast Lux SA2.0 — nguồn VinFast ↗](https://shop.vinfastauto.com/vn_vi/o-to-vinfast-lux-sa.html) | EXTERNAL-ONLY | official source / live service |
| [VinFast President — nguồn VinFast ↗](https://shop.vinfastauto.com/vn_vi/o-to-vinfast-president.html) | EXTERNAL-ONLY | official source / live service |
| [Thông số và chính sách DrgnFly tại shop ↗](https://shop.vinfastauto.com/vn_vi/xe-dap-dien-drgnfly.html) | EXTERNAL-ONLY | official source / live service |
| [Mở PDF chính thức ↗](https://static-cms-prod.vinfastauto.com/19092026_cam-ket-chuyen-doi-xanh-tu-19.09.2026.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành Limo Green ↗](https://static-cms-prod.vinfastauto.com/250312_wb_limogreen_vn_vi_250618.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành Herio Green ↗](https://static-cms-prod.vinfastauto.com/250618_herio_vn_vn_1.2_svc73000217aa.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành Nerio Green ↗](https://static-cms-prod.vinfastauto.com/250618_nerio-green_vn_vi_1.1_svc20000368aa.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành VF 3 ↗](https://static-cms-prod.vinfastauto.com/250618_vf3_vn_vi_1.5_svc69000164aa.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành VF 5 ↗](https://static-cms-prod.vinfastauto.com/250618_vf5_vn_vn_2.2_svc73000155aa.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành VF 6 ↗](https://static-cms-prod.vinfastauto.com/250618_vf6_vn_vi_1.5_svc70001295aa.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành EB6 ↗](https://static-cms-prod.vinfastauto.com/250909_wb_ebus6m_vi_v1-svc43000000aa.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành EB10 ↗](https://static-cms-prod.vinfastauto.com/251015_wb_ebus10_vi_svc40000017aa-wip.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành EB8 ↗](https://static-cms-prod.vinfastauto.com/251015_wb_ebus8m_vi_svc42000001ab-wip.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành EC Van ↗](https://static-cms-prod.vinfastauto.com/260115_ecvan-wb_vn_vi_v2.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành VF MPV 7 ↗](https://static-cms-prod.vinfastauto.com/260325_wb_mpv7_vn_vi_1.0.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành VF 7 ↗](https://static-cms-prod.vinfastauto.com/260613_vf7_vn_vn_1.6_260810.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành VF 9 ↗](https://static-cms-prod.vinfastauto.com/brochure/260309_VF9_VN_VI_2.0.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành Fadil ↗](https://static-cms-prod.vinfastauto.com/So%20bao%20Hanh%20-%20Fadil%20(FINAL)_1644573657.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành Lux A2.0 ↗](https://static-cms-prod.vinfastauto.com/So%20bao%20Hanh%20-%20LUX%20A%20(FINAL)_1644573676.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành Lux SA2.0 ↗](https://static-cms-prod.vinfastauto.com/So%20bao%20Hanh%20-%20LUX%20SA%20(FINAL)_1644573699.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Sổ bảo hành President ↗](https://static-cms-prod.vinfastauto.com/So%20bao%20Hanh%20-%20PRESIDENT%20(FINAL)_1644573719.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Hướng dẫn sử dụng Evo Lite Neo ↗](https://static-cms-prod.vinfastauto.com/statics/owner-manual/e-scooter/ESPCMDABOL002-01-EVO_LITE_NEO_ESPC_BOL_OWNER_MANUAL.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Hướng dẫn sử dụng Evo Grand Lite ↗](https://static-cms-prod.vinfastauto.com/statics/owner-manual/e-scooter/ESPCNE2BOL002-02-EVO_GRAND_LITE_ESPC_BOL_OWNER_MANUAL.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Hướng dẫn sử dụng Feliz 2025 ↗](https://static-cms-prod.vinfastauto.com/statics/owner-manual/e-scooter/ESPCNE6BOL003-02-FELIZ_2025_ESPC_BOL_OWNER_MANUAL_VIE.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Hướng dẫn sử dụng Vero X ↗](https://static-cms-prod.vinfastauto.com/statics/owner-manual/e-scooter/ESPCNE7BOL002-01-VERO_X_ESPC_BOL_OWNER_MANUAL_VIE.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Hướng dẫn sử dụng Evo ↗](https://static-cms-prod.vinfastauto.com/statics/owner-manual/e-scooter/ESPCNE9BOL001-07-VINFAST_EVO_VN_ESPC_BOL_OWNER_MANUAL_VIE.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Hướng dẫn sử dụng ZGoo ↗](https://static-cms-prod.vinfastauto.com/statics/owner-manual/e-scooter/ESPCNECBOL001-05-DG1_ZGOO_ESPC_BOL_OWNER_MANUAL.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Hướng dẫn sử dụng Flazz ↗](https://static-cms-prod.vinfastauto.com/statics/owner-manual/e-scooter/ESPCNEDBOL001-05-DG2_FLAZZ_ESPC_BOL_OWNER_MANUAL_VIE.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở Hướng dẫn sử dụng Feliz II ↗](https://static-cms-prod.vinfastauto.com/statics/owner-manual/e-scooter/ESPCNEFBOL002-02-FELIZ_MAX_VN_ESPC_BOL_OWNER_MANUAL.pdf) | EXTERNAL-ONLY | official source / live service |
| [Mở PDF chính thức ↗](https://static-cms-prod.vinfastauto.com/vf_pc01.81_mau-hd-mua-ban-xe-dien-vf_26.09.2025_0.pdf) | EXTERNAL-ONLY | official source / live service |
| [vinfast.ethicspoint.com ↗](https://vinfast.ethicspoint.com/) | EXTERNAL-ONLY | external navigation |
| [Đọc bài chính thức ↗](https://vinfastauto.com/vn_vi/cap-nhat-mot-so-noi-dung-bao-duong-dinh-ky-xe-may-dien-vinfast) | EXTERNAL-ONLY | official source / live service |
| [Bảo hành EBus — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/chinh-sach-bao-hanh-ebus) | EXTERNAL-ONLY | official source / live service |
| [Trang tham chiếu chính thức ↗](https://vinfastauto.com/vn_vi/chinh-sach-bao-hanh-oto) | EXTERNAL-ONLY | official source / live service |
| [Bài công bố địa điểm ↗](https://vinfastauto.com/vn_vi/dai-ly-xe-may-dien-vinfast-vung-dong-bang-song-hong) | EXTERNAL-ONLY | official source / live service |
| [Bảo dưỡng EBus — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/dich-vu-bao-duong-ebus) | EXTERNAL-ONLY | official source / live service |
| [Bảo dưỡng xe máy điện — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/dich-vu-bao-duong-xe-may-dien) | EXTERNAL-ONLY | official source / live service |
| [Trang tham chiếu chính thức ↗](https://vinfastauto.com/vn_vi/dich-vu-pin-oto-dien) | EXTERNAL-ONLY | official source / live service |
| [Đọc biểu phí và điều kiện đúng phiên bản hợp đồng ↗](https://vinfastauto.com/vn_vi/dich-vu-pin-xe-may-dien) | EXTERNAL-ONLY | official source / live service |
| [Sửa chữa EBus — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/dich-vu-sua-chua-ebus) | EXTERNAL-ONLY | official source / live service |
| [Sửa chữa xe máy điện — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/dich-vu-sua-chua-xe-may-dien) | EXTERNAL-ONLY | official source / live service |
| [Tiếp nhận và giải quyết khiếu nại — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/dieu-khoan-phap-ly?collapseId=collapse-10) | EXTERNAL-ONLY | official source / live service |
| [Miễn trừ trách nhiệm — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/dieu-khoan-phap-ly?collapseId=collapse-3) | EXTERNAL-ONLY | official source / live service |
| [Điều khoản thỏa thuận đặt cọc ô tô — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/dieu-khoan-phap-ly?collapseId=collapse-4) | EXTERNAL-ONLY | official source / live service |
| [Chính sách đổi trả — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/dieu-khoan-phap-ly?collapseId=collapse-5) | EXTERNAL-ONLY | official source / live service |
| [Chính sách vận chuyển — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/dieu-khoan-phap-ly?collapseId=collapse-6) | EXTERNAL-ONLY | official source / live service |
| [Đọc bài chính thức ↗](https://vinfastauto.com/vn_vi/don-cho-chuoi-su-kien-thu-xang-doi-dien-tai-34-tttm-vincom-tren-toan-quoc) | EXTERNAL-ONLY | official source / live service |
| [Herio Green — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/herio-green) | EXTERNAL-ONLY | official source / live service |
| [Hợp đồng và chính sách — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/hop-dong-va-chinh-sach) | EXTERNAL-ONLY | official source / live service |
| [Limo Green — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/limo-green) | EXTERNAL-ONLY | official source / live service |
| [Minio Green — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/minio-green) | EXTERNAL-ONLY | official source / live service |
| [Mua xe máy điện trực tuyến — mô phỏng — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/mua-xe-may-dien-truc-tuyen) | EXTERNAL-ONLY | official source / live service |
| [Mua ô tô trực tuyến — mô phỏng — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/mua-xe-o-to-dien-truc-tuyen) | EXTERNAL-ONLY | official source / live service |
| [Bảo vệ dữ liệu cá nhân — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/privacy-policy) | EXTERNAL-ONLY | official source / live service |
| [Bài công bố địa điểm ↗](https://vinfastauto.com/vn_vi/showroom-vinfast-nguyen-van-linh) | EXTERNAL-ONLY | official source / live service |
| [Tra cứu tài liệu EBus — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/tai-lieu-ebus) | EXTERNAL-ONLY | official source / live service |
| [Tra cứu tài liệu ô tô — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/tai-lieu-o-to) | EXTERNAL-ONLY | official source / live service |
| [Tra cứu tài liệu xe máy điện — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/tai-lieu-xe-may-dien) | EXTERNAL-ONLY | official source / live service |
| [Cứu hộ EBus — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/thong-tin-cuu-ho-ebus) | EXTERNAL-ONLY | official source / live service |
| [Showroom, đại lý, xưởng dịch vụ và trạm sạc — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/tim-kiem-showroom-tram-sac) | EXTERNAL-ONLY | official source / live service |
| [Tin công ty — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/tin-tuc/cong-ty) | EXTERNAL-ONLY | official source / live service |
| [Tin ô tô — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/tin-tuc/o-to-dien) | EXTERNAL-ONLY | official source / live service |
| [Tin xe máy điện — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/tin-tuc/xe-may-dien) | EXTERNAL-ONLY | official source / live service |
| [Tính chi phí sử dụng xe máy điện — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/tinh-chi-phi-su-dung-xmd) | EXTERNAL-ONLY | official source / live service |
| [Bài công bố địa điểm ↗](https://vinfastauto.com/vn_vi/tram-sac-vinfast-ha-noi) | EXTERNAL-ONLY | official source / live service |
| [Lịch sử và giải thưởng tại nguồn VinFast ↗](https://vinfastauto.com/vn_vi/ve-chung-toi) | EXTERNAL-ONLY | official source / live service |
| [VF Energy — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/vf-energy) | EXTERNAL-ONLY | official source / live service |
| [Thông báo dừng kinh doanh ô tô xăng ngày 15/07/2022 ↗](https://vinfastauto.com/vn_vi/vinfast-chinh-thuc-dung-kinh-doanh-xe-o-to-chay-xang) | EXTERNAL-ONLY | official source / live service |
| [Đọc bài chính thức ↗](https://vinfastauto.com/vn_vi/vinfast-chinh-thuc-xuat-xuong-vf-mpv-7-tai-nha-may-subang-day-nhanh-chien-luoc-noi-dia-hoa-o-indonesia) | EXTERNAL-ONLY | official source / live service |
| [Đọc bài chính thức ↗](https://vinfastauto.com/vn_vi/vinfast-dua-xe-buyt-dien-vao-thi-truong-my-mo-rong-he-sinh-thai-giao-thong-xanh) | EXTERNAL-ONLY | official source / live service |
| [EC Van — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/vinfast-ecvan) | EXTERNAL-ONLY | official source / live service |
| [VF eStore — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/vinfast-estore.html) | EXTERNAL-ONLY | official source / live service |
| [Đọc bài chính thức ↗](https://vinfastauto.com/vn_vi/vinfast-ra-mat-vf-8-the-he-moi-nang-cap-trai-nghiem-toan-dien-cho-nguoi-dung) | EXTERNAL-ONLY | official source / live service |
| [Đọc bài chính thức ↗](https://vinfastauto.com/vn_vi/vinfast-tai-trien-lam-quoc-te-vietbuild-ha-noi-2026-len-doi-xe-dien-chon-xe-chon-vinfast) | EXTERNAL-ONLY | official source / live service |
| [VF DrgnFly — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-dap-dien-drgnfly) | EXTERNAL-ONLY | official source / live service |
| [Evo — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-evo) | EXTERNAL-ONLY | official source / live service |
| [Evo Grand Limited — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-evo-grand-limited) | EXTERNAL-ONLY | official source / live service |
| [Evo Grand Lite — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-evo-grand-lite) | EXTERNAL-ONLY | official source / live service |
| [Evo Lite — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-evo-lite) | EXTERNAL-ONLY | official source / live service |
| [Evo Lite Neo — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-evo-lite-neo) | EXTERNAL-ONLY | official source / live service |
| [Feliz 2025 — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-feliz) | EXTERNAL-ONLY | official source / live service |
| [Feliz 2027 — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-feliz-the-he-moi) | EXTERNAL-ONLY | official source / live service |
| [Flazz — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-flazz) | EXTERNAL-ONLY | official source / live service |
| [Vero X — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-verox) | EXTERNAL-ONLY | official source / live service |
| [Amio — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-amio) | EXTERNAL-ONLY | official source / live service |
| [Amio S — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-amio-s) | EXTERNAL-ONLY | official source / live service |
| [Amio S2 — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-amio-S2) | EXTERNAL-ONLY | official source / live service |
| [Evo Grand II — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-evo-grand-ii) | EXTERNAL-ONLY | official source / live service |
| [Feliz II — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-feliz-II) | EXTERNAL-ONLY | official source / live service |
| [Flazz Max — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-flazz-max) | EXTERNAL-ONLY | official source / live service |
| [Kyo — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-kyo) | EXTERNAL-ONLY | official source / live service |
| [ZGoo — nguồn VinFast ↗](https://vinfastauto.com/vn_vi/xe-may-dien-zgoo) | EXTERNAL-ONLY | official source / live service |
| [Vinhomes ↗](https://vinhomes.vn/) | EXTERNAL-ONLY | external navigation |
| [Vinmec ↗](https://vinmec.com/) | EXTERNAL-ONLY | external navigation |
| [Vinpearl ↗](https://vinpearl.com/) | EXTERNAL-ONLY | external navigation |
| [Tìm địa chỉ trên bản đồ ↗](https://www.google.com/maps/search/?api=1&query=NPP%203S%20VinFast%20Ph%C3%BA%20Th%C3%A0nh%20175%20Qu%E1%BB%91c%20l%E1%BB%99%201A%2C%20%C4%91%C6%B0%E1%BB%9Dng%20L%C3%AA%20Ho%C3%A0n%2C%20Quang%20Trung%2C%20Ph%E1%BB%A7%20L%C3%BD%2C%20H%C3%A0%20Nam) | EXTERNAL-ONLY | official source / live service |
| [Tìm địa chỉ trên bản đồ ↗](https://www.google.com/maps/search/?api=1&query=NPP%203S%20VinFast%20Th%E1%BB%8Bnh%20C%C6%B0%E1%BB%9Dng%20S%E1%BB%91%201%2FB1%20l%C3%B4%2026BC%2C%20L%C3%AA%20H%E1%BB%93ng%20Phong%2C%20H%E1%BA%A3i%20Ph%C3%B2ng) | EXTERNAL-ONLY | official source / live service |
| [Tìm địa chỉ trên bản đồ ↗](https://www.google.com/maps/search/?api=1&query=Tr%E1%BA%A1m%20s%E1%BA%A1c%20t%E1%BA%A1i%20Showroom%20Ph%E1%BA%A1m%20V%C4%83n%20%C4%90%E1%BB%93ng%20166%20Ph%E1%BA%A1m%20V%C4%83n%20%C4%90%E1%BB%93ng%2C%20Xu%C3%A2n%20%C4%90%E1%BB%89nh%2C%20H%C3%A0%20N%E1%BB%99i) | EXTERNAL-ONLY | official source / live service |
| [Tìm địa chỉ trên bản đồ ↗](https://www.google.com/maps/search/?api=1&query=Tr%E1%BA%A1m%20s%E1%BA%A1c%20Vincom%20Center%20Metropolis%20C%E1%BB%99t%20M6%2C%20h%E1%BA%A7m%20B3%2C%2029%20Li%E1%BB%85u%20Giai%2C%20H%C3%A0%20N%E1%BB%99i) | EXTERNAL-ONLY | official source / live service |
| [Tìm địa chỉ trên bản đồ ↗](https://www.google.com/maps/search/?api=1&query=VinFast%20H%C3%B2a%20Di%E1%BB%87p%20239%20L%E1%BA%A1ch%20Tray%2C%20Ng%C3%B4%20Quy%E1%BB%81n%2C%20H%E1%BA%A3i%20Ph%C3%B2ng) | EXTERNAL-ONLY | official source / live service |
| [Tìm địa chỉ trên bản đồ ↗](https://www.google.com/maps/search/?api=1&query=VinFast%20Nguy%E1%BB%85n%20V%C4%83n%20Linh%20S%E1%BB%91%201%20Nguy%E1%BB%85n%20V%C4%83n%20Linh%2C%20Gia%20Th%E1%BB%A5y%2C%20Long%20Bi%C3%AAn%2C%20H%C3%A0%20N%E1%BB%99i) | EXTERNAL-ONLY | official source / live service |
| [1900 23 23 89 - Nhánh 1](tel:1900232389) | EXTERNAL-ONLY | external navigation |
