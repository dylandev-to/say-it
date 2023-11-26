const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: "Content is required",
      trim: true,
      max: 500
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    postOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: "Post owner is required"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema, "Posts");