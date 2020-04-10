const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/tom-foolery"
);

const bandSeed = [{
    name: "The Beatles",
  },
  {
    name: "The Rolling Stones",
  },
  {
    name: "The Cure",
  },
  {
    name: "The Police",
  },
  {
    name: "Rush",
  }
];

db.Bands
  .remove({})
  .then(() => db.Bands.collection.insertMany(bandSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });