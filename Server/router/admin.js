const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/is-auth");
const checkTypeUser = require("../middleware/isTypeUser");

const adminController = require("../controller/admin");
const jwt = require("jsonwebtoken");

router.post(
  "/search-product",
  [checkAuth.checkAdminAuth, checkTypeUser.checkAdmin],
  adminController.postSearchProduct
);
router.get(
  "/all-product",
  [checkAuth.checkAdminAuth, checkTypeUser.checkAdmin],
  adminController.getProductsAdmin
);

router.get(
  "/dashboard",
  [checkAuth.checkAdminAuth, checkTypeUser.checkAdmin],
  adminController.getDashboard
);
router.post(
  "/new-product",
  [checkAuth.checkAdminAuth, checkTypeUser.checkAdmin],
  adminController.postNewProduct
);
router.post(
  "/update-product",
  [checkAuth.checkAdminAuth, checkTypeUser.checkAdmin],
  adminController.postUpdateProduct
);
router.get(
  "/update-product",
  [checkAuth.checkAdminAuth, checkTypeUser.checkAdmin],
  adminController.getUpdateProduct
);
router.delete(
  "/delete-product",
  [checkAuth.checkAdminAuth, checkTypeUser.checkAdmin],
  adminController.deleteProduct
);
router.get(
  "/all-room",
  [checkAuth.checkAdminAuth, checkTypeUser.checkCounselor],
  adminController.getMessage
);
router.get(
  "/detail-room",
  [checkAuth.checkAdminAuth, checkTypeUser.checkCounselor],
  adminController.getDetailMessage
);

////////////////////////user

module.exports = router;
