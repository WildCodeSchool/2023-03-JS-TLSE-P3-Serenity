import React, { useContext } from "react";
import StateContext from "../contexts/StateContext";
import "../styles/AdministrativeModal.scss";
import img3 from "../assets/img-1.png";

function AdministrativeModal() {
  const { setActiveTheme } = useContext(StateContext);

  const handleReturnButtonClick = () => {
    setActiveTheme(null);
  };

  return (
    <div className="administrative-modal-container">
      <div className="administrative-modal-header">
        <button
          type="button"
          className="return-button-modal-administrative"
          onClick={handleReturnButtonClick}
        >
          <i className="fi fi-rr-arrow-circle-left" />
        </button>
        <h1>Ma préparation</h1>
      </div>
      <h2 className="administrative-modal-title">
        Finir les démarches administratives
      </h2>
      <div className="administrative-modal-list">
        <p>Quelques documents</p>
        <div className="card-container">
          <div className="card-container-list">
            <div>
              <p className="card-title">Fiches administratives</p>
              <p className="time-ressource">15 minutes</p>
            </div>
            <div className="Img-ressource-container">
              <img alt="" className="Img-ressource" src={img3} />
            </div>
          </div>
          <div className="card-container-list">
            <div>
              <p className="card-title">Consentement éclairé</p>
              <p className="time-ressource">15 minutes</p>
            </div>
            <div className="Img-ressource-container">
              <img alt="" className="Img-ressource" src={img3} />
            </div>
          </div>
          <div className="card-container-list">
            <div>
              <p className="card-title">Votre retour mutuelle</p>
              <p className="time-ressource">15 minutes</p>
            </div>
            <div className="Img-ressource-container">
              <img alt="" className="Img-ressource" src={img3} />
            </div>
          </div>
          <div className="card-container-list">
            <div>
              <p className="card-title">Votre anesthésite</p>
              <p className="time-ressource">15 minutes</p>
            </div>
            <div className="Img-ressource-container">
              <img alt="" className="Img-ressource" src={img3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdministrativeModal;
