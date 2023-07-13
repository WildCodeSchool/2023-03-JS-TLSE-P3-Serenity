import React, { useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function DeletePatientButton({ patient, setPatients, patients }) {
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const { role } = userInfo;

  const handleDeleteButtonClick = () => {
    Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer ce patient ?",
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
            }/practician/patients/${patient}`,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
                Role: `${role}`,
              },
            }
          )
          .then(() => {
            const updatedPatients = patients.filter(
              (p) => p.patient_id !== patient
            );
            setPatients(updatedPatients);

            Swal.fire("Supprimé !", "Le patient a été supprimé.", "success");
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

DeletePatientButton.propTypes = {
  patient: PropTypes.number.isRequired,
  setPatients: PropTypes.func.isRequired,
  patients: PropTypes.arrayOf(
    PropTypes.shape({
      patient_id: PropTypes.number,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      mail: PropTypes.string,
      adeli_number: PropTypes.string,
      administrator_id: PropTypes.number,
    })
  ).isRequired,
};

export default DeletePatientButton;
