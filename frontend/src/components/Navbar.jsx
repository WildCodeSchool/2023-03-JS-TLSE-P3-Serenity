import React, { useContext } from "react";
import "../styles/Navbar.scss";
import avatar from "../assets/avatar.svg";
import StateContext from "../contexts/StateContext";

function navbar() {
  const { linkToActive, setLinkToActive, isMenuOpen, setIsMenuOpen } =
    useContext(StateContext);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navbarLinks = [
    {
      role: "admin",
      className: linkToActive === "Home" ? "active" : "nav-serenity",
      label: "Praticiens",
      icon: "users",
      action: () => {
        setLinkToActive("Home");
      },
    },
    {
      role: "practician",
      className: linkToActive === "Home" ? "active" : "nav-serenity",
      label: "Patient",
      icon: "users",
      action: () => {
        setLinkToActive("Home");
      },
    },
    {
      role: "patient",
      className: linkToActive === "Home" ? "active" : "nav-serenity",
      label: "Ma préparation",
      icon: "poll-h",
      action: () => {
        setLinkToActive("Home");
      },
    },
    {
      role: "practician",
      className:
        linkToActive === "Vos interventions" ? "active" : "nav-serenity",
      label: "Vos interventions",
      icon: "file-medical-alt",
      action: () => {
        setLinkToActive("Vos interventions");
      },
    },
    {
      role: "practician",
      className: linkToActive === "Vos ressources" ? "active" : "nav-serenity",
      label: "Vos ressources",
      icon: "folder-tree",
      action: () => {
        setLinkToActive("Vos ressources");
      },
    },
    {
      role: "all",
      className: linkToActive === "Mon Compte" ? "active" : "nav-serenity",
      label: "Mon Compte",
      icon: "circle-user",
      action: () => {
        setLinkToActive("Mon Compte");
      },
    },
    {
      role: "patient",
      className: linkToActive === "Mon médecin" ? "active" : "nav-serenity",
      label: "Mon médecin",
      icon: "user-md",
      action: () => {
        setLinkToActive("Mon médecin");
      },
    },
    {
      role: "all",
      className: linkToActive === "Formulaires" ? "active" : "nav-serenity",
      label: "Formulaires",
      icon: "document-signed",
      action: () => {
        setLinkToActive("Formulaires");
      },
    },
    {
      role: "admin",
      className: linkToActive === "Stats" ? "active" : "nav-serenity",
      label: "Stats",
      icon: "chart-histogram",
      action: () => {
        setLinkToActive("Stats");
      },
    },
    {
      role: "all",
      className: linkToActive === "A propos" ? "active" : "nav-serenity",
      label: "A propos",
      icon: "info",
      action: () => {
        setLinkToActive("A propos");
      },
    },
  ];
  return (
    <div className="header-navbar">
      <div className="header-avatar">
        <img src={avatar} alt="avatar" className="admin-avatar" />
        {/* // Fetch du nom de l'admin */}
        <span className="admin-name">Nom de l'administrateur</span>
      </div>
      <div className="navbar-serenity">
        <button
          type="button"
          onClick={() => {
            setLinkToActive("Home");
          }}
        >
          <i alt="Home" className="fi fi-rr-home home-icon-mobile" />
        </button>
        <button className="menu-burger" type="button" onClick={toggleMenu}>
          <i alt="Menu" className="fi fi-rr-menu-burger menu-burger-icon" />
        </button>
        <div
          className={isMenuOpen ? "bg-burger" : "burger-invisible"}
          onClick={() => setIsMenuOpen(false)}
          onKeyDown={() => {}}
          role="button"
          tabIndex="0"
          aria-label="Close Menu Burger"
        />
        <ul
          className={
            isMenuOpen ? "links burger-visible" : "links burger-invisible"
          }
        >
          {navbarLinks
            .filter((link) => link.role === "admin" || link.role === "all")
            .map((link) => (
              <li key={link.label} className="list-item-navbar">
                <button
                  className={link.className}
                  type="button"
                  onClick={link.action}
                >
                  <div className="button-content">
                    <i
                      alt={link.label}
                      className={`fi fi-rr-${link.icon} link-icon`}
                    />
                    {link.label}
                  </div>
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default navbar;
