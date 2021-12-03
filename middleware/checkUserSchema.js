const userSchema = require("../models/schemas/userSchema");

function checkUserSchema(req, res, next) {
  const { error } = userSchema.validate(req.body);
  if (error)
    return res
      .status(422)
      .json({
        message: "Missing/Incorrect data",
        details: error.details[0].message,
      });
  next();
}

module.exports = checkUserSchema;
