/* eslint-disable camelcase */
const models = require("../models");

const getListOfAllPracticians = (req, res) => {
  models.practician
    .findAll()
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

const getPracticianById = (req, res) => {
  models.practician
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.status(200).send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const authenticationPracticianCheck = (req, res, next) => {
  const { adeli } = req.body;

  models.practician
    .getPracticianByAdeliNumber(adeli)
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

const AddPractician = (req, res) => {
  const {
    adeli_number,
    hashed_password,
    firstname,
    lastname,
    mail,
    administrator_id,
  } = req.body;

  models.practician
    .insert({
      adeli_number,
      hashed_password,
      firstname,
      lastname,
      mail,
      administrator_id,
    })
    .then(([result]) => {
      if (result.affectedRows) {
        res.status(201).json({
          id: result.insertId,
          adeli_number,
          hashed_password,
          firstname,
          lastname,
          mail,
          administrator_id,
        });
      } else {
        res.sendStatus(400);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deletePractician = (req, res) => {
  models.practician
    .delete(req.params.id)
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

const updatePractician = (req, res) => {
  const { id } = req.params;
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const valueQuery = keys.map((key) => `${key} = ?`).join(", ");
  models.practician
    .update(values, valueQuery, id)
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
  getListOfAllPracticians,
  getPracticianById,
  updatePractician,
  AddPractician,
  deletePractician,
  authenticationPracticianCheck,
};
