const router = require("express").Router();
const request = require('request');
// const Books = require("../models/Books.js");

// router.get("/api/googlebooks/:search/:start/:max", (req, res) => {
//   const { search, start, max } = req.params
//   const query = `https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${start}&maxResults=${max}&key=${process.env.API_KEY}`;
//   request(query, function(error, response, body) {
//     console.error('error:', error);
//     const jbody = JSON.parse(body);
//     res.json(jbody);
//   });
// });

//get all books from database
// router.get("/api/books", (req, res) => {
//   Books.find({})
//     .sort({ date: -1 })
//     .then(dbBooks => {
//       res.json(dbBooks);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

//save boook to database
// router.post("/api/books", ({ body }, res) => {
//   Books.create(body)
//     .then(dbBooks => {
//       res.json(dbBooks);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

//delete book from database
// router.delete("/api/books/:id", (req, res) => {
//   Books.remove({
//       _id: req.params.id
//     })
//     .then(dbBooks => {
//       res.json(dbBooks);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

module.exports = router;