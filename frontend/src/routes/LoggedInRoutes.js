import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Login } from "../pages/login/Login";
const selectUser = (state) => state.user;

export default function LoggedInRoutes() {
  const user = useSelector(selectUser);
  return user ? <Outlet /> : <Login />;
}
