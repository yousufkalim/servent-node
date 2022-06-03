/**
 * Transaction schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");

// Schema
const transactionSchema = new mongoose.Schema(
  {
    payment: Number,
    expense: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "expenses",
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tasks",
    },
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("transactions", transactionSchema);
