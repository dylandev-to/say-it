const express = require('express');
const router = express.Router();

const authMiddlewares = require("../middlewares/auth.server.middleware")

// Controllers for these routes
const userController = require('../controllers/users.server.controller');

// Create a new user
router.post('/', userController.createUser);

// List all users
router.get('/', userController.listAllUsers);

// Fetch a single user by ID
router.get('/:userId', userController.fetchUser);


// Auth users routes

// Updates the user
router.put('/', authMiddlewares.requireAuth, userController.updateUser);

// Deletes the user
router.delete('/', authMiddlewares.requireAuth, userController.deleteUser);

module.exports = router;
