import { createContext, useMemo, useState, useContext } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import StateContext from "./StateContext";

const AuthFunctionContext = createContext();

export default AuthFunctionContext;

export function AuthFunctionProvider({ children }) {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userInfo, setUserInfo] = useState({});
  const { setCurrentActiveLink } = useContext(StateContext);
  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 12 / 24,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };
  useMemo(() => {
    if (userInfo === "admin") {
      setCurrentActiveLink("Praticiens");
    }
    if (userInfo === "practician") {
      setCurrentActiveLink("Patients");
    }
    if (userInfo === "patient") {
      setCurrentActiveLink("Ma préparation");
    }
  }, [userInfo]);

  const AuthValue = useMemo(
    () => ({ userToken, setUser, userInfo, setUserInfo }),
    [userToken, userInfo]
  );

  return (
    <AuthFunctionContext.Provider value={AuthValue}>
      {children}
    </AuthFunctionContext.Provider>
  );
}

AuthFunctionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
