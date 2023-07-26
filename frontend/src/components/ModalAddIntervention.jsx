import React, { useState, useContext } from "react";
import "../styles/ModalAddIntervention.scss";
import PropTypes from "prop-types";
import axios from "axios";
import Swal from "sweetalert2";
import AuthFunctionContext from "../contexts/AuthFunctionContext";
import StateContext from "../contexts/StateContext";

function ModalAddIntervention({ closeModal }) {
  const { userInfo, userToken } = useContext(AuthFunctionContext);
  const { setInterventionsChange } = useContext(StateContext);
  const { id, role } = userInfo;
  const [nameIntervention, setNameIntervention] = useState("");
  const [durationIntervention, setDurationIntervention] = useState("");

  const handleValidateAddIntervention = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const dataFromForm = Object.fromEntries(formData.entries());

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/practicians/${id}/interventions`,
        dataFromForm,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Role: `${role}`,
          },
        }
      )
      .then(() => {
        setInterventionsChange(true);
        Swal.fire({
          background: "#242731",
          position: "center",
          icon: "success",
          title: "L'intervention a été ajoutée",
          showConfirmButton: false,
          timer: 1500,
        });
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="modal-add-intervention-container">
      <form
        onSubmit={handleValidateAddIntervention}
        className="global-add-intervention-form"
        encType="multipart/form-data"
      >
        <button
          type="button"
          className="close-button"
          onClick={() => closeModal()}
        >
          <i className="fi fi-rr-cross" />
        </button>
        <div className="add-intervention-input-container">
          <div className="intervention-name-label-input">
            <label htmlFor="name">Nom de l'intervention</label>
            <input
              type="text"
              value={nameIntervention}
              name="name"
              className="intervention-name-input"
              onChange={(e) => setNameIntervention(e.target.value)}
            />
          </div>
          <div className="intervention-duration-label-input">
            <label htmlFor="duration">Durée de l'intervention</label>
            <input
              type="text"
              value={durationIntervention}
              name="duration"
              className="intervention-duration-input"
              onChange={(e) => setDurationIntervention(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="button-add-intervention">
          <p className="validate-label-button-intervention">Valider ajout</p>
        </button>
      </form>
    </div>
  );
}

ModalAddIntervention.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalAddIntervention;
