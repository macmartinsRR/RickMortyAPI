const Characters = require("../models/characterModel");
const bodyParser = require("body-parser");

function paginatedResults(model) {
  return async (req, res, next) => {
    var fullUrl =
      req.protocol +
      "://" +
      req.get("host") +
      req.originalUrl.split("?").shift();

    const page = parseInt(req.query.page || 1);
    const limit = 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    const count = await model.countDocuments().exec();
    results.info = {
      count: count,
      pages: Math.ceil(count / limit),
      next: endIndex >= count ? null : `${fullUrl}?page=${page + 1}`,
      prev: startIndex <= 0 ? null : `${fullUrl}?page=${page - 1}`,
    };
    try {
      results.results = await model
        .find()
        .sort({ id: 1 })
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (err) {
      res.status(500).send({ message: e.message });
    }
  };
}

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.get("/api/character", paginatedResults(Characters), (req, res) => {
    res.json(res.paginatedResults);
  });

  app.get("/api/character/:id", function (req, res) {
    Characters.find({ id: req.params.id }, function (err, characters) {
      if (err) throw err;

      res.send(characters);
    });
  });

  app.post("/api/character", async function (req, res) {
    if (req.body.id) {
      Characters.findOneAndUpdate(
        { id: req.body.id },
        {
          name: req.body.name,
          status: req.body.status,
          species: req.body.species,
          type: req.body.type,
          gender: req.body.gender,
          origin: req.body.origin,
          location: req.body.location,
          image: req.body.image,
          episode: req.body.episode,
        },
        function (err, character) {
          if (err) throw err;

          res.send("Success");
        }
      );
    } else {
      let latestCharacter = await Characters.findOne(
        {},
        {},
        { sort: { id: -1 } }
      );

      const newCharacter = Characters({
        id: latestCharacter.id + 1,
        name: req.body.name,
        status: req.body.status,
        species: req.body.species,
        type: req.body.type,
        gender: req.body.gender,
        origin: req.body.origin,
        location: req.body.location,
        image: req.body.image,
        episode: req.body.episode,
        url: `http://localhost:3000/api/character/${latestCharacter.id + 1}`,
      });
      newCharacter.save(function (err) {
        if (err) throw err;

        res.send("Success");
      });
    }
  });

  app.delete("/api/character", function (req, res) {
    Characters.findOneAndRemove({ id: req.body.id }, function (err) {
      if (err) throw err;

      res.send("Success");
    });
  });
};
