import React from "react";
import "../styles/PracticianListModal.scss";

function PracticianListModal() {
  return (
    <div className="practician-list-container">
      <div className="practician-list">
        <input className="search-input" type="text" placeholder="Search" />
        <button type="button" className="delete-button">
          <i className="bi bi-trash" />
        </button>
        <button type="button" className="add-practician">
          <p>Nouveau practicien</p>
        </button>
      </div>
    </div>
  );
}

export default PracticianListModal;
