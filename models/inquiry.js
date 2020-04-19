const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inquirySchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: "Inquiry requires a first name"
  },
  lastName: {
    type: String,
    trim: true,
    required: "Inquiry requires a last name"
  },
  email: {
    type: String,
    trim: true,
    required: "Inquiry requires an email"
  },
  phone: {
    type: Number,
  },
  date: {
    type: String,
  },
  startTime: {
    type: String,
  },
  location: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false
  },
  agentId: {
    type: String,
    default: ""
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

const Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;