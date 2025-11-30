const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Helper to set cookie
const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // Prevents XSS attacks (JS cannot read this)
    secure: process.env.NODE_ENV !== "development", // Use HTTPS in production
    sameSite: process.env.NODE_ENV !== "development" ? "none" : "strict", // CSRF protection
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    generateToken(res, user._id); // <--- Set Cookie

    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id); // <--- Set Cookie

      res.json({ _id: user._id, name: user.name, email: user.email });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Expire immediately
  });
  res.status(200).json({ message: "Logged out" });
};

// NEW: Check if user is logged in (Persist State)
const getMe = async (req, res) => {
  // If middleware passes, req.user is already set
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
};

module.exports = { registerUser, loginUser, logoutUser, getMe };
