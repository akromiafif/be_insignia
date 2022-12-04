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

router.get("/order-detail", async (req, res) => {
  const allOrderDetail = await OrderDetail.findAll().catch((err) => {
    console.log("Error: ", err);
  });

  if (allOrderDetail)
    return res.status(200).json({
      message: "Get all order detail information",
      result: allOrderDetail,
    });

  res.json({
    message: "Order details not found",
  });
});

router.get("/order-detail/:id", async (req, res) => {
  const id = req.params.id;

  const orderDetailById = await OrderDetail.findOne({
    where: { id },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (orderDetailById)
    return res.status(200).json({
      message: "Get order detail information",
      result: orderDetailById,
    });

  res.json({
    message: "Order detail not found",
  });
});

router.delete("/order-detail/:id", async (req, res) => {
  const id = req.params.id;

  const orderDetailById = await OrderDetail.destroy({
    where: { id },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (orderDetailById)
    return res.status(200).json({
      message: "Order detail deleted successfully",
    });

  res.json({
    message: "Order detail not found",
  });
});

module.exports = router;
