const router = require("express").Router();
const bandController = require("../../controllers/bandController");

router.route("/")
  .get(bandController.findAll)
  .post(bandController.create);

router
  .route("/:id")
  .get(bandController.findById)
  .put(bandController.update)
  .delete(bandController.remove);

module.exports = router;