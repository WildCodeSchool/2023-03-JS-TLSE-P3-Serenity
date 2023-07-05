import React, { useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function DeleteButton({ selectedPracticians, setPracticians, practicians }) {
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const { role } = userInfo;

  const handleDeleteButtonClick = () => {
    selectedPracticians.forEach((practician) => {
      axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/admins/practicians/${
          practician.id
        }`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Role: `${role}`,
          },
        }
      );
      if (selectedPracticians.length > 0) {
        Swal.fire({
          title: "Êtes-vous sûr de vouloir supprimer ce praticien ?",
          text: "Vous ne pourrez pas annuler cette action !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Oui, supprimer !",
          cancelButtonText: "Non, annuler !",
        })
          .then((response) => {
            if (response.isConfirmed) {
              console.info(response);
              const updatedPracticians = practicians.filter(
                (existingPractician) => existingPractician.id !== practician.id
              );
              setPracticians(updatedPracticians);
              Swal.fire(
                "Supprimé !",
                "Le praticien a été supprimé.",
                "success"
              );
            }
          })

          .catch((error) => {
            console.error(
              `Error deleting practician with ID ${practician.id}:`,
              error
            );
          });
      }
    });
  };

  return (
    <button
      type="button"
      className="delete-button"
      onClick={handleDeleteButtonClick}
    >
      <i className="fi fi-rr-trash" />
    </button>
  );
}
DeleteButton.propTypes = {
  selectedPracticians: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      mail: PropTypes.string,
      adeli_number: PropTypes.string,
      administrator_id: PropTypes.number,
    })
  ).isRequired,
  setPracticians: PropTypes.func.isRequired,
  practicians: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      mail: PropTypes.string,
      adeli_number: PropTypes.string,
      administrator_id: PropTypes.number,
    })
  ).isRequired,
};

export default DeleteButton;
