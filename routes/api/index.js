const path = require("path");
const router = require("express").Router();
const bandRoutes = require("./bands");
const userRoutes = require("./user");

// Band routes
router.use("/bands", bandRoutes);
// user authentication w passport
router.use("/user", userRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;