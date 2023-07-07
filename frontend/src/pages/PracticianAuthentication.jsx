import React from "react";
import Authentication from "../components/Authentication";
import "../styles/AdminAuthentication.scss";

function PracticianAuthentication() {
  return (
    <div className="authentication-container">
      <h1 className="title-connection-admin">
        <p>Connectez vous à</p>
        <p>votre compte Professionnel</p>
      </h1>
      <div className="auth-admin-practician">
        <Authentication />
      </div>
    </div>
  );
}

export default PracticianAuthentication;
