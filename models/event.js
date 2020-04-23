const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  date: {
    type: Date,
    required: "Date required for Event"
  },
  type: {
    type: String,
    trim: true,
    required: "Event type is required."
  },
  clientId: {
    type: String,
    required: "clientId required for Event"
  },
  agentId: {
    type: String,
    required: "agentId required for Event"
  },
  bands: {
    type: Array,
    required: "Event must include at least one band."
  },
  totalPrice: {
    type: Number,
    required: "Total price required."
  },
  location: {
    type: String,
    trim: true,
    required: "Address required for Event"
  },
  startTime: {
    type: Date,
    required: "Start time is required for Event"
  },
  endTime: {
    type: Date,
    required: "End time is required for Event"
  },
  review: {
    type: String
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;