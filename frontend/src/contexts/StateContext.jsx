import { useMemo, useState, createContext } from "react";
import PropTypes from "prop-types";

const StateContext = createContext();

export default StateContext;

export function StateProvider({ children }) {
  const [linkToActive, setLinkToActive] = useState("Home");
  const [activeModal, setActiveModal] = useState("");
  const [showSuccessMessageModification, setShowSuccessMessageModification] =
    useState(false); // for tracking success message display
  const [showSuccessMessageAdd, setShowSuccessMessageAdd] = useState(false);
  const [show, setShow] = useState(false); // Display modal
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("understand");

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
      activeModal,
      setActiveModal,
      show,
      setShow,
      activeTheme,
      setActiveTheme,
    }),
    [
      linkToActive,
      isMenuOpen,
      showSuccessMessageModification,
      showSuccessMessageAdd,
      activeModal,
      show,
      activeTheme,
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
