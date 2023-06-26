const express = require("express");
const { login, register, getProfile, search } = require("../controllers/user");

const { authUser } = require("../middlwares/auth");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile/:username", authUser, getProfile);
router.get("/search", authUser, search);

module.exports = router;
