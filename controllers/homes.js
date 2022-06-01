/**
 * Home CRUD controllers
 * @author Yousuf Kalim
 */
const Homes = require("../models/Homes");
const HomeAdmins = require("../models/HomeAdmins");

/**
 * Create
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    const homeAdmin = await HomeAdmins.findOne({ _id: req.body.home_admin });
    if (!homeAdmin) {
      return res
        .status(409)
        .json({ success: false, message: "Home Admin Does not Exist" });
    }
    // Getting url of the image
    if (req.file) {
      req.body.photo = req.file.path; // Creating a new property called photo in body object
    }

    const home = await Homes.create(req.body); // Adding user in db
    homeAdmin.home = home._id;
    await homeAdmin.save();

    // Done
    res.json({ success: true, home }); //Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get all Homes
 * @param {object} req
 * @param {object} res
 */
exports.getAll = async (req, res) => {
  try {
    const homes = await Homes.find().populate("home_admin"); // Finding all the Homes from db
    res.json({ success: true, homes }); // Success
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
    const homeId = req.params.homeId; // Getting home id from URL parameter
    const home = await Homes.findById(homeId).populate("home_admin"); // Finding home by id
    res.json({ success: true, home }); // Success
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
    const homeId = req.params.homeId; // Getting home id from URL parameter
    // Getting url of the image
    if (req.file) {
      req.body.photo = req.file.path; // Creating a new property called photo in body object
    }
    const home = await Homes.findByIdAndUpdate(homeId, req.body, { new: true }); // Updating the home
    res.json({ success: true, home }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
