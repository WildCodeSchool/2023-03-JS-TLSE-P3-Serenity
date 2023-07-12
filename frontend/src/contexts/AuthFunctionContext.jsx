import { createContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthFunctionContext = createContext();

export default AuthFunctionContext;

export function AuthFunctionProvider({ children }) {
  const navigate = useNavigate();

  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userInfo, setUserInfo] = useState({});
  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 12 / 24,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
      navigate("/");
    }
  };

  const logoutHandler = () => {
    Cookies.remove("userToken");
  };

  const AuthValue = useMemo(
    () => ({ userToken, setUser, userInfo, setUserInfo, logoutHandler }),
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
