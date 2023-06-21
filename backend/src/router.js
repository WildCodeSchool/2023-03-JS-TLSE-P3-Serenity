const express = require("express");

const router = express.Router();

const practicianControllers = require("./controllers/practicianController");
const interventionCountController = require("./controllers/interventionCountController");
const ressourceCountController = require("./controllers/ressourceCountController");

router.get("/practicians", practicianControllers.browse, interventionCountController.getInterventionCount, ressourceCountController.getRessourceCount);
router.get("/practicians/countintervention/:id", interventionCountController.getInterventionCount);
router.get("/practicians/countressource", ressourceCountController.getRessourceCount);

module.exports = router;
