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
  verifyAdminRole,
} = require("./services/auth");

router.post("/admins/login", admins.authenticationCheck, verifyPassword);

router.get(
  "/admins/practicians/",
  verifyToken,
  verifyAdminRole,
  practicianControllers.browse
);

router.get(
  "/admins/practicians/countintervention/:id",
  verifyToken,
  // verifyAdminRole,
  interventionCountController.getInterventionCount
);

router.get(
  "/admins/practicians/countressource/:id",
  verifyToken,
  // verifyAdminRole,
  ressourceCountController.getRessourceCount
);

router.put(
  "/admins/:id",
  verifyToken,
  // verifyAdminRole,
  hashPassword,
  admins.modifyAdmin
);

module.exports = router;
