import { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../styles/SendForm.scss";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function SendForm() {
  const [validated, setValidated] = useState(false);
  const { userInfo, userToken } = useContext(AuthFunctionContext);
  const { role } = userInfo;

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  const currentDateFormatted = getCurrentDate();

  const modalFormSendSucess = () => {
    return Swal.fire({
      background: "#242731",
      position: "center",
      icon: "success",
      title: "Requête envoyée avec succes",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const modalFormSendProblem = () => {
    return Swal.fire({
      background: "#242731",
      position: "center",
      icon: "error",
      title: "Erreur lors de l'envoi de votre requête, veuillez réessayer",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formJson = {
      user_type: role,
      request_type: formData.get("request_type"),
      request: formData.get("request"),
      create_time: currentDateFormatted,
    };
    console.info(formJson);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/admins/forms/`, formJson, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Role: `${role}`,
          },
        })
        .then(() => {
          modalFormSendSucess();
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi des données :", error);
          modalFormSendProblem();
        });
    }

    setValidated(true);
  };

  return (
    <div className="container-send-form">
      <Form
        className="send-form"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row className="mb-3 gx-0">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Requête</Form.Label>
            <Form.Select
              name="request_type"
              required
              as={Col}
              md="4"
              aria-label="Default select example"
            >
              <option value="">Sélectionnez votre requête</option>
              <option value="Problème avec une ressources">
                Problème avec une ressources
              </option>
              <option value="Problème avec une interventions">
                Problème avec une interventions
              </option>
              <option value="Problème avec mon compte">
                Problème avec mon compte
              </option>
              <option value="Problème d'affichage">Problème d'affichage</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3 gx-0">
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="request"
              as="textarea"
              rows={5}
              placeholder="Description de la requête"
              aria-label="With textarea"
              required
            />
            <Form.Control.Feedback type="invalid">
              Merci d'écrire au moins 100 caractères pour votre requête.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3 text-white" controlId="formBasicCheckbox">
          <Form.Check
            required
            type="checkbox"
            label="J'ai vérifié les informations de ma requête."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">Envoyer ma requête</Button>
      </Form>
    </div>
  );
}

export default SendForm;
