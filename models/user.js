const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  type: {
    type: String,
    trim: true,
    required: "User must have a type: 'admin', 'agent', 'client', 'bandleader'"
  }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);