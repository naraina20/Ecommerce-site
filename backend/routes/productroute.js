const express = require("express");
const {
  getallproduct,
  createnewproduct,
  updateproduct,
  deleteproduct,
  getproductdetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
  getProductsByCat,
} = require("../controllers/productcontroller");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authentication");

const router = express.Router();

router.route("/products").get(getallproduct);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"), createnewproduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateproduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteproduct);

router.route("/product/:id").get(getproductdetails);
router.route("/products/:id").get(getProductsByCat);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
