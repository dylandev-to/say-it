const express = require('express');
const router = express.Router();

const authMiddlewares = require("../middlewares/auth.server.middleware")

const postController = require("../controllers/posts.server.controller")

// User create a post
router.post('/', authMiddlewares.requireAuth, postController.userPost);

// User like or dislike a post
router.post('/like/:postId', authMiddlewares.requireAuth, postController.userLikePost);

// User get posts
router.get('/', authMiddlewares.requireAuth, postController.userGetPosts);

// User delete post
router.delete('/:postId', authMiddlewares.requireAuth, postController.userDeletePost);

// Get hashtags
router.get("/hashtags", postController.getAllHashtags);

module.exports = router;