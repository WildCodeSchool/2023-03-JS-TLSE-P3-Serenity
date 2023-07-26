import { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../styles/PracticianListModal.scss";
import axios from "axios";
import StateContext from "../contexts/StateContext";
import AuthFunctionContext from "../contexts/AuthFunctionContext";
import "../styles/Buttonadd.scss";

function ButtonaddPatient() {
  // Status for tracking success message display
  const { showSuccessMessageAdd, setShowSuccessMessageAdd, show, setShow } =
    useContext(StateContext);
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const { id, role } = userInfo;
  const [interventionsArray, setInterventionsArray] = useState([]);
  const [interventionSelected, setInterventionSelected] = useState("");
  const [interventionDate, setInterventionDate] = useState("");
  const handleClose = () => {
    setShow(false);
    setShowSuccessMessageAdd(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/practicians/${id}/interventions`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Role: `${role}`,
          },
        }
      )
      .then((response) => {
        setInterventionsArray(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());
    const addPatientObject = {
      firstname: dataFromForm.firstname,
      lastname: dataFromForm.lastname,
      mail: dataFromForm.mail,
      password: dataFromForm.password,
    };
    const addInterventionObject = {
      interventionId: dataFromForm.intervention,
      interventionDate: dataFromForm.interventionDate,
    };
    let idPatient = 0;
    Promise.all([
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/practicians/patients/`,
          addPatientObject,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Role: `${role}`,
            },
          }
        )
        .then((response) => {
          idPatient = response.data.id;
          addInterventionObject.idPatient = idPatient;
        }),
      axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/practicians/patients/mail`,
        addPatientObject,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Role: `${role}`,
          },
        }
      ),
    ])
      .then(() => {
        axios
          .post(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/practicians/${id}/patients/interventions`,
            addInterventionObject,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
                Role: `${role}`,
              },
            }
          )
          .then(() => {
            setInterventionDate("");
            setInterventionSelected("");
          })
          .catch((error) => console.error(error));
        // Updates status to indicate successful submission
        setShowSuccessMessageAdd(true); // Displays success message
        setTimeout(() => {
          setShow(false);
          setShowSuccessMessageAdd(false);
        }, 1000);
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
      <Button variant="primary" onClick={handleShow} className="add-user">
        Ajouter un patient
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(event) => handleSubmit(event)}
            encType="multipart/form-data"
          >
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
            <input type="hidden" name="password" value={generatePassword()} />
            {interventionsArray && (
              <div className="intervention-input">
                <label htmlFor="intervention">Intervention</label>
                <select
                  value={interventionSelected}
                  name="intervention"
                  onChange={(e) => setInterventionSelected(e.target.value)}
                >
                  {interventionsArray.map((eachIntervention) => (
                    <option
                      className="option-select"
                      value={eachIntervention.id}
                      key={eachIntervention.id}
                    >
                      {eachIntervention.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="intervention-date">
              <label htmlFor="intervention-date-label">
                Date de l'intervention
              </label>
              <input
                type="date"
                value={interventionDate}
                name="interventionDate"
                className="intervention-date-input"
                onChange={(e) => setInterventionDate(e.target.value)}
              />
            </div>
            <Modal.Footer>
              {showSuccessMessageAdd && (
                <span className="success-message">Ajout effectué !</span>
              )}
              <Button className="button-cancel" onClick={handleClose}>
                Annuler
              </Button>
              <Button type="submit" className="button-add">
                Ajouter
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ButtonaddPatient;
