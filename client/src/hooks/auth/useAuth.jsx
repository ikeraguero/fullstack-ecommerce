import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  logoutSuccess,
  updateUserData,
} from "../../slices/authSlice";

function useAuth() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.auth);
  const role = useSelector((state) => state.auth.role);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.id);
  const email = useSelector((state) => state.auth.email);
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const username = useSelector((state) => state.auth.username);

  function login(username, role, id, email, firstName, lastName) {
    const userData = { username, role, id, email, firstName, lastName };
    dispatch(loginSuccess(userData));
  }

  function logout() {
    console.log("a");
    dispatch(logoutSuccess());
  }

  function updateUserProfile(username, firstName, lastName, email) {
    const userData = { username, firstName, lastName, email };
    dispatch(updateUserData(userData));
  }

  return {
    role,
    isLoggedIn,
    userId,
    email,
    username,
    login,
    logout,
    updateUserProfile,
    firstName,
    lastName,
    state,
  };
}

export default useAuth;
