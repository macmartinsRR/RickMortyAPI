const passport = require("passport");
const Users = require("../models/userModel");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function (username, password, done) {
    Users.findOne({ username: username }, async (err, user) => {
      if (err) return done(err);
      if (!user || !(await user.validPassword(password)))
        return done(null, false, { message: "Invalid username/password" });
      else return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  Users.findOne(id, function (err, user) {
    done(err, user);
  });
});

module.exports = {
  getDbConnectionString() {
    return (
      "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PASSWORD +
      "@nodetodosample.spynh.mongodb.net/nodetodosample?retryWrites=true&w=majority"
    );
  },
};
