const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    console.log("Register Attempt:", trimmedEmail);

    // Validation
    if (!name || !trimmedEmail || !trimmedPassword) {
      console.log("Registration failed: Missing fields");
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check existing user
    const userExists = await User.findOne({ email: trimmedEmail });
    console.log("User Exists:", userExists);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
    console.log("Hashed Password:", hashedPassword);

    // Create user
    const user = await User.create({
      name,
      email: trimmedEmail,
      password: hashedPassword,
      role: role || "user",
    });

    console.log("User Registered:", user);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    console.log("Login Attempt:", trimmedEmail);

    // Find user
    const user = await User.findOne({ email: trimmedEmail });
    console.log("User Found:", user);

    if (!user) {
      console.log("Login Failed: User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password
    console.log("Entered Password:", trimmedPassword);
    console.log("Stored Hashed Password:", user.password);

    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      console.log("Login Failed: Incorrect password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("User Logged In:", user.email);

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
