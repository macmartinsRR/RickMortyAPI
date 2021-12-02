const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
});

userSchema.methods.validPassword = async function (password) {
  let match = await bcrypt.compare(password, this.password);
  return match;
};

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
