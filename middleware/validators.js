/**
 * All the validation
 * @author Yousuf Kalim
 */
const { check, validationResult } = require("express-validator");

/*
====================
Validations
====================
*/

// You can create multiple validations strategies (Read express-validator documentation for more details)
// User Signup Validation
exports.validateUser = [
  check("name", "Name is required.").notEmpty().trim(),
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("role", "Role is not correct admin/member").isIn(["admin", "member"]),
  check("password", "Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 8 }),
];

// User Signup Validation
exports.validateUserUpdate = [
  check("name", "Name is required.").notEmpty().trim(),
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("role", "Role is not correct admin/member").isIn(["admin", "member"]),
  check("homeAdminId", "homeAdmin Id is  required").notEmpty().trim(),
];

// Staff Signup Validation
exports.validatStaff = [
  check("name", "Name is required.").notEmpty().trim(),
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("phone_number", "phone_number is required").notEmpty().trim(),
  check("age", "age is  required").notEmpty().trim(),
  check("category", "category is  required").notEmpty().trim(),
  check("homeAdminId", "homeAdmin Id is  required").notEmpty().trim(),
];

// Login validation
exports.validateLogin = [
  check("email", "Email is required").notEmpty().isEmail().trim().toLowerCase(),
  check("password", "Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 8 }),
];

exports.validateOTPCreate = [
  check("email", "Email is required.").notEmpty().isEmail().trim(),
];
exports.validateOTPVerify = [
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("code", "Code is required.").notEmpty().trim(),
];

// Change password validation
exports.changePasswordValidate = [
  check("oldPassword", "Old Password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 8 }),
  check("newPassword", "New password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 8 }),
  check("confirmPassword", "Confirm password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 8 }),
];
// Change password validation
exports.ForgetPasswordValidate = [
  check("password", " password is required.")
    .notEmpty()
    .trim()
    .isLength({ min: 8 }),
];

exports.validateHome = [
  check("name", "Name is required.").notEmpty().trim(),
  check("type", "type is required.").notEmpty().trim(),
  check("description", "description is required.").notEmpty().trim(),
  check("home_admin", "homeAdmin Id is  required").notEmpty().trim(),
];

exports.validateServant = [
  check("phone", "phone is required.").notEmpty().trim(),
  check("email", "email is required.").notEmpty().trim(),
  check("name", "name is  required").notEmpty().trim(),
];
/*
======================
Result
======================
*/

/**
 * To check if request validated successfully or not, according to our validation strategies
 * @param {object} req
 * @param {object} res
 * @param {*} next
 */
exports.isValidated = (req, res, next) => {
  const errors = validationResult(req); // Validating the request by previous middleware's strategy
  if (!errors.isEmpty()) {
    // On error
    res.status(400).send({ success: false, message: errors.array()[0].msg }); // Sending first error to the client from array of errors
  } else {
    // Validated successfully
    next(); // Pass the request to next middleware or controller
  }
};
