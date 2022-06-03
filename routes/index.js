/**
 * All api routes handles here
 * @author Shuja Naqvi
 */
const router = require("express").Router();

// Parent Routes
router.use("/admins", require("./Admins")); // All the user routes
router.use("/homeAdmins", require("./HomeAdmins")); // All the home admin routes
router.use("/homes", require("./homes")); // All the home admin routes
router.use("/otps", require("./otps")); // All the user routes
router.use("/auth", require("./Auth")); // All the auth routes
router.use("/servants", require("./Servants")); // All the auth routes
router.use("/tasks", require("./Tasks")); // All the auth routes
router.use("/unavailabillity", require("./Unavailabillity")); // All the auth routes
router.use("/members", require("./members")); // All the user routes
router.use("/notifications", require("./Notifications")); // All the user routes
router.use("/paymenthistory", require("./PayHistory")); // All the user routes
router.use("/expenses", require("./expenses")); // All the user routes
router.use("/transactions", require("./transactions")); // All the user routes

// Export
module.exports = router;
