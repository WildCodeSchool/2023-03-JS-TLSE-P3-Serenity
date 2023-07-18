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

const deleteRessource = (req, res) => {
  models.ressource
    .delete(req.params.ressourceId)
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

const getRessources = (req, res) => {
  models.ressource
    .getRessourceByPracticianId(req.params.id)
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

module.exports = {
  getRessourceCount,
  deleteRessource,
  getRessources,
};
