const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(16).required(),
  password: Joi.string().pattern(
    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d\\w\\W]{8,}$")
  ),
}).with("username", "password");

module.exports = userSchema;
