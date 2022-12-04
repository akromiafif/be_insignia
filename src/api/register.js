const express = require("express");
const Customer = require("../models/customer");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, address, phoneNumber, email, password } = req.body;

  const alreadyExistsUser = await Customer.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (alreadyExistsUser) {
    return res.status(409).json({ message: "User with email already exists!" });
  }

  const newUser = new Customer({
    name,
    email,
    password,
    address,
    phoneNumber,
  });

  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser) res.json({ message: "Thanks for registering" });
});

module.exports = router;
