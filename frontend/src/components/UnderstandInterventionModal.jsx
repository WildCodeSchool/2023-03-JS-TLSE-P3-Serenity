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
  const { role, id } = userInfo;
  const { setActiveTheme } = useContext(StateContext);
  const [, setSelectedData] = useState(null);

  const handleReturnButtonClickModalUnderstand = () => {
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
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/patients/ressourceintervention/${id}?theme_id=1`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            Role: `${role}`,
          },
        }
      )
      .then((response) => {
        setUnderstandData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="understand-modal-container">
      <div className="understand-modal-header">
        <button
          type="button"
          className="return-button-modal-understand"
          onClick={handleReturnButtonClickModalUnderstand}
        >
          <i className="fi fi-rr-arrow-circle-left" />
        </button>
        <h1>Ma préparation</h1>
      </div>
      <h2 className="understand-modal-title">Comprendre mon opération</h2>
      <div className="understand-modal-list">
        <h3>Tout comprendre sur mon opération c'est par ici !</h3>
        {understandData.map((el) => (
          <button
            type="button"
            className="image-container"
            key={el.title}
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
