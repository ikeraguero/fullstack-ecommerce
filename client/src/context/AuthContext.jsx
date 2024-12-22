import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));

  const login = (token) => {
    Cookies.set("authToken", token, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
      path: "/",
    });
    setAuthToken(token);
  };

  const logout = () => {
    Cookies.remove("authToken");
    localStorage.clear();
    setAuthToken(null);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      Cookies.remove("authToken");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  });

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
