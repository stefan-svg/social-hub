import "./Home.css";
import { useSelector } from "react-redux";
import { Header } from "../../components/Header/Header";
import { CreatePost } from "../../components/CreatePost/CreatePost";
import { Post } from "../../components/Post/Post";

export const Home = ({ posts }) => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <Header />
      <div className="home">
        <div className="home_left"></div>
        <div className="home_middle">
          <CreatePost user={user} />
          <div className="all-posts-home">
            {posts.map((post, i) => (
              <Post key={i} post={post} user={user} />
            ))}
          </div>
        </div>
        <div className="home_right"></div>
      </div>
    </>
  );
};
