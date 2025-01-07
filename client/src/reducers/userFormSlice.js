import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  image: {},
  isAddingUser: false,
  isEditingUser: false,
  editUser: null,
  userFirstName: null,
  userLastName: null,
  userEmail: null,
  userRole: null,
  userStatus: null,
  userPassword: null,
};

const userFormSlice = createSlice({
  name: 'userForm',
  initialState,
  reducers: {
    loadUsers(state, action) {
      state.users = action.payload;
    },

    toggleAdd(state) {
      state.isAddingUser = !state.isAddingUser;
    },

    openEdit(state, action) {
      const user = action.payload;
      state.isAddingUser = false;
      state.isEditingUser = true;
      state.editUser = user;
      state.userFirstName = user.userFirstName;
      state.userLastName = user.userLastName;
      state.userEmail = user.userEmail;
      state.userRole = user.userRoleId;
      state.userStatus = user.userStatus;
      state.userPassword = ''; 
    },
    closeEdit(state) {
      state.isEditingUser = false;
      state.editUser = null;
      state.userFirstName = null;
      state.userLastName = null;
      state.userEmail = null;
      state.userRole = null;
      state.userStatus = null;
      state.userPassword = null;
    },
    changeFirstName(state, action) {
      state.userFirstName = action.payload;
    },
    changeLastName(state, action) {
      state.userLastName = action.payload;
    },

    changeEmail(state, action) {
      state.userEmail = action.payload;
    },
    changeRole(state, action) {
      state.userRole = action.payload;
    },
    changePassword(state, action) {
      state.userPassword = action.payload;
    },

    resetForm(state) {
      return initialState;
    },
  },
});

export const {
  loadUsers,
  toggleAdd,
  openEdit,
  closeEdit,
  changeFirstName,
  changeLastName,
  changeEmail,
  changeRole,
  changePassword,
  resetForm,
} = userFormSlice.actions;


export default userFormSlice.reducer;
