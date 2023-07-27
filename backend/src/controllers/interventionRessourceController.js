const models = require("../models");

const addInterventionRessources = (req, res) => {
  const { idInter } = req.params;
  const ressource = req.body;
  const idRessource = ressource.id;
  models.intervention_ressource
    .insert(idInter, idRessource)
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

const deleteInterventionRessources = (req, res) => {
  const { idInter } = req.params;
  models.intervention_ressource
    .delete(idInter)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const getInterventionRessource = (req, res) => {
  const { idInter } = req.params;
  models.intervention_ressource
    .findRessourcesByInterId(idInter)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports = {
  addInterventionRessources,
  deleteInterventionRessources,
  getInterventionRessource,
};
