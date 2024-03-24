const express = require("express");
const port = 5000;
const path = require("path");
const app = express();
const mongoose = require("mongoose");
// const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const csrf = require("csurf");
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
const MONGODB_URI = `mongodb+srv://caoboi520:Aw8umOX1tKDxMVsg@cluster0.fdehoqk.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0`;

const csrfProtection = csrf();

const shopRoute = require("./router/shop");
const adminRoute = require("./router/admin");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://admin-nodejs-03-4a9f5.web.app",
      "https://client-nodejs-03-41bd8.web.app",
      "http://localhost:5000",
    ],
    credentials: true,
    method: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  })
);
// //tạo session cho client
// app.use(
//   "/shop",
//   session({
//     secret: "client secret",
//     resave: false,
//     saveUninitialized: false,
//     store: clientStore,
//     cookie: { secure: false, maxAge: 3000 * 60 * 60 },
//   })
// );
// //tạo session cho admin
// app.use(
//   "/admin",
//   session({
//     secret: "admin secret",
//     resave: false,
//     saveUninitialized: false,
//     store: adminStore,
//     cookie: { secure: false, maxAge: 3000 * 60 * 60 },
//   })
// );
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

app.use(
  multer({ storage: fileStorage, filter: fileFilter }).array("images", 5)
);
app.use("/images", express.static(path.join(__dirname, "images")));
app.get("/shop/some-route", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
app.get("/admin/some-route", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
//trong form ở client thêm input hidden có value là csrfToken

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
  res.status(500).json({ message: "error" });
});

// app.use("/user", authRoute);
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
