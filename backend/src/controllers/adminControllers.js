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
  const { matricule, password } = req.body;

  models.administrator
    .update(matricule, password, id)
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

// const browse = (req, res) => {
//   _item
//     .findAll()
//     .then(([rows]) => {
//       res.send(rows);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

// const read = (req, res) => {
//   _item
//     .find(req.params.id)
//     .then(([rows]) => {
//       if (rows[0] == null) {
//         res.sendStatus(404);
//       } else {
//         res.send(rows[0]);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

// const edit = (req, res) => {
//   const item = req.body;

//   // TODO validations (length, format...)

//   item.id = parseInt(req.params.id, 10);

//   _item
//     .update(item)
//     .then(([result]) => {
//       if (result.affectedRows === 0) {
//         res.sendStatus(404);
//       } else {
//         res.sendStatus(204);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

// const add = (req, res) => {
//   const item = req.body;

//   // TODO validations (length, format...)

//   _item
//     .insert(item)
//     .then(([result]) => {
//       res.location(`/items/${result.insertId}`).sendStatus(201);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

// const destroy = (req, res) => {
//   _item
//     .delete(req.params.id)
//     .then(([result]) => {
//       if (result.affectedRows === 0) {
//         res.sendStatus(404);
//       } else {
//         res.sendStatus(204);
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//       res.sendStatus(500);
//     });
// };

module.exports = {
  authenticationCheck,
  modifyAdmin,
  //   browse,
  //   read,
  //   edit,
  //   add,
  //   destroy,
};
