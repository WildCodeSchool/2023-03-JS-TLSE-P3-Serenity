const express = require("express");

const router = express.Router();

const interventionCountController = require("./controllers/interventionCountController");
const ressourceCountController = require("./controllers/ressourceCountController");
const admins = require("./controllers/adminControllers");
const practicianControllers = require("./controllers/PraticianControllers");
const formControllers = require("./controllers/FormControllers");

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

// route "form"
router.get("/admins/forms/", formControllers.getListOfAllForm);
router.get("/admins/forms/:id", formControllers.getFormById);
router.post("/admins/forms/", formControllers.AddForm);
router.put("/admins/forms/:id", formControllers.updateForm);
router.delete("/admins/forms/:id", formControllers.deleteForm);
router.get(
  "/admins/practicians/countintervention/:id",
  formControllers.getFormCount
);

module.exports = router;
