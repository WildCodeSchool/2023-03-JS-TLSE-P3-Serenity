import "../styles/PrepareMyArrivateModal.scss";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AuthFunctionContext from "../contexts/AuthFunctionContext";
import StateContext from "../contexts/StateContext";
import img2 from "../assets/picture.png";

function PrepareMyArrivateModal() {
  const { userToken, userInfo } = useContext(AuthFunctionContext);
  const [understandData, setUnderstandData] = useState([]);
  const { role, id } = userInfo;
  const [, setSelectedData] = useState(null);
  const { setActiveTheme } = useContext(StateContext);

  const handleReturnButtonClickModalPrepare = () => {
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
        }/patients/ressourceintervention/${id}?theme_id=3`,
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
    <div className="prepare-arrival-modal-container">
      <div className="prepare-arrival-modal-header">
        <button
          type="button"
          className="return-button-modal-prepare-arrival"
          onClick={handleReturnButtonClickModalPrepare}
        >
          <i className="fi fi-rr-arrow-circle-left" />
        </button>
        <h1>Ma préparation</h1>
      </div>
      <h2 className="prepare-arrival-modal-title">
        Préparer mon arrivée en toute sérénité
      </h2>
      <div className="prepare-arrival-modal-list">
        <h3>
          Préparons nous à vivre la journée de l’intevention une première fois,
          histoire d’être en toute sérénité le jour J
        </h3>
        {understandData.map((el) => (
          <button
            type="button"
            className="image-container"
            key={el.patient_id}
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

export default PrepareMyArrivateModal;
