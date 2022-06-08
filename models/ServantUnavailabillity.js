/**
 * Unavailabillity schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");

// Schema
const unavailabilitySchema = new mongoose.Schema(
  {
    start_date: Date,
    end_date: Date,
    type: String,
    reason: String,
    status: {
      type: String,
      enum: ["accepted", "pending", "rejected"],
      default: "pending",
    },
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
module.exports = mongoose.model("servantunavailabillity", unavailabilitySchema);
