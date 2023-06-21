const express = require("express");
const { login, register, getProfile } = require("../controllers/user");

const { authUser } = require("../middlwares/auth");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile/:username", getProfile);

module.exports = router;
