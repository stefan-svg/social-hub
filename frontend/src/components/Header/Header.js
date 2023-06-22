import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const user = useSelector((state) => state.user);
  console.log(user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };

  const userDetails = () => {
    setIsOpen(!isOpen);
  };

  const handleInputClick = (event) => {
    event.stopPropagation();
  };

  return (
    <header>
      <div className="header-left"></div>
      <div className="header-right">
        <div className="header-profile-picture">
          <img onClick={userDetails} src={user.profilePicture} alt="" />
          {isOpen ? (
            <div className="user-details" onClick={handleInputClick}>
              <input type="text" />
            </div>
          ) : null}
        </div>
        <div className="logout">
          <button
            className="logout-btn"
            onClick={() => {
              logout();
            }}
          >
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
