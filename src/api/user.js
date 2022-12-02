const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

router.delete("/user", async (req, res) => {
  const jwtToken = req.body.access_token;
  const result = jwt.verify(jwtToken, process.env.JWT_SECRET);

  const userWithEmail = await User.findOne({
    where: { email: result.email },
  }).catch((err) => {
    console.log("Error: ", err);
  });

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

module.exports = router;
