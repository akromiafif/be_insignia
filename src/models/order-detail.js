const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const OrderDetail = sequelize.define("OrderDetail", {
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = OrderDetail;
