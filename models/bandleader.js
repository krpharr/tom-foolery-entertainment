const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bandleaderSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: "firstName required for Bandleader"
  },
  lastName: {
    type: String,
    trim: true,
    required: "lastName required for Bandleader"
  },
  bandId: {
    type: String,
    trim: true,
    required: "bandId required for Bandleader"
  },
  phone: {
    type: String,
    trim: true,
    required: "phone required for Bandleader"
  },
  email: {
    type: String,
    trim: true,
    required: "email required for Bandleader"
  },
  emergencyContact: {
    type: String,
    trim: true,
    required: "emergencyContact required for Bandleader"
  },
  userId: {
    type: String,
    trim: true,
    required: "userId required for Bandleader"
  }
});

const Bandleader = mongoose.model("Bandleader", bandleaderSchema);

module.exports = Bandleader;