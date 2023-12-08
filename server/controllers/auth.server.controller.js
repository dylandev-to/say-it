const asyncHandler = require("express-async-handler");
const User = require("../models/user.server.model"); // Adjust the path as necessary
const jwt = require("jsonwebtoken");

// Handles user sign-in
exports.userSignIn = asyncHandler(async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match." });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, {
      expire: new Date() + 9999,
      sameSite: "none",
      httpOnly: true,
      secure: true,
      path: "/",
    });
    return res.json({
      token,
      user: {
        _id: user._id,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" });
  }
});

// Handles user sign-out
exports.userSignOut = asyncHandler(async (req, res) => {
  res.clearCookie("t", {
    sameSite: "none",
    httpOnly: true,
    secure: true,
  });
  return res.status("200").json({ message: "Signed out successfully" });
});

// Verifies user authentication
exports.isAuthenticated = asyncHandler(async (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated });
});

exports.getUserInfo = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch user information based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
