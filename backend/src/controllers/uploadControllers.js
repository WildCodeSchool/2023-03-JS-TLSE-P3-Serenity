const fs = require("fs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

class uploadControllers {
  static uploadRessource = (req, res) => {
    cloudinary.uploader.upload(
      req.file.path,
      { folder: "ressources" },
      (error, result) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ message: "Erreur lors de l'upload de la ressource" });
        }
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error(
              "Erreur lors de la suppression du fichier temporaire:",
              err
            );
          }
        });

        return res.status(200).json({ imageUrl: result.secure_url });
      }
    );
  };

  static destroy = (req, res) => {
    cloudinary.uploader
      .destroy(`ressources/${req.params.nameRessourceToDelete}`)
      .then((result) => {
        if (result.result === "ok") {
          res.sendStatus(204);
        } else {
          res.sendStatus(404);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = uploadControllers;
