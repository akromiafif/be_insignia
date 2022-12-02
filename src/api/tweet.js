const express = require("express");
const sequelize = require("sequelize");
const Tweet = require("../models/tweet");
const t = await sequelize.transaction();

const router = express.Router();

router.get("/tweet", async (req, res) => {
  try {
    const tweetUser = await Tweet.findAll({ transaction: t }).catch((err) => {
      console.log("Error: ", err);
    });

    if (tweetUser)
      return res.status(400).json({
        message: "Get tweet information",
        result: tweetUser,
      });

    await t.commit();

    res.json({
      message: "Tweet not found",
    });
  } catch (err) {
    await t.rollback();
  }
});

router.post("/tweet", async (req, res) => {
  const { userId, like, content } = req.body;

  try {
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

    await t, commit();
  } catch (err) {
    await t.rollback();
  }
});

router.delete("/tweet/:id", async (req, res) => {
  const id = req.params.id;

  try {
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

    await t, commit();
  } catch (err) {
    await t.rollback();
  }
});

router.put("/tweet/:id", async (req, res) => {
  const id = req.params.id;

  const userId = req.body.userId;
  const like = req.body.like;
  const content = req.body.content;

  try {
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
        message: "Update tweet successfully",
      });

    res.json({
      message: "Tweet not found",
    });

    await t, commit();
  } catch (err) {
    await t.rollback();
  }
});

router.patch("/tweet/:id", async (req, res) => {
  const id = req.params.id;
  const content = req.body.content;

  try {
    const updateTweetById = await Tweet.update(
      {
        content,
      },
      {
        where: { id },
      }
    ).catch((err) => {
      console.log("Error: ", err);
    });

    if (updateTweetById)
      return res.status(200).json({
        message: "Update tweet successfully",
      });

    res.json({
      message: "Tweet not found",
    });

    await t, commit();
  } catch (err) {
    await t.rollback();
  }
});

module.exports = router;
