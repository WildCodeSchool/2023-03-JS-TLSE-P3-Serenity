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
  verifyAdminRole,
} = require("./services/auth");

router.post("/admins/login", admins.authenticationCheck, verifyPassword);

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
  "/admins/practicians/",
  verifyToken,
  verifyAdminRole,
  practicianControllers.AddPractician
);

module.exports = router;
