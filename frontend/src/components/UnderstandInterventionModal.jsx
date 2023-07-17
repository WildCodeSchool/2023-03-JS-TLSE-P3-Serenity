import React from "react";
import "../styles/UnderstandInterventionModal.scss";
import img1 from "../assets/img-1.png";

function UnderstandInterventionModal() {
  return (
    <div className="preparation-understand">
      <div>
        <p>Comprendre mon intervention</p>
      </div>
      <p>Schémas et documentations</p>
      <div className="schema">
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
      <p>Les videos du Dr</p>
      <div className="lunch-3">
        <p className="salad-with-wheat-and">
          Mon chirurgien me parle des croisées
        </p>
        <p>3minutes</p>
        <img className="img" alt="Img" src={img1} />
      </div>
    </div>
  );
}

export default UnderstandInterventionModal;
