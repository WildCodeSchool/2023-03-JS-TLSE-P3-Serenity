/* eslint-disable camelcase */
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendContactMail = (req, res, next) => {
  const { mail, firstname, lastname, password } = req.body;

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
    text: `Bonjour ${firstname} ${lastname},
    Voici votre mot de passe pour vous connecter à votre espace professionnel
    Password:${password}
    Pensez à le changer dans l'onglet mon compte
    Cordialement !`,
    html: `Bonjour ${firstname} ${lastname},
    <p>Voici votre mot de passe pour vous connecter à votre espace professionnel</p>
    <p>Password:<strong>${password}</strong></p>
    <p>Pensez à le changer dans l'onglet mon compte </p>
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

const sendContactMailToPatient = (req, res, next) => {
  const { mail, firstname, lastname, password } = req.body;

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
    text: `Bonjour ${firstname} ${lastname},
    Voici votre mot de passe pour vous connecter à votre espace patient
    Password:${password}
    Pensez à le changer dans l'onglet mon compte
    Cordialement !`,
    html: `Bonjour ${firstname} ${lastname},
    <p>Voici votre mot de passe pour vous connecter à votre espace patient</p>
    <p>Password:<strong>${password}</strong></p>
    <p>Pensez à le changer dans l'onglet mon compte </p>
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
  sendContactMailToPatient,
};
