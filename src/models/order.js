const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const OrderDetail = require("./order-detail");

const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  orderNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Order.hasOne(OrderDetail, { foreignKey: "orderId" });
module.exports = Order;
