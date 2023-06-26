const express = require("express");

const router = express.Router();

const practicianControllers = require("./controllers/practicianController");
const interventionCountController = require("./controllers/interventionCountController");
const ressourceCountController = require("./controllers/ressourceCountController");
const admins = require("./controllers/adminControllers");

const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");

router.get("/admins/practicians/", practicianControllers.browse);
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

module.exports = router;
