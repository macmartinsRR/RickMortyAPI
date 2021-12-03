require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const helmet = require("helmet");
const compression = require("compression");

const app = express();

const config = require("./config");
const setupController = require("./controllers/setupController");
const characterController = require("./controllers/characterController");
const userController = require("./controllers/userController");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/assets", express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use("/api/user", userController);
app.use("/api/character", characterController);
app.use("/api/setup", setupController);

mongoose.connect(config.getDbConnectionString(), () =>
  console.log("connected")
);

app.listen(port);
