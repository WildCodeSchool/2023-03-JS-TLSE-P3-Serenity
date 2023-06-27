/* eslint-disable camelcase */
const models = require("../models");

const getListOfAllForm = (req, res) => {
  models.form
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

const getFormById = (req, res) => {
  models.form
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

const updateForm = (req, res) => {
  const { id } = req.params;
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  const valueQuery = keys.map((key) => `${key} = ?`).join(", ");
  models.form
    .update(values, valueQuery, id)
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

const AddForm = (req, res) => {
  models.form
    .insert(req.body)
    .then(([result]) => {
      if (result.affectedRows) {
        res.status(201).json({
          id: result.insertId,
          ...req.body,
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

const deleteForm = (req, res) => {
  models.form
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

const getFormCount = (req, res) => {
  models.form
    .findFormCount()
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
  getListOfAllForm,
  getFormById,
  updateForm,
  AddForm,
  deleteForm,
  getFormCount,
};
