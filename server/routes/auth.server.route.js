const express = require('express');
const router = express.Router();

// Controllers for these routes
const authController = require('../controllers/users.server.controller');

// User sign-in
router.post('/signin', authController.userSignIn);

// User sign-out (optional)
router.get('/signout', authController.userSignOut);

module.exports = router;
