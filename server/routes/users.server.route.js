const express = require('express');
const router = express.Router();

// Controllers for these routes
const userController = require('../controllers/users.server.controller');

// Create a new user
router.post('/users', userController.createUser);

// List all users
router.get('/users', userController.listAllUsers);

// Fetch a single user by ID
router.get('/users/:userId', userController.fetchUser);

// Update a user by ID
router.put('/users/:userId', userController.updateUser);

// Delete a user by ID
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;
