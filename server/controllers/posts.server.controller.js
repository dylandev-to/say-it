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
      "name pronouns description profilePicture createdAt"
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

// Handles deleting a post by ID
exports.userDeletePost = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.postOwner.toString() !== userId.toString()) {
      return res.status(403).json({ error: "You don't have permission to delete this post" });
    }
    
    await post.deleteOne();

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Could not delete the post" });
  }
});

// Handles getting all hashtags and their counts
exports.getAllHashtags = asyncHandler(async (req, res) => {
  try {
    const allPosts = await Post.find();

    const hashtagCounts = {};

    // Iterate through each post and extract hashtags
    allPosts.forEach((post) => {
      const hashtags = post.content.match(/#\w+/g) || [];

      hashtags.forEach((hashtag) => {
        if (hashtagCounts[hashtag]) {
          hashtagCounts[hashtag]++;
        } else {
          hashtagCounts[hashtag] = 1;
        }
      });
    });

    // Convert the hashtagCounts object to an array of { hashtag, count }
    const resultArray = Object.keys(hashtagCounts).map((hashtag) => ({
      hashtag,
      count: hashtagCounts[hashtag],
    }));

    resultArray.sort((a, b) => b.count - a.count);

    const limitedResult = resultArray.slice(0, 6);

    return res.status(200).json(limitedResult);
  } catch (err) {
    return res.status(500).json({ error: "Could not retrieve hashtags" });
  }
});
