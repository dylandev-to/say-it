const asyncHandler = require("express-async-handler");

// Creates a new user
exports.createUser = asyncHandler(async (req, res, next) => {
  console.log("create user");
});

// Lists all users
exports.listAllUsers = asyncHandler(async (req, res, next) => {
  console.log("list all users");
});

// Fetches a user by ID
exports.fetchUser = asyncHandler(async (req, res, next) => {
  console.log("fetch user by id");
});

// Updates a user by ID
exports.updateUser = asyncHandler(async (req, res, next) => {
  console.log("update user by id");
});

// Deletes a user by ID
exports.deleteUser = asyncHandler(async (req, res, next) => {
  console.log("delete user by id");
});