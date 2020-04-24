const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Agent
      .find({})
      .then(dbAgent => {
        res.json(dbAgent);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  },
  findById: function(req, res) {
    db.Agent
      .findById(req.params.id)
      .then(dbAgent => res.json(dbAgent))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Agent
      .create(req.body)
      .then(dbAgent => res.json(dbAgent))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Agent
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbAgent => res.json(dbAgent))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Agent
      .findById({ _id: req.params.id })
      .then(dbAgent => dbAgent.remove())
      .then(dbAgent => res.json(dbAgent))
      .catch(err => res.status(422).json(err));
  }
};