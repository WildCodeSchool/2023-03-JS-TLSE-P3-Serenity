/* eslint-disable camelcase */
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendContactMail = (req, res, next) => {
  const { mail, firstname, lastname, hashed_password, adeli_number } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SENDIN,
    port: process.env.SMTP_PORT_SENDIN,
    secure: true,
    auth: {
      user: process.env.SMTP_SENDIN_USER,
      pass: process.env.SMTP_SENDIN_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_SENDIN_USER,
    to: mail,
    subject: "Vos identifiants de connexion ",
    text: `${hashed_password} \n\n Email: ${mail}`,
    html: `Bonjour ${firstname} ${lastname},
    <p>Voici vos identifiants de connexion à votre espace professionnel</p>
    <p>Password:${hashed_password}</p>
    <p>Numéro Adeli: ${adeli_number}</p>
    <p>Cordialement !</p>`,
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.warn(info);
      res.status(200).send("Message sent");
      next();
    })
    .catch((err) => {
      console.warn(err);
      res.status(500).send("Something went wrong");
    });
};
module.exports = {
  sendContactMail,
};
