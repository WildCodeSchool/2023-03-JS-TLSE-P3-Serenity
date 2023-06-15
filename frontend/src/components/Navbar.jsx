/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../styles/Navbar.scss";
import avatar from "../assets/avatar.svg";

const linkAdmin = [
  {
    className: "nav_practician",
    label: "Praticiens",
    action: () => {
      console.info("Practician");
    },
  },
  {
    className: "nav_compte",
    label: "Mon compte",
    action: () => {
      console.info("Mon compte");
    },
  },
  {
    className: "nav_form",
    label: "Formulaires",
    action: () => {
      console.info("Form");
    },
  },
  {
    className: "nav_stats",
    label: "Stats",
    action: () => {
      console.info("Stats");
    },
  },
];

function navbar() {
  return (
    <div className="navbar">
      <div className="headerAvatar">
        <img src={avatar} alt="avatar" className="adminAvatar" />
        {/* // Fetch du nom de l'admin */}
        <span className="adminName">Nom de l'admin</span>
      </div>
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
  );
}

export default navbar;
