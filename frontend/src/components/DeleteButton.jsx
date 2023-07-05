/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import axios from "axios";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function DeleteButton({ selectedPracticians, setPracticians, practicians }) {
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const { role } = userInfo;

  const handleDeleteButtonClick = () => {
    selectedPracticians.forEach((practician) => {
      axios
        .delete(
          `${import.meta.env.VITE_BACKEND_URL}/admins/practicians/${
            practician.id
          }`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Role: `${role}`,
            },
          }
        )
        .then((response) => {
          console.info(response);
          const updatedPracticians = practicians.filter(
            (existingPractician) => existingPractician.id !== practician.id
          );
          setPracticians(updatedPracticians);
        })
        .catch((error) => {
          console.error(
            `Error deleting practician with ID ${practician.id}:`,
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
