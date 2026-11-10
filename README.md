# ĐỒ ÁN THIẾT KẾ WEBSITE VINFAST

## 1. Giới thiệu đề tài

Đề tài tập trung vào việc xây dựng một website mô phỏng trang giới thiệu và kinh doanh các sản phẩm ô tô, xe máy điện của VinFast.

Website được thực hiện nhằm vận dụng kiến thức về HTML, CSS và JavaScript vào quá trình thiết kế và phát triển giao diện web. Thông qua đề tài, nhóm có cơ hội tìm hiểu cách tổ chức một website có nhiều trang, xây dựng các thành phần giao diện và xử lý những chức năng tương tác với người dùng.

Website tham khảo: https://vinfastauto.com/vn_vi

Website đồ án: https://datapcode19.github.io/vinf/index.html

Đây là sản phẩm phục vụ mục đích học tập, không phải website chính thức của VinFast.

## 2. Mục tiêu thực hiện

- Xây dựng website có giao diện và bố cục tương tự website VinFast.
- Thiết kế trang chủ và các trang giới thiệu sản phẩm.
- Hiển thị hình ảnh, thông tin và thông số kỹ thuật của các dòng xe.
- Xây dựng thanh điều hướng giúp người dùng truy cập các trang dễ dàng.
- Tạo các hiệu ứng chuyển động và tương tác nhằm cải thiện trải nghiệm sử dụng.
- Thiết kế giao diện có khả năng thích ứng với máy tính, máy tính bảng và điện thoại.
- Vận dụng kiến thức HTML, CSS và JavaScript để hoàn thiện một website nhiều trang.

## 3. Công nghệ sử dụng

| Công nghệ | Mục đích |
|---|---|
| HTML5 | Xây dựng cấu trúc và nội dung website |
| CSS3 | Thiết kế giao diện, bố cục và hiệu ứng |
| JavaScript | Xử lý các chức năng tương tác |
| Visual Studio Code | Viết và chỉnh sửa mã nguồn |
| Git và GitHub | Quản lý, lưu trữ mã nguồn |
| GitHub Pages | Triển khai website trực tuyến |

Website sử dụng HTML, CSS và JavaScript thuần, không sử dụng framework frontend hoặc hệ thống backend.

## 4. Các chức năng đã xây dựng

### 4.1. Trang chủ

Trang chủ giới thiệu các dòng xe của VinFast thông qua hình ảnh, thông tin sản phẩm và các khu vực nội dung.

Một số chức năng chính:

- Hiển thị banner giới thiệu.
- Chuyển đổi giữa các dòng xe.
- Hiển thị hình ảnh và thông số nổi bật.
- Điều hướng đến trang chi tiết sản phẩm.
- Hỗ trợ thao tác kéo, vuốt để chuyển nội dung.

### 4.2. Trang giới thiệu sản phẩm

Website đã xây dựng các trang giới thiệu một số dòng xe như:

**Ô tô điện:**
- VF 3, VF 5, VF 6, VF 7, VF 8, VF 9.

**Xe máy điện:**
- Kinet, Viper, Evo Grand, Evo Grand Premia.

Các trang sản phẩm được thiết kế để hiển thị hình ảnh, phiên bản xe, màu sắc, thông số kỹ thuật và những đặc điểm nổi bật.

Một số trang hỗ trợ chức năng chuyển đổi phiên bản, lựa chọn màu sắc và xem nhiều hình ảnh sản phẩm.

### 4.3. Thanh điều hướng

Website có hệ thống menu giúp người dùng di chuyển giữa các trang.

Thanh điều hướng được thiết kế phù hợp với cả máy tính và điện thoại, hỗ trợ mở và đóng menu, lựa chọn danh mục và truy cập trang sản phẩm.

### 4.4. Các chức năng tương tác

