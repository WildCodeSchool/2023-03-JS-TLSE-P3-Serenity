import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import "../styles/AnticipateReleaseModal.scss";
import StateContext from "../contexts/StateContext";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function AnticipateReleaseModal() {
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const { role, id } = userInfo;
  const { setActiveTheme } = useContext(StateContext);

  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/patients/ressourceintervention/${id}?theme_id=4`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Role: `${role}`,
          },
        }
      )
      .then((response) => {
        setResources(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleReturnButtonClick = () => {
    setActiveTheme(null);
  };

  return (
    <div className="anticipate-release-modal-container">
      <div className="anticipate-release-modal-header">
        <button
          type="button"
          className="return-button-modal"
          onClick={handleReturnButtonClick}
        >
          <i className="fi fi-rr-arrow-circle-left" />
        </button>
        <h1>Ma préparation</h1>
      </div>
      <h2 className="modal-title">
        Anticiper ma sortie en prenant rendez-vous
      </h2>
      <div className="anticipate-release-modal-body">
        <p className="anticipate-release-modal-text">
          Afin de sécuriser votre retour à la maison votre chirurgien vous
          invite à prendre rendez-vous avec les professionnels de santé suivants
          :
        </p>
        <div className="anticipate-release-modal-list">
          {resources.map((resource) => (
            <p key={resource.id}>{resource.title}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnticipateReleaseModal;
