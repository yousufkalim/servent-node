/**
 * Payment History schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");

// Schema
const payhistorySchema = new mongoose.Schema(
  {
    amount: Number,
    bonus: { type: Number, default: 0 },
    servant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "servants",
    },
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("pay_history", payhistorySchema);
