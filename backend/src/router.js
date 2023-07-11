const express = require("express");

const router = express.Router();

const interventionCountController = require("./controllers/interventionCountController");
const ressourceCountController = require("./controllers/ressourceCountController");
const admins = require("./controllers/adminControllers");
const practicianControllers = require("./controllers/PraticianControllers");
const patients = require("./controllers/PatientControllers");
const formControllers = require("./controllers/FormControllers");
const mailControllers = require("./controllers/mailControllers");

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyAdminRole,
  checkId,
} = require("./services/auth");

router.post("/admins/login", admins.authenticationCheck, verifyPassword);
router.post(
  "/practicians/login",
  practicianControllers.authenticationPracticianCheck,
  verifyPassword
);
router.post(
  "/patients/login",
  patients.authenticationPatientCheck,
  verifyPassword
);

router.get(
  "/admins/practicians/:id",
  verifyToken,
  verifyAdminRole,
  practicianControllers.getPracticianById
);
router.put(
  "/admins/practicians/:id",
  verifyToken,
  verifyAdminRole,
  practicianControllers.updatePractician
);
router.delete(
  "/admins/practicians/:id",
  verifyToken,
  verifyAdminRole,
  practicianControllers.deletePractician
);
router.get(
  "/admins/practicians/",
  verifyToken,
  verifyAdminRole,
  practicianControllers.getListOfAllPracticians
);

router.get(
  "/admins/practicians/countintervention/:id",
  verifyToken,
  verifyAdminRole,
  interventionCountController.getInterventionCount
);

router.get(
  "/admins/practicians/countressource/:id",
  verifyToken,
  verifyAdminRole,
  ressourceCountController.getRessourceCount
);

router.put(
  "/admins/:id",
  verifyToken,
  verifyAdminRole,
  hashPassword,
  admins.modifyAdmin
);
router.post(
  "/admins/practicians/mail",
  verifyToken,
  verifyAdminRole,
  mailControllers.sendContactMail
);

router.post(
  "/admins/practicians/",
  verifyToken,
  verifyAdminRole,
  hashPassword,
  practicianControllers.AddPractician
);

// route "form"
router.get("/admins/forms/", formControllers.getListOfAllForm);
router.get("/admins/forms/:id", formControllers.getFormById);
router.post("/admins/forms/", formControllers.AddForm);
router.put("/admins/forms/:id", formControllers.updateForm);
router.delete("/admins/forms/:id", formControllers.deleteForm);
router.get("/admins/forms/countform/:id", formControllers.getFormCount);

// route "account"
router.put(
  "/admins/account/:id",
  verifyToken,
  hashPassword,
  checkId,
  admins.modifyAdmin
);

module.exports = router;
