const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Order = require("./order");
const redisClient = require("../database/redis");

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
  // {
  //   hooks: {
  //     afterSave: (user, options) => {
  //       redisClient.del("users");
  //     },
  //     afterDestroy: (user, options) => {
  //       redisClient.del("users");
  //     },
  //     afterUpdate: (user, options) => {
  //       redisClient.del("users");
  //     },
  //     afterUpsert: (user, options) => {
  //       console.log("afterUpsert");
  //       redisClient.del("users");
  //     },
  //   },
  // }
);

Customer.hasMany(Order, { foreignKey: "customerId" });
module.exports = Customer;
