import React from "react";
import Authentication from "../components/Authentication";
import "../styles/AdminAuthentication.scss";
import headerLogoBlack from "../assets/header_logo_black.svg";

function AdminAuthentication() {
  return (
    <div className="authentication-container">
      <img src={headerLogoBlack} alt="logo serenity" />
      <h1 className="title-connection-admin">
        <p>Connectez vous à</p>
        <p>votre compte administrateur</p>
      </h1>
      <div className="auth-admin-practician">
        <Authentication />
      </div>
    </div>
  );
}

export default AdminAuthentication;
