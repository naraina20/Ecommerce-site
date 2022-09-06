const express = require("express");
const { createCategory, getAllCategories } = require("../controllers/categorycontroller");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authentication");
const router = express.Router();

router
  .route("/category/new")
  .post(isAuthenticatedUser,authorizeRoles("admin") ,createCategory);
router
  .route("/categories")
  .get(getAllCategories);

module.exports = router;
