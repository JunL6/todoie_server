const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const cors = require("cors");
const flash = require("connect-flash");
const keys = require("./config/keys");
const log = require("./utils/logging");
require("./models/User");
require("./services/passport");

const { PORT = 4000 } = process.env;

const app = express();

/* mongoose */
mongoose
  // .connect("mongodb://localhost/todolist")
  .connect(keys.mongoURI)
  .then(() => log("[LOG] mongoDB connected!"))
  .catch((err) => console.error(err));

/**** middlewares that will be called on every request */
/**** cookie-session */
app.use(
  cookieSession({
    name: "login-session",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: keys.cookieKeys,
  })
);

/* flash */
app.use(flash());

/* body parser */
app.use(bodyParser.json({ type: "*/*" }));

/* passport */
app.use(passport.initialize());
app.use(passport.session());

/* cors */
// app.use(cors({ credentials: true, origin: `http://localhost:3001` }));
app.use(cors());

/* route handling */
require("./routes/authRoutes")(app);
require("./routes/dataRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT);
