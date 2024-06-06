const express = require("express");
const users = require("../Models/BasicUserDetails");
const router = express.Router();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

router.post("/forgetPassword", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await users.findOne({ email });
    if (!user) {
      return res.json({ message: "User not registered" });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rupalbohra4@gmail.com",
        pass: "qwip dmpd crmo erex",
      },
    });

    var mailOptions = {
      from: "jobnest.portal@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ error, message: "error sending email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
