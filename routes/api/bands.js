const router = require("express").Router();
const bandsController = require("../../controllers/bandsController");

//get all bands from database = will be "/api/bands"
// mern 05-stu-reactRouter example
router.route("/")
  .get(bandsController.findAll)
  .post(bandsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(bandsController.findById)
  .put(bandsController.update)
  .delete(bandsController.remove);

module.exports = router;