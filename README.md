# SPORTZONE – Website kinh doanh sản phẩm thể thao

> Dự án bài tập lớn môn Thiết kế Web – xây dựng website thương mại điện tử mô phỏng dành cho các sản phẩm thể thao.

SPORTZONE là website Frontend cho phép người dùng khám phá sản phẩm thể thao, tìm kiếm và lọc danh mục, xem thông tin chi tiết, lưu sản phẩm yêu thích, quản lý giỏ hàng và trải nghiệm quy trình thanh toán mô phỏng. Giao diện được xây dựng theo phong cách hiện đại, năng động, có khả năng thích ứng với máy tính, máy tính bảng và điện thoại.

**Lưu ý:** Đây là dự án học tập chạy phía trình duyệt. Phiên bản hiện tại chưa có Backend, cơ sở dữ liệu máy chủ, hệ thống xác thực tài khoản hoặc cổng thanh toán thực tế.

---

## Mục lục

- [1. Tổng quan dự án](#1-tổng-quan-dự-án)
- [2. Công nghệ sử dụng](#2-công-nghệ-sử-dụng)
- [3. Tính năng](#3-tính-năng)
- [4. Cấu trúc thư mục](#4-cấu-trúc-thư-mục)
- [5. Cài đặt và chạy dự án](#5-cài-đặt-và-chạy-dự-án)
- [6. Dữ liệu sản phẩm và lưu trữ](#6-dữ-liệu-sản-phẩm-và-lưu-trữ)
- [7. Giao diện và Responsive](#7-giao-diện-và-responsive)
- [8. Thành viên nhóm](#8-thành-viên-nhóm)
- [9. Giới hạn hiện tại](#9-giới-hạn-hiện-tại)
- [10. Hướng phát triển](#10-hướng-phát-triển)

---

## 1. Tổng quan dự án

### 1.1. Mục tiêu

- Xây dựng giao diện website bán sản phẩm thể thao thân thiện và dễ sử dụng.
- Thực hành HTML5, CSS3 và JavaScript thuần trong một dự án có nhiều trang.
- Xây dựng các chức năng tương tác thường gặp ở website thương mại điện tử.
- Thực hành thao tác DOM, xử lý sự kiện, quản lý dữ liệu dạng mảng/đối tượng và lưu trữ phía trình duyệt.
- Tổ chức mã nguồn theo từng nhóm chức năng để thuận tiện cho việc kiểm tra, chỉnh sửa và mở rộng.

### 1.2. Quy mô dữ liệu hiện tại

| Hạng mục | Số lượng / nội dung |
|---|---|
| Trang HTML | 11 trang, bao gồm trang 404 |
| Sản phẩm mẫu | 24 sản phẩm |
| Danh mục sản phẩm | 6 danh mục |
| Thương hiệu trong dữ liệu | Nike, Adidas, Puma, Jordan, Under Armour, Wilson |
| Hình ảnh JPG | 111 tệp trong `assets/images/` |
| Ngôn ngữ giao diện | Tiếng Việt là chủ yếu |
| Kiểu ứng dụng | Website tĩnh, xử lý phía Client |

**Sáu danh mục sản phẩm:** Shoes, Football, Basketball, Clothing, Gym và Accessories.

### 1.3. Các trang của website

| Tệp | Nội dung |
|---|---|
| `index.html` | Trang chủ: banner, danh mục, Flash Sale, sản phẩm nổi bật và Sport Finder |
| `products.html` | Danh sách sản phẩm, tìm kiếm, lọc, sắp xếp và phân trang |
| `product-detail.html` | Thông tin và tùy chọn chi tiết của sản phẩm |
| `wishlist.html` | Danh sách sản phẩm yêu thích |
| `cart.html` | Giỏ hàng, số lượng, mã giảm giá và tổng tiền |
| `checkout.html` | Biểu mẫu nhận hàng và thanh toán mô phỏng |
| `login.html` | Giao diện đăng nhập mô phỏng |
| `register.html` | Giao diện đăng ký mô phỏng |
| `about.html` | Giới thiệu thương hiệu và thành viên nhóm |
| `contact.html` | Thông tin liên hệ, biểu mẫu và câu hỏi thường gặp |
| `404.html` | Trang thông báo đường dẫn không tồn tại |

---

## 2. Công nghệ sử dụng

| Công nghệ / công cụ | Vai trò trong dự án |
|---|---|
| HTML5 | Xây dựng cấu trúc và nội dung các trang |
| CSS3 | Thiết kế giao diện, bố cục, hiệu ứng và Responsive |
| Vanilla JavaScript | Xử lý sự kiện, DOM, dữ liệu và chức năng phía Client |
| LocalStorage | Lưu trạng thái giỏ hàng, yêu thích, so sánh, sản phẩm đã xem, tài khoản mô phỏng và voucher |
| Google Fonts | Cung cấp font Outfit và Plus Jakarta Sans |
| Font Awesome 6.4.2 | Cung cấp biểu tượng giao diện qua CDN |
| Visual Studio Code | Trình soạn thảo mã nguồn được sử dụng trong quá trình phát triển |
| Git / GitHub | Công cụ có thể sử dụng để quản lý phiên bản và lưu trữ mã nguồn của nhóm |

Dự án sử dụng **HTML, CSS và JavaScript thuần**, không sử dụng React, Vue, Angular, Bootstrap hoặc Tailwind CSS. Source hiện tại không yêu cầu Node.js, npm hay bước biên dịch trước khi chạy.

### 2.1. Tài nguyên bên ngoài

Một số thành phần giao diện sử dụng tài nguyên từ dịch vụ bên ngoài:

- Google Fonts: tải font chữ Outfit và Plus Jakarta Sans.
- cdnjs: tải Font Awesome phiên bản 6.4.2.
- Google Maps: hiển thị bản đồ nhúng tại trang liên hệ.
- QR Server: tạo hình ảnh mã QR minh họa tại khu vực thanh toán ngân hàng.

Do có sử dụng CDN và tài nguyên trực tuyến, nên bật kết nối Internet để các font, biểu tượng, bản đồ và hình ảnh QR bên ngoài hiển thị đầy đủ.

---

## 3. Tính năng

### 3.1. Trang chủ

- Banner Hero Slider có chuyển slide tự động và điều khiển bằng nút Previous/Next, dấu chấm điều hướng.
- Khu vực danh mục thể thao.
- Khu vực Flash Sale với đồng hồ đếm ngược.
- Danh sách sản phẩm nổi bật và các tab lọc theo danh mục.
- Khu vực giới thiệu Sport Finder.
- Các thành phần điều hướng và thông tin hỗ trợ dùng chung.

### 3.2. Danh sách sản phẩm

- Hiển thị dữ liệu từ mảng `PRODUCTS_DATA`.
- Tìm kiếm theo tên, thương hiệu hoặc danh mục.
- Live Search tại Header: bắt đầu gợi ý khi từ khóa có ít nhất 2 ký tự; danh sách gợi ý được giới hạn để giao diện gọn hơn.
- Lọc theo danh mục, thương hiệu, khoảng giá, kích thước và mức đánh giá.
- Sắp xếp theo giá tăng dần, giá giảm dần, đánh giá, nhãn sản phẩm mới và bán chạy.
- Chuyển đổi cách hiển thị Grid View / List View.
- Phân trang, mặc định 9 sản phẩm mỗi trang.
- Hiển thị các bộ lọc đang áp dụng và hỗ trợ đặt lại bộ lọc.

### 3.3. Chi tiết sản phẩm

- Hiển thị hình ảnh, tên, thương hiệu, giá, mức giảm giá và đánh giá.
- Hiển thị mô tả, đặc điểm và thông số sản phẩm.
- Lựa chọn kích thước, màu sắc và số lượng trước khi thêm vào giỏ hàng.
- Hiển thị sản phẩm liên quan.
- Ghi nhận sản phẩm vừa xem để hiển thị lại ở khu vực Recently Viewed.

### 3.4. Các tiện ích hỗ trợ chọn sản phẩm

- **Sport Finder:** Bài hỏi đáp ba nhóm tiêu chí gồm môn thể thao, trình độ và ngân sách; JavaScript lọc dữ liệu để gợi ý tối đa 4 sản phẩm. Đây là bộ lọc theo quy tắc được lập trình sẵn, không kết nối mô hình AI hoặc API AI.
- **Compare:** Cho phép chọn tối đa 3 sản phẩm và mở bảng so sánh các thông tin chính.
- **Quick View:** Mở cửa sổ xem nhanh thông tin sản phẩm mà không cần chuyển trang.
- **Size Guide:** Hiển thị bảng hướng dẫn chọn kích thước giày, quần áo và cách đo tại nhà.
- **Recently Viewed:** Lưu tối đa 8 mã sản phẩm được xem gần đây.
- **Flash Sale:** Hiển thị sản phẩm có nhãn Flash Sale hoặc mức giảm giá theo điều kiện trong dữ liệu, kèm đồng hồ đếm ngược mô phỏng.

### 3.5. Wishlist và giỏ hàng

- Thêm hoặc xóa sản phẩm khỏi Wishlist.
- Thêm sản phẩm vào giỏ hàng từ thẻ sản phẩm, Quick View hoặc trang chi tiết.
- Cập nhật số lượng và xóa sản phẩm trong giỏ hàng.
- Phân biệt các dòng hàng theo mã sản phẩm, kích thước và màu sắc.
- Tính tạm tính, giảm giá, phí vận chuyển và tổng tiền.
- Áp dụng các mã voucher demo:

| Mã | Quy tắc mô phỏng |
|---|---|
| `SPORTZONE10` | Giảm 10% giá trị sản phẩm |
| `CHAMPION20` | Giảm 20% giá trị sản phẩm |
| `FREESHIP` | Miễn phí vận chuyển theo quy tắc demo |

Các mã trên chỉ phục vụ kiểm tra chức năng trong dự án học tập, không phải chương trình khuyến mãi đang có hiệu lực ngoài thực tế.

### 3.6. Checkout và tài khoản

- Trang Checkout hiển thị lại các sản phẩm trong giỏ hàng.
- Cho phép lựa chọn phương thức vận chuyển và phương thức thanh toán mô phỏng.
- Kiểm tra các trường thông tin nhận hàng ở phía Client.
- Nếu có trạng thái người dùng, một số thông tin như họ tên, email và số điện thoại được điền trước.
- Hiển thị hộp thoại xác nhận hoàn tất đơn hàng mô phỏng.
- Trang đăng nhập và đăng ký có kiểm tra dữ liệu biểu mẫu.
- Trang đăng ký có thanh đánh giá độ mạnh mật khẩu.
- Hỗ trợ đăng xuất và cập nhật trạng thái tài khoản trên Header.

### 3.7. Các thành phần dùng chung

- Header và menu điều hướng di động.
- Live Search.
- Bộ đếm số lượng Wishlist và Cart.
- Compare Bar.
- Toast Notification.
- Modal.
- Back to Top.
- Footer và biểu mẫu Newsletter mô phỏng.

---

## 4. Cấu trúc thư mục

```text
SPORTZONE/
│
├── index.html                  # Trang chủ
├── products.html               # Danh sách sản phẩm
├── product-detail.html         # Chi tiết sản phẩm
├── wishlist.html               # Sản phẩm yêu thích
├── cart.html                    # Giỏ hàng
├── checkout.html                # Thanh toán mô phỏng
├── login.html                   # Đăng nhập mô phỏng
├── register.html                # Đăng ký mô phỏng
├── about.html                   # Giới thiệu
├── contact.html                 # Liên hệ
├── 404.html                     # Trang không tìm thấy
├── README.md                    # Tài liệu dự án
│
├── css/
│   ├── reset.css                # Chuẩn hóa một số style mặc định
│   ├── variables.css            # CSS Variables: màu, font, khoảng cách...
│   ├── global.css               # Style tổng thể
│   ├── components.css           # Style thành phần dùng chung
│   ├── responsive.css           # Quy tắc Responsive toàn cục
│   └── pages/
│       ├── home.css
│       ├── products.css
│       ├── product-detail.css
│       ├── cart.css
│       ├── checkout.css
│       ├── auth.css
│       └── about-contact.css
│
├── js/
│   ├── main.js                  # Khởi tạo chức năng dùng chung
│   ├── components/
│   │   ├── modal.js             # Modal, Quick View, Compare, Size Guide...
│   │   ├── toast.js             # Thông báo Toast
│   │   └── product-card.js      # Tạo thẻ sản phẩm và gắn sự kiện
│   ├── data/
│   │   └── products.js          # Dữ liệu 24 sản phẩm mẫu
│   ├── utils/
│   │   └── storage.js           # Các thao tác LocalStorage
│   └── pages/
│       ├── home.js
│       ├── products.js
│       ├── product-detail.js
│       ├── wishlist.js
│       ├── cart.js
│       ├── checkout.js
│       ├── auth.js
│       └── contact.js
│
└── assets/
    └── images/
        ├── about/
        │   ├── brand-story/
        │   └── team/
        ├── banners/
        │   ├── categories/
        │   ├── home/
        │   └── promotions/
        ├── categories/
        │   ├── running/
        │   ├── football/
        │   ├── tennis/
        │   ├── gym/
        │   ├── basketball/
        │   └── clothing/
        ├── products/
        │   ├── accessories/
        │   ├── clothing/
        │   ├── equipment/
        │   └── shoes/
        ├── contact/
        ├── placeholders/
        └── README_IMAGES.txt
```

### 4.1. Vai trò của các thành phần JavaScript

| Tệp | Vai trò |
|---|---|
| `js/main.js` | Khởi tạo Header, Mobile Drawer, Live Search, Compare Bar, Toast, bộ đếm và các thành phần toàn cục |
| `js/data/products.js` | Khai báo `PRODUCTS_DATA` và các hàm truy xuất sản phẩm |
| `js/utils/storage.js` | Quản lý Cart, Wishlist, Compare, Recently Viewed, Voucher và trạng thái người dùng |
| `js/components/product-card.js` | Sinh HTML cho Product Card và gắn sự kiện tương tác |
| `js/components/modal.js` | Quản lý Modal, Quick View, Size Guide, Sport Finder, Compare và thông báo đặt hàng |
| `js/components/toast.js` | Khởi tạo và hiển thị thông báo Toast |
| `js/pages/*.js` | Xử lý nghiệp vụ riêng cho từng trang |

Các trang HTML nạp các tệp JavaScript theo thứ tự: dữ liệu sản phẩm, tiện ích lưu trữ, thành phần giao diện dùng chung, `main.js` và cuối cùng là script riêng của trang (nếu có). Dự án hiện sử dụng các script thông thường khai báo trực tiếp trong HTML, không tổ chức theo ES Modules.

---

## 5. Cài đặt và chạy dự án

SPORTZONE là website tĩnh nên không cần cài đặt package hoặc chạy lệnh build.

### 5.1. Yêu cầu

- Máy tính có trình duyệt hiện đại như Chrome, Edge, Firefox hoặc Safari.
- Visual Studio Code hoặc trình soạn thảo tương đương.
- Khuyến nghị sử dụng tiện ích **Live Server** trong Visual Studio Code.
- Kết nối Internet để tải Google Fonts, Font Awesome và các tài nguyên ngoài (nếu cần).

### 5.2. Chạy bằng Visual Studio Code và Live Server

1. Giải nén source code dự án.
2. Mở Visual Studio Code.
3. Chọn **File → Open Folder...** và mở đúng thư mục `SPORTZONE` (thư mục chứa trực tiếp `index.html`, `css/`, `js/` và `assets/`).
4. Cài tiện ích **Live Server** nếu máy chưa có.
5. Mở tệp `index.html`.
6. Nhấn chuột phải và chọn **Open with Live Server**.
7. Trình duyệt sẽ mở website tại địa chỉ localhost do Live Server cung cấp.

### 5.3. Chạy bằng Python (tùy chọn)

Nếu máy đã cài Python, có thể mở Terminal tại thư mục gốc `SPORTZONE` và chạy:

```bash
python -m http.server 5500
```

Sau đó truy cập:

```text
http://localhost:5500
```

Trên một số máy Windows, lệnh khởi chạy Python có thể là:

```bash
py -m http.server 5500
```

Để dừng máy chủ local, quay lại cửa sổ Terminal và nhấn `Ctrl + C`.

### 5.4. Không cần thực hiện

- Không cần `npm install`.
- Không cần `npm run build`.
- Không cần cấu hình cơ sở dữ liệu.
- Không cần khởi chạy Backend.

---

## 6. Dữ liệu sản phẩm và lưu trữ

### 6.1. Dữ liệu sản phẩm

Dữ liệu mẫu được khai báo trong `js/data/products.js` dưới dạng mảng đối tượng `PRODUCTS_DATA`. Mỗi sản phẩm có các thông tin như mã định danh, tên, danh mục, thương hiệu, giá, giá cũ, mức giảm, đánh giá, màu sắc, kích thước, tồn kho mô phỏng, mô tả, đặc điểm, thông số và đường dẫn hình ảnh.

Một số hàm truy xuất dữ liệu chính:

- `getAllProducts()`: lấy danh sách sản phẩm.
- `getProductById(id)`: tìm sản phẩm theo ID.
- `getFeaturedProducts(limit)`: lấy danh sách sản phẩm nổi bật.
- `getFlashSaleProducts(limit)`: lấy sản phẩm có nhãn Flash Sale hoặc đạt điều kiện giảm giá trong mã nguồn.
- `getRelatedProducts(category, currentId, limit)`: lấy sản phẩm cùng danh mục, loại trừ sản phẩm hiện tại.

### 6.2. Dữ liệu lưu trong LocalStorage

| Key | Dữ liệu |
|---|---|
| `sportzone_cart` | Danh sách mặt hàng trong giỏ hàng |
| `sportzone_wishlist` | Danh sách ID sản phẩm yêu thích |
| `sportzone_compare` | Danh sách ID sản phẩm đang so sánh |
| `sportzone_recent` | Danh sách ID sản phẩm vừa xem |
| `sportzone_user` | Thông tin người dùng đang đăng nhập mô phỏng |
| `sportzone_voucher` | Voucher đang được áp dụng |
| `sportzone_flashsale_target` | Thời điểm kết thúc Flash Sale mô phỏng |

Các giá trị dạng mảng hoặc đối tượng được chuyển thành chuỗi JSON bằng `JSON.stringify()` khi lưu và đọc lại bằng `JSON.parse()`.

### 6.3. Sự kiện cập nhật dữ liệu

Một số sự kiện tùy chỉnh được sử dụng để đồng bộ giao diện giữa các thành phần:

- `cartUpdated`: giỏ hàng được cập nhật.
- `wishlistUpdated`: danh sách yêu thích được cập nhật.
- `compareUpdated`: danh sách so sánh được cập nhật.
- `userStateChanged`: trạng thái người dùng thay đổi.

Ví dụ, khi giỏ hàng thay đổi, Header có thể cập nhật bộ đếm số lượng mà không cần tải lại toàn bộ trang.

---

## 7. Giao diện và Responsive

### 7.1. Định hướng thiết kế

- Phong cách hiện đại, năng động, phù hợp với website sản phẩm thể thao.
- Màu thương hiệu chính: cam `#FF4D00`.
- Màu nền/tối chủ đạo: xanh đen `#0F172A`.
- Màu nhấn phụ: xanh lá `#00D26A`.
- Font tiêu đề: Outfit.
- Font nội dung: Plus Jakarta Sans.

### 7.2. Responsive

CSS sử dụng Flexbox, Grid, đơn vị kích thước linh hoạt và Media Queries. Một số mốc breakpoint chính trong `css/responsive.css` gồm:

| Breakpoint | Mục đích |
|---|---|
| `max-width: 1024px` | Điều chỉnh container và bố cục màn hình trung bình |
| `max-width: 991px` | Thu gọn một số thành phần điều hướng và bố cục nhiều cột |
| `max-width: 767px` | Tối ưu giao diện Tablet/Mobile |
| `max-width: 575px` | Tối ưu điện thoại màn hình nhỏ |
| `max-width: 380px` | Điều chỉnh bổ sung cho màn hình hẹp |

Menu di động được triển khai theo dạng Drawer, có lớp phủ, hỗ trợ đóng bằng nút điều khiển và phím Escape. Các quy tắc `prefers-reduced-motion` cũng được khai báo để giảm chuyển động khi người dùng bật tùy chọn tương ứng trên thiết bị.

---

## 8. Thành viên nhóm

| STT | Thành viên | Vai trò | Nhiệm vụ chính |
|:---:|---|---|---|
| 1 | **Lê Cường Bảo** | **Trưởng nhóm & Front-End Lead** | Điều phối và phân chia công việc trong nhóm. Định hướng phát triển giao diện Front-End, xây dựng cấu trúc các trang và đảm bảo tính thống nhất của website SPORTZONE. |
| 2 | **Nguyễn Phúc Minh** | UI/UX Designer | Nghiên cứu trải nghiệm người dùng, thiết kế bố cục và giao diện các trang. Định hướng màu sắc, kiểu chữ, thành phần hiển thị và tính nhất quán trong thiết kế website. |
| 3 | **Lưu Trọng Nguyên** | JavaScript Developer | Phát triển các chức năng tương tác bằng JavaScript. Xử lý sự kiện người dùng, thao tác sản phẩm, giỏ hàng và các chức năng động trên website. |
| 4 | **Nguyễn Nhật Huy** | Product & Data Developer | Tổ chức dữ liệu sản phẩm, xây dựng và quản lý dữ liệu phục vụ website. Hỗ trợ xử lý thông tin sản phẩm và kết nối dữ liệu với các chức năng giao diện. |
| 5 | **Lý Tuấn Hoàng** | Quality Assurance & Content | Kiểm tra giao diện và chức năng website, ghi nhận lỗi và hỗ trợ đánh giá chất lượng. Xây dựng, rà soát nội dung hiển thị và thông tin sản phẩm. |



---

## 9. Giới hạn hiện tại

SPORTZONE là sản phẩm học tập tập trung vào Frontend. Một số giới hạn cần lưu ý:

1. **Chưa có Backend:** Toàn bộ xử lý nghiệp vụ hiện chạy trong trình duyệt; chưa có API hoặc máy chủ ứng dụng.
2. **Chưa có cơ sở dữ liệu:** Dữ liệu sản phẩm là dữ liệu mẫu khai báo trong JavaScript; dữ liệu phát sinh được lưu ở LocalStorage.
3. **Đăng nhập/đăng ký mô phỏng:** Biểu mẫu có kiểm tra dữ liệu phía Client và tạo trạng thái người dùng trong LocalStorage. Chưa có tài khoản được xác thực trên máy chủ; thông tin đăng nhập không được đối chiếu với hệ thống người dùng thực tế.
4. **Thanh toán mô phỏng:** COD, thẻ và VietQR chỉ là các lựa chọn minh họa. Website không kết nối ngân hàng, cổng thanh toán hoặc thực hiện giao dịch thật. Không nhập thông tin thẻ hay dữ liệu tài chính thật khi thử nghiệm.
5. **Đơn hàng chưa được lưu trên máy chủ:** Thông tin đơn được tạo để hiển thị Modal xác nhận; chưa có trang quản trị hoặc hệ thống theo dõi đơn hàng Backend.
6. **Biểu mẫu liên hệ/Newsletter:** Hiện chủ yếu kiểm tra dữ liệu và hiển thị thông báo phía Client; chưa gửi nội dung đến email hoặc máy chủ.
7. **Sport Finder không phải AI thực:** Đây là bộ câu hỏi và thuật toán lọc sản phẩm theo các điều kiện viết sẵn trong JavaScript.
8. **Dữ liệu LocalStorage có phạm vi trình duyệt:** Thông tin không tự đồng bộ giữa thiết bị hoặc trình duyệt khác nhau và có thể mất khi người dùng xóa dữ liệu website.
9. **Phụ thuộc tài nguyên ngoài:** Google Fonts, Font Awesome, Google Maps và dịch vụ tạo QR cần kết nối Internet để tải đầy đủ.

---

## 10. Hướng phát triển

- Xây dựng Backend và REST API để quản lý sản phẩm, tài khoản, giỏ hàng và đơn hàng.
- Tích hợp cơ sở dữ liệu để lưu trữ tập trung và đồng bộ nhiều thiết bị.
- Xây dựng xác thực tài khoản an toàn, phân quyền người dùng và quản lý phiên đăng nhập.
- Tích hợp cổng thanh toán thử nghiệm/hợp lệ theo yêu cầu triển khai thực tế.
- Phát triển trang quản trị để quản lý sản phẩm, danh mục, đơn hàng và người dùng.
- Bổ sung đánh giá sản phẩm và lịch sử mua hàng.
- Tối ưu hình ảnh, hiệu suất tải trang, SEO và khả năng tiếp cận.
- Hoàn thiện kiểm thử trên nhiều trình duyệt và thiết bị thực tế.

---

