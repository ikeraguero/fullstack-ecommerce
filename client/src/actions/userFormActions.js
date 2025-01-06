import {
  LOAD_USERS,
  TOGGLE_ADD,
  OPEN_EDIT,
  CLOSE_EDIT,
  CHANGE_FIRST_NAME,
  CHANGE_LAST_NAME,
  CHANGE_EMAIL,
  CHANGE_ROLE,
  CHANGE_PASSWORD,
  RESET_FORM,
} from "../reducers/constants";

export const loadUsers = (users) => ({
  type: LOAD_USERS,
  payload: users,
});

export const toggleAddUser = () => ({
  type: TOGGLE_ADD,
});

export const openEditUser = (user) => ({
  type: OPEN_EDIT,
  payload: user,
});

export const closeEditUser = () => ({
  type: CLOSE_EDIT,
});

export const changeFirstName = (firstName) => ({
  type: CHANGE_FIRST_NAME,
  payload: firstName,
});

export const changeLastName = (lastName) => ({
  type: CHANGE_LAST_NAME,
  payload: lastName,
});

export const changeEmail = (email) => ({
  type: CHANGE_EMAIL,
  payload: email,
});

export const changeUserRole = (role) => ({
  type: CHANGE_ROLE,
  payload: role,
});

export const changePassword = (password) => ({
  type: CHANGE_PASSWORD,
  payload: password,
});

export const resetUserForm = () => ({
  type: RESET_FORM,
});
