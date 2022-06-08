/**
 * Notification schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");

// Schema
const chatSchema = new mongoose.Schema(
  {
    home_admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "home_admins",
    },
    servant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "servants",
    },
    message: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
        },
        receiver: {
          type: mongoose.Schema.Types.ObjectId,
        },
        message: String,
        status: {
          type: String,
          default: "un_seen",
          enum: ["seen", "un_seen"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("chats", chatSchema);
