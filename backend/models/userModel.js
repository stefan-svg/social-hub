const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    text: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    text: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    text: true,
  },
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
  birthDate: {
    type: Date,
    required: [true, "BirthDate is required"],
    trim: true,
    text: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
