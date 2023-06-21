import { useMemo, useState, createContext } from "react";
import PropTypes from "prop-types";

const StateContext = createContext();

export default StateContext;

export function StateProvider({ children }) {
  const [linkToActive, setLinkToActive] = useState("Home");
  const contextValue = useMemo(
    () => ({ linkToActive, setLinkToActive }),
    [linkToActive]
  );
  return (
    <StateContext.Provider value={contextValue}>
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
