/* eslint-disable react/prop-types */
import React from "react";
import axios from "axios";

function DeleteButton({ selectedPracticians, setPracticians, practicians }) {
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
    <button
      type="button"
      className="delete-button"
      onClick={handleDeleteButtonClick}
    >
      <i className="fi fi-rr-trash" />
    </button>
  );
}

export default DeleteButton;
