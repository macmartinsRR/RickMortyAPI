require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const config = require("./config");
const setupController = require("./controllers/setupController");
const characterController = require("./controllers/characterController");
const userController = require("./controllers/userController");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/assets", express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use("/api/user", userController);
app.use("/api/character", characterController);
app.use("/api/setup", setupController);

mongoose.connect(config.getDbConnectionString(), () =>
  console.log("connected")
);

app.listen(port);
