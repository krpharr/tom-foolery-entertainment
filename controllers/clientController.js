const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Client
      .find({})
      .sort({ date: -1 })
      .then(dbClient => {
        res.json(dbClient);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  },
  findById: function(req, res) {
    db.Client
      .findById(req.params.id)
      .then(dbClient => res.json(dbClient))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Client
      .create(req.body)
      .then(dbClient => res.json(dbClient))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Client
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbClient => res.json(dbClient))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Client
      .findById({ _id: req.params.id })
      .then(dbClient => dbClient.remove())
      .then(dbClient => res.json(dbClient))
      .catch(err => res.status(422).json(err));
  }
};