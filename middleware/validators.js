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

exports.validateMember = [
  check("name", "Name is required.").notEmpty().trim(),
  check("email", "Email is required.").notEmpty().isEmail().trim(),
  check("role", "Role is not correct member").isIn(["member"]),
  check("age", "age is required").notEmpty().trim(),
  check("relation", "relation is required").notEmpty().trim(),
  check("adminId", "adminId is required").notEmpty().trim(),
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
  check("adminId", "adminId  is  required").notEmpty().trim(),
];
//validateChat
exports.validateChat = [
  check("servant", "servantId is required").notEmpty().trim(),
  check("home_admin", "HomeAdmin Id is required.").notEmpty().trim(),
  check("message", "message is required").notEmpty().trim(),
];
//validateChat
exports.validateGetServantChat = [
  check("servant", "servant Id is required.").notEmpty().trim(),
];
exports.validateGetAdminChat = [
  check("home_admin", "HomeAdmin Id is required.").notEmpty().trim(),
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
exports.validatePayment = [
  check("servant", "servantId is required.").notEmpty().trim(),
  check("amount", "amount is required.").notEmpty().trim(),
];

exports.validateExpense = [
  check("servant", "servantId is required.").notEmpty().trim(),
  check("total_balance", "total_balance is required.").notEmpty().trim(),
];
exports.validateTransaction = [
  check("payment", "payment is required.").notEmpty().trim(),
  check("expense", "expenseId is required.").notEmpty().trim(),
  check("task", "taskId is required.").notEmpty().trim(),
];
exports.validateServant = [
  check("phone_number", "phone_number is required.").notEmpty().trim(),
  check("email", "email is required.").notEmpty().trim(),
  check("name", "name is  required").notEmpty().trim(),
];

exports.validateTask = [
  check("title", "title is required.").notEmpty().trim(),
  check("description", "description is required.").notEmpty().trim(),
  check("type", "type is required.").notEmpty().trim(),
  check("home", "homeId is required.").notEmpty().trim(),
  check("servant", "servantId is required.").notEmpty().trim(),
  check("deadline_date", "deadline_date is  required").notEmpty().trim(),
];
exports.validateStatusTask = [
  check("servantId", "servantId is required.").notEmpty().trim(),
  check("taskId", "taskId is required.").notEmpty().trim(),
  check(
    "status",
    "status is not correct accpeted/rejected/completed/in_progress"
  ).isIn(["accepted", "rejected", "in_progress", "completed"]),
];
exports.validateStatus = [
  check(
    "status",
    "status is not correct accpeted/rejected/completed/in_progress"
  ).isIn(["accepted", "pending", "in_progress", "completed"]),
];

exports.validateUnavailabillity = [
  check("type", "type is required.").notEmpty().trim(),
  check("reason", "reason is required.").notEmpty().trim(),
  check("servant", "servantId is required.").notEmpty().trim(),
  check("start_date", "start_date is required.").notEmpty().trim(),
  check("end_date", "end_date is required.").notEmpty().trim(),
];
exports.validateStatusUnavailabillity = [
  check("servantId", "servantId is required.").notEmpty().trim(),
  check("unavailabillityId", "unavailabillityId is required.")
    .notEmpty()
    .trim(),
  check("status", "status is not correct accpeted/rejected").isIn([
    "accepted",
    "rejected",
  ]),
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
