const router = require("express").Router();
const unavailabillity = require("../controllers/Unavailabillity");
const {
  validateUnavailabillity,
  validateStatusUnavailabillity,
  isValidated,
} = require("../middleware/validators");
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post unavailabillity Create
 * @method get unavailabillity Home By Id
 * @method put unavailabillity Home
 */
//Post
router.post("/", validateUnavailabillity, isValidated, unavailabillity.create);
//Read
router.get("/", unavailabillity.getAll);
router.get("/:requestId", unavailabillity.getById);
router.get("/getByServant/:servantId", unavailabillity.getByServantId);
//update
router.put(
  "/:requestId",
  validateUnavailabillity,
  isValidated,
  unavailabillity.update
);
//accept Task
router.post(
  "/changeStatus",
  validateStatusUnavailabillity,
  isValidated,
  unavailabillity.changeStatus
);

module.exports = router;
