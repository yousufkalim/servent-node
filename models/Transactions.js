/**
 * Transaction schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");

// Schema
const transactionSchema = new mongoose.Schema(
  {
    payment: Number,
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tasks",
    },
    servants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "servants",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("transactions", transactionSchema);
