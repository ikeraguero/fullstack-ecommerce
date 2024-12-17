import { createContext, useReducer, useContext } from "react";

const initialState = {
  users: [],
  image: {},
  isAdding: false,
  isEditing: false,
  editProduct: null,
  productName: null,
  productPrice: null,
  productCategory: null,
  productQuantity: null,
  productDescription: null,
};

function formReducer(state, action) {
  switch (action.type) {
    case "loadUsers":
      console.log(action.payload);
      return { ...state, users: action.payload };
    case "toggleAdd":
      return { ...state, isAdding: !state.isAdding };
    case "setImage":
      return { ...state, image: action.payload };
    case "openEdit":
      return {
        ...state,
        isEditing: true,
        editProduct: action.payload,
        productName: action.payload.name,
        productPrice: action.payload.price,
        productCategory: action.payload.category,
        productQuantity: action.payload.stock_quantity,
        productDescription: action.payload.product_description,
      };
    case "closeEdit":
      return {
        ...state,
        isEditing: false,
        editProduct: null,
        productName: null,
        productPrice: null,
        productCategory: null,
        productQuantity: null,
        productDescription: null,
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
