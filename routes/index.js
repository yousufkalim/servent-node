/**
 * All api routes handles here
 * @author Shuja Naqvi
 */
const router = require("express").Router();

// Parent Routes
router.use("/admins", require("./admins")); // All the user routes
router.use("/homeAdmins", require("./homeAdmins")); // All the home admin routes
router.use("/homes", require("./homes")); // All the home admin routes
router.use("/otps", require("./otps")); // All the user routes
router.use("/auth", require("./auth")); // All the auth routes

// Export
module.exports = router;
