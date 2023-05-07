import "./Home.css";
import { useSelector } from "react-redux";
import { Header } from "../../components/Header/Header";
import { CreatePost } from "../../components/CreatePost/CreatePost";

export const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <Header />
      <div className="home">
        <div className="home_left"></div>
        <div className="home_middle">
          <CreatePost user={user} />
        </div>
        <div className="home_right"></div>
      </div>
    </>
  );
};
