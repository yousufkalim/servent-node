/**
 * User auth routes
 * @author Shuja Naqvi
 */
const router = require("express").Router();
const auth = require("../controllers/auth");
const {
  validateLogin,
  isValidated,
  changePasswordValidate,
  ForgetPasswordValidate,
} = require("../middleware/validators");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post user login
 * @method get check auth
 * @method put change password
 * @method post forgot email
 */

// Read
router.post("/loginHomeAdmin", validateLogin, isValidated, auth.loginHomeAdmin); // Get all users at once
router.post("/loginStaff", validateLogin, isValidated, auth.loginStaff); // Get all users at once
router.put(
  "/changePasswordHomeAdmin/:userId",
  changePasswordValidate,
  isValidated,
  auth.changePasswordHomeAdmin
); // Change password route

//changeStaffPassword
router.put(
  "/changeStaffPassword/:userId",
  changePasswordValidate,
  isValidated,
  auth.changeStaffPassword
); // Change password route

router.put(
  "/forgotHomeAdminPassword/:email",
  ForgetPasswordValidate,
  isValidated,
  auth.forgotHomeAdminPassword
); // Change password route

// Export
module.exports = router;
