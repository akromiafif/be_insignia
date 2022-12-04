const express = require("express");
const jwt = require("jsonwebtoken");
const redisClient = require("../database/redis");
const Customer = require("../models/customer");

const router = express.Router();

router.get("/user", async (req, res) => {
  const cacheUser = await redisClient.get("users");

  if (cacheUser) {
    return res.status(200).json({
      message: "Get user information from cache",
      result: { user: JSON.parse(cacheUser) },
    });
  } else {
    const jwtToken = req.headers.authorization.split(" ")[1];
    const result = jwt.verify(jwtToken, process.env.JWT_SECRET);

    const userWithEmail = await Customer.findOne({
      where: { email: result.email },
    }).catch((err) => {
      console.log("Error: ", err);
    });

    await redisClient.set("users", JSON.stringify(userWithEmail));

    if (userWithEmail)
      return res.status(200).json({
        message: "Get user information",
        result: { user: userWithEmail },
      });

    res.json({
      message: "User not found",
    });
  }
});

router.delete("/user", async (req, res) => {
  const jwtToken = req.headers.authorization.split(" ")[1];
  const result = jwt.verify(jwtToken, process.env.JWT_SECRET);

  const delUserWithEmail = await Customer.destroy({
    where: { email: result.email },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (delUserWithEmail)
    return res.status(200).json({ message: "User deleted successfully" });

  res.json({
    message: "User not found",
  });
});

router.put("/user", async (req, res) => {
  const jwtToken = req.headers.authorization.split(" ")[1];
  const result = jwt.verify(jwtToken, process.env.JWT_SECRET);

  const fullName = req.body.fullName;
  const username = req.body.username;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const password = req.body.password;

  const updateUserWithEmail = await Customer.upsert({
    id: result.id,
    fullName,
    username,
    phoneNumber,
    email,
    password,
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (updateUserWithEmail)
    return res.status(200).json({
      message: "User updated successfully",
    });

  res.json({
    message: "User not found",
  });
});

router.patch("/user", async (req, res) => {
  const jwtToken = req.headers.authorization.split(" ")[1];
  const result = jwt.verify(jwtToken, process.env.JWT_SECRET);

  const password = req.body.password;

  const updateUserWithEmail = await Customer.update(
    {
      password,
    },
    { where: { email: result.email } }
  ).catch((err) => {
    console.log("Error: ", err);
  });

  if (updateUserWithEmail)
    return res.status(200).json({
      message: "User updated successfully",
    });

  res.json({
    message: "User not found",
  });
});

module.exports = router;
