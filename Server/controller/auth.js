const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();
let refreshTokens = [];
const { validationResult } = require("express-validator");
const sendEmailService = async (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "caoboi520@gmail.com",
      pass: "dcnzdobumhlxmjrf",
    },
  });
  const info = await transporter.sendMail({
    from: '"Thắng Phạm 👻" <caoboi520@gmail.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  });
  return info;
};
exports.postSignup = async (req, res, next) => {
  const { fullname, email, password, phone, role } = req.body;
  const error = validationResult(req);
  console.log(27, error.array());

  try {
    if (!error.isEmpty()) {
      return res.json({ errMessage: error.array(), isSignup: false });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 12);

    // Tạo người dùng mới
    const user = new User({
      fullname: fullname,
      email: email,
      password: hashedPassword,
      phone: phone,
      role: role,
      cart: {
        items: [],
      },
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await user.save();

    // Gửi email thông báo đăng ký thành công
    const subject = "Signup Succeeded!";
    const html = "<h1>You successfully signed up</h1>";
    await sendEmailService(email, subject, html);
    res.json({ message: "Bạn đã đăng kí thành công", isSignup: true });
  } catch (error) {
    // Xử lý lỗi
    next(error);
  }
};

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const error = validationResult(req);

    const user = await User.findOne({ email: email });
    if (!error.isEmpty()) {
      return res.json({ errMessage: error.array(), isLogin: false });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    const client = {
      clientLoggedIn: true,
      user: user,
      role: user.role,
    };
    const admin = {
      adminLoggedIn: true,
      user: user,
      role: user.role,
    };
    const counselors = {
      counselorsLoggedIn: true,
      user: user,
      role: user.role,
    };
    if (doMatch) {
      const createJWT = (data) => {
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "3600s",
        });
        const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        res.json({
          accessToken,
          refreshToken,
          isLogin: true,
          user: user,
          role: user.role,
        });
      };
      if (user.role === "client") {
        createJWT(client);
      } else if (user.role === "admin") {
        createJWT(admin);
      } else {
        createJWT(counselors);
      }

      console.log("Bạn đã đăng nhập thành công");
    } else {
      return res.json({
        errMessage: [{ msg: "Invalid email or password." }],
        isLogin: false,
      });
    }
  } catch (error) {
    return next(error);
  }
};

exports.postLogouts = (req, res, next) => {
  const refreshToken = req.body.token;
  refreshTokens = refreshTokens.filter((refToken) => refToken !== refreshToken);
  res.sendStatus(200);
};
exports.postRefreshToken = (req, res, next) => {
  const refreshToken = req.body.token;
  console.log(134, refreshTokens);
  console.log(135, refreshToken);
  if (!refreshToken) return res.status(401).send("Refresh token is missing");
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).send("Invalid refresh token");

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    console.log(139, err, data);
    const keyData = Object.entries(data);
    console.log(143, keyData);
    const keys = keyData.map((entry) => entry[0]).slice(0, 3);
    const values = keyData.map((entry) => entry[1]).slice(0, 3);
    const result = keys.reduce((acc, key, index) => {
      acc[key] = values[index];
      return acc;
    }, {});
    console.log(result);
    // const refreshData = {};
    if (err) return res.status(403).send("Failed to verify refresh token");
    const accessToken = jwt.sign(result, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "3600s",
    });
    console.log(146, accessToken);
    res.json({ accessToken });
  });
};
