const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

const router = require("express").Router();
const routes = require("./routes");
const User = require("./models/user");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ keys: ['samhill', 'dogpoop', 'cheese'] }));
app.use(flash());

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());


// https://github.com/saintedlama/passport-local-mongoose
// Simplified Passport/Passport-Local Configuration
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(routes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });

  router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tom-foolery", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});