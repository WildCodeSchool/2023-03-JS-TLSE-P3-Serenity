import React from "react";
import Authentication from "../components/Authentication";
import "../styles/PatientAuthentication.scss";
import headerLogoBlack from "../assets/header_logo_white.svg";

function PatientAuthentication() {
  return (
    <div className="background-light">
      <div className="authentication-container">
        <img src={headerLogoBlack} alt="logo serenity" />
        <h1 className="title-connection-patient">
          <p>Connectez vous à</p>
          <p>votre compte patient</p>
        </h1>
        <div className="auth-patient">
          <Authentication />
        </div>
      </div>
    </div>
  );
}

export default PatientAuthentication;
