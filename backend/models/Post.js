const mongoose = require("mongoose");
const User = require("../models/User");

const PostSchema = new mongoose.Schema(
  {
    content: { type: String, trim: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pinned: Boolean,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        comment: {
          type: String,
        },
        image: {
          type: String,
        },
        commentBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        commentAt: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;