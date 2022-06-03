const Notifications = require("../models/Notifications");
const cron = require("node-cron");
/**
 * Get all Notifications of servant
 * @param {object} req
 * @param {object} res
 */
exports.getAllServant = async (req, res) => {
  try {
    const servantId = req.params.servantId;
    const notifications = await Notifications.find({
      servant: servantId,
      seenServant: false,
    }).populate("home_admin");
    if (!notifications)
      return res.status(404).json("notifications does not found");
    return res.status(202).json({ success: true, notifications });
  } catch (err) {
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get all Notifications of admin
 * @param {object} req
 * @param {object} res
 */
exports.getAllAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const notifications = await Notifications.find({
      home_admin: adminId,
      seenAdmin: false,
    }).populate("servant");
    if (!notifications)
      return res.status(404).json("notifications does not found");
    return res.status(202).json({ success: true, notifications });
  } catch (err) {
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * See Notification
 * @param {object} req
 * @param {object} res
 */
exports.seenByServant = async (req, res) => {
  try {
    const servantId = req.params.servantId;
    await Notifications.updateMany(
      { servant: servantId, seenServant: false },
      { seenServant: true }
    );
    return res
      .status(202)
      .json({ success: true, message: "Seen Successfully" });
  } catch (err) {
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * See Notification
 * @param {object} req
 * @param {object} res
 */
exports.seenByAdmin = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    await Notifications.updateMany(
      { home_admin: adminId, seenAdmin: false },
      { seenAdmin: true }
    );
    return res
      .status(202)
      .json({ success: true, message: "Seen Successfully" });
  } catch (err) {
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get notification by id
 * @param {object} req
 * @param {object} res
 */
exports.getById = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const notification = await Notifications.findById(notificationId)
      .populate("home_admin")
      .populate("servant");
    if (!notification) return res.status(404).send("notification not found");
    else return res.status(202).json({ success: true, notification });
  } catch (err) {
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
/**
 * Delete Notification
 * @param {object} req
 * @param {object} res
 */
exports.delete = async (req, res) => {
  try {
    const notificationId = req.params.notificationId;
    const deletedNotification = await Notifications.findByIdAndDelete(
      notificationId
    );
    if (!deletedNotification)
      return res.status(404).json("Can't delete Notification");
    else return res.status(202).json({ success: true, deletedNotification });
  } catch (err) {
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//cron-job that will run after every 10days to delete all expired notifications from DB
cron.schedule("0 5 */10 * *", async () => {
  const timeNow = new Date();
  await Notifications.deleteMany({
    createdAt: { $lt: timeNow },
  });
});
