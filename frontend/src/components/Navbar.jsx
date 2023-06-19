/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../styles/Navbar.scss";
import avatar from "../assets/avatar.svg";

const linkAdmin = [
  {
    className: "navPractician",
    label: "Praticiens",
    action: () => {
      console.info("Practician");
    },
  },
  {
    className: "navCompte",
    label: "Mon compte",
    action: () => {
      console.info("Mon compte");
    },
  },
  {
    className: "navForm",
    label: "Formulaires",
    action: () => {
      console.info("Form");
    },
  },
  {
    className: "navStats",
    label: "Stats",
    action: () => {
      console.info("Stats");
    },
  },
];

function navbar() {
  return (
    <div>
      <div className="headerAvatar">
        <img src={avatar} alt="avatar" className="adminAvatar" />
        {/* // Fetch du nom de l'admin */}
        <span className="adminName">Nom de l'administrateur</span>
      </div>
      <div className="navbar">
        <ul className="links">
          {linkAdmin.map((link) => (
            <li key={link.label}>
              <button
                className={link.className}
                type="button"
                onClick={link.action}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default navbar;
