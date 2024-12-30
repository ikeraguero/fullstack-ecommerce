import { createContext, useReducer, useContext } from "react";

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

function formReducer(state, action) {
  switch (action.type) {
    case "loadUsers":
      return { ...state, users: action.payload };
    case "toggleAdd":
      return { ...state, isAddingUser: !state.isAddingUser };
    case "openEdit":
      return {
        ...state,
        isEditingUser: true,
        editUser: action.payload,
        userFirstName: action.payload.userFirstName,
        userLastName: action.payload.userLastName,
        userEmail: action.payload.userEmail,
        userRole: action.payload.userRoleId,
        userStatus: action.payload.userStatus,
        userPassword: "",
      };
    case "closeEdit":
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
    case "changeFirstName":
      return { ...state, userFirstName: action.payload };
    case "changeLastName":
      return { ...state, userLastName: action.payload };
    case "changeEmail":
      return { ...state, userEmail: action.payload };
    case "changeRole":
      return { ...state, userRole: action.payload };
    case "changePassword":
      return { ...state, userPassword: action.payload };
    case "reset":
      return {
        users: [],
        image: {},
        editUser: null,
        userFirstName: null,
        userLastName: null,
        userEmail: null,
        userRole: null,
        userStatus: null,
        userPassword: null,
      };
    default:
      return new Error("Unknown option");
  }
}

const UsersFormContext = createContext();

export function UserFormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <UsersFormContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersFormContext.Provider>
  );
}

export function useUsersFormContext() {
  return useContext(UsersFormContext);
}