- Chuyển đổi hình ảnh bằng slider.
- Kéo và vuốt để chuyển sản phẩm.
- Lựa chọn màu sắc xe.
- Chuyển đổi phiên bản sản phẩm.
- Hiệu ứng khi di chuột vào các thành phần.
- Tìm kiếm và lọc sản phẩm.
- So sánh thông tin một số dòng xe.
- Biểu mẫu đăng ký lái thử và tư vấn ở dạng mô phỏng.

Các biểu mẫu chỉ phục vụ việc minh họa giao diện và chức năng, không thực hiện giao dịch hoặc gửi thông tin đến hệ thống VinFast.

## 5. Cấu trúc thư mục

```text
vinf/
│
├── index.html
├── 404.html
├── pages/
├── css/
├── js/
├── data/
├── assets/
├── research/
├── tests/
└── README.md
```

Trong đó:

- `index.html`: Trang chủ website.
- `pages/`: Chứa các trang con.
- `css/`: Chứa các file định dạng giao diện.
- `js/`: Chứa mã JavaScript xử lý chức năng.
- `data/`: Lưu dữ liệu sản phẩm.
- `assets/`: Chứa hình ảnh, font chữ và tài nguyên.
- `research/`: Tài liệu tham khảo trong quá trình thực hiện.
- `tests/`: Các file phục vụ kiểm tra website.
- `README.md`: Giới thiệu và hướng dẫn sử dụng dự án.

## 6. Hướng dẫn chạy website

**Cách 1: Chạy bằng Visual Studio Code**

1. Tải hoặc sao chép mã nguồn dự án về máy.
2. Mở thư mục `vinf` bằng Visual Studio Code.
3. Cài đặt tiện ích Live Server.
4. Nhấp chuột phải vào `index.html`.
5. Chọn **Open with Live Server**.
6. Website sẽ được mở trên trình duyệt.

**Cách 2: Truy cập trực tuyến**

Truy cập đường dẫn:

https://datapcode19.github.io/vinf/index.html

## 7. Kết quả thực hiện

Trong quá trình thực hiện, nhóm đã xây dựng được website gồm trang chủ, các trang giới thiệu sản phẩm và một số trang chức năng hỗ trợ.

Website có thể hiển thị trên nhiều kích thước màn hình, hỗ trợ điều hướng giữa các trang và thực hiện các thao tác tương tác cơ bản.

Nhóm cũng đã tiến hành kiểm tra các đường dẫn, hình ảnh, chức năng JavaScript và khả năng hiển thị của website trên những kích thước màn hình khác nhau.

## 8. Hạn chế và hướng phát triển

Mặc dù đã xây dựng được các chức năng chính, website vẫn còn một số hạn chế:

- Một số trang con chưa được hoàn thiện đầy đủ.
- Một số nội dung và hình ảnh chưa hoàn toàn tương đồng với website tham khảo.
- Một số hiệu ứng chuyển động cần được tiếp tục điều chỉnh.
- Website chưa có cơ sở dữ liệu và hệ thống backend.
- Các chức năng đăng ký, tư vấn và đặt cọc chỉ mang tính mô phỏng.

Trong thời gian tới, nhóm dự kiến tiếp tục hoàn thiện các trang còn thiếu, bổ sung dữ liệu sản phẩm, cải thiện giao diện và tối ưu trải nghiệm trên thiết bị di động.

## 9. Kết luận

Thông qua quá trình thực hiện đề tài, nhóm đã có cơ hội áp dụng kiến thức HTML, CSS và JavaScript vào việc xây dựng một website thực tế.

Bên cạnh việc thiết kế giao diện, nhóm còn tìm hiểu cách tổ chức mã nguồn, xây dựng website nhiều trang, xử lý tương tác và kiểm tra khả năng hiển thị trên các thiết bị.

Đề tài giúp nhóm củng cố kiến thức lập trình web, rèn luyện kỹ năng tìm hiểu tài liệu, giải quyết lỗi và từng bước hoàn thiện một sản phẩm website.