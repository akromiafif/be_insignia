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

module.exports = router;
