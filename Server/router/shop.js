const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/is-auth");
const shopController = require("../controller/shop");
const checkTypeUser = require("../middleware/isTypeUser");
const authController = require("../controller/auth");
const { body } = require("express-validator");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

router.get(
  "/all-product",
  [checkAuth.checkClientAuth, checkTypeUser.checkClient],
  shopController.getAllProducts
);
router.get(
  "/detail-product",
  [checkAuth.checkClientAuth, checkTypeUser.checkClient],
  shopController.getDetailProduct
);
router.post(
  "/add-cart",
  [checkAuth.checkClientAuth, checkTypeUser.checkClient],
  shopController.postCart
);
router.get(
  "/cart",
  [checkAuth.checkClientAuth, checkTypeUser.checkClient],
  shopController.getCart
);
router.post(
  "/delete-cart",
  [checkAuth.checkClientAuth, checkTypeUser.checkClient],
  shopController.postDeleteCartProduct
);
router.post(
  "/decrement-cart",
  [checkAuth.checkClientAuth, checkTypeUser.checkClient],
  shopController.postDecrementCart
);
router.post(
  "/order",
  [
    body("fullname").notEmpty().withMessage("Fullname is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("address").notEmpty().withMessage("Address is required"),
  ],
  [checkAuth.checkClientAuth, checkTypeUser.checkClient],
  shopController.postOrder
);
router.get(
  "/order",
  [checkAuth.checkClientAuth, checkTypeUser.checkClient],
  shopController.getOrder
);
router.post(
  "/order-detail",
  [checkAuth.checkClientAuth, checkTypeUser.checkClient],
  shopController.postOrderDetail
);

module.exports = router;
