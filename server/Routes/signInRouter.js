const express = require("express");
const users = require("../Models/BasicUserDetails");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const nodemailer = require("nodemailer");

router.post("/signInRouter", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ email });
    if (!user) {
      return res.json({ message: "User is not signed up!" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ message: "Incorrect Password" });
    }
    const token = jwt.sign({ email: user.email }, process.env.KEY);
    // res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    return res.json({ status: true, token, message: "login successful" });
  } catch (error) {
    console.log(error);
  }
});

// router.post("/forgetPassword", async (req, res) => {
//   const { email } = req.body();

//   const user = await users.findOne({ email });
//   if (!user) {
//     return res.json({ message: "User not registered" });
//   }

//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "jobnest.portal@gmail.com",
//       pass: "mqtq fcva mkhr yvfm",
//     },
//   });

//   var mailOptions = {
//     from: "youremail@gmail.com",
//     to: email,
//     subject: "Reset Password",
//     text: `http://localhost:5173/resetPassword/${token}`,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log("Error sending email", error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// });

module.exports = router;
