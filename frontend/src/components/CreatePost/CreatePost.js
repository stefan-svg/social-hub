import "./CreatePost.css";

export const CreatePost = ({ user }) => {
  return (
    <div className="new_post">
        <div className="post_profile_picture"></div>
      <div className="create_post">What's on your mind, {user.firstName}?</div>
    </div>
  );
};
