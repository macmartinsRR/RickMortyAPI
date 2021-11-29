const Characters = require("../models/characterModel");
const starterCharacters = require("../data/characters.json");

module.exports = function (app) {
  app.get("/api/setupCharacters", function (req, res) {
    Characters.create(starterCharacters, function (err, results) {
      res.send(results);
    });
  });
};
