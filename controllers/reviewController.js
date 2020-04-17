const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Review
      .find({})
      .sort({ date: -1 })
      .then(dbReview => {
        res.json(dbReview);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  },
  findById: function(req, res) {
    db.Review
      .findById(req.params.id)
      .then(dbReview => res.json(dbReview))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Review
      .create(req.body)
      .then(dbReview => res.json(dbReview))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Review
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbReview => res.json(dbReview))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Review
      .findById({ _id: req.params.id })
      .then(dbReview => dbReview.remove())
      .then(dbReview => res.json(dbReview))
      .catch(err => res.status(422).json(err));
  }
};