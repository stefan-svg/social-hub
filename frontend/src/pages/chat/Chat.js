import "./Chat.css";
import { Header } from "../../components/Header/Header";
import { AllChats } from "../../components/Chat/AllChats";
import { useParams } from "react-router-dom";
import { Messages } from "../../components/Chat/Messages";
import { useSelector } from "react-redux";
import { callApi } from "../../helpers/callApi";
import { useEffect, useState } from "react";

export const Chat = () => {
  const { chatId } = useParams();
  const user = useSelector((state) => state.user);
  const [allChats, setAllChats] = useState([]);

  const getAllChats = async () => {
    const allChats = await callApi("chat", "get", user.token);
    setAllChats(allChats);
  };

  useEffect(() => {
    getAllChats();
  }, []);

  return (
    <>
      <Header />
      <div className="chat-page">
        <AllChats allChats={allChats} userId={user.id} />
        <Messages chatId={chatId} user={user} />
      </div>
    </>
  );
};
