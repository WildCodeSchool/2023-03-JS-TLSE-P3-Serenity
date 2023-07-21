import "../styles/UnderstandInterventionModal.scss";
import React, { useContext } from "react";
import StateContext from "../contexts/StateContext";
import imglarge from "../assets/photo-1.svg";
import img2 from "../assets/photo-2.png";
import img3 from "../assets/img-1.png";

function UnderstandInterventionModal() {
  const { setActiveTheme } = useContext(StateContext);

  const handleReturnButtonClick = () => {
    setActiveTheme(null);
  };

  return (
    <div className="understand-modal-container">
      <div className="understand-modal-header">
        <button
          type="button"
          className="return-button-modal-understand"
          onClick={handleReturnButtonClick}
        >
          <i className="fi fi-rr-arrow-circle-left" />
        </button>
        <h1>Ma préparation</h1>
      </div>
      <h2 className="understand-modal-title">Comprendre mon opération</h2>
      <div className="understand-modal-list">
        <p>Schémas et documentations</p>
        <div className="grid-container">
          <img className="large-image" src={imglarge} alt="" />
          <div className="small-images">
            <img src={img2} alt="" />
            <img src={img2} alt="" />
          </div>
        </div>
        <p>Les videos du Dr</p>
        <div className="card-container">
          <div className="card-container-list">
            <div>
              <p className="card-title">Mon chirurgien me parle des croisées</p>
              <p className="time-ressource">3minutes</p>
            </div>
            <div className="Img-ressource-container">
              <img alt="" className="Img-ressource" src={img3} />
            </div>
          </div>
          <div className="card-container-list">
            <div>
              <p className="card-title">Mon chirurgien me parle des croisées</p>
              <p className="time-ressource">3minutes</p>
            </div>
            <div className="Img-ressource-container">
              <img alt="" className="Img-ressource" src={img3} />
            </div>
          </div>
          <div className="card-container-list">
            <div>
              <p className="card-title">Mon chirurgien me parle des croisées</p>
              <p className="time-ressource">3minutes</p>
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

export default UnderstandInterventionModal;
