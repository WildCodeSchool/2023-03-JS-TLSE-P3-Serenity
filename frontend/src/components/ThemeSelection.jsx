import React, { useContext } from "react";
import "../styles/ThemeSelection.scss";
import StateContext from "../contexts/StateContext";
import UnderstandInterventionModal from "./UnderstandInterventionModal";

function ThemeSelection() {
  const { activeTheme, setActiveTheme } = useContext(StateContext);

  const themeButton = [
    {
      className: "understand-button",
      action: () => setActiveTheme("understand"),
      themeName: "Comprendre mon opération",
    },
    {
      className: "administrative-button",
      action: () => setActiveTheme("administrative"),
      themeName: "Finir les démarches administratives",
    },
    {
      className: "prepare-button",
      action: () => setActiveTheme("prepare"),
      themeName: "Préparer mon arrivée en toute sérénité",
    },
    {
      className: "anticipate-button",
      action: () => setActiveTheme("anticipate"),
      themeName: "Anticiper ma sortie",
    },
    {
      className: "checklist-button",
      action: () => setActiveTheme("checklist"),
      themeName: "Ma check-list avant le départ à la Clinique",
    },
  ];

  let CurrentModaleTheme;
  switch (activeTheme) {
    case "understand":
      CurrentModaleTheme = <UnderstandInterventionModal />;
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
    <div>
      <div className="theme-container">
        {themeButton.map((theme) => (
          <button
            type="button"
            className={theme.className}
            onClick={theme.action}
          >
            <p>{theme.themeName}</p>
          </button>
        ))}
      </div>
      {CurrentModaleTheme}
    </div>
  );
}

export default ThemeSelection;
