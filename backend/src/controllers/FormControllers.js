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
  const { user_type, request_type, request, is_read, is_done } = req.body;
  const { id } = req.params;

  models.form
    .update({
      user_type,
      request_type,
      request,
      is_read,
      is_done,
      id,
    })
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
  const { user_type, request_type, request, is_read, is_done } = req.body;

  models.form
    .insert({
      user_type,
      request_type,
      request,
      is_read,
      is_done,
    })
    .then(([result]) => {
      if (result.affectedRows) {
        res.status(201).json({
          id: result.insertId,
          user_type,
          request_type,
          request,
          is_read,
          is_done,
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
