const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.checkClient = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  // 'Beaer [token]'
  let role;
  const token = authorizationHeader.split(" ")[1];
  if (!token) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    console.log(12, err, data);
    role = data.role;
    if (err) res.sendStatus(403);
    if (!role) return res.status(403).json({ message: "Forbidden" });
    if (role === "admin" || role === "client" || role === "counselors")
      return next();
    return res
      .status(401)
      .json({ message: "Unauthorized, chỉ cho phép từ admin" });
  });
};
exports.checkAdmin = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  // 'Beaer [token]'
  let role;
  const token = authorizationHeader.split(" ")[1];
  if (!token) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    console.log("check admin", err, data);
    role = data.role;
    if (err) res.sendStatus(403);
    if (!role) return res.status(403).json({ message: "Forbidden" });
    if (role === "admin") return next();
    return res
      .status(401)
      .json({ message: "Unauthorized, chỉ cho phép từ admin" });
  });
};
exports.checkCounselor = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  // 'Beaer [token]'
  let role;
  const token = authorizationHeader.split(" ")[1];
  if (!token) res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    console.log(17, err, data);
    role = data.role;
    if (err) res.sendStatus(403);
    if (!role) return res.status(403).json({ message: "Forbidden" });
    if (role === "admin" || role === "counselors") return next();
    return res
      .status(401)
      .json({ message: "Unauthorized, chỉ cho phép từ admin" });
  });
};
