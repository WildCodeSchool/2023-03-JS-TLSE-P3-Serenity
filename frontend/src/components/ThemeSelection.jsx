import React, { useContext } from "react";
import "../styles/ThemeSelection.scss";
import StateContext from "../contexts/StateContext";

function ThemeSelection() {
  const { activeTheme, setActiveTheme } = useContext(StateContext);

  const themeButton = [
    {
      label: "understand",
      className: "understand-button",
      action: () => setActiveTheme("understand"),
      themeName: "Comprendre mon opération",
    },
    {
      label: "administrative",
      className: "administrative-button",
      action: () => setActiveTheme("administrative"),
      themeName: "Finir les démarches administratives",
    },
    {
      label: "prepare",
      className: "prepare-button",
      action: () => setActiveTheme("prepare"),
      themeName: "Préparer mon arrivée en toute sérénité",
    },
    {
      label: "anticipate",
      className: "anticipate-button",
      action: () => setActiveTheme("anticipate"),
      themeName: "Anticiper ma sortie",
    },
    {
      label: "checklist",
      className: "checklist-button",
      action: () => setActiveTheme("checklist"),
      themeName: "Ma check-list avant le départ à la Clinique",
    },
  ];

  let CurrentModaleTheme;
  switch (activeTheme) {
    case "understand":
      CurrentModaleTheme = <p>{activeTheme}</p>;
      break;
    case "administrative":
      CurrentModaleTheme = <p>{activeTheme}</p>;
      break;
    case "prepare":
      CurrentModaleTheme = <p>{activeTheme}</p>;
      break;
    case "anticipate":
      CurrentModaleTheme = <p>{activeTheme}</p>;
      break;
    case "checklist":
      CurrentModaleTheme = <p>{activeTheme}</p>;
      break;
    default:
      CurrentModaleTheme = <p>Vide</p>;
      break;
  }

  return (
    <>
      <div className="theme-container">
        {themeButton.map((theme) => (
          <button
            key={theme.label}
            type="button"
            className={theme.className}
            onClick={theme.action}
          >
            <p>{theme.themeName}</p>
          </button>
        ))}
      </div>
      {CurrentModaleTheme}
    </>
  );
}

export default ThemeSelection;