const models = require("../models");

const authenticationCheck = (req, res, next) => {
  const { matricule } = req.body;

  models.administrator
    .getAdminByMatricule(matricule)
    .then(([users]) => {
      if (users[0] != null) {
        [req.user] = users;
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const modifyAdmin = (req, res) => {
  const { id } = req.params;
  const { matricule, hashedPassword } = req.body;

  models.administrator
    .update(matricule, hashedPassword, id)
    .then(([result]) => {
      if (result.affectedRows !== 0) {
        res.sendStatus(204);
      } else {
        res.status(404).send("User not found...");
      }
    })
    .catch(() => {
      res.status(500).send("Error while updating user");
    });
};

module.exports = {
  authenticationCheck,
  modifyAdmin,
};
