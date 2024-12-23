export const loginSuccess = (
  username,
  role,
  token,
  id,
  email,
  first_name,
  last_name
) => ({
  type: "LOGIN_SUCCESS",
  payload: { username, role, token, id, email, first_name, last_name },
});

export const logoutSuccess = () => ({
  type: "LOGOUT",
});
