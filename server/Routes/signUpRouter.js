const express = require("express");
const users = require("../Models/BasicUserDetails");
const router = express.Router();
const bcrypt = require("bcrypt");
router.post("/signUpRouter", async (req, res) => {
  try {
    const { name, email, password, contact, gender } = req.body;
    const user = await users.findOne({ email });
    if (user) {
      return res.json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10); // 10 = salt
    const newUser = new users({
      name,
      email,
      password: hashpassword,
      contact,
      gender,
    });
    await newUser.save();
    // users.insertMany({ name, email, password, contact, gender });
    console.log("User is created successfully");
    return res.json({ status: true, message: "User is created successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error occured: cannot register user" });
  }
});


module.exports = router;
