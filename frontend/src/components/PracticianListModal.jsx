import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/PracticianListModal.scss";

function PracticianListModal() {
  const [practicians, setPracticians] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedPracticians, setSelectedPracticians] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/admins/practicians`)
      .then((response) => {
        const promises = response.data.map((practician) =>
          Promise.all([
            axios.get(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/admins/practicians/countintervention/${practician.id}`
            ),
            axios.get(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/admins/practicians/countressource/${practician.id}`
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

  const handleCheckboxChange = (practicianId) => {
    setSelectedPracticians((prevSelectedPracticians) => {
      if (prevSelectedPracticians.includes(practicianId)) {
        return prevSelectedPracticians.filter((id) => id !== practicianId);
      }
      return [...prevSelectedPracticians, practicianId];
    });
  };

  const handleDeleteButtonClick = () => {
    selectedPracticians.forEach((practicianId) => {
      axios
        .delete(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/admins/practicians/${practicianId}`
        )
        .then((response) => {
          console.info(response);
          const updatedPracticians = practicians.filter(
            (practician) => practician.id !== practicianId
          );
          setPracticians(updatedPracticians);
        })
        .catch((error) => {
          console.error(
            `Error deleting practician with ID ${practicianId}:`,
            error
          );
        });
    });
  };

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
          <button
            type="button"
            className="delete-button"
            onClick={handleDeleteButtonClick}
          >
            <i className="fi fi-rr-trash" />
          </button>
        </div>
        <div className="practician-list-body">
          <table className="practician-list-table">
            <thead className="practician-list-table-header">
              <tr>
                <th>
                  <input type="checkbox" name="cb" value="0" />
                </th>
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
                      <input
                        type="checkbox"
                        name="cb"
                        value="1"
                        checked={selectedPracticians.includes(practician.id)}
                        onChange={() => handleCheckboxChange(practician.id)}
                      />
                    </td>
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
