/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import "../styles/Navbar.scss";
import avatar from "../assets/avatar.svg";
import StateContext from "../contexts/StateContext";
import scalpel from "../assets/scalpel.svg";
import home from "../assets/home.svg";
import form from "../assets/form.svg";
import document from "../assets/document.svg";
import doctor from "../assets/doctor.svg";
import compte from "../assets/compte.svg";
import stats from "../assets/stats.svg";
import about from "../assets/about.svg";
import homeBottom from "../assets/homeBottom.svg";
import menuBurger from "../assets/menuBurger.svg";

function navbar() {
  const { linkToActive, setLinkToActive, isMenuOpen, setIsMenuOpen } =
    useContext(StateContext);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navbarLinks = [
    {
      role: "admin",
      className: linkToActive === "Home" ? "active" : "nav",
      label: "Praticiens",
      icon: scalpel,
      action: () => {
        setLinkToActive("Home");
      },
    },
    {
      role: "practician",
      className: linkToActive === "Home" ? "active" : "nav",
      label: "Vos Patiens",
      icon: home,
      action: () => {
        setLinkToActive("Home");
      },
    },
    {
      role: "patient",
      className: linkToActive === "Home" ? "active" : "nav",
      label: "Ma préparation",
      icon: home,
      action: () => {
        setLinkToActive("Home");
      },
    },
    {
      role: "practician",
      className: linkToActive === "Vos interventions" ? "active" : "nav",
      label: "Vos interventions",
      icon: scalpel,
      action: () => {
        setLinkToActive("Vos interventions");
      },
    },
    {
      role: "practician",
      className: linkToActive === "Vos ressources" ? "active" : "nav",
      label: "Vos ressources",
      icon: document,
      action: () => {
        setLinkToActive("Vos ressources");
      },
    },
    {
      role: "all",
      className: linkToActive === "Mon Compte" ? "active" : "nav",
      label: "Mon Compte",
      icon: compte,
      action: () => {
        setLinkToActive("Mon Compte");
      },
    },
    {
      role: "patient",
      className: linkToActive === "Mon médecin" ? "active" : "nav",
      label: "Mon médecin",
      icon: doctor,
      action: () => {
        setLinkToActive("Mon médecin");
      },
    },
    {
      role: "all",
      className: linkToActive === "Formulaires" ? "active" : "nav",
      label: "Formulaires",
      icon: form,
      action: () => {
        setLinkToActive("Formulaires");
      },
    },
    {
      role: "admin",
      className: linkToActive === "Stats" ? "active" : "nav",
      label: "Stats",
      icon: stats,
      action: () => {
        setLinkToActive("Stats");
      },
    },
    {
      role: "all",
      className: linkToActive === "A propos" ? "active" : "nav",
      label: "A propos",
      icon: about,
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
      <div className="navbar">
        <button
          type="button"
          onClick={() => {
            setLinkToActive("Home");
          }}
        >
          <img src={homeBottom} alt="Home" className="home-icon-mobile" />
        </button>
        <button className="menu-burger" type="button" onClick={toggleMenu}>
          <img src={menuBurger} alt="Menu" className="menu-burger-icon" />
        </button>
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
                    <img
                      src={link.icon}
                      alt={link.label}
                      className="link-icon"
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
