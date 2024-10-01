#Tên dự án: Website đặt vé xe khách liên tỉnh

##1. Giới thiệu

Dự án này nhằm mục đích phát triển website quản lý bán vé xe buýt trực tuyến, cho phép người dùng tìm kiếm các chuyến xe, đặt vé và thanh toán trực tuyến. Website cung cấp các chức năng quản lý dành cho admin như thêm mới tài xế, xe, chuyến đi, quản lý người dùng và vé xe.

##2. Công nghệ sử dụng

- Ngôn ngữ lập trình: JavaScript
- Thư viện Frontend: React.js
- Các công nghệ khác: Redux, Axios, Bootstrap, Chart.js, và nhiều thư viện khác.

##3. Cấu trúc thư mục
├──fe-bookbustickets-ecommerce
│ ├──src
│ │ ├──Component #Chứa đựng các component React
│ │ ├──page #Chứa các trang của ứng dụng
│ │ ├──services #Chứa các dịch vụ API
│ │ ├──store #Chứa cấu hình Redux store
│ │ ├── App.js #Component gốc của ứng dụng
│ │ ├── index.js #Điểm khởi đầu của ứng dụng
│ │ ├── reportWebVitals #Đo lường hiệu suất ứng dụng
│ ├── .gitignore #Danh sách các tệp và thư mục được bỏ qua khi commit
│ ├── package-lock.json #Khóa phiên bản phụ thuộc
│ ├── package.json #Thông tin và phụ thuộc của dự án
│ ├── README.md # Tài liệu hướng dẫn và thông tin dự án

##4. Hướng dẫn cài đặt

Yêu cầu hệ thống:
Node.js v20 trở lên

Cách cài đặt và chạy dự án

1. Clone dự án về máy:
   ```bash
   git clone https://github.com/dinhnguyen170203/fe-bookbustickets-ecommerce.git
   cd fe-bookbustickets-ecommerce
   ```
2. Cài đặt các gói phụ thuộc:

   npm install

3. Chạy ứng dụng:

   npm start

4. Truy cập vào trình duyệt:

   http://localhost:3000
