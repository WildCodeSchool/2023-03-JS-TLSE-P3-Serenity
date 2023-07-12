const models = require("../models");

const getInterventionCount = (req, res) => {
  models.intervention
    .findInterventionCount(req.params.id)
    .then(([interventions]) => {
      if (interventions[0] == null) {
        res.sendStatus(404);
      } else {
        res.status(200).send(interventions[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getPatientIntervention = (req, res) => {
  const patientId = req.params.id;
  models.intervention
    .getPatientIntervention(patientId)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports = {
  getInterventionCount,
  getPatientIntervention,
};
