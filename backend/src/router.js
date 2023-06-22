const express = require("express");

const router = express.Router();

const practicianControllers = require("./controllers/practicianController");
const interventionCountController = require("./controllers/interventionCountController");
const ressourceCountController = require("./controllers/ressourceCountController");

router.get("/admins/practicians/", practicianControllers.browse);
router.get(
  "/admins/practicians/countintervention/:id",
  interventionCountController.getInterventionCount
);
router.get(
  "/admins/practicians/countressource/:id",
  ressourceCountController.getRessourceCount
);
router.delete("/admins/practicians/:id", practicianControllers.destroy);

module.exports = router;
