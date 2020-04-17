const router = require("express").Router();
const bandleaderController = require("../../controllers/bandleaderController");

router.route("/")
  .get(bandleaderController.findAll)
  .post(bandleaderController.create);

router
  .route("/:id")
  .get(bandleaderController.findById)
  .put(bandleaderController.update)
  .delete(bandleaderController.remove);

module.exports = router;