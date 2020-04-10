const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Bands
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
    db.Bands
      .findById(req.params.id)
      .then(dbBand => res.json(dbBand))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Bands
      .create(req.body)
      .then(dbBand => res.json(dbBand))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Bands
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbBand => res.json(dbBand))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Bands
      .findById({ _id: req.params.id })
      .then(dbBand => dbBand.remove())
      .then(dbBand => res.json(dbBand))
      .catch(err => res.status(422).json(err));
  }
};