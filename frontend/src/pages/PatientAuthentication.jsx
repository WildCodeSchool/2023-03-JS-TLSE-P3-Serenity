import { useNavigate } from "react-router-dom";
import React from "react";
import Authentication from "../components/Authentication";
import "../styles/PatientAuthentication.scss";
import headerLogoBlack from "../assets/header_logo_black.svg";

function PatientAuthentication() {
  const navigate = useNavigate();

  return (
    <div className="background-dark">
      <div className="authentication-patient-container">
        <img src={headerLogoBlack} alt="logo serenity" />
        <h1 className="title-connection-patient">
          <p>Connectez vous à</p>
          <p>votre compte patient</p>
        </h1>
        <div className="auth-patient">
          <Authentication />
        </div>
      </div>
      <button
        type="button"
        className="return-button-patient"
        onClick={() => navigate("/")}
      >
        <i className="fi fi-rr-arrow-circle-left" />
      </button>
    </div>
  );
}

export default PatientAuthentication;
