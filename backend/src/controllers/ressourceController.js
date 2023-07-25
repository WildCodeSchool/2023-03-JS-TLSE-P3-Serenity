const models = require("../models");

const getAllRessource = (req, res) => {
  models.ressource
    // .getAllRessource()
    .getAllRessource()
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
  getAllRessource,
};
