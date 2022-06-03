const router = require("express").Router();
const transactions = require("../controllers/Transactions");
const {
  validateTransaction,
  isValidated,
} = require("../middleware/validators");
/**
 * ////////////////////////// Routes /////////////////////////
 * @method post expense History Create
 * @method get get expense History By Id
 * @method put update expense History
 */
// expense History
router.post("/", validateTransaction, isValidated, transactions.create);
router.get("/getByExpense/:expenseId", transactions.getByExpense);

module.exports = router;
