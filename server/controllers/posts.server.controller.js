const asyncHandler = require("express-async-handler");
const User = require("../models/user.server.model");
const Post = require("../models/post.server.model");
const jwt = require("jsonwebtoken");

// Handles user posting
exports.userPost = asyncHandler(async (req, res) => {
  try {
    const { content } = req.body;
    const postOwner = req.user._id;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const newPost = await Post.create({ content, postOwner });

    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(500).json({ error: "Could not post" });
  }
});

// Handles user get posts with owner information, liked attribute, and isOwner attribute
exports.userGetPosts = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    let allPosts = await Post.find().populate(
      "postOwner",
      "name pronouns description profilePicture"
    );

    allPosts = allPosts.map((post) => {
      const liked = post.likes.includes(userId);
      const isOwner = post.postOwner._id.toString() === userId.toString();
      return { ...post.toObject(), liked, isOwner };
    });

    return res.status(200).json(allPosts);
  } catch (err) {
    return res.status(500).json({ error: "Could not retrieve posts" });
  }
});

// Handles liking or disliking a post
exports.userLikePost = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;

    
    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    
    const isLiked = post.likes.includes(userId);
    
    if (isLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }
    
    await post.save();
    
    return res.status(200).json({ post: post, liked: isLiked });
  } catch (err) {
    return res.status(500).json({ error: "Could not like/dislike the post" });
  }
});
