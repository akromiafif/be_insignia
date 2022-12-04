const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const OrderDetail = require("./order-detail");

const Package = sequelize.define("Package", {
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
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Package.hasOne(OrderDetail, { foreignKey: "packageId" });
module.exports = Package;
