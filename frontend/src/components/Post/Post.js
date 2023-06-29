import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Post.css";

export const Post = ({ post }) => {
  const [isCommenting, setIsCommenting] = useState(false);

  const handleCommentClick = () => {
    setIsCommenting(true);
  };

  const createdAt = new Date(post.createdAt);
  const formattedDate = createdAt.toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
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
        <div className="like-button">
          <span className="material-symbols-outlined">thumb_up</span>Like
        </div>
        <div className="comment-button">
          <span class="material-symbols-outlined">chat_bubble</span>Comment
        </div>
      </div>
    </div>
  );
};
