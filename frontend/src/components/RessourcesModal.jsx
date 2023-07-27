/* eslint-disable camelcase */
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "../styles/RessourcesModal.scss";
import Swal from "sweetalert2";
import AuthFunctionContext from "../contexts/AuthFunctionContext";
import StateContext from "../contexts/StateContext";
import ModalAddRessource from "./ModalAddRessource";

function RessourcesModal() {
  const { userInfo, userToken } = useContext(AuthFunctionContext);
  const { ressourcesChange, setRessourcesChange } = useContext(StateContext);
  const { id, role } = userInfo;
  const [ressources, setRessources] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTheme, setActiveTheme] = useState("Comprendre");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setRessourcesChange(false);
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
      className:
        activeTheme === "Comprendre"
          ? "understand-selection active-selection"
          : "understand-selection",
      action: () => setActiveTheme("Comprendre"),
      themeName: "Comprendre mon opération",
    },
    {
      label: "administrative",
      className:
        activeTheme === "Administratif"
          ? "administrative-selection active-selection"
          : "administrative-selection",
      action: () => setActiveTheme("Administratif"),
      themeName: "Finir les démarches administratives",
    },
    {
      label: "prepare",
      className:
        activeTheme === "Préparation"
          ? "prepare-selection active-selection"
          : "prepare-selection",
      action: () => setActiveTheme("Préparation"),
      themeName: "Préparer mon arrivée en toute sérénité",
    },
    {
      label: "anticipate",
      className:
        activeTheme === "Anticipation"
          ? "anticipate-selection active-selection"
          : "anticipate-selection",
      action: () => setActiveTheme("Anticipation"),
      themeName: "Anticiper ma sortie",
    },
    {
      label: "checklist",
      className:
        activeTheme === "Checklist"
          ? "checklist-selection active-selection"
          : "checklist-selection",
      action: () => setActiveTheme("Checklist"),
      themeName: "Ma check-list avant le départ à la Clinique",
    },
  ];

  const handleDeleteButtonClick = (
    idRessourceToDelete,
    urlRessourceToDelete
  ) => {
    axios
      .delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/practicians/${id}/ressources/${idRessourceToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Role: `${role}`,
          },
        }
      )
      .then(() => {
        if (urlRessourceToDelete) {
          const nameRessourceToDelete = urlRessourceToDelete
            .split("/")
            .at(-1)
            .split(".")[0];
          axios
            .delete(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/delete/ressources/${nameRessourceToDelete}`,
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                  Role: `${role}`,
                },
              }
            )
            .catch((error) => console.error(error));
        }
        Swal.fire({
          background: "#242731",
          position: "center",
          icon: "success",
          title: "La ressource a été supprimée",
          showConfirmButton: false,
          timer: 1500,
        });
        setRessourcesChange(!ressourcesChange);
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

  const handleAddRessource = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return isLoaded ? (
    <div className="container-ressources">
      <div className="theme-selection-container">
        <h2>Choisissez un thème</h2>
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
      <div className="section-ressources">
        <div className="container-scroll-ressources">
          <div className="list-ressources">
            {ressources
              .filter(
                (ressourceFiltered) => ressourceFiltered.theme === activeTheme
              )
              .map((ressource) => (
                <div key={ressource.id} className="ressource">
                  <p className="ressource-title">
                    {ressource.type
                      ? `${ressource.title}.${ressource.type}`
                      : `${ressource.title}`}
                  </p>
                  <button
                    className="delete-ressource-button"
                    type="button"
                    onClick={() =>
                      handleDeleteButtonClick(ressource.id, ressource.url)
                    }
                  >
                    <i className="fi fi-rr-trash" />
                  </button>
                </div>
              ))}
          </div>
        </div>
        <button
          className="add-ressource-button"
          type="button"
          onClick={() => handleAddRessource(activeTheme)}
        >
          Ajouter ressource
        </button>
      </div>
      {showModal && (
        <ModalAddRessource closeModal={closeModal} theme={activeTheme} />
      )}
    </div>
  ) : (
    <p>Chargement...</p>
  );
}

export default RessourcesModal;
