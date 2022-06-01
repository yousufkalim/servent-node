/**
 * Home Admin schema
 * @author Shuja Naqvi
 */
const mongoose = require("mongoose");

// Schema
const home_adminSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phone_number: Number,
    dob: Date,
    role: {
      type: String,
      enum: ["admin", "family_member"],
      default: "admin",
    },
    home: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "homes",
    },
    servants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "servants",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Model
module.exports = mongoose.model("home_admins", home_adminSchema);
