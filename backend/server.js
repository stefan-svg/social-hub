require("dotenv").config();
require("./database.js");
const express = require("express");
const User = require("./models/userModel.js");
const app = express();
const { readdirSync } = require("fs");

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));



app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
