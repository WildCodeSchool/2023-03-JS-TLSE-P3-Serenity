import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../styles/PracticianListModal.scss";
import axios from "axios";

function Buttonadd() {
  const [show, setShow] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // État pour le suivi de l'affichage du message de succès

  const handleClose = () => {
    setShow(false);
    setShowSuccessMessage(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/admins/practicians/`, formJson)
      .then(() => {
        // Met à jour l'état pour indiquer la soumission réussie
        setShowSuccessMessage(true); // Affiche le message de succès
      })
      .catch((error) => {
        // Gérer les erreurs de requête ou de réponse de l'API
        console.error("Erreur lors de l'envoi des données :", error);
      });
  };
  // Fonction pour générer un mot de passe aléatoire
  const generatePassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[{]};:',<.>/?";
    let password = "";

    // Ajoute une lettre majuscule
    password += characters.charAt(Math.floor(Math.random() * 26));

    // Ajoute une lettre minuscule
    password += characters.charAt(Math.floor(Math.random() * 26) + 26);

    // Ajoute un chiffre
    password += characters.charAt(Math.floor(Math.random() * 10) + 52);

    // Ajoute un caractère spécial
    password += characters.charAt(Math.floor(Math.random() * 19) + 62);

    // Génère les caractères restants
    for (let i = 0; i < 4; i += 1) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    // Mélange les caractères du mot de passe
    password = password
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    return password;
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="add-practician">
        Ajout de praticien
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un praticien</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                placeholder="Nom"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Buttonadd.ControlInput2">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                placeholder="Prénom"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Buttonadd.ControlInput3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="mail"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Buttonadd.ControlInput4">
              <Form.Label>Numéro ADELI</Form.Label>
              <Form.Control
                type="text"
                name="adeli_number"
                placeholder="00-00-00"
                autoFocus
                maxLength={9}
              />
            </Form.Group>
            <input type="hidden" name="password" value={generatePassword()} />
            <input type="hidden" name="administrator_id" value={1} />
            <Modal.Footer>
              {showSuccessMessage && (
                <span className="success-message">Ajout effectué !</span>
              )}
              <Button variant="danger" onClick={handleClose}>
                Annuler
              </Button>
              <Button type="submit" variant="primary">
                Ajouter
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Buttonadd;
