const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config");
const setupController = require("./controllers/setupController");
const apiController = require("./controllers/apiController");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use("/assets", express.static(__dirname + "/public"));
app.set("view engine", "ejs");

console.log(config.getDbConnectionString());
mongoose.connect(config.getDbConnectionString(), () =>
  console.log("connected")
);
setupController(app);
apiController(app);

app.listen(port);
