import React from "react";
import proptypes from "prop-types";

function DeleteButton({ selectedPracticians }) {
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
