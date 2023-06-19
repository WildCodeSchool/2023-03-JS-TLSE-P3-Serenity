import React from "react";
import Authentication from "../components/Authentication";
import "../styles/AdminAuthentication.scss";

function AdminAuthentication() {
  return (
    <div className="authentication-container">
      <h1 className="title-connection-admin">
        Connectez vous à <br /> votre compte adminitrateur
      </h1>
      <div className="auth-admin-practician">
        <Authentication />
      </div>
    </div>
  );
}

export default AdminAuthentication;
