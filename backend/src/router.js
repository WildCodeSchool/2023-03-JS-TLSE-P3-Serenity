const express = require("express");

const router = express.Router();

const practicianControllers = require("./controllers/practicianController");
const interventionCountController = require("./controllers/interventionCountController");
const ressourceCountController = require("./controllers/ressourceCountController");
const AdministratorControllers = require("./controllers/AdministratorControllers");
const PracticianControllers = require("./controllers/PraticianControllers");

router.get("/admin", AdministratorControllers.browse);
router.get("/admin/:id", AdministratorControllers.read);
router.put("/admin/:id", AdministratorControllers.edit);
router.post("/admin", AdministratorControllers.add);
router.delete("/admin/:id", AdministratorControllers.destroy);

router.get("/espacepro", PracticianControllers.browse);
router.get("/espacepro/:id", PracticianControllers.read);
router.put("/espacepro/:id", PracticianControllers.edit);
router.post("/espacepro", PracticianControllers.add);
router.delete("/espacepro/:id", PracticianControllers.destroy);
router.get("/admins/practicians/", practicianControllers.browse);
router.get(
  "/admins/practicians/countintervention/:id",
  interventionCountController.getInterventionCount
);
router.get(
  "/admins/practicians/countressource/:id",
  ressourceCountController.getRessourceCount
);

module.exports = router;
