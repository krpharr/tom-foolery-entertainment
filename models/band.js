const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bandSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Band must havea name"
  }
});

const Band = mongoose.model("Band", bandSchema);

module.exports = Band;