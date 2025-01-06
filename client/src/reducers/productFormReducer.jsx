import {
  LOAD_PRODUCTS,
  TOGGLE_ADD_PRODUCT,
  SET_IMAGE,
  OPEN_EDIT_PRODUCT,
  CLOSE_EDIT_PRODUCT,
  CHANGE_PRODUCT_NAME,
  CHANGE_PRODUCT_PRICE,
  CHANGE_PRODUCT_CATEGORY,
  CHANGE_PRODUCT_QUANTITY,
  CHANGE_PRODUCT_DESCRIPTION,
  RESET_PRODUCT_FORM,
} from "./constants";

const initialState = {
  products: [],
  image: null,
  isAddingProduct: false,
  isEditingProduct: false,
  editProduct: null,
  productName: null,
  productPrice: null,
  productCategory: 1,
  productQuantity: null,
  productDescription: null,
};

function productFormReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return { ...state, products: action.payload };
    case TOGGLE_ADD_PRODUCT:
      return { ...state, isAddingProduct: !state.isAddingProduct };
    case SET_IMAGE:
      return { ...state, image: action.payload };
    case OPEN_EDIT_PRODUCT:
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
    case CLOSE_EDIT_PRODUCT:
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
    case CHANGE_PRODUCT_NAME:
      return { ...state, productName: action.payload };
    case CHANGE_PRODUCT_PRICE:
      return { ...state, productPrice: action.payload };
    case CHANGE_PRODUCT_CATEGORY:
      return { ...state, productCategory: Number(action.payload) };
    case CHANGE_PRODUCT_QUANTITY:
      return { ...state, productQuantity: action.payload };
    case CHANGE_PRODUCT_DESCRIPTION:
      return { ...state, productDescription: action.payload };
    case RESET_PRODUCT_FORM:
      return initialState;
    default:
      return state;
  }
}

export default productFormReducer;
