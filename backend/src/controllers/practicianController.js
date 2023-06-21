const models = require("../models");

const browse = (req, res) => {
  models.practician
    .findAll()
    .then(([practicians]) => {
      res.send(practicians).status(200);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
};
