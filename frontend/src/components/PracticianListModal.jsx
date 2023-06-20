import React from "react";
import "../styles/PracticianListModal.scss";
import Buttonadd from "./Buttonadd";

function PracticianListModal() {
  return (
    <div className="practician-list-container">
      <div className="practician-list">
        <div className="practician-list-header">
          <input className="search-input" type="text" placeholder="Search" />
          <button type="button" className="delete-button">
            <i className="bi bi-trash" />
          </button>
        </div>
        <div className="practician-list-body">
          <td>
            <div className="practician-list-table">
              <p>Practicien 1</p>
            </div>
          </td>
        </div>
        <div className="practician-list-footer">
          <Buttonadd />
        </div>
      </div>
    </div>
  );
}

export default PracticianListModal;
