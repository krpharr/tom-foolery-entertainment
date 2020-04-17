const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Bandleader
      .find({})
      .sort({ date: -1 })
      .then(dbBandleader => {
        res.json(dbBandleader);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  },
  findById: function(req, res) {
    db.Bandleader
      .findById(req.params.id)
      .then(dbBandleader => res.json(dbBandleader))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Bandleader
      .create(req.body)
      .then(dbBandleader => res.json(dbBandleader))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Bandleader
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbBandleader => res.json(dbBandleader))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Bandleader
      .findById({ _id: req.params.id })
      .then(dbBandleader => dbBandleader.remove())
      .then(dbBandleader => res.json(dbBandleader))
      .catch(err => res.status(422).json(err));
  }
};