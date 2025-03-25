const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// ✅ User Registration (For initial admin setup or new users)
router.post("/register", registerUser);

// ✅ User Login
router.post("/login", loginUser);

// ✅ Admin Login
router.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user || !user.isAdmin) return res.status(401).json({ message: "Not authorized as admin" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "✅ Admin login successful", token, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

module.exports = router;
