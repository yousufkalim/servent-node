/**
 * Expense schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");

// Schema
const expenseSchema = new mongoose.Schema(
  {
    total_balance: {
      type: Number,
      default: 0,
    },
    expense: {
      type: Number,
      default: 0,
    },
    remaining_amount: {
      type: Number,
      default: 0,
    },
    servant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "servants",
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transactions",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("expenses", expenseSchema);
