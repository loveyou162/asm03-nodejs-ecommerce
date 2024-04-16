# Server JSON API Node.js with Assignment 3

Dự án này là một máy chủ Node.js cung cấp dữ liệu dạng JSON thông qua API. Nó sử dụng framework Express.js và các thư viện hỗ trợ khác để xử lý routing, middleware và xử lý dữ liệu.

---

## ✨ Công nghệ sử dụng

- Express.js: Một framework web nhanh, không quan điểm, tối giản cho Node.js.
- bcrypt: Thư viện để mã hóa mật khẩu.
- bcryptjs: Một phiên bản JavaScript của bcrypt để mã hóa mật khẩu.
- compression: Middleware để nén các phản hồi HTTP.
- connect-mongodb-session: Lưu trữ phiên MongoDB cho Express.js.
- cookie-parser: Middleware để phân tích cú pháp cookie.
- cors: Middleware để kích hoạt Chia sẻ nguồn tài nguyên gốc (CORS).
- csurf: Middleware cho bảo vệ CSRF (Cross-Site Request Forgery).
- dotenv: Module để tải biến môi trường từ tệp .env.

- express-session: Middleware để quản lý các phiên trong Express.js.
- express-validator: Middleware cho việc xác minh đầu vào trong Express.js.
- helmet: Middleware để bảo mật ứng dụng Express.js với các tiêu đề HTTP khác nhau.
- jsonwebtoken: Thư viện để tạo và xác minh Mã thông báo Web JSON (JWT).
- mongodb: Bộ điều khiển MongoDB chính thức cho Node.js.
- mongoose: Mô hình đối tượng MongoDB tinh tế cho Node.js.
- multer: Middleware để xử lý multipart/form-data (tải tệp).
- nodemailer: Module để gửi email từ các ứng dụng Node.js.
- nodemon: Tiện ích giám sát các thay đổi trong các ứng dụng Node.js và khởi động lại máy chủ.
- socket.io: Thư viện cho giao tiếp thời gian thực, hai chiều giữa các máy khách web và máy chủ.

#### Chi tiết các version

    "bcrypt": "^5.1.1",
    "bcryptjs": "^2.4.3",
    "compression": "^1.7.4",
    "connect-mongodb-session": "^5.0.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "csurf": "^1.11.0",
    "dotenv": "^16.4.5",
    "ejs": "^3.1.9",
    "express": "^4.18.3",
    "express-session": "^1.18.0",
    "express-validator": "^7.0.1",
    "helmet": "^7.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.4.0",
    "mongoose": "^8.2.1",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.11",
    "nodemon": "^3.1.0",
    "socket.io": "^4.7.4"

## Start

- Sao chép kho lưu trữ

  ```c
  git clone git@github.com:loveyou162/asm03-nodejs-ecommerce.git
  ```

- Cài đặt các phụ thuộc
  ```c
  npm install
  ```
- Thiết lập biến môi trường

  ```c
    ACCESS_TOKEN_SECRET=<chuỗi khóa bí mật>
    REFRESH_TOKEN_SECRET=<chuỗi khóa bí mật>
  ```

## Contributor

    Phạm Đình Thắng

## Contact

Sdt 0348413520
Email: phamdinhthangpdt02@gmail.com
