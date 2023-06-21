const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "FirstName is required"],
    trim: true,
    text: true,
  },
  lastName: {
    type: String,
    required: [true, "LastName is required"],
    trim: true,
    text: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    text: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    text: true,
  },
  profilePicture: {
    type: String,
    trim: true,
    default:
      "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
