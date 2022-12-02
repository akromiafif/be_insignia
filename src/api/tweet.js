const express = require("express");
const Tweet = require("../models/tweet");

const router = express.Router();

router.get("/tweet", async (req, res) => {
  const tweetUser = await Tweet.findAll().catch((err) => {
    console.log("Error: ", err);
  });

  if (tweetUser)
    return res.status(400).json({
      message: "Get tweet information",
      result: tweetUser,
    });

  res.json({
    message: "Tweet not found",
  });
});

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

router.delete("/tweet/:id", async (req, res) => {
  const id = req.params.id;

  const delTweetWithId = await Tweet.destroy({
    where: { id },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (delTweetWithId)
    return res.status(400).json({ message: "Tweet deleted successfully" });

  res.json({
    message: "Tweet not found",
  });
});

router.put("/tweet/:id", async (req, res) => {
  const id = req.params.id;

  const userId = req.body.userId;
  const like = req.body.like;
  const content = req.body.content;

  const updateTweetById = await Tweet.upsert({
    id,
    userId,
    like,
    content,
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (updateTweetById)
    return res.status(200).json({
      message: "User tweet successfully",
    });

  res.json({
    message: "Tweet not found",
  });
});

module.exports = router;
