const path = require("path");
const router = require("express").Router();
const agentRoutes = require("./agent");
const bandRoutes = require("./band");
const bandleaderRoutes = require("./bandleader");
const clientRoutes = require("./client");
const eventRoutes = require("./event");
const inquiryRoutes = require("./inquiry");
const reviewRoutes = require("./review");
const userRoutes = require("./user");

router.use("/agent", agentRoutes);
router.use("/band", bandRoutes);
router.use("/bandleader", bandleaderRoutes);
router.use("/client", clientRoutes);
router.use("/event", eventRoutes);
router.use("/inquiry", inquiryRoutes);
router.use("/review", reviewRoutes);
router.use("/user", userRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;