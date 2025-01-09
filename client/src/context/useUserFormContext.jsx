import { createContext, useContext, useReducer } from "react";

const initialState = {
  users: [],
  isAddingUser: false,
  isEditingUser: false,
  userFirstName: null,
  userLastName: null,
  userEmail: null,
  userRole: null,
  userStatus: null,
  userPassword: null,
  deleteUserId: null,
  isDeletingUser: false,
  editUser: null,
};

const userFormReducer = (state, action) => {
  const user = action.payload;
  switch (action.type) {
    case "LOAD_USERS":
      return { ...state, users: action.payload };
    case "TOGGLE_ADD_USER":
      return { ...state, isAddingUser: !state.isAddingUser };
    case "TOGGLE_DELETE_USER":
      return {
        ...state,
        isDeletingUser: !state.isDeletingUser,
        deleteUserId: action.payload,
      };
    case "OPEN_EDIT_USER":
      return {
        ...state,
        isAddingUser: false,
        isEditingUser: true,
        editUser: user,
        userFirstName: user.userFirstName,
        userLastName: user.userLastName,
        userEmail: user.userEmail,
        userRole: user.userRoleId,
        userStatus: user.userStatus,
        userPassword: "",
      };
    case "CLOSE_EDIT_USER":
      return {
        ...state,
        isEditingUser: false,
        userFirstName: null,
        userLastName: null,
        userEmail: null,
        userRole: null,
        userStatus: null,
        userPassword: null,
      };
    case "CHANGE_USER_FIELD":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const UserFormContext = createContext();

export const useUserForm = () => {
  return useContext(UserFormContext);
};

export const UserFormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userFormReducer, initialState);

  const loadUsers = (users) => dispatch({ type: "LOAD_USERS", payload: users });
  const toggleAddUser = () => dispatch({ type: "TOGGLE_ADD_USER" });
  const toggleDeleteUser = (userId) =>
    dispatch({ type: "TOGGLE_DELETE_USER", payload: userId });
  const openEditUser = (user) =>
    dispatch({ type: "OPEN_EDIT_USER", payload: user });
  const closeEditUser = () => dispatch({ type: "CLOSE_EDIT_USER" });
  const changeUserData = (field, value) =>
    dispatch({ type: "CHANGE_USER_FIELD", payload: { field, value } });
  const resetUserForm = () => dispatch({ type: "RESET_FORM" });

  return (
    <UserFormContext.Provider
      value={{
        ...state,
        loadUsers,
        toggleAddUser,
        toggleDeleteUser,
        openEditUser,
        closeEditUser,
        changeUserData,
        resetUserForm,
      }}
    >
      {children}
    </UserFormContext.Provider>
  );
};
