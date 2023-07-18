import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { callApi } from "../../helpers/callApi";
import "./Post.css";
import Comment from "../Comment/Comment";

export const Post = ({ post, loading, user }) => {
  const [isLiked, setIsLiked] = useState(post.likes.includes(user.id));
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);

  const handleLike = async () => {
    try {
      await callApi(`likePost`, "put", user.token, { postId: post._id });
      setIsLiked(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleUnlike = async () => {
    try {
      await callApi(`likePost`, "put", user.token, { postId: post._id });
      setIsLiked(false);
    } catch (err) {
      console.log(err);
    }
  };

  const showMore = () => {
    setCount((prev) => prev + 3);
  };

  const handleComment = async () => {
    try {
      if (comment.trim() === "") {
        return;
      }
      await callApi(`comment`, "put", user.token, {
        postId: post._id,
        comment: comment,
      });
      setComment("");
      const updatedComments = [
        ...comments,
        { comment: comment, commentBy: user },
      ];
      setComments(updatedComments);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentDelete = (commentId) => {
    try {
      const updatedComments = comments.filter(
        (comment) => comment._id !== commentId
      );
      setComments(updatedComments);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await callApi(`deletePost/${post._id}`, "delete", user.token);
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  const createdAt = new Date(post.createdAt);
  const formattedDate = createdAt.toLocaleString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
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
          {user.id === post.postedBy._id && (
            <div className="delete-button" onClick={handleModalToggle}>
              <span className="material-symbols-outlined">delete</span>
            </div>
          )}
          {showModal && (
            <div className="modal-delete">
              <div className="modal-delete-content">
                <p>Are you sure you want to delete this post?</p>
                <div className="modal-delete-buttons">
                  <button onClick={handleDelete}>Delete</button>
                  <button onClick={handleModalToggle}>Cancel</button>
                </div>
              </div>
            </div>
          )}
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
      <div className="comment-input">
        <div className="textarea-container">
          <textarea
            rows="3"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <span
            className="material-symbols-outlined send-icon"
            onClick={handleComment}
          >
            send
          </span>
        </div>
      </div>
      <div className="comments-container">
        {comments &&
          comments
            .sort((a, b) => {
              return new Date(b.commentAt) - new Date(a.commentAt);
            })
            .slice(0, count)
            .map((comment, i) => (
              <div className="comment-wrapper" key={i}>
                <Comment post={post} comment={comment} user={user} />
              </div>
            ))}
        {count < comments.length && (
          <div className="view_comments" onClick={() => showMore()}>
            View more comments
          </div>
        )}
      </div>
    </div>
  );
};
