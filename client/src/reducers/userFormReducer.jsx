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
} from "./constants";

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

function userFormReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS:
      return { ...state, users: action.payload };
    case TOGGLE_ADD:
      return { ...state, isAddingUser: !state.isAddingUser };
    case OPEN_EDIT:
      return {
        ...state,
        isAddingUser: false,
        isEditingUser: true,
        editUser: action.payload,
        userFirstName: action.payload.userFirstName,
        userLastName: action.payload.userLastName,
        userEmail: action.payload.userEmail,
        userRole: action.payload.userRoleId,
        userStatus: action.payload.userStatus,
        userPassword: "",
      };
    case CLOSE_EDIT:
      return {
        ...state,
        isEditingUser: false,
        editUser: null,
        userFirstName: null,
        userLastName: null,
        userEmail: null,
        userRole: null,
        userStatus: null,
        userPassword: null,
      };
    case CHANGE_FIRST_NAME:
      return { ...state, userFirstName: action.payload };
    case CHANGE_LAST_NAME:
      return { ...state, userLastName: action.payload };
    case CHANGE_EMAIL:
      return { ...state, userEmail: action.payload };
    case CHANGE_ROLE:
      return { ...state, userRole: action.payload };
    case CHANGE_PASSWORD:
      return { ...state, userPassword: action.payload };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
}

export default userFormReducer;
