const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const redisClient = require("../database/redis");

const Tweet = sequelize.define(
  "Tweet",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    like: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      afterSave: (tweet, options) => {
        redisClient.del("allTweets");
      },
      afterDestroy: (tweet, options) => {
        redisClient.del("allTweets");
      },
      afterUpdate: (tweet, options) => {
        redisClient.del("allTweets");
      },
      afterUpsert: (tweet, options) => {
        redisClient.del("allTweets");
      },
    },
  }
);

module.exports = Tweet;
