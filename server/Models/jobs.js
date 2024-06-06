const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  CompName: {
    type: String,
    required: true,
  },
  JobTitle: {
    type: String,
    required: true,
  },
  JobDesc: {
    type: String,
    required: true,
  },
  Requirements: {
    type: String,
    required: true,
  },
  JobType: {
    type: String,
    required: true,
  },
  Salary: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Jobs", JobSchema);
