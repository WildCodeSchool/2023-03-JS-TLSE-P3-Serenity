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
      res.sendStatus(200).json(result);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const getPracticianIntervention = (req, res) => {
  const practicianId = req.params.id;
  models.intervention
    .getAllPracticianIntervention(practicianId)
    .then(([result]) => {
      if (result.length) {
        res.status(200).json(result);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteIntervention = (req, res) => {
  const { interventionId } = req.params;
  models.intervention
    .delete(interventionId)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const addPracticianIntervention = (req, res) => {
  const { name, duration, anesthesia } = req.body;
  const { id } = req.params;
  models.intervention
    .insert(name, duration, anesthesia, id)
    .then(([result]) => {
      if (result.affectedRows) {
        res.status(201).json({
          id: result.insertId,
        });
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
  getInterventionCount,
  getPatientIntervention,
  getPracticianIntervention,
  deleteIntervention,
  addPracticianIntervention,
};
