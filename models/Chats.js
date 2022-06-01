/**
 * Notification schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");

// Schema
const chatSchema = new mongoose.Schema(
  {
    users: [
      {
        home_admin: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "home_admins",
        },
        servants: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "servants",
        },
      },
    ],
    message: {
      sender: String,
      receiver: String,
      message: String,
      status: ["seen", "un_seen"],
    },
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("chats", chatSchema);
