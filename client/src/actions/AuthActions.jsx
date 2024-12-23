export const loginSuccess = (username, role, token, id) => ({
  type: "LOGIN_SUCCESS",
  payload: { username, role, token, id },
});

export const logoutSuccess = () => ({
  type: "LOGOUT",
});
