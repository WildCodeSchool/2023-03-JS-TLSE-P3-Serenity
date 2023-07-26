const express = require("express");

const multer = require("multer");

// ressource file destination
const upload = multer({ dest: "./public/uploads/" });

const router = express.Router();

const interventionController = require("./controllers/interventionController");
const interventionRessource = require("./controllers/interventionRessourceController");
const ressourceController = require("./controllers/ressourceController");
const admins = require("./controllers/adminControllers");
const practicianControllers = require("./controllers/PraticianControllers");
const patients = require("./controllers/PatientControllers");
const formControllers = require("./controllers/FormControllers");
const mailControllers = require("./controllers/mailControllers");
const uploadControllers = require("./controllers/uploadControllers");

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
router.delete("/practician/patients/:id", verifyToken, patients.deletePatient);
router.get(
  "/admins/practicians/",
  verifyToken,
  verifyAdminRole,
  practicianControllers.getListOfAllPracticians
);
router.get("/practician/patients", verifyToken, patients.getListOfAllPatients);

router.get(
  "/admins/practicians/countintervention/:id",
  verifyToken,
  verifyAdminRole,
  interventionController.getInterventionCount
);

router.get(
  "/admins/practicians/countressource/:id",
  verifyToken,
  verifyAdminRole,
  ressourceController.getRessourceCount
);
router.put(
  "/admins/:id",
  verifyToken,
  verifyAdminRole,
  hashPassword,
  admins.modifyAdmin
);
// router to send mail to practician
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
router.get(
  "/patients/practician/:id",
  verifyToken,
  checkId,
  patients.getPracticianInfoByIdPatient
);

router.get(
  "/patients/ressourceintervention/:id",
  verifyToken,
  ressourceController.patientInterventionRessource
);

router.put(
  "/patients/ressourceintervention/:id",
  verifyToken,
  ressourceController.updatePatientInterventionRessource
);
// route "managing ressource"
router.get(
  "/ressources/practicians/:id",
  verifyToken,
  checkId,
  ressourceController.getRessources
);

router.delete(
  "/practicians/:id/ressources/:ressourceId",
  verifyToken,
  checkId,
  ressourceController.deleteRessource
);

router.post(
  "/practicians/:id/ressources",
  verifyToken,
  checkId,
  ressourceController.addRessource
);

// upload ressource on cloudinary
router.post(
  "/upload/ressources",
  verifyToken,
  upload.single("ressource-file"),
  uploadControllers.uploadRessource
);

// delete ressource on cloudinary
router.delete(
  "/delete/ressources/:nameRessourceToDelete",
  verifyToken,
  uploadControllers.destroy
);

// routes for intervention
router.get(
  "/practicians/:id/interventions",
  verifyToken,
  checkId,
  interventionController.getPracticianIntervention
);

router.post(
  "/practicians/:id/interventions",
  verifyToken,
  checkId,
  interventionController.addPracticianIntervention
);

router.delete(
  "/practicians/:id/interventions/:interventionId",
  verifyToken,
  checkId,
  interventionController.deleteIntervention
);

// routes for intervention_ressource
router.post(
  "/practicians/:id/interventions/:idInter/ressources",
  verifyToken,
  checkId,
  interventionRessource.addInterventionRessources
);

router.delete(
  "/practicians/:id/delete/interventions/:idInter/ressources",
  verifyToken,
  checkId,
  interventionRessource.deleteInterventionRessources
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
router.put(
  "/practicians/account/:id",
  verifyToken,
  hashPassword,
  checkId,
  practicianControllers.updatePractician
);
router.put(
  "/patients/account/:id",
  verifyToken,
  hashPassword,
  checkId,
  patients.updatePatient
);

// router to add patient
router.post(
  "/practicians/patients/mail",
  verifyToken,
  mailControllers.sendContactMailToPatient
);
router.post(
  "/practicians/patients/",
  verifyToken,
  hashPassword,
  patients.AddPatient
);
module.exports = router;
