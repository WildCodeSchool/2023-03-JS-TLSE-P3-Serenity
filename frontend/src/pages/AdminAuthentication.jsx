import React from "react";
import Authentication from "../components/Authentication";
import "../styles/AdminAuthentication.scss";
import headerLogoBlack from "../assets/header_logo_black.svg";

function AdminAuthentication() {
  return (
    <div className="background-dark">
      <div className="authentication-admin-container">
        <img src={headerLogoBlack} alt="logo serenity" />
        <h1 className="title-connection-admin">
          <p>Connectez vous à</p>
          <p>votre compte administrateur</p>
        </h1>
        <div className="auth-admin">
          <Authentication />
        </div>
      </div>
    </div>
  );
}

export default AdminAuthentication;
