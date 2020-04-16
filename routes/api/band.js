const router = require("express").Router();
const bandController = require("../../controllers/bandController");

//get all bands from database = will be "/api/band"
// mern 05-stu-reactRouter example
router.route("/")
  .get(bandController.findAll)
  .post(bandController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(bandController.findById)
  .put(bandController.update)
  .delete(bandController.remove);

module.exports = router;