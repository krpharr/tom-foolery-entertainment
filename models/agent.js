const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const agentSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: "firstName required for Agent"
  },
  lastName: {
    type: String,
    trim: true,
    required: "lastName required for Agent"
  },
  currentEvents: {
    type: Array
  },
  pastEvents: {
    type: Array
  },
  email: {
    type: String,
    trim: true,
    required: "email required for Agent"
  },
  phone: {
    type: String,
    trim: true,
    required: "phone required for Agent"
  },
  username: {
    type: String,
  },
  avatar: {
    type: String
  }
});

const Agent = mongoose.model("Agent", agentSchema);

module.exports = Agent;