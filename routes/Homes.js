const router = require("express").Router();
const Home = require("../controllers/Homes");
const { upload } = require("../middleware/multer");
const { validateHome, isValidated } = require("../middleware/validators");
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post Home Create
 * @method get get Home By Id
 * @method put update Home
 */
// Home Register
router.post(
  "/",
  upload.single("photo"),
  validateHome,
  isValidated,
  Home.create
);
router.get("/", Home.getAll);
router.get("/:homeId", Home.getById);
router.put(
  "/:homeId",
  upload.single("photo"),
  validateHome,
  isValidated,
  Home.update
);

module.exports = router;
