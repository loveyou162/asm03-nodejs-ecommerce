const express = require("express");
const port = 5000;
const path = require("path");
const app = express();
const mongoose = require("mongoose");

const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const http = require("http");
const server = http.createServer(app);
const initSocketIO = require("./controller/socket");
const User = require("./models/user");
initSocketIO(server);
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const MONGODB_URI = `mongodb+srv://caoboi520:h6QSvZUT90XI8Iu2@cluster0.fdehoqk.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0`;
console.log(24, process.env.ACCESS_TOKEN_SECRET);
const authRoute = require("./router/auth");
const shopRoute = require("./router/shop");
const adminRoute = require("./router/admin");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://admin-nodejs03-d94a9.web.app",
      "https://client-nodejs03-a429d.web.app",
      "http://localhost:5000",
    ],
    credentials: true,
    method: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  })
);

// app.use(helmet());
// Cấu hình chính sách bảo mật nội dung (CSP) cho ứng dụng
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      // Cho phép hiển thị ảnh từ đường dẫn /images
      "img-src": ["'self'", "http://localhost:5000/images"],
    },
  })
);
//dùng compression để nén các file giúp trang web tải nhanh hơn
app.use(compression());
app.use(express.json());
app.use(cookieParser());
//tạo công cụ lưu trữ cho multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Math.random() + "-" + file.originalname);
  },
});

//lọc file ảnh với mimetype
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
//cấu hình multer để nhận được tối đa 4 ảnh
app.use(
  multer({ storage: fileStorage, filter: fileFilter }).array("images", 4)
);
// thiết lập đường dẫn cho file tĩnh /images
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Tách token từ phần "Bearer <token>"
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.error("Invalid token:", err.message);
        return next();
      }

      User.findById(user.user._id)
        .then((foundUser) => {
          if (!foundUser) {
            console.log("User not found.");
            return next();
          }
          console.log(140, foundUser);
          req.user = foundUser;
          next();
        })
        .catch((error) => {
          console.error("Error finding user:", error);
          next(error);
        });
    });
  } else {
    next();
  }
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error });
});

app.use("/auth", authRoute);
app.use("/shop", shopRoute);
app.use("/admin", adminRoute);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    server.listen(port, () => {
      console.log(`app running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
