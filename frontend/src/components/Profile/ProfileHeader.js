import "./ProfileHeader.css"

export const ProfileHeader = (props) => {
  return (
    <div className="profile-header">
      <div className="details">
        <div className="profile-picture">
          <img src={props.data.profile?.profilePicture} alt="" />
        </div>
        <div className="user-infos">
          <h1>
            {props.data.profile?.firstName} {props.data.profile?.lastName}
          </h1>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
};
