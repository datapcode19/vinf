# Kiểm kê bộ xem xe — 15/11/2026

42 mẫu xe, 41 file HTML (VF 6 và Kinet dùng chung product.html). Đã đối chiếu toàn bộ pages/, bộ định tuyến và danh mục sản phẩm; không tìm thấy trang chi tiết xe bổ sung ngoài 42 mẫu. Không sửa trang chủ, header/footer, navigation, giá, thông số, dữ liệu sản phẩm gốc hay logic carousel.

## Kết quả thực tế

Tất cả trang hiện dùng **2D**. Không có trang xe nào được ghi nhận đã hoàn thành xoay 3D/360°. Chọn màu chỉ áp dụng ảnh đúng mẫu đã có nguồn trong repository; tên màu cơ bản mô tả ảnh, không phải mã sơn hoặc cam kết tùy chọn đặt mua. Ảnh quảng bá/phiên bản có thể khác góc chụp và trang bị. Xe xăng giữ nguyên thông báo đã dừng bán xe mới.

PASS trong bảng là kiểm thử chức năng đang cung cấp, không có nghĩa đã có đủ mọi màu chính thức hoặc tài nguyên xoay. Các màu không có ảnh xác minh không được tạo thêm hoặc tô lại bằng CSS. Chưa thể lập danh sách đầy đủ tên màu còn thiếu khi nguồn trực tiếp không truy cập được.

