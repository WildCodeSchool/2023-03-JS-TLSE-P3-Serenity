import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function ButtonUpdate() {
  const [practicianData, setPracticianData] = useState(null);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const getPraticianInfo = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/espacepro`)
      .then((response) => response.data)
      .then((data) => {
        // console.log(data);
        setPracticianData(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
      });
  };
  const handleClick = () => {
    getPraticianInfo();
    handleShow();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/espacepro/${practicianData[0].id}`,
        formJson
      ) // Remplacez "/api/endpoint" par l'URL de votre API
      .then(() => {
        // eslint-disable-next-line no-alert
        alert("Données envoyées avec succès !");
        handleClose();
      })
      .catch((error) => {
        // Gérer les erreurs de requête ou de réponse de l'API
        console.error("Erreur lors de l'envoi des données :", error);
      });
  };
  return (
    <>
      <Button
        variant="primary"
        onClick={handleClick}
        className="add-practician"
      >
        Modifier un praticien
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifier un praticien</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                defaultValue={practicianData ? practicianData[0].lastname : ""}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Prénom</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                defaultValue={practicianData ? practicianData[0].firstname : ""}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="mail"
                defaultValue={practicianData ? practicianData[0].mail : ""}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Matricule</Form.Label>
              <Form.Control
                type="text"
                name="adeli_number"
                defaultValue={
                  practicianData ? practicianData[0].adeli_number : ""
                }
                autoFocus
              />
            </Form.Group>
            <input
              type="hidden"
              name="administrator_id"
              defaultValue={
                practicianData ? practicianData[0].administrator_id : 1
              }
            />
            <input
              type="hidden"
              name="password"
              value={practicianData ? practicianData[0].password : ""}
            />
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Modifier
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ButtonUpdate;
