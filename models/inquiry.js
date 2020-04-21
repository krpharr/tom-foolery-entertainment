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
  eventType: {
    type: String
  },
  band: {
    type: String
  },
  date: {
    type: String,
  },
  startTime: {
    type: String,
  },
  numHours: {
    type: Number
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
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Inquiry = mongoose.model("Inquiry", inquirySchema);

module.exports = Inquiry;