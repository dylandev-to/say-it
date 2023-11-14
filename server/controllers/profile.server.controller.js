const asyncHandler = require("express-async-handler");

// Gets a profile by ID
exports.getProfileByID = asyncHandler(async (req, res, next) => {
  console.log("get profile by id");
});

// Handles the profile log in logic
exports.profileLogIn = asyncHandler(async (req, res, next) => {
    console.log("log in")
})

// Handles the profile log out logic
exports.profileLogOut = asyncHandler(async (req, res, next) => {
    console.log("log out")
})