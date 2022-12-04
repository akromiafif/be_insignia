const express = require("express");
const OrderDetail = require("../models/order-detail");

const router = express.Router();

router.post("/order-detail", async (req, res) => {
  const { packageId, orderId, quantity } = req.body;

  const newOrderDetail = new OrderDetail({
    packageId,
    orderId,
    quantity,
  });

  const savedPackage = await newOrderDetail.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot create order detail at this time" });
  });

  if (savedPackage) res.json({ message: "Order detail created successfully" });
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

module.exports = router;
