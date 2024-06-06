const express = require("express");
const jobs = require("../Models/jobs");
const router = express.Router();

router.get("/getJobsData", async (req, res) => {
  try {
    const jobsData = await jobs.find();
    res.json(jobsData);
  } catch (error) {
    console.log("Error: Cannot find jobsData");
    res.status(400).json({ error: "Cannot find jobsData" });
  }
});

module.exports = router;