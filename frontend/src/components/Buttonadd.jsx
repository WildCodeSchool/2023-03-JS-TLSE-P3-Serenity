import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../styles/PracticianListModal.scss";
import axios from "axios";
import StateContext from "../contexts/StateContext";

function Buttonadd() {
  // Status for tracking success message display
  const { showSuccessMessageAdd, setShowSuccessMessageAdd, show, setShow } =
    useContext(StateContext);

  const handleClose = () => {
    setShow(false);
    setShowSuccessMessageAdd(false);
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
        // Updates status to indicate successful submission
        setShowSuccessMessageAdd(true); // Displays success message
      })
      .catch((error) => {
        // Handle API request or response errors
        console.error("Erreur lors de l'envoi des données :", error);
      });
  };
  // Function to generate random password
  const generatePassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[{]};:',<.>/?";
    let password = "";

    // Adds an uppercase letter
    password += characters.charAt(Math.floor(Math.random() * 26));

    // Adds an lowercase letter
    password += characters.charAt(Math.floor(Math.random() * 26) + 26);

    // Adds number
    password += characters.charAt(Math.floor(Math.random() * 10) + 52);

    // Ajoute un caractère spécial
    password += characters.charAt(Math.floor(Math.random() * 19) + 62);
    // Generates remaining characters
    for (let i = 0; i < 4; i += 1) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    // Mixes password characters
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
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Buttonadd.ControlInput2">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                placeholder="Prénom"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Buttonadd.ControlInput3">
              <Form.Label>Mail</Form.Label>
              <Form.Control
                type="email"
                name="mail"
                placeholder="name@example.com"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Buttonadd.ControlInput4">
              <Form.Label>Numéro ADELI</Form.Label>
              <Form.Control
                type="text"
                name="adeli_number"
                placeholder="12345678"
                autoFocus
                maxLength={9}
                required
              />
            </Form.Group>
            <input
              type="hidden"
              name="hashed_password"
              value={generatePassword()}
            />
            <input type="hidden" name="administrator_id" value={1} />
            <Modal.Footer>
              {showSuccessMessageAdd && (
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
