const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Inquiry
      .find({})
      .sort({ date: -1 })
      .then(dbInquiry => {
        res.json(dbInquiry);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  },
  findById: function(req, res) {
    db.Inquiry
      .findById(req.params.id)
      .then(dbInquiry => res.json(dbInquiry))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Inquiry
      .create(req.body)
      .then(dbInquiry => res.json(dbInquiry))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Inquiry
      .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(dbInquiry => res.json(dbInquiry))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Inquiry
      .findById({ _id: req.params.id })
      .then(dbInquiry => dbInquiry.remove())
      .then(dbInquiry => res.json(dbInquiry))
      .catch(err => res.status(422).json(err));
  },
};