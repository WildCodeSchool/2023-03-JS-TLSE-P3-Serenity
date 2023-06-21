const express = require("express");

const router = express.Router();

const practicianControllers = require("./controllers/practicianController");
const interventionCountController = require("./controllers/interventionCountController");
const ressourceCountController = require("./controllers/ressourceCountController");

router.get("/practicians", practicianControllers.browse);
router.get("/practicians", interventionCountController.getInterventionCount);
router.get("/practicians", ressourceCountController.getRessourceCount);

module.exports = router;
