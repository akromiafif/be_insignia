const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./user");

const Tweet = sequelize.define("Tweet", {
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
});

module.exports = Tweet;
