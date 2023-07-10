import React, { useContext } from "react";
import "../styles/HeaderLocation.scss";
import StateContext from "../contexts/StateContext";
import headerLogoBlack from "../assets/header_logo_black.svg";
import headerLogoBlackMini from "../assets/header_logo_black_mini.svg";

function HeaderLocation() {
  const { activeModal } = useContext(StateContext);
  const isMobile = window.matchMedia("(max-width: 480px)").matches;

  return (
    <div className="header-location">
      {isMobile ? (
        <img
          src={headerLogoBlackMini}
          alt="header logo"
          className="header-logo"
        />
      ) : (
        <img src={headerLogoBlack} alt="header logo" className="header-logo" />
      )}
      <h1>{activeModal}</h1>
    </div>
  );
}

export default HeaderLocation;
