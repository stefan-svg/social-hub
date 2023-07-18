import { useState } from "react";
import "./Comment.css";
import { Link } from "react-router-dom";
import { callApi } from "../../helpers/callApi";

const Comment = ({ post, comment, user }) => {
  const [isLiked, setIsLiked] = useState(comment.likes.includes(user.id));

  const handleLike = async () => {
    try {
      await callApi(`likeComment`, "put", user.token, {
        postId: post._id,
        commentId: comment._id,
      });
      setIsLiked(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await callApi(`likeComment`, "put", user.token, {
        postId: post._id,
        commentId: comment._id,
      });
      setIsLiked(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="comment">
      <img
        className="comment-image"
        src={comment.commentBy.profilePicture}
        alt=""
      />
      <div className="comment-details">
        <div className="comment-content">
          <Link
            className="profile-link"
            to={`/profile/${comment.commentBy.username}`}
          >
            {comment.commentBy.firstName} {comment.commentBy.lastName}
          </Link>
          <p className="comment-text">{comment.comment}</p>
        </div>
        {isLiked ? (
          <div className="comment-like" onClick={handleUnlike}>
            Liked
          </div>
        ) : (
          <div className="comment-like" onClick={handleLike}>
            Like
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
