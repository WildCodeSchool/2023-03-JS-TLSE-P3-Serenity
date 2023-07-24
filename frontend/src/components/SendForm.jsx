import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../styles/SendForm.scss";

function SendForm() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
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
              required
              as={Col}
              md="4"
              controlId="validationCustom01"
              aria-label="Default select example"
            >
              <option>Sélectionnez votre requête</option>
              <option value="1">Problème avec une ressources</option>
              <option value="2">Problème avec une interventions</option>
              <option value="3">Problème avec mon compte</option>
              <option value="4">Problème d'affichage</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3 gx-0">
          <Form.Group as={Col} md="12" controlId="validationCustom03">
            <Form.Label>Description</Form.Label>
            <Form.Control
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
        <Form.Group className="mb-3 text-white">
          <Form.Check
            required
            label="J'ai vérifié les informations de ma requête."
            feedback="Veuillez cocher la case."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form>
    </div>
  );
}

export default SendForm;
