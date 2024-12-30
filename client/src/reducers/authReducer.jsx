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
    case "LOGIN_SUCCESS":

      return {
        ...state,
        isLoggedIn: true,
        id: action.payload.id,
        username: action.payload.username,
        role: action.payload.role,
        token: action.payload.token,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        email: action.payload.email,
      };

    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        username: null,
        token: null,
      };
    default:
      return state;
  }
}

export default authReducer;
