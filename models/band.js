const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bandSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Band must havea name"
  },
  leader: {
    type: String,
    trim: true,
    required: "Band must have a leader."
  },
  description: {
    type: String,
    trim: true,
    required: "Band must have a description"
  },
  images: {
    type: Array,
    required: "Band must have at least one image in array"
  },
  videos: {
    type: Array,
    required: "Band must have at least one video in array"
  },
  priceRange: {
    type: Array, //[0] low - [1] high
    required: "Band must have value"
  },
  genres: {
    type: Array,
    required: "Band must have at least one genre"
  },
  reviews: {
    type: Array,
  },
  upcomingEvents: {
    type: Array,
  },
  pastEvents: {
    type: Array,
  }
});

const Band = mongoose.model("Band", bandSchema);

module.exports = Band;