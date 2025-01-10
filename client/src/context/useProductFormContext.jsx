import { createContext, useContext, useReducer } from "react";

const initialState = {
  image: null,
  isAddingProduct: false,
  isEditingProduct: false,
  isDeletingProduct: false,
  deleteProductId: null,
  editProduct: null,
  productName: null,
  productPrice: null,
  productCategory: 1,
  productQuantity: null,
  productDescription: null,
};

const productFormReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_ADD_PRODUCT":
      return { ...state, isAddingProduct: !state.isAddingProduct };
    case "TOGGLE_DELETE_PRODUCT":
      return {
        ...state,
        isDeletingProduct: !state.isDeletingProduct,
        deleteProductId: action.payload,
      };
    case "SET_IMAGE":
      return { ...state, image: action.payload };
    case "OPEN_EDIT_PRODUCT":
      return {
        ...state,
        isAddingProduct: false,
        isEditingProduct: true,
        editProduct: action.payload,
        productName: action.payload.name,
        productPrice: action.payload.price,
        productCategory: action.payload.category,
        productQuantity: action.payload.stockQuantity,
        productDescription: action.payload.productDescription,
      };
    case "CLOSE_EDIT_PRODUCT":
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
    case "CHANGE_PRODUCT_NAME":
      return { ...state, productName: action.payload };
    case "CHANGE_PRODUCT_PRICE":
      return { ...state, productPrice: action.payload };
    case "CHANGE_PRODUCT_CATEGORY":
      return { ...state, productCategory: Number(action.payload) };
    case "CHANGE_PRODUCT_QUANTITY":
      return { ...state, productQuantity: action.payload };
    case "CHANGE_PRODUCT_DESCRIPTION":
      return { ...state, productDescription: action.payload };
    case "RESET_PRODUCT_FORM":
      return initialState;
    default:
      return state;
  }
};

const ProductFormContext = createContext();

export const useProductForm = () => {
  return useContext(ProductFormContext);
};

export const ProductFormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productFormReducer, initialState);

  const loadProducts = (products) =>
    dispatch({ type: "LOAD_PRODUCTS", payload: products });

  const toggleAddProduct = () => dispatch({ type: "TOGGLE_ADD_PRODUCT" });

  const toggleDeleteProduct = (productId) =>
    dispatch({ type: "TOGGLE_DELETE_PRODUCT", payload: productId });

  const setImage = (image) => dispatch({ type: "SET_IMAGE", payload: image });

  const openEditProduct = (product) =>
    dispatch({ type: "OPEN_EDIT_PRODUCT", payload: product });

  const closeEditProduct = () => dispatch({ type: "CLOSE_EDIT_PRODUCT" });

  const changeProductData = (field, value) =>
    dispatch({ type: `CHANGE_PRODUCT_${field.toUpperCase()}`, payload: value });

  const resetProductForm = () => dispatch({ type: "RESET_PRODUCT_FORM" });

  return (
    <ProductFormContext.Provider
      value={{
        ...state,
        loadProducts,
        toggleAddProduct,
        toggleDeleteProduct,
        setImage,
        openEditProduct,
        closeEditProduct,
        changeProductData,
        resetProductForm,
      }}
    >
      {children}
    </ProductFormContext.Provider>
  );
};
