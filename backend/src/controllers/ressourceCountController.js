const models = require("../models");

const getRessourceCount = (req, res) => {
    models.intervention
      .find(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

module.exports = {
  getRessourceCount,
}