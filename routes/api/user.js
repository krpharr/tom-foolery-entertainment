const router = require("express").Router();
const request = require('request');
const User = require("../../models/user");
const passport = require('passport');

//get all users from database ? = "/user"
// mogoose cose needs to be moved to contollers for userController
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

router.get('/register', function(req, res) {
  //res.render('register', {});
  // is this needed here - prob just a page routed to by react with register form 
  console.log("register form");
});

router.post('/register', function(req, res, next) {
  console.log('registering user');
  User.register(new User({ username: req.body.username, type: req.body.type }), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }
    console.log('user registered!');
    // res.redirect('/');
    res.json({ username: req.body.username, type: req.body.type, password: "********" });
  });
});

router.get('/login', function(req, res) {
  console.log(req.user);
  if (req.user === undefined) {
    return res.json({});
  } else {
    return res.json({ user: req.user.username, type: req.user.type });
  }
  // res.json({ user: req.user.username, message: req.flash('error') });
  //res.render('login', { user: req.user, message: req.flash('error') });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
  // console.log(res.data);
  const { username, type } = req.user;
  res.json({ username: req.user.username, type: req.user.type });
  // res.json({ username: req.body.username });
  // res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  const userObj = req.user === null ? { user: "", type: "" } : { user: req.user, type: req.user.type };
  res.json(userObj);
  // res.redirect('/');
});

module.exports = router;