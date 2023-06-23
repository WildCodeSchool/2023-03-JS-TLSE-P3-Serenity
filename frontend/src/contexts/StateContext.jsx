import { useMemo, useState, createContext } from "react";
import PropTypes from "prop-types";

const StateContext = createContext();

export default StateContext;

export function StateProvider({ children }) {
  const [linkToActive, setLinkToActive] = useState("Home");
  const [showSuccessMessageModification, setShowSuccessMessageModification] =
    useState(false);
  const [showSuccessMessageAdd, setShowSuccessMessageAdd] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const stateContext = useMemo(
    () => ({
      linkToActive,
      setLinkToActive,
      isMenuOpen,
      setIsMenuOpen,
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
