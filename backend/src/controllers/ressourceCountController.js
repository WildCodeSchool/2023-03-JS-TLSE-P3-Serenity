const models = require("../models");

const getRessourceCount = (req, res) => {
  models.ressource
    .findRessourceCount(req.params.id)
    .then(([ressources]) => {
      if (ressources[0] == null) {
        res.sendStatus(404);
      } else {
        res.status(200).send(ressources[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const patientInterventionRessource = (req, res) => {
  models.ressource
    .getPatientInterventionRessource(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.status(200).send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updatePatientInterventionRessource = (req, res) => {
  models.ressource
    .updatePatientInterventionRessource(req.params.id, req.body.is_done)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getRessourceCount,
  patientInterventionRessource,
  updatePatientInterventionRessource,
};
