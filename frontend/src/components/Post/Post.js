import React, { useState } from 'react';
import "./Post.css";

export const Post = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [isCommenting, setIsCommenting] = useState(false);


  const handleCommentClick = () => {
    setIsCommenting(true);
  };

  const createdAt = new Date(post.createdAt);
  const formattedDate = createdAt.toLocaleDateString('sr-RS', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className="post">
      <div className="post-header">
        <img
          src="https://cdn.vox-cdn.com/thumbor/MbYxeyxG82sFlibdnv9Br1aCLg8=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/24395697/bkq6gtrpcnw43vsm5zm62q3z.png"
          alt=""
        />
        <div className="post-user-info"><p>{post.postedBy.firstName} {post.postedBy.lastName}</p><p className="created">{formattedDate}</p></div>
      </div>
      <div className="post-content">
        {post.content}
      </div>
      <div className="post-footer">
        <button>Lajk</button>
        <button onClick={handleCommentClick}>Komentar</button>
      </div>
      {isCommenting && (
        <div className="comment-input">
          <input type="text" placeholder="Unesite komentar" />
          <button>Objavi</button>
        </div>
      )}
    </div>
  );
};
