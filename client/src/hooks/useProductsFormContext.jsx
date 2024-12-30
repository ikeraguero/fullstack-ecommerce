import { createContext, useReducer, useContext } from "react";

const initialState = {
  products: [],
  image: {},
  isAddingProduct: false,
  isEditingProduct: false,
  editProduct: null,
  productName: null,
  productPrice: null,
  productCategory: null,
  productQuantity: null,
  productDescription: null,
};

function formReducer(state, action) {
  console.log(action.type);
  switch (action.type) {
    case "loadProducts":
      return { ...state, products: action.payload };
    case "toggleAdd":
      return { ...state, isAddingProduct: !state.isAddingProduct };
    case "setImage":
      return { ...state, image: action.payload };
    case "openEdit":
      return {
        ...state,
        isEditingProduct: true,
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
        isEditingProduct: false,
        editProduct: null,
        productName: null,
        productPrice: null,
        productCategory: null,
        productQuantity: null,
        productDescription: null,
      };
    case "changeName":
      console.log(action.payload);
      return { ...state, productName: action.payload };
    case "changePrice":
      return { ...state, productPrice: action.payload };
    case "changeCategory":
      return { ...state, productCategory: Number(action.payload) };
    case "changeQuantity":
      return { ...state, productQuantity: action.payload };
    case "changeDescription":
      return { ...state, productDescription: action.payload };
    case "reset":
      return {
        ...state,
        image: {},
        editProduct: null,
        productName: null,
        productPrice: null,
        productCategory: null,
        productQuantity: null,
        productDescription: null,
      };
    default:
      return new Error("Unknown option");
  }
}

const FormContext = createContext();

export function ProductFormProvider({ children }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

export function useProductFormContext() {
  return useContext(FormContext);
}
