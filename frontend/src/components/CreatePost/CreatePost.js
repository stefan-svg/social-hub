import React, { useState } from "react";
import Modal from "react-modal";
import "./CreatePost.css";

export const CreatePost = ({ user }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handlePostTextChange = (event) => {
    setPostText(event.target.value);
  };

  const handlePostSubmit = () => {
    if (postText.trim() !== "") {
      const newPost = {
        id: Date.now(),
        text: postText,
      };

      setPosts([...posts, newPost]);
      setPostText("");
      handleModalClose();
    }
  };

  return (
    <div className="new_post">
      <div className="post_profile_picture"></div>
      <div className="create_post" onClick={handleModalOpen}>
        What's on your mind, {user.firstName}?
      </div>

      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post_text">{post.text}</div>
          <div className="post_buttons">
            <button className="post_button">Like</button>
            <button className="post_button">Comment</button>
          </div>
        </div>
      ))}

      <Modal
        isOpen={modalOpen}
        onRequestClose={handleModalClose}
        className="modal"
        overlayClassName="modal_overlay"
      ><>
        <textarea
          className="modal_textarea"
          placeholder="Enter your text"
          value={postText}
          onChange={handlePostTextChange}
        ></textarea>
        <button className="modal_submit_button" onClick={handlePostSubmit}>
          Post
        </button>
        <button className="modal_close_button" onClick={handleModalClose}>
          Close
        </button>
        </>
      </Modal>
    </div>
  );
};
