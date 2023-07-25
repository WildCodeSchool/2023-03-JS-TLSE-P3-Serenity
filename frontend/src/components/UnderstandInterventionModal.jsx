import "../styles/UnderstandInterventionModal.scss";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AuthFunctionContext from "../contexts/AuthFunctionContext";
import StateContext from "../contexts/StateContext";
import img2 from "../assets/picture.png";

function UnderstandInterventionModal() {
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const [understandData, setUnderstandData] = useState([]);
  const { role } = userInfo;
  const { setActiveTheme } = useContext(StateContext);
  const [, setSelectedData] = useState(null);

  const handleReturnButtonClick = () => {
    setActiveTheme(null);
  };

  const handleshowModalUnderstand = (image) => {
    setSelectedData(image);
    Swal.fire({
      background: "#242731",
      title: image.title,
      text: image.description,
      imageAlt: "",
    });
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/patients/ressource`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Role: `${role}`,
        },
      })
      .then((response) => {
        setUnderstandData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredData = understandData.filter(
    (data) => data.theme === "Comprendre"
  );
  return (
    <div className="understand-modal-container">
      <div className="understand-modal-header">
        <button
          type="button"
          className="return-button-modal-understand"
          onClick={handleReturnButtonClick}
        >
          <i className="fi fi-rr-arrow-circle-left" />
        </button>
        <h1>Ma préparation</h1>
      </div>
      <h2 className="understand-modal-title">Comprendre mon opération</h2>
      <h3>Schémas et documentations</h3>
      <div className="understand-modal-list">
        {filteredData.map((el) => (
          <button
            type="button"
            className="image-container"
            key={el.id}
            onClick={() => handleshowModalUnderstand(el)}
          >
            <div className="small-images">
              <img src={img2} alt="logo" />
            </div>
            <p>{el.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default UnderstandInterventionModal;
