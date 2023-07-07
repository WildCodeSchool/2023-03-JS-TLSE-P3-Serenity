import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.scss";
import bgImg from "../assets/home_access.svg";
import logo from "../assets/icone_home_.svg";

function HomePage() {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="card-home">
      <img alt="background-home" className="card-img-home" src={bgImg} />
      <div className="card-body-home">
        <div>
          <img alt="logo-serenity" src={logo} className="logo-serenity" />
        </div>
        <div className="card-body-choice">
          <p className="title-connexion">Espace de connexion </p>
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
            onClick={() => handleNavigate("/login")}
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
