import React, { useContext } from "react";
import StateContext from "../contexts/StateContext";
import "../styles/PrepareMyArrivateModal.scss";

function AdministrativeModal() {
  const { setActiveTheme } = useContext(StateContext);

  const handleReturnButtonClick = () => {
    setActiveTheme(null);
  };

  return (
    <div className="prepare-arrival-modal-container">
      <div className="prepare-arrival-modal-header">
        <button
          type="button"
          className="return-button-modal-prepare-arrival"
          onClick={handleReturnButtonClick}
        >
          <i className="fi fi-rr-arrow-circle-left" />
        </button>
        <h1>Ma préparation</h1>
      </div>
      <h2 className="prepare-arrival-modal-title">
        Préparer mon arrivée en toute sérénité
      </h2>
      <div className="prepare-arrival-modal-list">
        <p>
          Préparons nous à vivre la journée de l’intevention une première fois,
          histoire d’être en toute sérénité le jour J
        </p>
        <button type="button" className="prepare-arrival-button">
          Je commence
        </button>
      </div>
    </div>
  );
}

export default AdministrativeModal;
