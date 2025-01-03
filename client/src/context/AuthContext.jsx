import { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../actions/AuthActions";
import { useAuthStatus, useLogoutUser } from "../api/auth/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { data: userData, isLoading, error } = useAuthStatus();
  const { mutate: logout } = useLogoutUser();

  useEffect(() => {
    if (userData && !isLoading && !error) {
      const { firstName, lastName, role, id, email } = userData;
      const username = `${firstName} ${lastName}`;
      dispatch(loginSuccess(username, role, id, email, firstName, lastName));
    }
  }, [userData, dispatch, isLoading, error]);

  const handleLogout = () => {
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        isLoading,
        error,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
