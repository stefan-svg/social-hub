import "./ProfileHeader.css";
import { useSelector } from "react-redux";
import { callApi } from "../../helpers/callApi";

export const ProfileHeader = (props) => {
  const user = useSelector((state) => state.user);
  const handleFollow = async () => {
    try {
      const data = await callApi(
        `follow/${props.data.profile._id}`,
        "put",
        user.token,
        user.id
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      const data = await callApi(
        `unfollow/${props.data.profile._id}`,
        "put",
        user.token,
        user.id
      );
    } catch (err) {
      console.log(err);
    }
  };

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
        {props.data.profile?._id !== user.id ? (
          <div className="buttons">
            {props.data.profile?.followers.includes(user.id) ? (
              <button className="unfollow-button" onClick={handleUnfollow}>
                Unfollow
              </button>
            ) : (
              <button onClick={handleFollow}>Follow</button>
            )}
            <button>Message</button>
          </div>
        ) : null}
      </div>
      <div className="divider"></div>
    </div>
  );
};
