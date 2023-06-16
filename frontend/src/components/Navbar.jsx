/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../styles/Navbar.scss";
import avatar from "../assets/avatar.svg";

const linkAdmin = [
  {
    className: "nav-practician",
    label: "Praticiens",
    action: () => {
      console.info("Practician");
    },
  },
  {
    className: "nav-compte",
    label: "Mon compte",
    action: () => {
      console.info("Mon compte");
    },
  },
  {
    className: "nav-form",
    label: "Formulaires",
    action: () => {
      console.info("Form");
    },
  },
  {
    className: "nav-stats",
    label: "Stats",
    action: () => {
      console.info("Stats");
    },
  },
];

function navbar() {
  return (
    <div>
      <div className="header-avatar">
        <img src={avatar} alt="avatar" className="admin-avatar" />
        {/* // Fetch du nom de l'admin */}
        <span className="admin-name">Nom de l'administrateur</span>
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
