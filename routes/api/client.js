const router = require("express").Router();
const clientController = require("../../controllers/clientController");

router.route("/")
  .get(clientController.findAll)
  .post(clientController.create);

router
  .route("/:id")
  .get(clientController.findById)
  .put(clientController.update)
  .delete(clientController.remove);

module.exports = router;