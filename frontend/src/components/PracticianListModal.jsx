import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/PracticianListModal.scss";
import ButtonAddPractician from "./ButtonAddPractician";
import StateContext from "../contexts/StateContext";
import ModalUpdate from "./ModalUpdate";
import DeleteButton from "./DeleteButton";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function PracticianListModal() {
  const [practicians, setPracticians] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const { role } = userInfo;
  const [selectedPractician, setSelectedPractician] = useState(null);
  const {
    showSuccessMessageModification,
    setShowSuccessMessageModification,
    showSuccessMessageAdd,
    setShowSuccessMessageAdd,
  } = useContext(StateContext);

  const [modalInputs, setModalInputs] = useState({
    firstname: "",
    lastname: "",
    mail: "",
    adeli_number: "",
    administrator_id: "",
  });

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setShowSuccessMessageModification(false);
  };

  const handleTrClick = (practician) => {
    setSelectedPractician(practician);
    setModalInputs({
      firstname: practician.firstname,
      lastname: practician.lastname,
      mail: practician.mail,
      adeli_number: practician.adeli_number,
    });
    handleShow(true);
    setShowSuccessMessageAdd(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setModalInputs((prevModalInputs) => ({
      ...prevModalInputs,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedPractician) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/admins/practicians/${
            selectedPractician.id
          }`,
          modalInputs,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Role: `${role}`,
            },
          }
        )
        .then((response) => {
          const updatedPracticians = practicians.map((practician) => {
            if (practician.id === selectedPractician.id) {
              return response.data;
            }
            return practician;
          });
          setPracticians(updatedPracticians);
          setShowSuccessMessageModification(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

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
  }, [showSuccessMessageModification, showSuccessMessageAdd]);

  return (
    <div className="practician-list-container">
      <div className="practician-list">
        <div className="practician-list-header">
          <input
            className="search-input"
            type="text"
            placeholder="Rechercher un praticien"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="practician-list-body">
          <table className="practician-list-table">
            <thead className="practician-list-table-body">
              <tr className="table-header">
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
                <th> </th>
              </tr>
            </thead>
            <tbody className="practician-list-table-body">
              {practicians
                .filter(
                  (practician) =>
                    practician.lastname &&
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
                    <td className="practician-list-table-buttons">
                      <button
                        className="modify-button"
                        type="button"
                        onClick={() => handleTrClick(practician)}
                      >
                        <i className="fi fi-rr-pencil" />
                      </button>
                      <DeleteButton
                        practicians={practicians}
                        practician={practician.id}
                        setPracticians={setPracticians}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <ModalUpdate
          show={show}
          handleClose={handleClose}
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
          modalInputs={modalInputs}
          showSuccessMessageModification={showSuccessMessageModification}
        />
        <div className="practician-list-footer">
          <ButtonAddPractician />
        </div>
      </div>
    </div>
  );
}

export default PracticianListModal;
