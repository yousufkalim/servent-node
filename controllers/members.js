/**
 * Home CRUD controllers
 * @author Shuja Naqvi
 */
const HomeAdmins = require("../models/HomeAdmins");
const Homes = require("../models/Homes");
const mongoose = require("mongoose");

/**
 * Get all servants
 * @param {object} req
 * @param {object} res
 */
exports.getAll = async (req, res) => {
  try {
    const homeId = req.params.homeId; // Getting home id from URL parameter
    const members = await HomeAdmins.find({ home: homeId })
      .populate("home")
      .populate("servants");
    // Finding all the Homes from db
    res.json({ success: true, members }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get home by id
 * @param {object} req
 * @param {object} res
 */
exports.getById = async (req, res) => {
  try {
    const memberId = req.params.memberId; // Getting home id from URL parameter
    const member = await HomeAdmins.findById(memberId)
      .populate("home")
      .populate("servants");
    // Finding servant from db
    res.json({ success: true, member }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Update home
 * @param {object} req
 * @param {object} res
 */
exports.update = async (req, res) => {
  try {
    const memberId = req.params.memberId; // Getting home id from URL parameter
    // Getting url of the image
    if (req.file) {
      req.body.photo = req.file.path; // Creating a new property called photo in body object
    }
    const member = await HomeAdmins.findByIdAndUpdate(memberId, req.body, {
      new: true,
    }); // Updating the home
    res.json({ success: true, member }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get home by id
 * @param {object} req
 * @param {object} res
 */
exports.delete = async (req, res) => {
  try {
    const memberId = req.params.memberId; // Getting home id from URL parameter
    const member = await HomeAdmins.findByIdAndDelete(memberId);
    // Finding servant from db
    await Homes.findOneAndUpdate(
      { members: mongoose.Types.ObjectId(memberId) },
      { $pull: { members: memberId } }
    );
    res.json({ success: true, member }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
