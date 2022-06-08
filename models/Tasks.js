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
    deadline_date: Date,
    photo: String,
    receipt_image: String,
    submission_detail: String,
    status: {
      type: String,
      enum: ["accepted", "pending", "in_progress", "rejected", "completed"],
      default: "pending",
    },
    home_admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "home_admins",
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
module.exports = mongoose.model("tasks", tasksSchema);
