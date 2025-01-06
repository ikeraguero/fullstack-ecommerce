import { LOGIN_SUCCESS, LOGOUT, UPDATE_USER_DATA } from "./constants";

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

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        id: action.payload.id,
        username: action.payload.username,
        role: action.payload.role,
        token: action.payload.token,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
      };
    case LOGOUT:
      return initialState;
    case UPDATE_USER_DATA:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        username: action.payload.username,
      };

    default:
      return state;
  }
}

export default authReducer;
