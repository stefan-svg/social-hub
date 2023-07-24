const express = require("express");
const { getChat } = require("../controllers/chat");
const { authUser } = require("../middlwares/auth");
const router = express.Router();

router.get("/chat", authUser, getChat);

module.exports = router;
