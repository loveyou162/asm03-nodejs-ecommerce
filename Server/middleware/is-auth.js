const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
exports.checkClientAuth = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  // 'Beaer [token]'
  let clientLoggedIn;
  let adminLoggedIn;
  let counselorsLoggedIn;
  const token = authorizationHeader.split(" ")[1];
  if (!token) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    console.log(17, err, data);
    if (data.clientLoggedIn) {
      clientLoggedIn = data.clientLoggedIn;
    } else if (data.adminLoggedIn) {
      adminLoggedIn = data.adminLoggedIn;
    } else {
      counselorsLoggedIn = data.counselorsLoggedIn;
    }
    if (err) res.sendStatus(403);
    if (clientLoggedIn || adminLoggedIn) return next();
    return res
      .status(401)
      .json({ message: "Unauthorized, client hoặc admin chưa đăng nhập" });
  });
};
exports.checkAdminAuth = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  // 'Beaer [token]'
  let clientLoggedIn;
  let adminLoggedIn;
  let counselorsLoggedIn;
  const token = authorizationHeader.split(" ")[1];
  if (!token) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    console.log(17, err, data);
    if (data.clientLoggedIn) {
      clientLoggedIn = data.clientLoggedIn;
    } else if (data.adminLoggedIn) {
      adminLoggedIn = data.adminLoggedIn;
    } else {
      counselorsLoggedIn = data.counselorsLoggedIn;
    }
    if (err) res.sendStatus(403);
    if (adminLoggedIn || counselorsLoggedIn) return next();
    return res
      .status(401)
      .json({ message: "Unauthorized, client hoặc admin chưa đăng nhập" });
  });
};
