const router = require("express").Router();
const PayHistory = require("../controllers/payhistory");
const { validatePayment, isValidated } = require("../middleware/validators");
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post Payment History Create
 * @method get get Payment History By Id
 * @method put update Payment History
 */
// Payment History
router.post("/", validatePayment, isValidated, PayHistory.create);
router.get("/getByServant/:servantId", PayHistory.getAll);
router.get("/:paymentId", PayHistory.getById);
router.put("/:paymentId", validatePayment, isValidated, PayHistory.update);

module.exports = router;
//
