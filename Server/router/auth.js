const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const User = require("../models/user");
const { body } = require("express-validator");

router.post(
  "/signup",
  [
    body("fullname").notEmpty().withMessage("Fullname is required"),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "Email exists already, please pick a different one."
            );
          }
        });
      }),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 8 characters"
    )
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
    body("phone").notEmpty().withMessage("Phone is required"),
  ],
  authController.postSignup
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject("Không tìm thấy Email của bạn!");
          }
        });
      })
      .trim(),
    body("password", "Password has to be valid.")
      .isLength({ min: 8 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post("/logout", authController.postLogouts);
router.post("/refreshToken", authController.postRefreshToken);
module.exports = router;
