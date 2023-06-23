const express = require("express");

const router = express.Router();

const interventionCountController = require("./controllers/interventionCountController");
const ressourceCountController = require("./controllers/ressourceCountController");
const admins = require("./controllers/adminControllers");
const PracticianControllers = require("./controllers/PraticianControllers");

router.get("/admins/practicians/:id", PracticianControllers.read);
router.put("/admins/practicians/:id", PracticianControllers.edit);
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
const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");

router.post("/admins/login", admins.authenticationCheck, verifyPassword);
router.put("/admins/:id", verifyToken, hashPassword, admins.modifyAdmin);

// Ajout de praticiens
router.post("/admins/practicians/", PracticianControllers.add);

module.exports = router;
