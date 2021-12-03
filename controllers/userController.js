const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../models/userModel");
const passport = require("passport");
const router = express.Router();

router.post("/login", passport.authenticate("local"), function (req, res) {
  res.json({ message: "Successfully logged in" });
});

router.post("/", function (req, res) {
  const { username, password } = req.body;

  Users.countDocuments({ username: username }, (err, count) => {
    if (count <= 0) {
      const newUser = Users(req.body);
      bcrypt.hash(
        password,
        Number(process.env.SALT_ROUNDS),
        function (err, hash) {
          newUser.password = hash;
          newUser.save();

          req.logIn(newUser, (err) => {
            if (err)
              return res
                .status(400)
                .send({ message: "Unable to login", err: err });
            return res.status(200).send({ message: "Success!" });
          });
        }
      );
    }
    // Return 409 since its "Conflict", not the user's fault but server won't process it
    else res.status(409).json({ message: "User already exists!" });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Successfully logged out" });
});

module.exports = router;
