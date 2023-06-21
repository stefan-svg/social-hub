const { generateToken } = require("../helpers/tokens");
const {
  validateLength,
  validateEmail,
  validateUsername,
} = require("../helpers/validation");
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "The email you entered is not connected to an account.",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials. Please try again.",
      });
    }

    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email address already exists,try with a different email address",
      });
    }

    if (!validateLength(firstName, 3, 30)) {
      return res.status(400).json({
        message: "First name must be between 3 and 30 characters.",
      });
    }
    if (!validateLength(lastName, 3, 30)) {
      return res.status(400).json({
        message: "Last name must be between 3 and 30 characters.",
      });
    }
    if (!validateLength(password, 5, 40)) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUsername = firstName + lastName;
    let newUsername = await validateUsername(tempUsername);
    const user = await new User({
      firstName,
      lastName,
      email,
      password: cryptedPassword,
      username: newUsername,
    }).save();

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      firstName: user.firstName,
      lastName: user.lastName,
      message: "Register Success!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await User.findOne({ username }).select("-password");
    const posts = await Post.find({ postedBy: profile._id }).populate("postedBy").populate("comments.commentBy");
    return res.send({profile, posts})
  } catch (error) {}
};
