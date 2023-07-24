const Chat = require("../models/Conversation");

exports.getChat = async (req, res) => {
  const loggedUser = req.user;
  const { secondUser } = req.body;
  const chat = await Chat.findOne({
    users: { $all: [loggedUser.id, secondUser] },
  });

  if (chat) return res.json(chat);
  if (!chat) {
    try {
      const newChat = new Chat({
        users: [loggedUser.id, secondUser],
      });

      const savedChat = await newChat.save();
      return res.json(savedChat);
    } catch (error) {
      return res.status(500).json({ error: "Error creating conversation" });
    }
  }
};
