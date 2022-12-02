const express = require("express");
const { v4: uuidv4 } = require("uuid");
const Tweet = require("../models/tweet");

const router = express.Router();

router.post("/tweet", async (req, res) => {
  const { userId, like, content } = req.body;

  const newTweet = new Tweet({
    userId,
    like,
    content,
  });
  const savedUser = await newTweet.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot tweeting at the moment!" });
  });

  if (savedUser) res.json({ message: "Thanks for tweeting" });
});

module.exports = router;
