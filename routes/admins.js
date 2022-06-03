const router = require("express").Router();
const { register, login, confirmAuth } = require("../controllers/Admins");
const { checkAdminAuth } = require("../middleware/adminAuth");

// Admin Register
router.post("/", register);
router.post("/login", login);
router.get("/auth", checkAdminAuth, confirmAuth);

module.exports = router;
