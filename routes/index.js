/**
 * All api routes handles here
 * @author Shuja Naqvi
 */
const router = require("express").Router();

// Parent Routes
router.use("/admins", require("./admins")); // All the user routes
router.use("/homeAdmins", require("./homeadmins")); // All the home admin routes
router.use("/homes", require("./homes")); // All the home admin routes
router.use("/otps", require("./otps")); // All the user routes
router.use("/auth", require("./auth")); // All the auth routes
router.use("/servants", require("./servants")); // All the auth routes
router.use("/tasks", require("./tasks")); // All the auth routes
router.use("/unavailabillity", require("./unavailabillity")); // All the auth routes
router.use("/members", require("./members")); // All the user routes
router.use("/notifications", require("./notifications")); // All the user routes
router.use("/paymenthistory", require("./payhistory")); // All the user routes
router.use("/expenses", require("./expenses")); // All the user routes
router.use("/transactions", require("./transactions")); // All the user routes
router.use("/chats", require("./chats")); // All the user routes
// Export
module.exports = router;
//
