const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

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

const deleteRessource = (req, res) => {
  models.ressource
    .delete(req.params.ressourceId)
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

const getRessources = (req, res) => {
  models.ressource
    .getRessourceByPracticianId(req.params.id)
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

const addRessourceFile = (req, res) => {
  const { originalname } = req.file;
  const { filename } = req.file;
  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${uuidv4()}-${originalname}`,
    (err) => {
      if (err) throw err;
      res.send({
        url: `./public/uploads/${uuidv4()}-${originalname}`,
        type: originalname.split(".").at(-1),
      });
    }
  );
};

const addRessource = (req, res) => {
  const { title, type, url, description, practicianId, themeRessourceId } =
    req.body;
  models.ressource
    .add(title, type, url, description, practicianId, themeRessourceId)
    .then(([result]) => {
      if (result.affectedRows) {
        res.sendStatus(201);
      } else {
        res.sendStatus(400);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getRessourceCount,
  deleteRessource,
  getRessources,
  addRessourceFile,
  addRessource,
};
