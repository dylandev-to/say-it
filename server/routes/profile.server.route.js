const express = require("express")
const router = express.Router();

// Controller for this route
const profileController = require("../controllers/profile.server.controller")

// Get profile from ID
router.get("/:id", profileController.getProfileByID);

// Log in
router.post("/login", profileController.profileLogIn)

// Log out
router.post("/logout", profileController.profileLogOut)

module.exports = router;