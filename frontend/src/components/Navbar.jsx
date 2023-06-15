/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../styles/Navbar.scss";
import avatar from "../assets/avatar.svg";

function navbar() {
  return (
    <div className="navbar">
      <div className="headerAvatar">
        <img src={avatar} alt="avatar" className="adminAvatar" />
        {/* // Fetch du nom de l'admin */}
        <span className="adminName">Nom de l'admin</span>
      </div>
      <ul className="links">
        <li>
          <button
            className="nav_practician"
            type="button"
            onClick={() => {
              console.info("Practician");
            }}
          >
            Praticiens
          </button>
        </li>
        <li>
          <button
            className="nav_compte"
            type="button"
            onClick={() => {
              console.info("Mon compte");
            }}
          >
            Mon compte
          </button>
        </li>
        <li>
          <button
            className="nav_formulaires"
            type="button"
            onClick={() => {
              console.info("Formulaires");
            }}
          >
            Formulaires
          </button>
        </li>
        <li>
          <button
            className="nav_stats"
            type="button"
            onClick={() => {
              console.info("Stats");
            }}
          >
            Stats
          </button>
        </li>
      </ul>
    </div>
  );
}

export default navbar;
