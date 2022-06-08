/**
 * Transaction CRUD controllers
 * @author Shuja Naqvi
 */
const Transactions = require("../models/Transactions");
const Expenses = require("../models/Expenses");
//
/**
 * Create
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    let expense = await Expenses.findById(req.body.expense);
    if (!expense) {
      res.status(404).json({ success: false, message: "Invalid Expense Id" });
    }
    expense.expense = +expense.expense + +req.body.payment;
    expense.remaining_amount = +expense.remaining_amount - +req.body.payment;
    expense.total_balance = +expense.total_balance - +req.body.payment;
    const transaction = await Transactions.create(req.body); // Adding user in db
    expense.transactions.push(transaction._id);
    await expense.save();
    // Done
    res.json({ success: true, transaction }); //Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get all transactions
 * @param {object} req
 * @param {object} res
 */
exports.getByExpense = async (req, res) => {
  try {
    const expenseId = req.params.expenseId;
    const transactions = await Transactions.find({
      expense: expenseId,
    })
      .populate("task")
      .populate("expense"); // Finding all the transactions from db
    res.json({ success: true, transactions }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
