const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Band
      .find({})
      .sort({ date: -1 })
      .then(dbBands => {
        res.json(dbBands);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  },
  findById: function(req, res) {
    db.Band
      .findById(req.params.id)
      .then(dbBand => res.json(dbBand))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Band
      .create(req.body)
      .then(dbBand => res.json(dbBand))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Band
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbBand => res.json(dbBand))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Band
      .findById({ _id: req.params.id })
      .then(dbBand => dbBand.remove())
      .then(dbBand => res.json(dbBand))
      .catch(err => res.status(422).json(err));
  }
};