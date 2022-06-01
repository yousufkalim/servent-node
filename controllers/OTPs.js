/**
 * User OTP controllers
 * @author Shuja Naqvi
 */
const OTPs = require("../models/OTPs");
const { sendOTP } = require("../utils/sendEmail");

/**
 * Create OTP
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    let { email } = req.body; // Getting required fields from body
    req.body.otp = Math.floor(100000 + Math.random() * 900000);
    req.body.is_verified = false;
    await sendOTP(email, req.body.otp);
    let otp = await OTPs.findOneAndUpdate({ email }, req.body, {
      upsert: true,
      new: true,
    });
    return res.json({
      success: true,
      message: "OTP sent",
      otp: otp,
    });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//verify Otp
exports.verify = async (req, res) => {
  try {
    let { email, code } = req.body; // Getting required fields from body
    let otp = await OTPs.findOne({ email }); //find otp by id
    if (otp?.otp == code) {
      otp.is_verified = true;
      await otp.save();
      return res.json({
        success: true,
        message: "OTP verified",
        otp: otp,
      });
    }
    //if otp is invalid
    return res
      .status(404)
      .json({ success: false, message: "OTP  or Email is invalid" });
  } catch (err) {
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
