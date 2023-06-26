import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/PracticianListModal.scss";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function PracticianListModal() {
  const [practicians, setPracticians] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const { role } = userInfo;
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/admins/practicians`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Role: `${role}`,
        },
      })
      .then((response) => {
        const promises = response.data.map((practician) =>
          Promise.all([
            axios.get(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/admins/practicians/countintervention/${practician.id}`,
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                  Role: `${role}`,
                },
              }
            ),
            axios.get(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/admins/practicians/countressource/${practician.id}`,
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                  Role: `${role}`,
                },
              }
            ),
          ])
        );

        Promise.all(promises)
          .then((countResponses) => {
            const updatedPracticians = response.data.map(
              (practician, index) => ({
                ...practician,
                countIntervention:
                  countResponses[index][0].data.interventionCount,
                countRessource: countResponses[index][1].data.ressourceCount,
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
          <input
            className="search-input"
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="button" className="delete-button">
            <i className="fi fi-rr-trash" />
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
              {practicians
                .filter((practician) =>
                  practician.lastname
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                )
                .map((practician) => (
                  <tr key={practician.id}>
                    <td>
                      {practician.firstname} {practician.lastname}
                    </td>
                    <td>{practician.mail}</td>
                    <td>{practician.speciality}</td>
                    <td>{practician.phone}</td>
                    <td>{practician.countIntervention}</td>
                    <td>{practician.countRessource}</td>
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
