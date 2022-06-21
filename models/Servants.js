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
    role: {
      type: String,
      default: "servant",
      enum: ["servant"],
    },
    dob: Date,
    home: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "homes",
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks",
      },
    ],
    unavailabillity: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "servantunavailabillity",
      },
    ],
    email: String,
    category: String,
    photo: String,
    password: String,
    age: Number,
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("servants", servantSchema);
