const asyncHandler = require("express-async-handler");

// Handles user sign-in
exports.userSignIn = asyncHandler(async (req, res, next) => {
  console.log("user sign in");
});

// Handles user sign-out
exports.userSignOut = asyncHandler(async (req, res, next) => {
  console.log("user sign out");
});
