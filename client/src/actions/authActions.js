import { LOGIN_SUCCESS, LOGOUT, UPDATE_USER_DATA } from "../reducers/constants";

export const loginSuccess = (
  username,
  role,
  id,
  email,
  firstName,
  lastName
) => ({
  type: LOGIN_SUCCESS,
  payload: { username, role, id, email, firstName, lastName },
});

export const logoutSuccess = () => ({
  type: LOGOUT,
});

export const updateUserData = (username, firstName, lastName, email) => ({
  type: UPDATE_USER_DATA,
  payload: { username, firstName, lastName, email },
});
