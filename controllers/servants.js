/**
 * Home CRUD controllers
 * @author Shuja Naqvi
 */
const Servants = require("../models/Servants");
/**
 * Get all servants
 * @param {object} req
 * @param {object} res
 */
exports.getAll = async (req, res) => {
  try {
    const servants = await Servants.find()
      .populate("home")
      .populate("tasks")
      .populate("unavailabillity");
    // Finding all the Homes from db
    res.json({ success: true, servants }); // Success
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
    const servantId = req.params.servantId; // Getting home id from URL parameter
    const servant = await Servants.findById(servantId)
      .populate("home")
      .populate("tasks")
      .populate("unavailabillity");
    // Finding servant from db
    res.json({ success: true, servant }); // Success
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
    const servantId = req.params.servantId; // Getting home id from URL parameter
    // Getting url of the image
    if (req.file) {
      req.body.photo = req.file.path; // Creating a new property called photo in body object
    }
    const servant = await Servants.findByIdAndUpdate(servantId, req.body, {
      new: true,
    }); // Updating the home
    res.json({ success: true, servant }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
