import "./Messages.css";
import { callApi } from "../../helpers/callApi";
import { useEffect, useState } from "react";

export const Messages = ({ chatId, user }) => {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    const message = await callApi(`chat/${chatId}`, "get", user.token);
    setMessages(message);
  };
  useEffect(() => {
    getMessages();
  }, []);
  return <div>Messages</div>;
};
