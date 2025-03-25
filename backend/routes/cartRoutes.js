const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");
const Product = require("../models/Product");

const router = express.Router();

// ✅ Add item to cart
router.post("/add", protect, async (req, res) => {
  const { productId, quantity } = req.body;
  
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const existingItem = user.cart.find((item) => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Remove item from cart
router.delete("/remove/:productId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter((item) => item.product.toString() !== req.params.productId);

    await user.save();
    res.json({ message: "Product removed from cart", cart: user.cart });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update product quantity in cart (Increase/Decrease)
router.put("/update", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItem = user.cart.find((item) => item.product.toString() === productId);
    if (!cartItem) return res.status(404).json({ message: "Product not found in cart" });

    if (quantity > 0) {
      cartItem.quantity = quantity; // Update quantity
    } else {
      user.cart = user.cart.filter((item) => item.product.toString() !== productId); // Remove item
    }

    await user.save();
    res.json({ message: "Cart updated successfully", cart: user.cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get user cart
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ cart: user.cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
