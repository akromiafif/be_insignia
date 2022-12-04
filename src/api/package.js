const express = require("express");
const Package = require("../models/package");

const router = express.Router();

router.post("/package", async (req, res) => {
  const { name, description, price, image } = req.body;

  const newPackage = new Package({
    name,
    image,
    description,
    price,
  });

  const savedPackage = await newPackage.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot create package at this timme" });
  });

  if (savedPackage) res.json({ message: "Package created successfully" });
});

router.get("/package", async (req, res) => {
  const allPackages = await Package.findAll().catch((err) => {
    console.log("Error: ", err);
  });

  if (allPackages)
    return res.status(200).json({
      message: "Get all packages information",
      result: allPackages,
    });

  res.json({
    message: "Packages not found",
  });
});

router.get("/package/:id", async (req, res) => {
  const id = req.params.id;

  const packageById = await Package.findOne({
    where: { id },
  }).catch((err) => {
    console.log("Error: ", err);
  });

  if (packageById)
    return res.status(200).json({
      message: "Get package information",
      result: packageById,
    });

  res.json({
    message: "Package not found",
  });
});

module.exports = router;
