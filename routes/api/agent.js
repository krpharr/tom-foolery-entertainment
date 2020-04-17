const router = require("express").Router();
const agentController = require("../../controllers/agentController");

router.route("/")
  .get(agentController.findAll)
  .post(agentController.create);

router
  .route("/:id")
  .get(agentController.findById)
  .put(agentController.update)
  .delete(agentController.remove);

module.exports = router;