| Xe | Route (dưới /vinf21/) | Chọn màu | Màu có ảnh triển khai | Chế độ | Nguồn ảnh | Tài nguyên thiếu | Kiểm thử |
|---|---|---|---|---|---|---|---|
| VF 8 Thế hệ mới | [pages/vf8-new.html](pages/vf8-new.html) | Hoạt động với ảnh sẵn có | Trắng, Đỏ | 2D | [Nguồn](https://vinfastauto.com/vn_vi/dat-coc-xe-vf8-the-all-new-2026); [ảnh/provenance](assets/vf8-new/manifest.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| VF MPV 7 | [pages/vf-mpv7.html](pages/vf-mpv7.html) | Hoạt động với ảnh sẵn có | Trắng, Xanh, Nâu, Đỏ, Đen | 2D | [Nguồn](https://vinfastauto.com/vn_vi/dat-coc-xe-vf-mpv7); [ảnh/provenance](assets/vf-mpv7/manifest.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| VF 2 | [pages/vf2.html](pages/vf2.html) | Hoạt động với ảnh sẵn có | Trắng, Vàng be | 2D | [Nguồn](https://vinfastauto.com/vn_vi/dat-coc-xe-vf2); [ảnh/provenance](assets/vf2/manifest.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| VF Wild | [pages/vf-wild.html](pages/vf-wild.html) | Chưa có bộ màu xác minh | — | 2D | [Nguồn](https://vinfastauto.com/vn_vi/dat-coc-xe-vf-wild); [ảnh/provenance](assets/vf-wild/manifest.json) | Bộ ảnh theo màu; 3D/360° | PASS 1440/768/390 |
| Evo Grand Premia | [pages/evo-grand-premia.html](pages/evo-grand-premia.html) | Hoạt động với ảnh sẵn có | Nâu Titanium, Xanh Oliu, Đen Bóng Mới | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-evo-grand-premia); [ảnh/provenance](assets/premia/manifest.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| VF 3 | [pages/vf3.html](pages/vf3.html) | Hoạt động với ảnh sẵn có | Trắng, Đỏ, Vàng | 2D | [Nguồn](https://vinfastauto.com/vn_vi/dat-coc-xe-dien-vf3); [ảnh/provenance](assets/vf3/manifest.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| VF 5 | [pages/vf5.html](pages/vf5.html) | Hoạt động với ảnh sẵn có | Trắng, Đỏ, Xám | 2D | [Nguồn](https://vinfastauto.com/vn_vi/dat-coc-xe-dien-vf5); [ảnh/provenance](assets/vf5/manifest.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| VF 6 | [pages/product.html?id=vf6](pages/product.html?id=vf6) | Hoạt động với ảnh sẵn có | Đỏ, Xanh rêu | 2D | [Nguồn](https://vinfastauto.com/vn_vi/dat-coc-xe-dien-vf6); [ảnh/provenance](assets/vf6/manifest.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| VF 7 | [pages/vf7.html](pages/vf7.html) | Hoạt động với ảnh sẵn có | Đen, Trắng | 2D | [Nguồn](https://vinfastauto.com/vn_vi/dat-coc-xe-dien-vf7); [ảnh/provenance](assets/vf7/manifest.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| VF 8 | [pages/vf8.html](pages/vf8.html) | Hoạt động với ảnh sẵn có | Đỏ, Xanh rêu | 2D | [Nguồn](https://vinfastauto.com/vn_vi/dat-coc-xe-vf8); [ảnh/provenance](assets/vf8/manifest.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| VF 9 | [pages/vf9.html](pages/vf9.html) | Hoạt động với ảnh sẵn có | Trắng, Xám | 2D | [Nguồn](https://vinfastauto.com/vn_vi/dat-coc-xe-vf9); [ảnh/provenance](assets/vf9/manifest.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| Minio Green | [pages/minio-green.html](pages/minio-green.html) | Giới hạn: 1 màu | Hồng | 2D | [Nguồn](https://vinfastauto.com/vn_vi/minio-green); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| Herio Green | [pages/herio-green.html](pages/herio-green.html) | Giới hạn: 1 màu | Xám | 2D | [Nguồn](https://vinfastauto.com/vn_vi/herio-green); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| Kinet | [pages/product.html?id=kinet](pages/product.html?id=kinet) | Hoạt động với ảnh sẵn có | Đỏ Đen, Xám Xi Măng, Trắng Ngọc Trai, Đen Bóng, Nâu Ánh Kim | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-kinet); [ảnh/provenance](assets/kinet/manifest.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| Viper | [pages/viper.html](pages/viper.html) | Hoạt động với ảnh sẵn có | Đỏ Tươi, Xám, Trắng Ngọc Trai, Đen Bóng | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-viper); [ảnh/provenance](assets/viper/manifest.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| Vero X | [pages/vero-x.html](pages/vero-x.html) | Chưa có bộ màu xác minh | — | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-verox); [ảnh/provenance](assets/home/manifest.json) | Bộ ảnh theo màu; 3D/360° | PASS 1440/768/390 |
| Feliz II | [pages/feliz-ii.html](pages/feliz-ii.html) | Giới hạn: 1 màu | Đỏ đen | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-feliz-II); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| Evo Grand | [pages/evo-grand.html](pages/evo-grand.html) | Hoạt động với ảnh sẵn có | Đỏ tươi, Xanh Oliu, Trắng Ngọc Trai, Đen | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-evo-grand); [ảnh/provenance](assets/evo-grand/manifest.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| Nerio Green | [pages/nerio-green.html](pages/nerio-green.html) | Giới hạn: 1 màu | Xám | 2D | [Nguồn](https://shop.vinfastauto.com/vn_vi/nerio-green.html); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| Limo Green | [pages/limo-green.html](pages/limo-green.html) | Giới hạn: 1 màu | Xám | 2D | [Nguồn](https://vinfastauto.com/vn_vi/limo-green); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| EC Van | [pages/ec-van.html](pages/ec-van.html) | Giới hạn: 1 màu | Trắng | 2D | [Nguồn](https://vinfastauto.com/vn_vi/vinfast-ecvan); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| EBus | [pages/ebus.html](pages/ebus.html) | Chưa có bộ màu xác minh | — | 2D | [Nguồn](https://shop.vinfastauto.com/vn_vi/ebus.html); [ảnh/provenance](assets/extended/sources.json) | Bộ ảnh theo màu; 3D/360° | PASS 1440/768/390 |
| VinFast Fadil | [pages/fadil.html](pages/fadil.html) | Hoạt động với ảnh sẵn có | Đỏ, Xám | 2D | [Nguồn](https://shop.vinfastauto.com/vn_vi/o-to-vinfast-fadil.html); [ảnh/provenance](assets/extended/sources.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| VinFast Lux A2.0 | [pages/lux-a.html](pages/lux-a.html) | Hoạt động với ảnh sẵn có | Đỏ, Xám | 2D | [Nguồn](https://shop.vinfastauto.com/vn_vi/o-to-vinfast-lux-a.html); [ảnh/provenance](assets/extended/sources.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| VinFast Lux SA2.0 | [pages/lux-sa.html](pages/lux-sa.html) | Hoạt động với ảnh sẵn có | Đỏ, Xám | 2D | [Nguồn](https://shop.vinfastauto.com/vn_vi/o-to-vinfast-lux-sa.html); [ảnh/provenance](assets/extended/sources.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| VinFast President | [pages/president.html](pages/president.html) | Hoạt động với ảnh sẵn có | Đỏ, Trắng | 2D | [Nguồn](https://shop.vinfastauto.com/vn_vi/o-to-vinfast-president.html); [ảnh/provenance](assets/extended/sources.json) | 3D/360°; các màu ngoài bộ ảnh chưa xác minh | PASS 1440/768/390 |
| Kyo | [pages/kyo.html](pages/kyo.html) | Giới hạn: 1 màu | Nâu | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-kyo); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| Feliz 2025 | [pages/feliz-2025.html](pages/feliz-2025.html) | Giới hạn: 1 màu | Xanh | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-feliz); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| Feliz 2027 | [pages/feliz-2027.html](pages/feliz-2027.html) | Giới hạn: 1 màu | Trắng | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-feliz-the-he-moi); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| Evo Grand Limited | [pages/evo-grand-limited.html](pages/evo-grand-limited.html) | Giới hạn: 1 màu | Xanh | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-evo-grand-limited); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| Evo Grand II | [pages/evo-grand-ii.html](pages/evo-grand-ii.html) | Giới hạn: 1 màu | Đỏ | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-evo-grand-ii); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| Evo | [pages/evo.html](pages/evo.html) | Giới hạn: 1 màu | Đỏ | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-evo); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| Amio | [pages/amio.html](pages/amio.html) | Giới hạn: 1 màu | Xám | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-amio); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| Amio S | [pages/amio-s.html](pages/amio-s.html) | Giới hạn: 1 màu | Trắng | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-amio-s); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| Amio S2 | [pages/amio-s2.html](pages/amio-s2.html) | Chưa có bộ màu xác minh | — | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-amio-S2); [ảnh/provenance](assets/home/manifest.json) | Bộ ảnh theo màu; 3D/360° | PASS 1440/768/390 |
| Flazz | [pages/flazz.html](pages/flazz.html) | Giới hạn: 1 màu | Đỏ | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-flazz); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| Flazz Max | [pages/flazz-max.html](pages/flazz-max.html) | Giới hạn: 1 màu | Cam | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-vinfast-flazz-max); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| ZGoo | [pages/zgoo.html](pages/zgoo.html) | Giới hạn: 1 màu | Xanh | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-zgoo); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| Evo Lite | [pages/evo-lite.html](pages/evo-lite.html) | Giới hạn: 1 màu | Xanh | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-evo-lite); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| VF DrgnFly | [pages/drgnfly.html](pages/drgnfly.html) | Giới hạn: 1 màu | Đen | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-dap-dien-drgnfly); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| Evo Grand Lite | [pages/evo-grand-lite.html](pages/evo-grand-lite.html) | Giới hạn: 1 màu | Tím | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-evo-grand-lite); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |
| Evo Lite Neo | [pages/evo-lite-neo.html](pages/evo-lite-neo.html) | Giới hạn: 1 màu | Xanh | 2D | [Nguồn](https://vinfastauto.com/vn_vi/xe-may-dien-evo-lite-neo); [ảnh/provenance](assets/home/manifest.json) | Ảnh màu khác; 3D/360° | PASS 1440/768/390 |

**Tổng:** 17 mẫu đổi được nhiều màu, 21 mẫu chỉ có ảnh một màu, 4 mẫu chỉ có ảnh tham chiếu chưa xác minh tên/bộ màu.

## Tìm tài nguyên xoay

- Không có GLB/glTF/OBJ/FBX hoặc chuỗi ảnh đủ một vòng 360° trong assets/. Gallery nhiều góc chụp, khác cảnh/màu không được biến thành bộ xoay giả.
- [VF 3 Plus 2026 — Hoàng Huy](https://sketchfab.com/3d-models/vinfast-vf3-plus-2026-aa87e1cd1fdd42ae92e5a397e3d5b125) và [VF 9 — Giang Trần](https://sketchfab.com/3d-models/vinfast-vf9-model-no-interior-cac6cb95b9084d0abee37dccb46fa10b): trang tác giả công bố CC BY. Đây chỉ là ứng viên; chưa có file qua luồng tải có xác thực, chưa kiểm chứng đúng phiên bản/chất lượng hình học. Không gắn nhãn đã tích hợp. [Download API của Sketchfab](https://sketchfab.com/developers/download-api/downloading-models) yêu cầu OAuth.
- [VF 3 — Ardhi3D](https://www.renderhub.com/ardhi3d/vinfast-vf3): tài nguyên trả phí, không tự mua hoặc sao chép preview làm bộ xoay.
- [VF 8 concept](https://sketchfab.com/3d-models/vinfast-vf8-concept-510ee60176644d89a35ff9e270088c88), [VF 6](https://sketchfab.com/3d-models/vinfast-vf6-aa05ba4d64334f218386fb51c1e3eecd), [Lux A](https://sketchfab.com/3d-models/vinfast-lux-a-20-1cec552ae30a4f85b4038b45abcf745d): không có bộ file với quyền sử dụng và phiên bản được xác minh để triển khai. Không lấy VF 8 concept thay VF 8 thế hệ mới.
- [Klara trên CGTrader](https://www.cgtrader.com/3d-models/vehicle/motorcycle/vinfast-klara-electric-scooter) khác các mẫu scooter trong dự án, không dùng thay thế. Các truy vấn xe dịch vụ/EBus, xe xăng còn lại và scooter chưa tìm được bộ xoay phù hợp có thể tải hợp lệ. Đây không phải khẳng định rằng tài nguyên ấy không tồn tại.
- Trang sản phẩm VinFast trực tiếp trả HTTP 403 với trang bảo vệ tự động khi kiểm tra; không vượt chặn. Tái sử dụng ảnh local theo provenance sẵn có, không tuyên bố các ảnh có giấy phép mở. Nguồn web được tra cứu 15/11/2026.

## Component và kiểm thử

- Bộ xem chung cung cấp chọn màu bằng click/tap/bàn phím, thu phóng +/−, Ctrl+cuộn, chụm hai ngón, reset; giữ các gallery, phiên bản và giá hiện có.
- Nhánh 360° yêu cầu chuỗi đủ vòng, nguồn và giấy phép cho mỗi màu; chỉ tải khung đang xem, bỏ kết quả tải cũ khi thao tác nhanh. Nhánh 3D dùng model-viewer 4.1.0, chỉ tải khi người dùng chọn 3D; có camera, zoom, reset, tự xoay tùy chọn, đổi đúng vật liệu được khai báo, timeout/lỗi quay về 2D, nguồn tác giả/giấy phép.
- Nhánh 3D/360° được kiểm thử bằng **fixture hình học và khung màu riêng trong tests**, không phải mô hình xe; không đưa fixture vào bất kỳ trang sản phẩm nào. WebGL tải thật, đổi vật liệu, xoay bằng bàn phím, đổi chế độ giữ màu, tự xoay/reduced-motion và fallback khi lỗi đã đạt. Chất lượng ánh sáng/hình học của từng xe chưa thể kiểm thử vì thiếu file xe.
- tests/vehicle-viewers.cjs: 126/126 tổ hợp trang/viewport đạt; toàn bộ ảnh main giải mã được, màu/tên/ảnh khớp, click nhanh, bàn phím, tap và pinch ở 390px, zoom/reset, không tràn ngang hay lỗi JS.
- tests/home-interactions.cjs: 8/8 đạt. tests/vehicle-imagery.cjs: 221/221 đạt, gồm gallery xe lịch sử, menu/catalog, mobile swipe và các trang dịch vụ EBus.
- Các file trang chủ và CSS/JS dùng chung cũ không có diff. Không commit/push.
- Kiểm tra bổ sung gallery trước/sau trên cả 42 trang ở 1440px: 42/42 đạt.
- tests/comparison-interactions.cjs: 19/21 đạt. Hai kiểm tra menu ở 1440/1366px timeout vì tìm `.swipe-slide:not([hidden]) .showcase-info`; mã trang chủ hiện đặt `.showcase-info` trong `.showcase-details` bên ngoài slide. Trang chủ và mọi dependency của nó không được thay đổi trong đợt này. Các kiểm tra VF 5/Viper, vuốt, tabs và liên kết dưới `/vinf/` trong cùng bộ test vẫn đạt. Không sửa test/trang chủ ngoài phạm vi.

## File thay đổi

- data/vehicle-viewers.js: registry 42 mẫu, ảnh màu bổ sung và trạng thái tài nguyên.
- js/vehicle-detail.js: entrypoint chỉ cho trang chi tiết, nối vào bộ chọn màu hiện có hoặc thêm gallery dùng component color-gallery.js.
- js/vehicle-viewer.js và css/vehicle-viewer.css: bộ xem/điều khiển dùng chung, CSS giới hạn phạm vi component.
- 41 file HTML trong bảng: chỉ đổi entrypoint từ app.js sang vehicle-detail.js (vẫn import app.js) và thêm stylesheet.
- tests/vehicle-viewers.cjs, tests/vehicle-viewer-modes.cjs: kiểm thử trang và nhánh viewer.
- Báo cáo này: bảng trạng thái và giới hạn thực tế.
