const router = require("express").Router();
const servant = require("../controllers/servants");
const { upload } = require("../middleware/multer");
const { validateServant, isValidated } = require("../middleware/validators");
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post Servant Create
 * @method get get Servant By Id
 * @method put update Servant
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
