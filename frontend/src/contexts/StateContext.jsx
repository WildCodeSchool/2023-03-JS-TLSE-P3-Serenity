import { useMemo, useState, createContext } from "react";
import PropTypes from "prop-types";

const StateContext = createContext();

export default StateContext;

export function StateProvider({ children }) {
  const [linkToActive, setLinkToActive] = useState("Home");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentActiveLink, setCurrentActiveLink] = useState("");
  const userInfoTest = "admin"; // Replace userInfoTest by userInfo of Token for the role, the role define the first activeLink
  useMemo(() => {
    if (userInfoTest === "admin") {
      setCurrentActiveLink("Praticiens");
    }
    if (userInfoTest === "practician") {
      setCurrentActiveLink("Patients");
    }
    if (userInfoTest === "patient") {
      setCurrentActiveLink("Ma préparation");
    }
  }, [userInfoTest]);

  const stateContext = useMemo(
    () => ({
      linkToActive,
      setLinkToActive,
      isMenuOpen,
      setIsMenuOpen,
      currentActiveLink,
      setCurrentActiveLink,
    }),
    [linkToActive, isMenuOpen]
  );
  return (
    <StateContext.Provider value={stateContext}>
      {children}
    </StateContext.Provider>
  );
}

StateProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
