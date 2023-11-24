const express = require('express');
const router = express.Router();

const authMiddlewares = require("../middlewares/auth.server.middleware")

// Controllers for these routes
const authController = require('../controllers/auth.server.controller');

// User sign-in
router.post('/signin', authController.userSignIn);

// Get if user is authenticated
router.get('/isauthenticated', authMiddlewares.requireAuth, authController.isAuthenticated)

// User sign-out (optional)
router.get('/signout', authController.userSignOut);

module.exports = router;
