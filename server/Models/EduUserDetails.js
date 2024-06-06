const mongoose = require("mongoose");

const eduSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  SchoolName: {
    type: String,
    required: true,
  },
  EduLevel: {
    type: String,
    required: true,
  },
  ProgramName: {
    type: String,
    required: true,
  },
  CurrentStatus: {
    type: String,
    required: true,
  },
  StartingDate: {
    type: Date,
    required: true,
  },
  EndingDate: {
    type: Date,
    required: true,
  },
  Grade: {
    type: String,
    required: true,
  },
});

const EduUserDetails = mongoose.model("EduUserDetails", eduSchema);

module.exports = EduUserDetails;
