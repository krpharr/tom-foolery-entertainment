const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bandsSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Band/Entertainer must havea name"
  }
});

const Bands = mongoose.model("Bands", bandsSchema);

module.exports = Bands;