import React from "react";
import Authentication from "../components/Authentication";
import "../style/adminAuthentication.scss";

function AdminAuthentication() {
  return (
    <>
      <h1 className="title-connection-admin">
        Connectez vous à <br /> votre compte adminitrateur
      </h1>
      <div className="authAdminPractician">
        <Authentication />
      </div>
    </>
  );
}

export default AdminAuthentication;
