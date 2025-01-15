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
  address: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { id, username, role, token, firstName, lastName, email, address } =
        action.payload;
      console.log(address, action);
      state.isLoggedIn = true;
      state.id = id;
      state.username = username;
      state.role = role;
      state.token = token;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.address = address;
    },
    logoutSuccess(state) {
      state.isLoggedIn = false;
      state.username = null;
      state.token = null;
      state.id = null;
      state.role = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
    },
    updateUserData(state, action) {
      const { firstName, lastName, email, username, address } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.username = username;
      state.address = address;
    },
  },
});

export const { loginSuccess, logoutSuccess, updateUserData } =
  authSlice.actions;
export default authSlice.reducer;
