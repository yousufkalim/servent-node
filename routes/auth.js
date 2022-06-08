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
//
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post user login
 * @method get check auth
 * @method put change password
 * @method post forgot email
 */

// Read
//login
router.post("/loginHomeAdmin", validateLogin, isValidated, auth.loginHomeAdmin);
router.post("/loginStaff", validateLogin, isValidated, auth.loginStaff);
//loginMember
router.post("/loginMember", validateLogin, isValidated, auth.loginMember);
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

router.put("/forgotHomeAdminPassword/:email", auth.forgotHomeAdminPassword); // Change password route
router.put("/forgotStaffPassword/:email", auth.forgotStaffPassword); // Change password route

// Export
module.exports = router;
