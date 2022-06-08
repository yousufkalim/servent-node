/**
 * Notification routes
 * @author Shuja Naqvi
 */
const router = require("express").Router();
const notifications = require("../controllers/notifications");

/**
 * ////////////////////////// Routes /////////////////////////
 * @method post create Notification
 * @method get get all Notification
 * @method get get Notification by id
 * @method delete delete notifications
 */

// Read
router.get("/getAllServant/:servantId", notifications.getAllServant); // Get all notifications of servants
router.get("/getAllAdmin/:adminId", notifications.getAllAdmin); // Get all notifications of admin
router.get("/:notificationId", notifications.getById); // Get one notification by it's id
// Delete
router.delete("/:notificationId", notifications.delete); // delete a specific quote by it's id
//update
router.put("/seenByServant/:servantId", notifications.seenByServant);
router.put("/seenByAdmin/:adminId", notifications.seenByAdmin);

// Export
module.exports = router;
//
