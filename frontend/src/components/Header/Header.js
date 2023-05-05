import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };
  return (
    <header>
      <div className="header-left"></div>
      <div className="header-right">
        <div className="user">
          <div className="profile-picture"></div>
          <div className="name">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div className="logout">
          <buton className="logout-btn"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </buton>
        </div>
      </div>
    </header>
  );
};
