import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  username: null,
  token: null,
  id: null,
  role: null,
  firstName: null,
  lastName: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      console.log(action);
      const { id, username, role, token, firstName, lastName, email } =
        action.payload;
      state.isLoggedIn = true;
      state.id = id;
      state.username = username;
      state.role = role;
      state.token = token;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
    },
    logoutSuccess(state) {
      return initialState;
    },
    updateUserData(state, action) {
      const { firstName, lastName, email, username } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.username = username;
    },
  },
});

export const { loginSuccess, logoutSuccess, updateUserData } =
  authSlice.actions;
export default authSlice.reducer;
