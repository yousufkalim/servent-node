/**
 * PayHistory CRUD controllers
 * @author Shuja Naqvi
 */
const PayHistory = require("../models/PayHistory");

/**
 * Create
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    const payhistory = await PayHistory.create(req.body); // Adding user in db
    // Done
    res.json({ success: true, payhistory }); //Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get all histories
 * @param {object} req
 * @param {object} res
 */
exports.getAll = async (req, res) => {
  try {
    const servantId = req.params.servantId;
    const payhistory = await PayHistory.find({ servant: servantId }); // Finding all the histories from db
    res.json({ success: true, payhistory }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get payment by id
 * @param {object} req
 * @param {object} res
 */
exports.getById = async (req, res) => {
  try {
    const paymentId = req.params.paymentId; // Getting home id from URL parameter
    const payhistory = await PayHistory.findById(paymentId);
    res.json({ success: true, payhistory }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Update payhistory
 * @param {object} req
 * @param {object} res
 */
exports.update = async (req, res) => {
  try {
    const paymentId = req.params.paymentId; // Getting payment id from URL parameter
    const payhistory = await PayHistory.findByIdAndUpdate(paymentId, req.body, {
      new: true,
    }); // Updating the home
    res.json({ success: true, payhistory }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
