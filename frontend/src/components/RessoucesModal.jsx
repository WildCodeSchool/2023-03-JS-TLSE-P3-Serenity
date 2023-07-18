/* eslint-disable camelcase */
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "../styles/RessourcesModal.scss";
import Swal from "sweetalert2";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function RessourcesModal() {
  const { userInfo, userToken } = useContext(AuthFunctionContext);
  const { id, role } = userInfo;
  const [ressources, setRessources] = useState([]);
  const [ressourcesChange, setRessourcesChange] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTheme, setActiveTheme] = useState("Comprendre");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/ressources/practicians/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Role: `${role}`,
        },
      })
      .then((response) => {
        setRessources(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [ressourcesChange]);

  const themeButton = [
    {
      label: "understand",
      className: "understand-selection",
      action: () => setActiveTheme("Comprendre"),
      themeName: "Comprendre mon opération",
    },
    {
      label: "administrative",
      className: "administrative-selection",
      action: () => setActiveTheme("Administratif"),
      themeName: "Finir les démarches administratives",
    },
    {
      label: "prepare",
      className: "prepare-selection",
      action: () => setActiveTheme("Préparation"),
      themeName: "Préparer mon arrivée en toute sérénité",
    },
    {
      label: "anticipate",
      className: "anticipate-selection",
      action: () => setActiveTheme("Anticipation"),
      themeName: "Anticiper ma sortie",
    },
    {
      label: "checklist",
      className: "checklist-selection",
      action: () => setActiveTheme("Checklist"),
      themeName: "Ma check-list avant le départ à la Clinique",
    },
  ];

  const handleDeleteButtonClick = (idRessourceToDelete) => {
    axios
      .delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/ressources/${idRessourceToDelete}/${userInfo.id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Role: `${role}`,
          },
        }
      )
      .then(() => {
        setRessourcesChange(!ressourcesChange);
        Swal.fire({
          background: "#242731",
          position: "center",
          icon: "success",
          title: "La ressource a été supprimée",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(
          `Error deleting ressource with ID ${idRessourceToDelete}:`,
          error
        );
        Swal.fire({
          background: "#242731",
          position: "center",
          icon: "error",
          title: "Une erreur est survenue lors de la suppression.",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  return isLoaded ? (
    <div className="container-ressources">
      <div className="theme-selection-container">
        <p>Choisissez un thème</p>
        <div className="select-theme-container">
          {themeButton.map((theme) => (
            <button
              key={theme.label}
              type="button"
              className={theme.className}
              onClick={theme.action}
            >
              <p>{theme.themeName}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="container-scroll-ressources">
        <div className="list-ressources">
          {ressources
            .filter(
              (ressourceFiltered) => ressourceFiltered.theme === activeTheme
            )
            .map((ressource) => (
              <div className="ressource">
                <p key={ressource.id} className="ressource-title">
                  {ressource.title}.{ressource.type}
                </p>
                <button
                  className="delete-ressource-button"
                  type="button"
                  onClick={() => handleDeleteButtonClick(ressource.id)}
                >
                  <i className="fi fi-rr-trash" />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    <p>Chargement...</p>
  );
}

export default RessourcesModal;