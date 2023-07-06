import React, { useContext } from "react";
import "../styles/HeaderLocation.scss";
import StateContext from "../contexts/StateContext";

function HeaderLocation() {
  const { activeModal } = useContext(StateContext);

  return (
    <div className="header-location">
      <div className="header-logo">
        <i className="fi fi-rr-layers" />
        <p>Serenity</p>
      </div>
      <h1>{activeModal}</h1>
    </div>
  );
}

export default HeaderLocation;
