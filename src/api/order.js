const express = require("express");
const Order = require("../models/order");

const router = express.Router();

router.post("/order", async (req, res) => {
  const { customerId, orderNumber, totalPrice } = req.body;

  const newOrder = new Order({
    customerId,
    orderNumber,
    totalPrice,
  });

  const savedPackage = await newOrder.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot create order at this time" });
  });

  if (savedPackage) res.json({ message: "Order created successfully" });
});

router.get("/order", async (req, res) => {
  const allOrder = await Order.findAll().catch((err) => {
    console.log("Error: ", err);
  });

  if (allOrder)
    return res.status(200).json({
      message: "Get all orders information",
      result: allOrder,
    });

  res.json({
    message: "Orders not found",
  });
});

router.get("/order/:id", async (req, res) => {
  const id = req.params.id;

  const orderById = await Order.findOne({
    where: { id },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (orderById)
    return res.status(200).json({
      message: "Get order information",
      result: orderById,
    });

  res.json({
    message: "Order not found",
  });
});

router.get("/order/customer/:customerId", async (req, res) => {
  const customerId = req.params.customerId;

  const orderByCustomerId = await Order.findAll({
    where: { customerId },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (orderByCustomerId)
    return res.status(200).json({
      message: "Get order by customer information",
      result: orderByCustomerId,
    });

  res.json({
    message: "Order by customer not found",
  });
});

router.delete("/order/:id", async (req, res) => {
  const id = req.params.id;

  const orderById = await Order.destroy({
    where: { id },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (orderById)
    return res.status(200).json({
      message: "Order deleted successfully",
    });

  res.json({
    message: "Order not found",
  });
});

module.exports = router;
