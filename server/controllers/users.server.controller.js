const asyncHandler = require("express-async-handler");
const User = require('../models/user.server.model');

// Creates a new user
exports.createUser = asyncHandler(async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with that email already exists.' });
    }

    const user = new User(req.body);
    user.password = req.body.password;
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Lists all users
exports.listAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select('name email updated created');
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Fetches a user by ID
exports.fetchUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('name email updated created');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Updates a user by ID
exports.updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletes a user by ID
exports.deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
