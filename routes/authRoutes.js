const passport = require("passport");
const mongoose = require("mongoose");
const log = require("../utils/logging");

const User = mongoose.model("User");

module.exports = (app) => {
  /* test route for heroku */
  app.get("/", (req, res) => {
    res.send("hi");
  });

  /* test route for heroku */
  app.get("/api/g", (req, res) => {
    res.send("g");
  });

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
        res.send("sign up successful.");
        // res.redirect("/app"); //????? why 404
      });
    });
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    req.session = null;
    res.send("logged out successful!");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  // app.get("/api/rr", (req, res) => {
  //   res.redirect("/app");
  // });
};
