import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const AuthFunctionContext = createContext();

export default AuthFunctionContext;

export function AuthFunctionProvider({ children }) {
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
    }
  };

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
