const express = require("express");
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
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
      user:userId, 
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


router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // delete the file from uploads
    if (product.imageUrl) {
      const filePath = path.join(__dirname, "..", product.imageUrl);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete image file:", err.message);
      });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: err.message });
  }
});

// Update Product by ID
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, price, location, description } = req.body;
    const updateData = { title, price, location, description };

    // if user uploaded new image
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // return updated doc
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
});


module.exports = router;
