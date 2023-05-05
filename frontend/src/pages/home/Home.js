import { useSelector } from "react-redux";
import { Header } from "../../components/Header/Header";
import CreatePost from "../../components/createPost";
const selectUser = (state) => state.user;

export const Home = () => {
  const user = useSelector(selectUser);

  return (
    <div className="home">
      <div className="home_middle">
        <Header />
        <CreatePost user={user} />
      </div>
    </div>
  );
};
