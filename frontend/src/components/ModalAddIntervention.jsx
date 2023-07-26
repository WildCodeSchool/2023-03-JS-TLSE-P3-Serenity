import React, { useState, useEffect, useContext } from "react";
import "../styles/ModalAddIntervention.scss";
import PropTypes from "prop-types";
import axios from "axios";
import Swal from "sweetalert2";
import AuthFunctionContext from "../contexts/AuthFunctionContext";
import StateContext from "../contexts/StateContext";

function ModalAddIntervention({ closeModal }) {
  const { userInfo, userToken } = useContext(AuthFunctionContext);
  const { interventions, setInterventions } = useContext(StateContext);
  const { id, role } = userInfo;
  const [nameIntervention, setNameIntervention] = useState("");
  const [durationIntervention, setDurationIntervention] = useState("00:00");
  const [anesthesiaChoice, setAnesthesiaChoice] = useState("∅");
  const [activeTheme, setActiveTheme] = useState("Comprendre");
  const [ressources, setRessources] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [arrayOfRessources, setArrayOfRessources] = useState([]);

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
      .then((response) => {
        setInterventions(...interventions, response.data);
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

  const themeButton = [
    {
      label: "understand",
      className:
        activeTheme === "Comprendre"
          ? "understand-selection active-selection"
          : "understand-selection",
      action: () => setActiveTheme("Comprendre"),
      themeName: "Compréhension",
    },
    {
      label: "administrative",
      className:
        activeTheme === "Administratif"
          ? "administrative-selection active-selection"
          : "administrative-selection",
      action: () => setActiveTheme("Administratif"),
      themeName: "Administratif",
    },
    {
      label: "prepare",
      className:
        activeTheme === "Préparation"
          ? "prepare-selection active-selection"
          : "prepare-selection",
      action: () => setActiveTheme("Préparation"),
      themeName: "Préparation",
    },
    {
      label: "anticipate",
      className:
        activeTheme === "Anticipation"
          ? "anticipate-selection active-selection"
          : "anticipate-selection",
      action: () => setActiveTheme("Anticipation"),
      themeName: "Anticipation",
    },
    {
      label: "checklist",
      className:
        activeTheme === "Checklist"
          ? "checklist-selection active-selection"
          : "checklist-selection",
      action: () => setActiveTheme("Checklist"),
      themeName: "Checklist",
    },
  ];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/ressources/practicians/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Role: `${role}`,
        },
      })
      .then((response) => {
        setRessources(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddButtonClick = (ressource) => {
    setArrayOfRessources((prevArray) => [...prevArray, ressource]);
  };

  const handleMinusButtonClick = (index) => {
    const arrayToUpload = [...arrayOfRessources];
    arrayToUpload.splice(index, 1);
    setArrayOfRessources(arrayToUpload);
  };

  const generateOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour += 1) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = String(hour).padStart(2, "0");
        const formattedMinute = String(minute).padStart(2, "0");
        const optionValue = `${formattedHour}:${formattedMinute}`;
        const optionLabel = `${formattedHour}:${formattedMinute}`;
        options.push(
          <option key={optionValue} value={optionValue} label={optionLabel} />
        );
      }
    }
    return options;
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
        <div className="intervention-input-theme-list">
          <div className="add-intervention-input-container">
            <div className="intervention-name-label-input">
              <label htmlFor="name">Nom de l'intervention</label>
              <input
                type="text"
                value={nameIntervention}
                name="name"
                className="intervention-name-input"
                onChange={(e) => setNameIntervention(e.target.value)}
                required
              />
            </div>
            <div className="intervention-duration-label-input">
              <label htmlFor="duration">Durée</label>
              <input
                type="time"
                value={durationIntervention}
                name="duration"
                list="times"
                className="intervention-duration-input"
                onChange={(e) => setDurationIntervention(e.target.value)}
                required
              />
              <datalist id="times">{generateOptions()}</datalist>
            </div>
            <div className="anesthesia-input">
              <p>Anesthésie</p>
              <div className="anesthesia-radio">
                <div className="none-radio">
                  <input
                    type="radio"
                    value="∅"
                    name="None"
                    checked={anesthesiaChoice === "∅"}
                    onChange={(e) => setAnesthesiaChoice(e.target.value)}
                  />
                  <label htmlFor="none">∅</label>
                </div>
                <div className="general-radio">
                  <input
                    type="radio"
                    value="AG"
                    name="general"
                    checked={anesthesiaChoice === "AG"}
                    onChange={(e) => setAnesthesiaChoice(e.target.value)}
                  />
                  <label htmlFor="general">AG</label>
                </div>
                <div className="local-radio">
                  <input
                    type="radio"
                    value="AL"
                    name="local"
                    checked={anesthesiaChoice === "AL"}
                    onChange={(e) => setAnesthesiaChoice(e.target.value)}
                  />
                  <label htmlFor="local">AL</label>
                </div>
              </div>
            </div>
          </div>
          <div className="theme-selection-container">
            <h2>Choisissez un thème</h2>
            <div className="select-theme-container">
              {themeButton.map((theme) => (
                <button
                  key={theme.label}
                  type="button"
                  className={theme.className}
                  onClick={theme.action}
                >
                  <p>{theme.themeName}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="ressource-and-selected">
            <div className="section-ressources">
              <div className="container-scroll-ressources">
                <p className="title-existing-ressources">
                  Ressources existantes
                </p>
                <div className="list-ressources">
                  {isLoaded &&
                    ressources
                      .filter(
                        (ressourceFiltered) =>
                          ressourceFiltered.theme === activeTheme
                      )
                      .map((ressource) => (
                        <div key={ressource.id} className="ressource">
                          <p className="ressource-title">
                            {ressource.title}.{ressource.type}
                          </p>
                          <button
                            className="add-ressource-button"
                            type="button"
                            onClick={() => handleAddButtonClick(ressource)}
                          >
                            <i className="fi fi-rr-add" />
                          </button>
                        </div>
                      ))}
                </div>
              </div>
            </div>
            <div className="section-ressource-selected">
              <p className="title-selected-ressources">
                Ressources sélectionnées
              </p>
              <div className="list-selected-ressources">
                {arrayOfRessources &&
                  arrayOfRessources.map((ressource, index) => (
                    <div key={ressource.id} className="ressource-selected">
                      <p className="ressource-selected-title">
                        {ressource.title}.{ressource.type}
                      </p>
                      <button
                        className="minus-ressource-button"
                        type="button"
                        onClick={() => handleMinusButtonClick(index)}
                      >
                        <i className="fi fi-rr-minus-circle" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
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
