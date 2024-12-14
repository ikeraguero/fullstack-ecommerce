import { createContext, useReducer, useContext } from "react";

const initialState = {
  products: [],
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
    case "loadProducts":
      return { ...state, products: action.payload };
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
      console.log(state);
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

const FormContext = createContext();

export function FormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

// Custom hook to access the form context
export function useFormContext() {
  return useContext(FormContext);
}
