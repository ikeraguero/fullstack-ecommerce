export const loginSuccess = (username, role, token) => ({
  type: "LOGIN_SUCCESS",
  payload: { username, role, token },
});

export const logout = () => ({
  type: "LOGOUT",
});
