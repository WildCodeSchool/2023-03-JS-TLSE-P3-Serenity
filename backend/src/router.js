const express = require("express");

const router = express.Router();

const practicianControllers = require("./controllers/practicianController");

router.get("/practicians", practicianControllers.browse);

module.exports = router;
