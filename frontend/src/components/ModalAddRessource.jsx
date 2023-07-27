import React, { useState, useRef, useContext } from "react";
import "../styles/ModalAddRessource.scss";
import PropTypes from "prop-types";
import axios from "axios";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import AuthFunctionContext from "../contexts/AuthFunctionContext";
import StateContext from "../contexts/StateContext";

function ModalAddRessource({ closeModal, theme }) {
  const { userInfo, userToken } = useContext(AuthFunctionContext);
  const { setRessourcesChange } = useContext(StateContext);
  const { id, role } = userInfo;
  const [titleRessource, setTitleRessource] = useState("");
  const [descriptionRessource, setDescriptionRessource] = useState("");

  const inputRef = useRef("");

  const findIdTheme = (themeToCheck) => {
    let themeSelected = 0;
    switch (themeToCheck) {
      case "Comprendre":
        themeSelected = 1;
        break;
      case "Administratif":
        themeSelected = 2;
        break;
      case "Préparation":
        themeSelected = 3;
        break;
      case "Anticipation":
        themeSelected = 4;
        break;
      case "Checklist":
        themeSelected = 5;
        break;
      default:
        break;
    }
    return themeSelected;
  };

  const handleValidateAddRessource = (event) => {
    event.preventDefault();
    const bodyAddRessource = {
      title: titleRessource,
      description: descriptionRessource,
      practicianId: id,
      themeRessourceId: findIdTheme(theme),
    };
    const formData = new FormData();
    formData.append("ressource-file", inputRef.current.files[0]);

    if (inputRef.current.files[0]) {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/upload/ressources`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Role: `${role}`,
            },
          }
        )
        .then((response) => {
          bodyAddRessource.url = response.data.imageUrl;
          bodyAddRessource.type = response.data.imageUrl.split(".").at(-1);
          axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/practicians/${id}/ressources`,
            bodyAddRessource,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
                Role: `${role}`,
              },
            }
          );
        })
        .then(() => {
          setRessourcesChange(true);
          Swal.fire({
            background: "#242731",
            position: "center",
            icon: "success",
            title: "La ressource a été ajoutée",
            showConfirmButton: false,
            timer: 1500,
          });
          closeModal();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/practicians/${id}/ressources`,
          bodyAddRessource,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Role: `${role}`,
            },
          }
        )
        .then(() => {
          setRessourcesChange(true);
          Swal.fire({
            background: "#242731",
            position: "center",
            icon: "success",
            title: "La ressource a été ajoutée",
            showConfirmButton: false,
            timer: 1500,
          });
          closeModal();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="modal-add-ressource-container">
      <form
        onSubmit={handleValidateAddRessource}
        className="global-add-ressource-form"
        encType="multipart/form-data"
      >
        <button
          type="button"
          className="close-button"
          onClick={() => closeModal()}
        >
          <i className="fi fi-rr-cross" />
        </button>
        <div className="add-ressource-input-container">
          <div className="ressource-title-label-input">
            <label htmlFor="title">Titre de la ressource</label>
            <input
              type="text"
              value={titleRessource}
              name="title"
              className="ressource-title-input"
              onChange={(e) => setTitleRessource(e.target.value)}
            />
          </div>
          <div className="ressource-description-label-input">
            <label htmlFor="description">Description de la ressource</label>
            <input
              type="text"
              value={descriptionRessource}
              name="description"
              className="ressource-description-input"
              onChange={(e) => setDescriptionRessource(e.target.value)}
            />
          </div>
          <Form.Group className="file-ressource mb-3">
            <Form.Label>Fichier de la ressource</Form.Label>
            <Form.Control
              className="form-control bg-light"
              type="file"
              name="ressource-file"
              ref={inputRef}
            />
          </Form.Group>
        </div>
        <button type="submit" className="button-add-ressource">
          <p className="validate-label-button">Valider ajout</p>
        </button>
      </form>
    </div>
  );
}

ModalAddRessource.propTypes = {
  theme: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ModalAddRessource;
