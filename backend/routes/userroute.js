const express = require("express");
const router = express.Router();
const {
  registerUser,
  userlogin,
  userlogout,
  forgotpassword,
  resetpassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  verifyEmail,
} = require("../controllers/usercontroller");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authentication");

router.route("/register").post(registerUser);

router.route("/login").post(userlogin);
router.route("/password/forgot").post(forgotpassword);
router.route("/password/update").put(updatePassword);
router.route("/password/reset/:token").put(resetpassword);

router.route("/logout").get(isAuthenticatedUser, userlogout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
