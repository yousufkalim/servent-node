const router = require("express").Router();
const members = require("../controllers/members");
const { upload } = require("../middleware/multer");
const { validateServant, isValidated } = require("../middleware/validators");
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post Servant Create
 * @method get get Servant By Id
 * @method put update Servant
 */

router.get("/getByHomeId/:homeId", members.getAll);
router.get("/:memberId", members.getById);
router.put("/:memberId", upload.single("photo"), members.update);
router.delete("/:memberId", members.delete);

module.exports = router;
