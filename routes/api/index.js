const router = require("express").Router();
const bandRoutes = require("./bands");
const userRoutes = require("./user");

// Band routes
router.use("/bands", bandRoutes);
router.use("/user", userRoutes);

module.exports = router;