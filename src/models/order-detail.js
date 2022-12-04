const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Package = require("./package");

const OrderDetail = sequelize.define("OrderDetail", {
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

OrderDetail.belongsTo(Package, { foreignKey: "packageId" });
module.exports = OrderDetail;
