import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import StateContext from "../contexts/StateContext";
import AuthFunctionContext from "../contexts/AuthFunctionContext";
import "../styles/AdministrativeModal.scss";
import img3 from "../assets/picture.png";

function AdministrativeModal() {
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const [understandData, setUnderstandData] = useState([]);
  const { role } = userInfo;
  const { setActiveTheme } = useContext(StateContext);
  const [checkboxStatus, setCheckboxStatus] = useState({});
  const handleReturnButtonClick = () => {
    setActiveTheme(null);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/patients/ressource`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Role: `${role}`,
        },
      })
      .then((response) => {
        setUnderstandData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredData = understandData.filter(
    (data) => data.theme === "Préparation"
  );

  const handleToggleCheckbox = (id) => {
    setCheckboxStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id], // Basculez le statut de la checkbox pour l'ID donné
    }));
  };

  return (
    <div className="administrative-modal-container">
      <div className="administrative-modal-header">
        <button
          type="button"
          className="return-button-modal-administrative"
          onClick={handleReturnButtonClick}
        >
          <i className="fi fi-rr-arrow-circle-left" />
        </button>
        <h1>Ma préparation</h1>
      </div>
      <h2 className="administrative-modal-title">
        Finir les démarches administratives
      </h2>
      <div className="administrative-modal-list">
        <p>Quelques documents a preparer</p>
        <div className="card-container">
          {filteredData.map((el) => (
            <button type="button" className="card-container-list">
              <p className="card-title">{el.title}</p>
              <div className="Img-ressource-container">
                <img alt="" className="Img-ressource" src={img3} />
              </div>
              <input
                type="checkbox"
                checked={checkboxStatus[el.id]}
                onChange={() => handleToggleCheckbox(el.id)}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdministrativeModal;
