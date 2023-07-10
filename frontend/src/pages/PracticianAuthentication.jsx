import React from "react";
import Authentication from "../components/Authentication";
import "../styles/PracticianAuthentication.scss";
import headerLogoBlack from "../assets/header_logo_black.svg";

function PracticianAuthentication() {
  return (
    <div className="authentication-container">
      <img src={headerLogoBlack} alt="logo serenity" />
      <h1 className="title-connection-practician">
        <p>Connectez vous à</p>
        <p>votre compte Professionnel</p>
      </h1>
      <div className="auth-practician">
        <Authentication />
      </div>
    </div>
  );
}

export default PracticianAuthentication;
