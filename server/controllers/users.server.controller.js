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
    const userId = req.user._id;
    
    console.log(req.body)

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const validPronouns = ['he/him', 'she/her', 'they/them'];
    if (req.body.pronouns && !validPronouns.includes(req.body.pronouns.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid pronouns' });
    }

    if (req.body.description && req.body.description.length > 200) {
      return res.status(400).json({ error: 'Description must be less than 100 characters' });
    }

    if (req.body.name) {
      user.name = req.body.name;
    }

    if (req.body.pronouns) {
      user.pronouns = req.body.pronouns;
    }

    if (req.body.description) {
      user.description = req.body.description;
    }

    if (req.body.profilePicture) {
      user.profilePicture = req.body.profilePicture;
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
