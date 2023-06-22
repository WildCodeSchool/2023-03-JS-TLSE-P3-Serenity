import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PracticianListModal.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Buttonadd from "./Buttonadd";

function PracticianListModal() {
  const [practicians, setPracticians] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedPractician, setSelectedPractician] = useState(null);
  const [modalInputs, setModalInputs] = useState({
    firstname: "",
    lastname: "",
    mail: "",
    adeli_number: "",
    administrator_id: "",
  });
  // État pour le suivi de l'affichage du message de succès
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // gestion of modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setShowSuccessMessage(false);
  };

  const handleTrClick = (practician) => {
    setSelectedPractician(practician);
    setModalInputs(practician);
    handleShow(true);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setModalInputs((prevModalInputs) => ({
      ...prevModalInputs,
      [name]: value,
    }));
  };
  const handleFormSubmit = () => {
    // event.preventDefault();
    // Effectuer une requête HTTP PUT ou PATCH pour mettre à jour les informations du praticien sélectionné
    if (selectedPractician) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/admins/practicians/${
            selectedPractician.id
          }`,
          modalInputs
        )
        .then((response) => {
          // Mettre à jour les données du praticien dans l'état
          const updatedPracticians = practicians.map((practician) => {
            if (practician.id === selectedPractician.id) {
              return response.data; // Utilisez la réponse de la requête pour mettre à jour le praticien
            }
            return practician;
          });
          setPracticians(updatedPracticians);
          setShowSuccessMessage(true);
          // setShow(true); // Fermer la modale après la mise à jour
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/admins/practicians`)
      .then((response) => {
        const promises = response.data.map((practician) =>
          Promise.all([
            axios.get(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/admins/practicians/countintervention/${practician.id}`
            ),
            axios.get(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/admins/practicians/countressource/${practician.id}`
            ),
          ])
        );

        Promise.all(promises)
          .then((countResponses) => {
            const updatedPracticians = response.data.map(
              (practician, index) => ({
                ...practician,
                countIntervention:
                  countResponses[index][0].data.interventionCount,
                countRessource: countResponses[index][1].data.ressourceCount,
              })
            );
            setPracticians(updatedPracticians);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="practician-list-container">
      <div className="practician-list">
        <div className="practician-list-header">
          <input
            className="search-input"
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="button" className="delete-button">
            <i className="fi fi-rr-trash" />
          </button>
        </div>
        <div className="practician-list-body">
          <table className="practician-list-table">
            <thead className="practician-list-table-header">
              <tr>
                <th>Nom</th>
                <th>Mail</th>
                <th>Poste</th>
                <th>Téléphone</th>
                <th>
                  Nombre
                  <br />
                  Interventions
                </th>
                <th>
                  Nombre
                  <br />
                  Ressources
                </th>
              </tr>
            </thead>
            <tbody className="practician-list-table-body">
              {practicians
                .filter(
                  (practician) =>
                    practician.lastname &&
                    practician.lastname
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                )
                .map((practician) => (
                  <tr
                    key={practician.id}
                    onClick={() => handleTrClick(practician)}
                  >
                    <td>
                      {practician.firstname} {practician.lastname}
                    </td>
                    <td>{practician.mail}</td>
                    <td>{practician.speciality}</td>
                    <td>{practician.phone}</td>
                    <td>{practician.countIntervention}</td>
                    <td>{practician.countRessource}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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
            <Form onSubmit={handleFormSubmit} encType="multipart/form-data">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  defaultValue={modalInputs.firstname}
                  autoFocus
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  defaultValue={modalInputs.lastname}
                  autoFocus
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="mail"
                  defaultValue={modalInputs.mail}
                  autoFocus
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput4"
              >
                <Form.Label>Numero ADELI</Form.Label>
                <Form.Control
                  type="text"
                  name="adeli_number"
                  defaultValue={modalInputs.adeli_number}
                  autoFocus
                  onChange={handleInputChange}
                />
              </Form.Group>
              <input
                type="hidden"
                name="administrator_id"
                defaultValue={modalInputs.administrator_id}
                onChange={handleInputChange}
              />
              <input
                type="hidden"
                name="password"
                defaultValue={modalInputs.password}
                onChange={handleInputChange}
              />
              <Modal.Footer>
                {showSuccessMessage && (
                  <span className="success-message">
                    Modification effectuée !
                  </span>
                )}
                <Button variant="danger" onClick={handleClose}>
                  Annuler
                </Button>
                <Button type="submit" variant="primary">
                  Modifier
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
        <div className="practician-list-footer">
          <Buttonadd />
        </div>
      </div>
    </div>
  );
}

export default PracticianListModal;
