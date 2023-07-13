import React, { useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function DeleteButton({ practician, setPracticians, practicians }) {
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const { role } = userInfo;

  const handleDeleteButtonClick = () => {
    Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer ce praticien ?",
      text: "Vous ne pourrez pas annuler cette action !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      background: "#242731",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Non, annuler !",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/admins/practicians/${practician}`,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
                Role: `${role}`,
              },
            }
          )
          .then(() => {
            const updatedPracticians = practicians.filter(
              (el) => el.id !== practician
            );
            setPracticians(updatedPracticians);

            Swal.fire({
              background: "#242731",
              position: "center",
              icon: "success",
              title: "Le praticien a été supprimé.",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.error("Error deleting practician:", error);
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
  practician: PropTypes.number.isRequired,
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
