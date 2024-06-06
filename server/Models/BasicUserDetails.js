const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  College: {
    type: String,
    default: "",
  },
  Address: {
    type: String,
    default: "",
  },
  Summary: {
    type: String,
    default: "",
  },
  socialMediaProfile: {
    LinkedIn: {
      type: String,
      default: "",
    },
    GitHub: {
      type: String,
      default: "",
    },
    Twitter: {
      type: String,
      default: "",
    },
  },
});

module.exports = mongoose.model("basicUserDetails", userSchema);
