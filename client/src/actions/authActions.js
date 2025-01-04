export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";

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
