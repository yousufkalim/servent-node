/**
 * Notification schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");

// Schema
const notificationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    home_admin: {
      type: Schema.Types.ObjectId,
      ref: "home_admins",
    },
    servant: {
      type: Schema.Types.ObjectId,
      ref: "servants",
    },
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("notifications", notificationSchema);
