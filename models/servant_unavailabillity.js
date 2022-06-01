/**
 * Unavailabillity schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");

// Schema
const unavailabilitySchema = new mongoose.Schema(
  {
    date: {
      start_date: Date,
      end_date: Date,
    },
    title: String,
    reason: String,
    status: {
      type: String,
      enum: ["accepted", "pending"],
    },
    home: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "homes",
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
