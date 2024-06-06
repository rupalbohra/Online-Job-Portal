// const express = require("express");
// const users = require("../Models/Users");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// router.post("/resetPassword/:token", async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     const decoded = await jwt.verify(token, process.env.KEY);
//     const id = decoded.id;
//     const hashPassword = await bcrypt.hash(password, 10);
//     await users.findByIdAndUpdate({ _id: id }, { password: hashPassword });
//     return res.json({ status: true, message: "update password" });
//   } catch (error) {
//     return res.json("invalid token", error);
//   }
// });

// module.exports = router;

const express = require("express");
const users = require("../Models/BasicUserDetails");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/resetPassword/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);
    await users.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    return res.json({ status: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(400)
      .json({ error: "Invalid token or password", details: error.message });
  }
});

module.exports = router;
