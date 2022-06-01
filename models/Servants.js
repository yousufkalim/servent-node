/**
 * Servant schema
 * @author Shuja Naqvo
 */
const mongoose = require("mongoose");

// Schema
const servantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    dob: Date,
    home: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "homes",
    },
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "notifications",
      },
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks",
      },
    ],
    unavailabillity: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "unavailabillity",
      },
    ],
    email: String,
    category: String,
    cnic: String,
    picture: String,
    password: String,
    age: Number,
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("servants", servantSchema);
