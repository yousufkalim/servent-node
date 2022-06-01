const router = require("express").Router();
const servant = require("../controllers/homes");
const { upload } = require("../middleware/multer");
const { validateServant, isValidated } = require("../middleware/validators");
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post Home Create
 * @method get get Home By Id
 * @method put update Home
 */

router.get("/", servant.getAll);
router.get("/:servantId", servant.getById);
router.put(
  "/:servantId",
  upload.single("photo"),
  validateServant,
  isValidated,
  servant.update
);

module.exports = router;
