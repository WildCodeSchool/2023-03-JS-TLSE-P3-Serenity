/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import axios from "axios";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function DeleteButton({ selectedPracticians, setPracticians, practicians }) {
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const { role } = userInfo;
  const handleDeleteButtonClick = () => {
    selectedPracticians.forEach((practicianId) => {
      axios
        .delete(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/admins/practicians/${practicianId}`,
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
