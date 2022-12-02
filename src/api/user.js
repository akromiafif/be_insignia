const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

router.delete("/user", async (req, res) => {
  const jwtToken = req.body.access_token;
  const result = jwt.verify(jwtToken, process.env.JWT_SECRET);

  const delUserWithEmail = await User.destroy({
    where: { email: result.email },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (delUserWithEmail)
    return res.status(400).json({ message: "User deleted successfully" });

  res.json({
    message: "User not found",
  });
});

router.put("/user", async (req, res) => {
  const jwtToken = req.body.access_token;
  const result = jwt.verify(jwtToken, process.env.JWT_SECRET);

  const fullName = req.body.fullName;
  const username = req.body.username;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const password = req.body.password;

  const updateUserWithEmail = await User.update(
    {
      fullName,
      username,
      phoneNumber,
      email,
      password,
    },
    {
      where: { email: result.email },
    }
  ).catch((err) => {
    console.log("Error: ", err);
  });

  if (updateUserWithEmail)
    return res.status(400).json({
      message: "User updated successfully",
    });

  res.json({
    message: "User not found",
  });
});

module.exports = router;
