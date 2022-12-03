const express = require("express");
const sequelize = require("../database");
const redisClient = require("../database/redis");
const Tweet = require("../models/tweet");

const router = express.Router();

router.get("/tweet", async (req, res) => {
  try {
    const cacheResults = await redisClient.get("allTweets");

    if (cacheResults) {
      return res.status(200).json({
        message: "Get tweet information from cache",
        result: JSON.parse(cacheResults),
      });
    } else {
      const t = await sequelize.transaction();

      const tweetUser = await Tweet.findAll({ transaction: t }).catch((err) => {
        console.log("Error: ", err);
      });

      await redisClient.set("allTweets", JSON.stringify(tweetUser));

      if (tweetUser)
        return res.status(200).json({
          message: "Get tweet information",
          result: tweetUser,
        });

      await t.commit();

      res.json({
        message: "Tweet not found",
      });
    }
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
});

router.post("/tweet", async (req, res) => {
  const t = await sequelize.transaction();
  const { userId, like, content } = req.body;

  try {
    const newTweet = new Tweet({
      userId,
      like,
      content,
    });

    const savedTweet = await newTweet.save({ transaction: t }).catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Cannot tweeting at the moment!" });
    });

    if (savedTweet) res.json({ message: "Thanks for tweeting" });

    await t.commit();
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
});

router.delete("/tweet/:id", async (req, res) => {
  const t = await sequelize.transaction();
  const id = req.params.id;

  try {
    const delTweetWithId = await Tweet.destroy(
      {
        where: { id },
      },
      { transaction: t }
    ).catch((err) => {
      console.log("Error: ", err);
    });

    if (delTweetWithId)
      return res.status(400).json({ message: "Tweet deleted successfully" });

    res.json({
      message: "Tweet not found",
    });

    await t.commit();
  } catch (err) {
    await t.rollback();
  }
});

router.put("/tweet/:id", async (req, res) => {
  const t = await sequelize.transaction();
  const id = req.params.id;

  const like = req.body.like;
  const content = req.body.content;

  try {
    const updateTweetById = await Tweet.upsert(
      {
        id,
        like,
        content,
      },
      { where: id },
      { transaction: t }
    ).catch((err) => {
      console.log("Error: ", err);
    });

    if (updateTweetById)
      return res.status(200).json({
        message: "Update tweet successfully",
      });

    await t.commit();

    res.json({
      message: "Tweet not found",
    });
  } catch (err) {
    console.log(err);
    await t.rollback();
  }
});

router.patch("/tweet/:id", async (req, res) => {
  const t = await sequelize.transaction();
  const id = req.params.id;
  const content = req.body.content;

  try {
    const updateTweetById = await Tweet.update(
      {
        content,
      },
      {
        where: { id },
      },
      { transaction: t }
    ).catch((err) => {
      console.log("Error: ", err);
    });

    if (updateTweetById)
      return res.status(200).json({
        message: "Update tweet successfully",
      });

    await t.commit();

    res.json({
      message: "Tweet not found",
    });
  } catch (err) {
    await t.rollback();
  }
});

module.exports = router;
