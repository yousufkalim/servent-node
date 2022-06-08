/**
 * expenses CRUD controllers
 * @author Shuja Naqvi
 */
const Expenses = require("../models/Expenses");
//
/**
 * Create
 * @param {object} req
 * @param {object} res
 */
exports.create = async (req, res) => {
  try {
    const existingExpense = await Expenses.findOne({
      servant: req.body.servant,
    });
    if (existingExpense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense Already Created" });
    }
    const expenses = await Expenses.create(req.body); // Adding user in db
    // Done
    res.json({ success: true, expenses }); //Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get all histories
 * @param {object} req
 * @param {object} res
 */
exports.getByServant = async (req, res) => {
  try {
    const servantId = req.params.servantId;
    const expenses = await Expenses.findOne({ servant: servantId }).populate(
      "transactions"
    ); // Finding all the histories from db
    res.json({ success: true, expenses }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Get expense by id
 * @param {object} req
 * @param {object} res
 */
exports.getById = async (req, res) => {
  try {
    const expenseId = req.params.expenseId; // Getting expense id from URL parameter
    const expenses = await Expenses.findById(expenseId).populate(
      "transactions"
    );
    res.json({ success: true, expenses }); // Success
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * Update balance
 * @param {object} req
 * @param {object} res
 */
exports.update = async (req, res) => {
  try {
    const expenseId = req.params.expenseId; // Getting expense id from URL parameter
    let expense = await Expenses.findById(expenseId);
    if (expense) {
      expense.total_balance = +expense.total_balance + +req.body.total_balance;
      expense.remaining_amount =
        +expense.remaining_amount + +req.body.total_balance;
      await expense.save();
      return res.json({ success: true, expense }); // Success
    }
    res.status(500).json({ success: false, message: "Expense not found" });
  } catch (err) {
    // Error handling
    console.log("Error ----> ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
