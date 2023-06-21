import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "../../components/Header/Header";
import "./Profile.css";
import axios from "axios";
import { useEffect } from "react";
import { useReducer } from "react";
import { profileReducer } from "../../functions/reducers";

export const Profile = () => {
  const user = useSelector((state) => state.user);
  const [{ loading, error, response }, dispatch] = useReducer(profileReducer, {
    loading: false,
    response: {},
    error: "",
  });
  const { username } = useParams();

  useEffect(() => {
    getProfile();
  }, [username]);

  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `http://localhost:8080/profile/${username}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "PROFILE_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const { profile, posts } = response;

  return (
    <>
      <Header />
      <div className="profile-container">
        <div className="profile-info">
          {profile && (
            <>
              <img src={profile.profilePicture} alt="Profile Picture" />
              <h2>{profile.name}</h2>
            </>
          )}
        </div>
        <div className="profile-posts">
          <h3>Posts</h3>
          {posts.map((post) => (
            <div key={post._id} className="post">
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
