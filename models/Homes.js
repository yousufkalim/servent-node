/**
 * Home schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");

// Schema
const homesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: String,
    details: String,
    photo: String,
    home_admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "home_admins",
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "home_admins",
      },
    ],
    servant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "servants",
    },
    tasks: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tasks",
    },
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("homes", homesSchema);
