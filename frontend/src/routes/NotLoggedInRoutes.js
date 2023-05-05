import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const selectUser = (state) => state.user;
export default function NotLoggedInRoutes() {
    const user = useSelector(selectUser);

  return user ? <Navigate to="/"/> : <Outlet />;
}
