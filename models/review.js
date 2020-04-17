const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  clientId: {
    type: String,
    trim: true,
    required: "clientId required for Review"
  },
  eventId: {
    type: String,
    trim: true,
    required: "eventId required for Review"
  },
  bandId: {
    type: String,
    trim: true,
    required: "bandId required for Review"
  },
  review: {
    type: String,
    trim: true,
    required: "review required for Review"
  }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;