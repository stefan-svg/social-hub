import "./Profile.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "../../components/Header/Header";
import { useEffect, useState } from "react";
import { useReducer } from "react";
import { profileReducer } from "../../functions/reducers";
import { callApi } from "../../helpers/callApi";
import { ProfileHeader } from "../../components/Profile/ProfileHeader";

export const Profile = () => {
  const user = useSelector((state) => state.user);
  const [result, setResult] = useState({});
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
      dispatch({ type: "PROFILE_REQUEST" });
      const data = await callApi(`profile/${username}`, "get", user.token);
      setResult(data);
      dispatch({ type: "PROFILE_SUCCESS", payload: result });
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <>
      <Header />
      <ProfileHeader data={result} />
      {user.id === result.profile?._id ? <h1>ISTI SU</h1> : <h1>NISU ISTI</h1>}
    </>
  );
};
