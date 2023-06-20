const express = require("express");

const router = express.Router();

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

module.exports = router;
