const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const log = require("../utils/logging");

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  // console.log(`[LOG] [deserialize] ${id}`);
  User.findById(id, (err, user) => {
    if (err) console.error(err);
    done(err, user);
  });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        log(`[passport-local] username doesn't exist`);
        return done(null, false);
      }
      user.verifyPassword(password, (err, isMatch) => {
        if (err) return log(err);
        if (!isMatch) {
          log("[passport-local] wrong password");
          return done(null, false);
        } else {
          log(`[passport-local] username and password correct!`);
          return done(null, user);
        }
      });
    });
  })
);
