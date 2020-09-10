const passport = require("passport");
const mongoose = require("mongoose");
const log = require("../utils/logging");
const uuid = require("uuid").v4;

const User = mongoose.model("User");

module.exports = (app) => {
  app.post(
    "/api/login",
    passport.authenticate("local", {
      failureFlash: true,
      // failureRedirect: "/",
      // successRedirect: "/app",
    }),
    (req, res) => {
      log(req.user);
      res.send("logged in!");
    }
  );

  app.post("/api/signup", (req, res, next) => {
    const { username, password } = req.body;
    /* 1. check username and password */
    if (!username || !password) {
      log("sign up: user didn't provide username or password");
      return res
        .status(422)
        .send("Please provide both user name and password.");
    }

    /* 2. save user if not exists */
    User.findOne({ username: username }, (err, existingUser) => {
      if (err) return next(err);
      if (existingUser) return res.status(409).send("User name already exists");

      const newUser = new User({
        username,
        password,
        userID: uuid(),
        groups: [
          {
            groupName: "Default group",
            timeCreated: new Date(),
          },
        ],
      });

      newUser.save((err, user) => {
        if (err) return console.error(err);
        log("new user signed up");

        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.send("sign up and log in successful");
        });
      });
    });
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    req.session = null;
    res.send("logged out successful!");
  });

  app.get("/api/current_user", (req, res) => {
    log(`[current_user] userID: ${req.user.serID}`);
    res.send(req.user);
  });

  // app.get("/api/rr", (req, res) => {
  //   res.redirect("/app");
  // });
};
