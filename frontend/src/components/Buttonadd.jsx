import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function Buttonadd() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const formData = new FormData(form); // Crée un objet FormData avec les données du formulaire
    const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/espacepro`, formJson) // Remplacez "/api/endpoint" par l'URL de votre API
      .then(() => {
        // Gérer la réponse de l'API en cas de succès
        // eslint-disable-next-line no-alert
        alert("Données envoyées avec succès !");
        handleClose();
      })
      .catch((error) => {
        // Gérer les erreurs de requête ou de réponse de l'API
        console.error("Erreur lors de l'envoi des données :", error);
      });
  };
  // Fonction pour générer un mot de passe aléatoire
  const generateRandomPassword = () => {
    const randomPassword = Math.random().toString(36).substring(2, 11);
    return randomPassword;
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
          <Modal.Title>Modal heading</Modal.Title>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                placeholder="Prénom"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="mail"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Matricule</Form.Label>
              <Form.Control
                type="number"
                name="adeli_number"
                placeholder="00-00-00"
                autoFocus
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Mot de passe</Form.Label> */}
            {/* <Form.Control
                type="text"
                name="password"
                placeholder="00-00-00"
                value={1}
                autoFocus
              />
            </Form.Group> */}
            <input
              type="hidden"
              name="password"
              value={generateRandomPassword()}
            />
            <input type="hidden" name="administrator_id" value={1} />
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Buttonadd;

// Dans cet exemple, nous utilisons Axios pour effectuer une requête POST vers l'URL /api/endpoint. Vous devrez remplacer cette URL par l'URL de votre propre backend ou de votre API qui recevra les données du formulaire.

// L'objet formData est créé à partir des données du formulaire en utilisant new FormData(form). Cela nous permet d'envoyer les données au format approprié (encodage multipart/form-data) en incluant les fichiers le cas échéant.

// Lorsque la requête est effectuée avec succès, la fonction .then() est appelée avec la réponse de l'API. Vous pouvez gérer la réponse selon vos besoins, par exemple en affichant un message de succès ou en effectuant d'autres actions.

// En cas d'erreur lors de la requête, la fonction .catch() est appelée et vous pouvez gérer l'erreur, par exemple en affichant un message d'erreur à l'utilisateur ou en journalisant les détails de l'erreur.

// Assurez-vous de remplacer /api/endpoint par l'URL appropriée vers votre backend ou votre API, et adaptez le code pour traiter la réponse de l'API selon vos besoins spécifiques.
