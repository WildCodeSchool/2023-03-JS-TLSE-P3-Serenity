const express = require("express");

const router = express.Router();

const interventionCountController = require("./controllers/interventionCountController");
const ressourceCountController = require("./controllers/ressourceCountController");
const PracticianControllers = require("./controllers/PraticianControllers");

router.get("/admins/practicians/:id", PracticianControllers.read);
router.put("/admins/practicians/:id", PracticianControllers.edit);
router.post("/admins/practicians/", PracticianControllers.add);
router.delete("/admins/practicians/:id", PracticianControllers.destroy);
router.get("/admins/practicians/", PracticianControllers.browse);
router.get(
  "/admins/practicians/countintervention/:id",
  interventionCountController.getInterventionCount
);
router.get(
  "/admins/practicians/countressource/:id",
  ressourceCountController.getRessourceCount
);

module.exports = router;
