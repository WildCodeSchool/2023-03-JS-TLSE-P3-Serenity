import React, { useContext } from "react";
import "../styles/UnderstandInterventionModal.scss";
import StateContext from "../contexts/StateContext";
import img1 from "../assets/serenity_logo.svg";

function UnderstandInterventionModal() {
  const { setActiveTheme } = useContext(StateContext);

  function handleReturnButton() {
    setActiveTheme(null);
  }
  return (
    <div className="preparation-understand">
      <div className="title-preparation">
        <button
          type="button"
          className="return-button-preparation"
          onClick={handleReturnButton}
        >
          <i className="fi fi-rr-arrow-circle-left" />
        </button>
        <p>Ma préparation</p>
      </div>

      <button type="button" className="understand-button">
        <p>Comprendre mon opération</p>
      </button>
      <p>Schémas et documentations</p>
      <div className="schema-preparation">
        <div className="grid-container">
          <img className="large-image" src={img1} alt="" />
          <div className="small-images">
            <img src={img1} alt="" />
            <img src={img1} alt="" />
          </div>
        </div>
      </div>

      <p>Les videos du Dr</p>
      <div className="lunch-3">
        <div>
          {" "}
          <p className="salad-with-wheat-and">
            Mon chirurgien me parle des croisées
          </p>
          <p className="time-ressource">3minutes</p>
        </div>

        <div className="img">
          {" "}
          <img alt="Img" src={img1} />
        </div>
      </div>
      <div className="lunch-3">
        <div>
          {" "}
          <p className="salad-with-wheat-and">
            Mon chirurgien me parle des croisées
          </p>
          <p className="time-ressource">3minutes</p>
        </div>

        <div className="img">
          {" "}
          <img alt="Img" src={img1} />
        </div>
      </div>
    </div>
  );
}

export default UnderstandInterventionModal;
