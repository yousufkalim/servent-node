const router = require("express").Router();
const expenses = require("../controllers/Expenses");
const { validateExpense, isValidated } = require("../middleware/validators");
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post expense History Create
 * @method get get expense History By Id
 * @method put update expense History
 */
// expense History
router.post("/", validateExpense, isValidated, expenses.create);
router.get("/getByServant/:servantId", expenses.getByServant);
router.get("/:expenseId", expenses.getById);
router.put("/:expenseId", validateExpense, isValidated, expenses.update);

module.exports = router;
