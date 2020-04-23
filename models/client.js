const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: "firstName required for Client"
  },
  lastName: {
    type: String,
    trim: true,
    required: "lastName required for Client"
  },
  email: {
    type: String,
    trim: true,
    required: "email required for Client"
  },
  phone: {
    type: String,
    trim: true,
    required: "phone number required for Client"
  },
  events: {
    type: Array
  },
  userId: {
    type: String,
    trim: true,
    required: "userId required for Client"
  },
  username: {
    type: String,
    required: "username required for Client"
  }
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;