/**
 * Task schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");

// Schema
const tasksSchema = new mongoose.Schema(
  {
    title: String,
    type: String,
    description: String,
    date: {
      start_time: Date,
      end_time: Date,
    },
    receipt_image: String,
    submission_detail: String,
    status: {
      type: String,
      enum: ["accepted", "pending", "in_progress", "completed"],
    },
    home_admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "home_admins",
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
module.exports = mongoose.model("tasks", tasksSchema);
