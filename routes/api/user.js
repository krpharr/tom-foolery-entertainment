const router = require("express").Router();
const request = require('request');
const User = require("../../models/user");
const passport = require('passport');

router.get("/", (req, res) => {
  User.find({})
    .sort({ date: -1 })
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  User.findById({ _id: req.params.id })
    .then(dbUser => dbUser.remove())
    .then(dbUser => res.json(dbUser))
    .catch(err => res.status(422).json(err));
});

router.get('/register', function(req, res) {
  // is this needed ? todo? - prob just a page routed to by react with register form 
  console.log("register form");
});

router.post('/register', function(req, res, next) {
  console.log('registering user');
  console.log("process.env.PORT: ", process.env.PORT, typeof process.env.PORT);
  const password = process.env.PORT ? req.body.password : "password";
  User.register(new User({ username: req.body.username, type: req.body.type }), password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }
    console.log('user registered!');
    res.json({ username: req.body.username, type: req.body.type });
  });
});

router.get('/login', function(req, res) {
  if (req.user === undefined) {
    return res.json({});
  } else {
    return res.json({ user: req.user.username, type: req.user.type });
  }
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
  const { username, type } = req.user;
  res.json({ username: req.user.username, type: req.user.type });
});

router.get('/logout', function(req, res) {
  req.logout();
  const userObj = req.user === null ? { user: "", type: "" } : { user: req.user, type: req.user.type };
  res.json(userObj);
});

module.exports = router;