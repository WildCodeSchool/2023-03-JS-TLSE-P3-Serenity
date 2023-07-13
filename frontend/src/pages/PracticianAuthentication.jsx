import { useNavigate } from "react-router-dom";
import React from "react";
import Authentication from "../components/Authentication";
import "../styles/PracticianAuthentication.scss";
import headerLogoBlack from "../assets/header_logo_black.svg";

function PracticianAuthentication() {
  const navigate = useNavigate();
  return (
    <div className="background-dark">
      <div className="authentication-practician-container">
        <img src={headerLogoBlack} alt="logo serenity" />
        <h1 className="title-connection-practician">
          <p>Connectez vous à</p>
          <p>votre compte Professionnel</p>
        </h1>
        <div className="auth-practician">
          <Authentication />
        </div>
      </div>
      <button
        type="button"
        className="return-button-practician"
        onClick={() => navigate("/")}
      >
        <i className="fi fi-rr-arrow-circle-left" />
      </button>
    </div>
  );
}

export default PracticianAuthentication;
