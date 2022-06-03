/**
 * Notification schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");

// Schema
const notificationSchema = new mongoose.Schema(
  {
    title: String,
    seenAdmin: {
      type: Boolean,
      default: false,
    },
    seenServant: {
      type: Boolean,
      default: false,
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
module.exports = mongoose.model("notifications", notificationSchema);
