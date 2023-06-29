const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
  try {
    const { text, id } = req.body;
    const post = await new Post({ content: text, postedBy: id }).save();
    await post.populate({
      path: "postedBy",
      select: "firstName lastName",
    });

    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndRemove(req.params.id);
    res.json({ status: "ok" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('postedBy');
    res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.comment = async (req, res) => {
  try {
    const { comment, postId } = req.body;
    let newComments = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            comment: comment,
            commentBy: req.user.id,
            commentAt: new Date(),
          },
        },
      },
      {
        new: true,
      }
    ).populate("comments.commentBy", "firstName lastName username");
    res.json(newComments.comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post does not exists!' });
    }

    const userId = user.req.id;
    const likes = post.likes;

    const isLiked = likes.includes(userId);

    if (isLiked) {
      post.likes = likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({ message: 'Success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
