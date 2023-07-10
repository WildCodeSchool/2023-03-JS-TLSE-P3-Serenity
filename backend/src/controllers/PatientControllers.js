/* eslint-disable camelcase */
const models = require("../models");

const getListOfAllPatients = (req, res) => {
  models.patient
    .findAll()
    .then(([result]) => {
      if (result.length) {
        res.status(200).json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getPatientById = (req, res) => {
  models.patient
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.status(200).send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const authenticationPatientCheck = (req, res, next) => {
  const { mail } = req.body;

  models.patient
    .getPatientByMail(mail)
    .then(([users]) => {
      if (users[0] != null) {
        [req.user] = users;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const deletePatient = (req, res) => {
  models.patient
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getListOfAllPatients,
  getPatientById,
  deletePatient,
  authenticationPatientCheck,
};
