import React, { useContext } from "react";
import "../styles/Navbar.scss";
import avatar from "../assets/avatar.svg";
import StateContext from "../contexts/StateContext";
import AuthFunctionContext from "../contexts/AuthFunctionContext";

function navbar() {
  const {
    linkToActive,
    setLinkToActive,
    isMenuOpen,
    setIsMenuOpen,
    setActiveModal,
  } = useContext(StateContext);
  const { userInfo, logoutHandler } = useContext(AuthFunctionContext);
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
        setIsMenuOpen(false);
        setActiveModal("Praticiens");
      },
    },
    {
      role: "practician",
      className: linkToActive === "Home" ? "active" : "nav-serenity",
      label: "Patients",
      icon: "users",
      action: () => {
        setLinkToActive("Home");
        setIsMenuOpen(false);
        setActiveModal("Patients");
      },
    },
    {
      role: "patient",
      className: linkToActive === "Home" ? "active" : "nav-serenity",
      label: "Ma préparation",
      icon: "poll-h",
      action: () => {
        setLinkToActive("Home");
        setIsMenuOpen(false);
        setActiveModal("Ma préparation");
      },
    },
    {
      role: "practician",
      className: linkToActive === "Interventions" ? "active" : "nav-serenity",
      label: "Interventions",
      icon: "file-medical-alt",
      action: () => {
        setLinkToActive("Interventions");
        setIsMenuOpen(false);
        setActiveModal("Interventions");
      },
    },
    {
      role: "practician",
      className: linkToActive === "Ressources" ? "active" : "nav-serenity",
      label: "Ressources",
      icon: "folder-tree",
      action: () => {
        setLinkToActive("Ressources");
        setIsMenuOpen(false);
        setActiveModal("Ressources");
      },
    },
    {
      role: "all",
      className: linkToActive === "Mon Compte" ? "active" : "nav-serenity",
      label: "Mon Compte",
      icon: "circle-user",
      action: () => {
        setLinkToActive("Mon Compte");
        setIsMenuOpen(false);
        setActiveModal("Mon Compte");
      },
    },
    {
      role: "patient",
      className: linkToActive === "Mon médecin" ? "active" : "nav-serenity",
      label: "Mon médecin",
      icon: "user-md",
      action: () => {
        setLinkToActive("Mon médecin");
        setIsMenuOpen(false);
        setActiveModal("Mon médecin");
      },
    },
    {
      role: "all",
      className: linkToActive === "Formulaires" ? "active" : "nav-serenity",
      label: "Formulaires",
      icon: "document-signed",
      action: () => {
        setLinkToActive("Formulaires");
        setIsMenuOpen(false);
        setActiveModal("Formulaires");
      },
    },
    {
      role: "admin",
      className: linkToActive === "Stats" ? "active" : "nav-serenity",
      label: "Stats",
      icon: "chart-histogram",
      action: () => {
        setLinkToActive("Stats");
        setIsMenuOpen(false);
        setActiveModal("Stats");
      },
    },
    {
      role: "all",
      className: linkToActive === "A propos" ? "active" : "nav-serenity",
      label: "A propos",
      icon: "info",
      action: () => {
        setLinkToActive("A propos");
        setIsMenuOpen(false);
        setActiveModal("A propos");
      },
    },
  ];
  return (
    <div className="header-navbar">
      <div className="header-avatar">
        <img src={avatar} alt="avatar" className="admin-avatar" />
        <span className="admin-name">
          {userInfo.firstname} {userInfo.lastname}
        </span>
      </div>
      <div className="navbar-serenity">
        <button
          type="button"
          onClick={() => {
            setLinkToActive("Home");
            setIsMenuOpen(false);
          }}
        >
          <i alt="Home" className="fi fi-rr-home home-icon-mobile" />
        </button>
        <button className="menu-burger" type="button" onClick={toggleMenu}>
          <i alt="Menu" className="fi fi-rr-menu-burger menu-burger-icon" />
        </button>
        <button
          className={isMenuOpen ? "bg-burger" : "burger-invisible"}
          onClick={() => setIsMenuOpen(false)}
          type="button"
          aria-label="Close Menu Burger"
        />
        <ul
          className={
            isMenuOpen ? "links burger-visible" : "links burger-invisible"
          }
        >
          <div className="list-item-navbar">
            {navbarLinks
              .filter(
                (link) =>
                  link.role === `${userInfo.role}` || link.role === "all"
              )
              .map((link) => (
                <li key={link.label} className="list-navbar">
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
          </div>
          <div className="list-item-navbar logout">
            <button
              className="nav-serenity"
              alt="Déconnexion"
              type="button"
              onClick={() => {
                logoutHandler();
              }}
            >
              <div className="button-content">
                <i alt="Déconnexion" className="fi fi-rr-exit link-icon" />
                Déconnexion
              </div>
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default navbar;
