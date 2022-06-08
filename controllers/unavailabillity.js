/**
 * Task CRUD controllers
 * @author Shuja Naqvi
 */
const Unavailabillity = require("../models/ServantUnavailabillity");
const Homes = require("../models/Homes");
const Servants = require("../models/Servants");
const io = require("../index");
const socket = require("../index");
const Notifications = require("../models/Notifications");
//
/**
 * Update home
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    const servant = await Servants.findById(req.body.servant).populate("home");
    if (!servant) {
      res.status(404).json({ success: false, message: "Invalid  Servant Id" });
    }
    if (io.socket) {
      io.socket.emit(`${servant.home._id}Leave Request`, {
        message: `${servant.name} wants leave`,
      });
    }
    await Notifications.create({
      servant: servant._id,
      title: `${servant.name} wants leave`,
      home_admin: servant.home.home_admin,
    });
    const unavailabillity = await Unavailabillity.create(req.body); // Updating the home
    servant.unavailabillity.push(unavailabillity._id);
    await servant.save();
    res.json({ success: true, unavailabillity }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
/**
 * Get all servants
 * @param {object} req
 * @param {object} res
 */
exports.getAll = async (req, res) => {
  try {
    const unavailabillity = await Unavailabillity.find().populate("servant"); // Finding all the leaves from db
    res.json({ success: true, unavailabillity }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get task by id
 * @param {object} req
 * @param {object} res
 */
exports.getById = async (req, res) => {
  try {
    const requestId = req.params.requestId; // Getting requestId from URL parameter
    const unavailabillity = await Unavailabillity.findById(requestId).populate(
      "servant"
    ); // Finding servant from db
    res.json({ success: true, unavailabillity }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
/**
 * Get servant by id
 * @param {object} req
 * @param {object} res
 */
exports.getByServantId = async (req, res) => {
  try {
    const servantId = req.params.servantId; // Getting requestId from URL parameter
    const unavailabillity = await Unavailabillity.find({
      servant: servantId,
    }).populate("servant"); // Finding servant from db
    res.json({ success: true, unavailabillity }); // Success
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
    const requestId = req.params.requestId; // Getting home id from URL parameter
    const unavailabillity = await Unavailabillity.findByIdAndUpdate(
      requestId,
      req.body,
      {
        new: true,
      }
    ); // Updating the home
    res.json({ success: true, unavailabillity }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * accept
 * @param {object} req
 * @param {object} res
 */
exports.changeStatus = async (req, res) => {
  try {
    let { unavailabillityId, servantId } = req.body;
    const servant = await Servants.findById(servantId).populate("home");
    const unavailabillity = await Unavailabillity.findById(unavailabillityId);
    unavailabillity.status = req.body.status;
    await unavailabillity.save();
    if (io.socket) {
      io.socket.emit(`${servantId}Leave Response`, {
        message: `leave Request ${req.body.status}`,
      });
    }
    await Notifications.create({
      servant: servant._id,
      title: `leave Request ${req.body.status}`,
      home_admin: servant.home.home_admin,
    });
    return res.json({
      success: true,
      message: "leave" + " " + req.body.status,
    }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
