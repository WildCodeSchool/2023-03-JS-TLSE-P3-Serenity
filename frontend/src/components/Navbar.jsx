import React, { useContext } from "react";
import "../styles/Navbar.scss";
import avatar from "../assets/avatar.svg";
import StateContext from "../contexts/StateContext";

function navbar() {
  const { linkToActive, setLinkToActive } = useContext(StateContext);
  const navbarLinks = [
    {
      role: "admin",
      className: linkToActive === "Home" ? "active" : "nav",
      label: "Praticiens",
      action: () => {
        setLinkToActive("Home");
        console.info("Practician");
      },
    },
    {
      role: "practician",
      className: linkToActive === "Home" ? "active" : "nav",
      label: "Vos Patiens",
      action: () => {
        setLinkToActive("Home");
        console.info("Vos Patiens");
      },
    },
    {
      role: "patient",
      className: linkToActive === "Home" ? "active" : "nav",
      label: "Ma préparation",
      action: () => {
        setLinkToActive("Home");
        console.info("Ma préparation");
      },
    },
    {
      role: "practician",
      className: linkToActive === "Vos interventions" ? "active" : "nav",
      label: "Vos interventions",
      action: () => {
        setLinkToActive("Vos interventions");
        console.info("Vos interventions");
      },
    },
    {
      role: "practician",
      className: linkToActive === "Vos ressources" ? "active" : "nav",
      label: "Vos ressources",
      action: () => {
        setLinkToActive("Vos ressources");
        console.info("Vos ressources");
      },
    },
    {
      role: "all",
      className: linkToActive === "Mon Compte" ? "active" : "nav",
      label: "Mon Compte",
      action: () => {
        setLinkToActive("Mon Compte");
        console.info("Mon compte");
      },
    },
    {
      role: "patient",
      className: linkToActive === "Mon médecin" ? "active" : "nav",
      label: "Mon médecin",
      action: () => {
        setLinkToActive("Mon médecin");
        console.info("Mon médecin");
      },
    },
    {
      role: "all",
      className: linkToActive === "Formulaires" ? "active" : "nav",
      label: "Formulaires",
      action: () => {
        setLinkToActive("Formulaires");
        console.info("Formulaires");
      },
    },
    {
      role: "admin",
      className: linkToActive === "Stats" ? "active" : "nav",
      label: "Stats",
      action: () => {
        setLinkToActive("Stats");
        console.info("Stats");
      },
    },
    {
      role: "all",
      className: linkToActive === "A propos" ? "active" : "nav",
      label: "A propos",
      action: () => {
        setLinkToActive("A propos");
        console.info("A propos");
      },
    },
  ];
  return (
    <div className="navbar">
      <div className="header-avatar">
        <img src={avatar} alt="avatar" className="admin-avatar" />
        {/* // Fetch du nom de l'admin */}
        <span className="admin-name">Nom de l'administrateur</span>
      </div>
      <ul className="links">
        {navbarLinks
          .filter((link) => link.role === "admin" || link.role === "all")
          .map((link) => (
            <li key={link.label} className="list-item-navbar">
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
