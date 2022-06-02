/**
 * Task CRUD controllers
 * @author Shuja Naqvi
 */
const Tasks = require("../models/Tasks");
const Homes = require("../models/Homes");
const Servants = require("../models/Servants");
const io = require("../index");
const socket = require("../index");
const Notifications = require("../models/Notifications");

/**
 * Update home
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    // Getting url of the image
    if (req.file) {
      req.body.photo = req.file.path; // Creating a new property called photo in body object
    }
    const home = await Homes.findById(req.body.home);
    if (!home) {
      res.status(404).json({ success: false, message: "Invalid Home Id" });
    }
    const task = await Tasks.create(req.body); // Updating the home
    home.tasks.push(task._id);
    await home.save();
    if (io.socket) {
      io.socket.emit(`${req.body.servant}Task Assign`, {
        message: `You have been assigned a new task `,
      });
    }
    await Notifications.create({
      servant: req.body.servant,
      title: `You have been assigned a new task`,
      home_admin: home.home_admin,
    });
    res.json({ success: true, task }); // Success
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
    const tasks = await Tasks.find()
      .populate("servant")
      .populate("home_admin")
      .populate("home"); // Finding all the Homes from db
    res.json({ success: true, tasks }); // Success
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
    const taskId = req.params.taskId; // Getting task id from URL parameter
    const task = await Tasks.findById(taskId)
      .populate("home")
      .populate("servant")
      .populate("home_admin"); // Finding servant from db
    res.json({ success: true, task }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
//

/**
 * Get task by Servant Id
 * @param {object} req
 * @param {object} res
 */
exports.getByServantId = async (req, res) => {
  try {
    const servantId = req.params.servantId; // Getting task id from URL parameter
    const task = await Tasks.find({ servant: servantId })
      .populate("home")
      .populate("servant")
      .populate("home_admin"); // Finding servant from db
    res.json({ success: true, task }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
//getByHomeId
/**
 * Get task by Home Id
 * @param {object} req
 * @param {object} res
 */
exports.getByHomeId = async (req, res) => {
  try {
    const homeId = req.params.homeId; // Getting Home id from URL parameter
    const task = await Tasks.find({ home: homeId })
      .populate("home")
      .populate("servant")
      .populate("home_admin"); // Finding servant from db
    res.json({ success: true, task }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
exports.getByStatus = async (req, res) => {
  try {
    const task = await Tasks.find({ status: req.body.status })
      .populate("home")
      .populate("servant")
      .populate("home_admin"); // Finding servant from db
    res.json({ success: true, task }); // Success
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
    const taskId = req.params.taskId; // Getting home id from URL parameter
    // Getting url of the image
    if (req.file) {
      req.body.photo = req.file.path; // Creating a new property called photo in body object
    }
    const task = await Tasks.findByIdAndUpdate(taskId, req.body, {
      new: true,
    }); // Updating the home
    res.json({ success: true, task }); // Success
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
exports.changeTask = async (req, res) => {
  try {
    let { taskId, servantId } = req.body;
    const task = await Tasks.findById(taskId).populate("home");
    if (task?.servant == servantId) {
      const servant = await Servants.findById(task.servant);
      task.status = req.body.status;
      servant.tasks.push(taskId);
      await task.save();
      await servant.save();
      if (io.socket) {
        io.socket.emit(`${servantId}Task Response`, {
          message: `Task ${req.body.status}`,
        });
      }
      await Notifications.create({
        servant: servantId,
        title: `Task ${req.body.status}`,
        home_admin: task.home.home_admin,
      });
      return res.json({
        success: true,
        message: "task" + " " + req.body.status,
      }); // Success
    }
    res.json({ success: false, message: "invalid servant id" }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
