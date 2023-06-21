import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PracticianListModal.scss";

function PracticianListModal() {
  const [practicians, setPracticians] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/practicians`)
      .then((response) => {
        setPracticians(response.data);
        console.info(practicians); // practicians will be replaced when data is fetched
      })
      .catch((error) => {
        error.sendStatus(500);
      });
  }, []);
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
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Mail</th>
                <th>Poste</th>
                <th>Téléphone</th>
                <th>Nb Interventions</th>
                <th>Nb Ressources</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="practician-list-footer">
          <button type="button" className="add-practician">
            <p>Nouveau practicien</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PracticianListModal;
