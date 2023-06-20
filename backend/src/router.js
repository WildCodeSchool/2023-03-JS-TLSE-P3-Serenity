const express = require("express");

const router = express.Router();

const admins = require("./controllers/adminControllers");

const {
  hashPassword,
  verifyPassword,
  verifyToken,
  identifyRole,
} = require("./services/auth");

router.post("/admins/login", admins.authenticationCheck, verifyPassword);
router.put(
  "/admins/:id",
  verifyToken,
  identifyRole,
  hashPassword,
  admins.modifyAdmin
);
// router.get("/admins", admins.browse);
// router.get("/admins/:id", admins.read);
// router.put("/admins/:id", admins.edit);
// router.delete("/admins/:id", admins.destroy);

module.exports = router;
