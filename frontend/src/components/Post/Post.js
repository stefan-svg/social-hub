import React, { useState } from "react";
import "./Post.css";

export const Post = ({ post }) => {
  const [isCommenting, setIsCommenting] = useState(false);

  const handleCommentClick = () => {
    setIsCommenting(true);
  };

  const createdAt = new Date(post.createdAt);
  const formattedDate = createdAt.toLocaleDateString("sr-RS", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="post">
      <div className="post-header">
        <img
          src={post.postedBy.profilePicture}
          alt=""
        />
        <div className="post-user-info">
          <p>
            {post.postedBy.firstName} {post.postedBy.lastName}
          </p>
          <p className="created">{formattedDate}</p>
        </div>
      </div>
      <div className="post-content">{post.content}</div>
      <div className="post-footer">
        <button>Like</button>
        <button onClick={handleCommentClick}>Comment</button>
      </div>
      {isCommenting && (
        <div className="comment-input">
          <input type="text" placeholder="Unesite komentar" />
          <button>Publish</button>
        </div>
      )}
    </div>
  );
};
