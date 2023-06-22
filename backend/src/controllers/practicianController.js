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

const destroy = (req, res) => {
  const practicianId = req.params.id;
  models.practician
    .delete(practicianId)
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

module.exports = {
  browse,
  destroy,
};
