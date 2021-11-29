const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const characterSchema = new Schema({
  id: Number,
  name: String,
  status: String,
  species: String,
  type: String,
  gender: String,
  origin: {
    name: String,
    url: String,
  },
  location: {
    name: String,
    url: String,
  },
  image: String,
  episode: [String],
  url: String,
  created: {
    type: Date,
    default: Date.now(),
  },
});

const Characters = mongoose.model("Characters", characterSchema);

module.exports = Characters;
