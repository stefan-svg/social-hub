const express = require("express");
const {
  createPost,
  deletePost,
  getAllPosts,
  comment,
  likePost,
} = require("../controllers/post");
const { authUser } = require("../middlwares/auth");
const router = express.Router();

router.post("/createPost", authUser, createPost);
router.delete("/deletePost/:id", authUser, deletePost);
router.get("/getAllPosts", authUser, getAllPosts);
router.put("/comment", authUser, comment);
router.put("/likePost", authUser, likePost);
module.exports = router;
