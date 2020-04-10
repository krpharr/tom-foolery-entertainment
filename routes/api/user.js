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
});

router.post('/register', function(req, res, next) {
  console.log('registering user');
  User.register(new User({ username: req.body.username }), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }
    console.log('user registered!');
    //res.redirect('/');
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user: req.user, message: req.flash('error') });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;