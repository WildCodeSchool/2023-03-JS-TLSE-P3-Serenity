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

module.exports = {
  getRessourceCount,
};
