import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.scss";
import bgImg from "../assets/homeAcess.svg";

function HomePage() {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="card-home">
      <img alt="background-home" className="card-img-home" src={bgImg} />
      <div className="card-body-home">
        <div className="logo-serenity">
          <img alt="" src="" />
          <h1>Serenity</h1>
        </div>
        <div className="card-body-choice">
          <p>Espace de connexion </p>
          <button
            type="button"
            className="button-access-page"
            onClick={() => handleNavigate("/espacepro")}
          >
            <i className="fi fi-rr-user-md" />
            <div className="title-access-pro"> Praticien</div>
          </button>

          <button
            type="button"
            className="button-access-page"
            onClick={() => handleNavigate("/espacepatient")}
          >
            <i className="fi fi-rr-user" />
            <div className="title-access-patient">Patient</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
