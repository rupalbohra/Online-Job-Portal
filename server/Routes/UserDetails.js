const express = require("express");
const router = express.Router();
const users = require("../Models/BasicUserDetails");
const userEduDetails = require("../Models/EduUserDetails");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const EduUserDetails = require("../Models/EduUserDetails");

router.get("/getEmail", async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.KEY);
    res.json({ email: decoded.email });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error occured while fetching email" });
  }
});
router.get("/basicUserData", async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.KEY);
    const user = await users.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
});
router.post("/addSocialMedia", async (req, res) => {
  try {
    const { email, selectedPlatform, profileLink } = req.body;

    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.socialMediaProfile[selectedPlatform] = profileLink;
    await user.save();

    res
      .status(200)
      .json({ message: "Social media profile updated successfully" });
  } catch (error) {
    console.error("Error updating social media profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/edit", async (req, res) => {
  try {
    const { email, profileEdits, selectedEdit } = req.body;

    const user = await users.findOne({ email });
    if (!user) {
      console.log("user is  not present");
      return res.status(404).json({ error: "User not found" });
    }

    user[selectedEdit] = profileEdits;
    await user.save();
    res.json({ message: "Updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Edit Unsuccessful" });
  }
});

router.post("/eduDetailsPost", async (req, res) => {
  try {
    const {
      email,
      SchoolName,
      EduLevel,
      ProgramName,
      CurrentStatus,
      StartingDate,
      EndingDate,
      Grade,
    } = req.body;
    const user = await users.findOne({ email });

    if (!user) {
      console.log("User is  not present");
      return res.json({ error: "User not found" });
    }

    const alreadyExist = await EduUserDetails.findOne({
      email: email,
      SchoolName: SchoolName,
      ProgramName: ProgramName,
    });
    if (alreadyExist) {
      return res.json({ message: "User Education details already exist" });
    }
    const newUserDetails = new userEduDetails({
      email,
      SchoolName,
      EduLevel,
      ProgramName,
      CurrentStatus,
      StartingDate,
      EndingDate,
      Grade,
    });
    await newUserDetails.save();
    console.log({
      status: true,
      message: "User Education details submitted is created successfully",
    });
    return res.json({
      message: "User Education details submitted is created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
});

router.get("/getEduDetails", async (req, res) => {
  try {
    const { email } = req.query;

    const userBasicDetails = await users.findOne({ email });
    const userEduDetails = await EduUserDetails.find({ email });
    if (!userBasicDetails || !userEduDetails) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ userEduDetails });
  } catch (error) {
    console.log(error);
  }
});

router.post("/editEduDetails", async (req, res) => {
  try {
    const {
      email,
      SchoolName,
      EduLevel,
      ProgramName,
      CurrentStatus,
      StartingDate,
      EndingDate,
      Grade,
    } = req.body;

    const userBasicDetails = users.findOne({ email });
    const userEduDetails = EduUserDetails.findOne({
      email: email,
      SchoolName: SchoolName,
      ProgramName: ProgramName,
    });

    if (!userBasicDetails || !userEduDetails) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await EduUserDetails.findOneAndUpdate(
      { email },
      {
        email,
        SchoolName,
        EduLevel,
        ProgramName,
        CurrentStatus,
        StartingDate,
        EndingDate,
        Grade,
      },
      { new: true }
    );

    return res.json({
      updatedUser,
      message: "User Education details updated successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteEduDetails", async (req, res) => {
  const { email, SchoolName, ProgramName } = req.body;

  try {
    const record = await EduUserDetails.findOneAndDelete({
      email,
      SchoolName,
      ProgramName,
    });
    if (!record) {
      return res.json("No Such Detail Found");
    }
    return res.status(200).json("Record deleted successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).json("An error occurred while deleting the record");
  }
});
module.exports = router;
