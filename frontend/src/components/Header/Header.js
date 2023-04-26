import "./Header.css";
import { useSelector } from "react-redux";

export const Header = () => {
  const user = useSelector((state) => ({
    ...state,
  }));
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
        <div className="logout">Logout</div>
      </div>
    </header>
  );
};
