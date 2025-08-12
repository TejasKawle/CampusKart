const express = require("express");
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");

const router = express.Router();

//  Multer Setup for Image Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

//  Add New Product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, price, location, description, userId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const product = new Product({
      title,
      price,
      location,
      description,
      imageUrl,
      user: req.userId, 
    });

    await product.save();

    res.status(201).json({ message: "Product Added Successfully", product });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add product", error: err.message });
  }
});

//  Get All Products (For Homepage or Shop View)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: err.message });
  }
});

//  Get Products by Specific User
router.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const products = await Product.find({ user: userId });
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch user products", error: err.message });
  }
});

//  Get Single Product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router;
