const express = require("express");

const router = express.Router();

const admins = require("./controllers/adminControllers");

const { hashPassword, verifyPassword } = require("./services/auth");

router.post("/admins", admins.authenticationCheck, verifyPassword);
router.put("/admin/:id", hashPassword, admins.modifyAdmin);
// router.get("/admins", admins.browse);
// router.get("/admins/:id", admins.read);
// router.put("/admins/:id", admins.edit);
// router.delete("/admins/:id", admins.destroy);

module.exports = router;
