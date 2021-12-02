const express = require("express");
const router = express.Router();

const Characters = require("../models/characterModel");
const starterCharacters = require("../data/characters.json");

router.post("/", function (req, res) {
  Characters.create(starterCharacters, function (err, results) {
    res.send(results);
  });
});

module.exports = router;
