import React from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

const Comment = ({ comment }) => {
    return (
        <div className="comment">
            <img className="comment-image" src={comment.commentBy.profilePicture} alt="" />
            <div className="comment-content">
                <Link
                    className="profile-link"
                    to={`/profile/${comment.commentBy.username}`}
                >
                    {comment.commentBy.firstName} {comment.commentBy.lastName}
                </Link>
                <p className="comment-text">{comment.comment}</p>
                <div className="comment-actions">
                    <span className="comment-like">Like</span>
                    <span>Reply</span>
                    <span className="comment-timestamp">
                        <Moment fromNow>{comment.commentAt}</Moment>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Comment;
