const express = require('express');
const router = express.Router();

// Controllers for these routes
const userController = require('../controllers/users.server.controller');

// Create a new user
router.post('/', userController.createUser);

// List all users
router.get('/', userController.listAllUsers);
 
// Fetch a single user by ID
router.get('/:userId', userController.fetchUser);

// Update a user by ID
router.put('/:userId', userController.updateUser);

// Delete a user by ID
router.delete('/:userId', userController.deleteUser);

module.exports = router;
