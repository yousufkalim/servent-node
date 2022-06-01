/**
 * User CRUD controllers
 * @author Yousuf Kalim
 */
const HomeAdmins = require("../models/HomeAdmins");
const Staff = require("../models/Servants");
const OTPs = require("../models/OTPs");
const bcrypt = require("bcryptjs");
const bcryptSalt = process.env.BCRYPT_SALT || 10;
const { sendPassword } = require("../utils/sendEmail");

/**
 * Create User - Signup
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    let { email, password } = req.body; // Getting required fields from body
    const existingUser = await HomeAdmins.findOne({ email }); // Finding already existing user
    const userOtp = await OTPs.findOne({ email });
    // Extra Validations
    if (existingUser) {
      // If we found existing user in db
      return res
        .status(409)
        .json({ success: false, message: "User already exists." });
    }
    if (!userOtp?.is_verified) {
      return res
        .status(404)
        .json({ success: false, message: "Account is not verified yet" });
    }
    // Creating User
    req.body.password = bcrypt.hashSync(password, parseInt(bcryptSalt)); // Hashing the password with salt 8
    const user = await HomeAdmins.create(req.body); // Adding user in db

    // Done
    res.json({ success: true, user }); //Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get all users
 * @param {object} req
 * @param {object} res
 */
exports.getAll = async (req, res) => {
  try {
    const users = await HomeAdmins.find(); // Finding all the users from db
    res.json({ success: true, users }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get user by id
 * @param {object} req
 * @param {object} res
 */
exports.getById = async (req, res) => {
  try {
    const userId = req.params.userId; // Getting user id from URL parameter
    const user = await HomeAdmins.findById(userId); // Finding user by id
    res.json({ success: true, user }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Update user
 * @param {object} req
 * @param {object} res
 */
exports.update = async (req, res) => {
  try {
    const userId = req.params.userId; // Getting user id from URL parameter

    // If user want to update it's password
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(
        req.body.password,
        parseInt(bcryptSalt)
      );
    }

    const user = await HomeAdmins.findByIdAndUpdate(userId, req.body, {
      new: true,
    }); // Updating the user
    res.json({ success: true, user }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Delete user
 * @param {object} req
 * @param {object} res
 */
exports.delete = async (req, res) => {
  try {
    const userId = req.params.userId; // Getting user id from URL parameter
    const user = await HomeAdmins.findByIdAndDelete(userId); // Deleting the user
    res.json({ success: true, user }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Create Staff - Signup
 * @param {object} req
 * @param {object} res
 */
exports.createStaff = async (req, res) => {
  try {
    let { email, homeAdminId } = req.body; // Getting required fields from body
    const existingAdmin = await HomeAdmins.findOne({ _id: homeAdminId }); // Finding already existing user
    if (!existingAdmin) {
      return res
        .status(409)
        .json({ success: false, message: "Home Admin Not found" });
    }
    const existingUser = await Staff.findOne({ email }); // Finding already existing user

    // Extra Validations
    if (existingUser) {
      // If we found existing user in db
      return res
        .status(409)
        .json({ success: false, message: "User already exists." });
    }
    let password = Math.random().toString(36).slice(-8); //generate otp of client
    sendPassword(email, password).then(async () => {
      // If email is sent then we have to update the otp n password in db
      req.body.password = bcrypt.hashSync(password, parseInt(bcryptSalt)); // Hashing the password with salt 8
      const staff = await Staff.create(req.body); // Adding user in db
      existingAdmin.servants.push(staff._id);
      await existingAdmin.save();
      // Done
      return res.json({
        success: true,
        message: "Password successfully sent",
        staff,
      });
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
