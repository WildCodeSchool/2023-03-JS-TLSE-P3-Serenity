const express = require("express");

const router = express.Router();

const interventionCountController = require("./controllers/interventionCountController");
const ressourceCountController = require("./controllers/ressourceCountController");
const admins = require("./controllers/adminControllers");
const practicianControllers = require("./controllers/PraticianControllers");

const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");
router.get("/admins/practicians/:id", practicianControllers.getPracticianById);
router.put("/admins/practicians/:id", practicianControllers.updatePractician);
router.delete(
  "/admins/practicians/:id",
  practicianControllers.deletePractician
);
router.get(
  "/admins/practicians/",
  practicianControllers.getListOfAllPracticians
);
router.get(
  "/admins/practicians/countintervention/:id",
  interventionCountController.getInterventionCount
);
router.get(
  "/admins/practicians/countressource/:id",
  ressourceCountController.getRessourceCount
);

router.post("/admins/login", admins.authenticationCheck, verifyPassword);
router.put("/admins/:id", verifyToken, hashPassword, admins.modifyAdmin);

router.post("/admins/practicians/", practicianControllers.AddPractician);

module.exports = router;
