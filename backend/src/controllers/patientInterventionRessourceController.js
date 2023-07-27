/* eslint-disable camelcase */
const models = require("../models");

const addInterventionRessourceForPatient = (req, res) => {
  const { interventionPatientId } = req.params;
  const { ressource_id } = req.body;
  models.patient_intervention_ressource
    .insert(interventionPatientId, ressource_id)
    .then(([result]) => {
      if (result.affectedRows) {
        res.status(201).send("Ok");
      } else {
        res.sendStatus(400);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  addInterventionRessourceForPatient,
};
