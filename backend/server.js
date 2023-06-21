require("dotenv").config();
require("./database.js");
const express = require("express");
const app = express();
const cors = require("cors");
const { readdirSync } = require("fs");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

app.listen(8080, () => console.log("Server running on port " + 8080));
