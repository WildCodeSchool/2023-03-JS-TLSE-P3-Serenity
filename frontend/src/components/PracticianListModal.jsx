import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PracticianListModal.scss";

function PracticianListModal() {
  const [practicians, setPracticians] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/admins/practicians`)
      .then((response) => {
        const promises = response.data.map((practician) =>
          axios.get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/admins/practicians/countintervention/${practician.id}`
          )
        );

        Promise.all(promises)
          .then((countResponses) => {
            const updatedPracticians = response.data.map(
              (practician, index) => ({
                ...practician,
                countIntervention: countResponses[index].data.interventionCount,
              })
            );
            setPracticians(updatedPracticians);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
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
          <table className="practician-list-table">
            <thead className="practician-list-table-header">
              <tr>
                <th>Nom</th>
                <th>Mail</th>
                <th>Poste</th>
                <th>Téléphone</th>
                <th>
                  Nombre
                  <br />
                  Interventions
                </th>
                <th>
                  Nombre
                  <br />
                  Ressources
                </th>
              </tr>
            </thead>
            <tbody className="practician-list-table-body">
              {practicians.map((practician) => (
                <tr key={practician.id}>
                  <td>
                    {practician.firstname}
                    {practician.lastname}
                  </td>
                  <td>{practician.mail}</td>
                  <td>{practician.speciality}</td>
                  <td>{practician.phone}</td>
                  <td>{practician.countIntervention}</td>
                  <td>{practician.ressources}</td>
                </tr>
              ))}
            </tbody>
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
