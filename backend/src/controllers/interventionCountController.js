const models = require("../models");

const getInterventionCount = (req, res) => {
  models.intervention
    .findInterventionCount(req.params.id)
    .then(([interventions]) => {
      if (interventions[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(interventions[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getInterventionCount,
};
