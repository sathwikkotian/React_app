const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// ✅ Get all products (Public)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ message: "✅ Products fetched successfully", products });
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching products", error: error.message });
  }
});

// ✅ Add a new product (Admin only - Add middleware if needed)
router.post("/", async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    const product = new Product({ name, price, description, category, image });
    await product.save();
    res.status(201).json({ message: "✅ Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: "❌ Error adding product", error: error.message });
  }
});

// ✅ Update a product (Admin only)
router.put("/:id", async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, image },
      { new: true }
    );
    res.json({ message: "✅ Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "❌ Error updating product", error: error.message });
  }
});

// ✅ Delete a product (Admin only)
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error deleting product", error: error.message });
  }
});

module.exports = router;
