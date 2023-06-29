import "./ProfileHeader.css";
import { useSelector } from "react-redux";
import { callApi } from "../../helpers/callApi";
import { useState } from "react";

export const ProfileHeader = (props) => {
  const user = useSelector((state) => state.user);
  const [isFollowing, setIsFollowing] = useState(
    props.data?.profile?.followers?.includes(user.id)
  );

  const handleFollow = async () => {
    try {
      await callApi(
        `follow/${props.data.profile._id}`,
        "put",
        user.token,
        user.id
      );
      setIsFollowing(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await callApi(
        `unfollow/${props.data.profile._id}`,
        "put",
        user.token,
        user.id
      );
      setIsFollowing(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile-header">
      {props.loading ? null : (
        <>
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
                {isFollowing ? (
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
        </>
      )}
    </div>
  );
};
