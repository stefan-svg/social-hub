import React, { useState } from "react";
import { Link } from "react-router-dom";
import { callApi } from "../../helpers/callApi";
import "./Post.css";

export const Post = ({ post, loading, user }) => {
  const [isLiked, setIsLiked] = useState(post.likes.includes(user.id));

  const handleLike = async () => {
    try {
      await callApi(`likePost`, "put", user.token, { postId: post._id });
      setIsLiked(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await callApi(`likePost`, "put", user.token, { postId: post._id });
      setIsLiked(false);
    } catch (err) {
      console.log(err);
    }
  };

  const createdAt = new Date(post.createdAt);
  const formattedDate = createdAt.toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return loading ? null : (
    <div className="post">
      <div className="post-header">
        <img src={post.postedBy.profilePicture} alt="" />
        <div className="post-user-info">
          <p>
            <Link
              className="profile-link"
              to={`/profile/${post.postedBy.username}`}
            >
              {post.postedBy.firstName} {post.postedBy.lastName}
            </Link>
          </p>
          <p className="created">{formattedDate}</p>
        </div>
      </div>
      <div className="post-content">{post.content}</div>
      <div className="post-footer">
        {isLiked ? (
          <div className="like-button" onClick={handleUnlike}>
            <span className="material-symbols-outlined">thumb_up</span>Liked
          </div>
        ) : (
          <div className="like-button" onClick={handleLike}>
            <span className="material-symbols-outlined">thumb_up</span>Like
          </div>
        )}
        <div className="comment-button">
          <span className="material-symbols-outlined">chat_bubble</span>
          Comment
        </div>
      </div>
    </div>
  );
};
