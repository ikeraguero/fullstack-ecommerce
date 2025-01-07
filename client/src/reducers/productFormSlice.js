import { createSlice } from "@reduxjs/toolkit";

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

const productFormSlice = createSlice({
  name: "productForm",
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      state.products = action.payload;
    },
    toggleAddProduct: (state) => {
      state.isAddingProduct = !state.isAddingProduct;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    openEditProduct: (state, action) => {
      const product = action.payload;
      state.isAddingProduct = false;
      state.isEditingProduct = true;
      state.editProduct = product;
      state.productName = product.name;
      state.productPrice = product.price;
      state.productCategory = product.category;
      state.productQuantity = product.stockQuantity;
      state.productDescription = product.productDescription;
    },
    closeEditProduct: (state) => {
      state.isEditingProduct = false;
      state.editProduct = null;
      state.productName = null;
      state.productPrice = null;
      state.productCategory = null;
      state.productQuantity = null;
      state.productDescription = null;
    },
    changeProductName: (state, action) => {
      state.productName = action.payload;
    },
    changeProductPrice: (state, action) => {
      state.productPrice = action.payload;
    },
    changeProductCategory: (state, action) => {
      state.productCategory = Number(action.payload);
    },
    changeProductQuantity: (state, action) => {
      state.productQuantity = action.payload;
    },
    changeProductDescription: (state, action) => {
      state.productDescription = action.payload;
    },
    resetProductForm: () => initialState,
  },
});

export const {
  loadProducts,
  toggleAddProduct,
  setImage,
  openEditProduct,
  closeEditProduct,
  changeProductName,
  changeProductPrice,
  changeProductCategory,
  changeProductQuantity,
  changeProductDescription,
  resetProductForm,
} = productFormSlice.actions;

export default productFormSlice.reducer;
