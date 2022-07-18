/**
 * User auth controllers
 * @author Yousuf Kalim
 */
const Users = require('../models/HomeAdmins');
const Staff = require('../models/Servants');
const OTPs = require('../models/Otps');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../utils/sendEmail');
const bcryptSalt = process.env.BCRYPT_SALT || 10;
const tokenSecret = process.env.JWT_SECRET;
//
/**
 * Login Home Admin
 * @param {object} req
 * @param {object} res
 */
exports.loginHomeAdmin = async (req, res) => {
  try {
    // Getting email and password
    const { email, password } = req.body;
    const userOtp = await OTPs.findOne({ email });
    if (!userOtp?.is_verified) {
      // If user not found
      return res.status(404).json({ success: false, message: 'User not verified' });
    }
    // Getting user from db
    const user = await Users.findOne({ email });
    if (!user) {
      // If user not found
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (!user) {
      // If user not found
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Comparing password
    const isMatched = bcrypt.compareSync(password, user.password);

    if (!isMatched) {
      // If password not matched
      return res.status(400).json({ success: false, message: 'Invalid Password' });
    }

    // Creating payload with user object
    const payload = { user };

    // Generating token
    jwt.sign(payload, tokenSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;

      // done
      res.json({ success: true, homeAdmin: user, token });
    });
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Login Home Admin
 * @param {object} req
 * @param {object} res
 */
exports.loginMember = async (req, res) => {
  try {
    // Getting email and password
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      // If user not found
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    if (!user) {
      // If user not found
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Comparing password
    const isMatched = bcrypt.compareSync(password, user.password);

    if (!isMatched) {
      // If password not matched
      return res.status(400).json({ success: false, message: 'Invalid Password' });
    }

    // Creating payload with user object
    const payload = { user };

    // Generating token
    jwt.sign(payload, tokenSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;

      // done
      res.json({ success: true, member: user, token });
    });
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Login Home Admin
 * @param {object} req
 * @param {object} res
 */
exports.loginStaff = async (req, res) => {
  try {
    // Getting email and password
    const { email, password } = req.body;
    // Getting user from db
    const user = await Staff.findOne({ email });
    if (!user) {
      // If user not found
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    // Comparing password
    const isMatched = bcrypt.compareSync(password, user.password);

    if (!isMatched) {
      // If password not matched
      return res.status(400).json({ success: false, message: 'Invalid Password' });
    }

    // Creating payload with user object
    const payload = { user };

    // Generating token
    jwt.sign(payload, tokenSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;

      // done
      res.json({ success: true, staff: user, token });
    });
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Change Password
 * @param {object} req
 * @param {object} res
 */
exports.changePasswordHomeAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password and confirm password are not same',
      });
    }

    let user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatched = bcrypt.compareSync(oldPassword, user.password);

    if (!isMatched) {
      return res.status(400).json({ success: false, message: 'Invalid old Password' });
    }

    // Generate token
    user.password = bcrypt.hashSync(newPassword, parseInt(bcryptSalt));

    await user.save();

    res.json({ success: true, user });
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Change Password
 * @param {object} req
 * @param {object} res
 */
exports.changeStaffPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password and confirm password are not same',
      });
    }

    let user = await Staff.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatched = bcrypt.compareSync(oldPassword, user.password);

    if (!isMatched) {
      return res.status(400).json({ success: false, message: 'Invalid old Password' });
    }

    // Generate token
    user.password = bcrypt.hashSync(newPassword, parseInt(bcryptSalt));

    await user.save();

    res.json({ success: true, user });
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Forgot password
 * @param {object} req
 * @param {object} res
 */
exports.forgotHomeAdminPassword = async (req, res) => {
  try {
    let { email } = req.params;

    req.body.otp = Math.floor(100000 + Math.random() * 900000);
    req.body.is_verified = false;
    await sendOTP(email, req.body.otp);
    let otp = await OTPs.findOneAndUpdate({ email }, req.body, {
      upsert: true,
      new: true,
    });
    return res.json({
      success: true,
      message: 'OTP sent',
      otp: otp,
    });
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Forgot password
 * @param {object} req
 * @param {object} res
 */
exports.forgotStaffPassword = async (req, res) => {
  try {
    let { email } = req.params;

    req.body.otp = Math.floor(100000 + Math.random() * 900000);
    req.body.is_verified = false;
    await sendOTP(email, req.body.otp);
    let otp = await OTPs.findOneAndUpdate({ email }, req.body, {
      upsert: true,
      new: true,
    });
    return res.json({
      success: true,
      message: 'OTP sent',
      otp: otp,
    });
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Confirm auth
 * @param {object} req
 * @param {object} res
 */
exports.updatePassword = async (req, res) => {
  try {
    const { email } = req.params;
    const { password } = req.body;
    let staff = await Staff.findOne({ email: email });
    let homeAdmin = await Users.findOne({ email: email });
    req.body.password = bcrypt.hashSync(password, parseInt(bcryptSalt));
    if (staff) {
      staff.password = req.body.password;
      await staff.save();
      return res.json({ success: true, staff: staff });
    }
    if (homeAdmin) {
      homeAdmin.password = req.body.password;
      await homeAdmin.save();
      return res.json({ success: true, Admin: homeAdmin });
    }
    res.json({ success: false, message: 'user not found' });
  } catch (err) {
    // Error handling
    console.log('Error ----> ', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Confirm auth
 * @param {object} req
 * @param {object} res
 */
exports.confirmAuth = async (req, res) => {
  // If user authenticated
  res.json({ success: true, user: req.user });
};
