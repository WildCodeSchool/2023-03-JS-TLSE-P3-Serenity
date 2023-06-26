import { useMemo, useState, createContext, useContext } from "react";
import PropTypes from "prop-types";
import AuthFunctionContext from "./AuthFunctionContext";

const StateContext = createContext();

export default StateContext;

export function StateProvider({ children }) {
  const { userInfo } = useContext(AuthFunctionContext);
  const [linkToActive, setLinkToActive] = useState("Home");
  const [showSuccessMessageModification, setShowSuccessMessageModification] =
    useState(false);
  const [showSuccessMessageAdd, setShowSuccessMessageAdd] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentActiveLink, setCurrentActiveLink] = useState("");
  useMemo(() => {
    if (userInfo.role === "admin") {
      setCurrentActiveLink("Praticiens");
    }
    if (userInfo.role === "practician") {
      setCurrentActiveLink("Patients");
    }
    if (userInfo.role === "patient") {
      setCurrentActiveLink("Ma préparation");
    }
  }, [userInfo.role]);

  const stateContext = useMemo(
    () => ({
      linkToActive,
      setLinkToActive,
      isMenuOpen,
      setIsMenuOpen,
      currentActiveLink,
      setCurrentActiveLink,
      showSuccessMessageModification,
      setShowSuccessMessageModification,
      showSuccessMessageAdd,
      setShowSuccessMessageAdd,
    }),
    [
      linkToActive,
      isMenuOpen,
      showSuccessMessageModification,
      showSuccessMessageAdd,
    ]
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
