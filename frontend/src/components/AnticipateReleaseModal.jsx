import React, { useContext } from "react";
import "../styles/AnticipateReleaseModal.scss";
import StateContext from "../contexts/StateContext";

function AnticipateReleaseModal() {
  const { setActiveTheme } = useContext(StateContext);

  const handleReturnButtonClick = () => {
    setActiveTheme(null);
  };

  return (
    <div className="anticipate-release-modal-container">
      <div className="anticipate-release-modal-header">
        <button
          type="button"
          className="return-button-modal"
          onClick={handleReturnButtonClick}
        >
          <i className="fi fi-rr-arrow-circle-left" />
        </button>
        <h1>Ma préparation</h1>
      </div>
      <h2 className="modal-title">
        Anticiper ma sortie en prenant rendez-vous
      </h2>
      <div className="anticipate-release-modal-body">
        <p className="anticipate-release-modal-text">
          Afin de sécuriser votre retour à la maison votre chirurgien vous
          invite à prendre rendez-vous avec les professionnels de santé suivants
          :
        </p>
        <div className="anticipate-release-modal-list">
          <p>Praticien 1</p>
          <p>Praticien 2</p>
          <p>Praticien 3</p>
        </div>
      </div>
    </div>
  );
}

export default AnticipateReleaseModal;
