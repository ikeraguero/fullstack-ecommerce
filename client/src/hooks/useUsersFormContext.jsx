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
      console.log(action.payload);
      return {
        ...state,
        isEditingUser: true,
        editUser: action.payload,
        userFirstName: action.payload.first_name,
        userLastName: action.payload.last_name,
        userEmail: action.payload.email,
        userRole: action.payload.role,
        userStatus: action.payload.status,
        userPassword: action.payload.hash_password,
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
    case "changeName":
      return { ...state, productName: action.payload };
    case "changePrice":
      return { ...state, productPrice: action.payload };
    case "changeCategory":
      return { ...state, productCategory: action.payload };
    case "changeQuantity":
      return { ...state, productQuantity: action.payload };
    case "changeDescription":
      return { ...state, productDescription: action.payload };
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
