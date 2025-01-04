const LOAD_PRODUCTS = "LOAD_PRODUCTS";
const TOGGLE_ADD_PRODUCT = "TOGGLE_ADD_PRODUCT";
const SET_IMAGE = "SET_IMAGE";
const OPEN_EDIT_PRODUCT = "OPEN_EDIT_PRODUCT";
const CLOSE_EDIT_PRODUCT = "CLOSE_EDIT_PRODUCT";
const CHANGE_PRODUCT_NAME = "CHANGE_PRODUCT_NAME";
const CHANGE_PRODUCT_PRICE = "CHANGE_PRODUCT_PRICE";
const CHANGE_PRODUCT_CATEGORY = "CHANGE_PRODUCT_CATEGORY";
const CHANGE_PRODUCT_QUANTITY = "CHANGE_PRODUCT_QUANTITY";
const CHANGE_PRODUCT_DESCRIPTION = "CHANGE_PRODUCT_DESCRIPTION";
const RESET_PRODUCT_FORM = "RESET_PRODUCT_FORM";

export const loadProducts = (products) => ({
  type: LOAD_PRODUCTS,
  payload: products,
});

export const toggleAddProduct = () => ({
  type: TOGGLE_ADD_PRODUCT,
});

export const setImage = (image) => ({
  type: SET_IMAGE,
  payload: image,
});

export const openEditProduct = (product) => ({
  type: OPEN_EDIT_PRODUCT,
  payload: product,
});

export const closeEditProduct = () => ({
  type: CLOSE_EDIT_PRODUCT,
});

export const changeProductName = (name) => ({
  type: CHANGE_PRODUCT_NAME,
  payload: name,
});

export const changeProductPrice = (price) => ({
  type: CHANGE_PRODUCT_PRICE,
  payload: price,
});

export const changeProductCategory = (category) => ({
  type: CHANGE_PRODUCT_CATEGORY,
  payload: category,
});

export const changeProductQuantity = (quantity) => ({
  type: CHANGE_PRODUCT_QUANTITY,
  payload: quantity,
});

export const changeProductDescription = (description) => ({
  type: CHANGE_PRODUCT_DESCRIPTION,
  payload: description,
});

export const resetProductForm = () => ({
  type: RESET_PRODUCT_FORM,
});
