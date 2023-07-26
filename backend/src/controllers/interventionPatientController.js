const models = require("../models");

const addInterventionForPatient = (req, res) => {
  const { interventionId, interventionDate, idPatient } = req.body;
  models.intervention_patient
    .insert(interventionId, idPatient, interventionDate)
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
  addInterventionForPatient,
};
