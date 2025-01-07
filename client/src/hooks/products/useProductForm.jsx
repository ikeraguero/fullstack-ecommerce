import { useDispatch, useSelector } from "react-redux";
import {
  openEditProduct,
  resetProductForm,
  toggleAddProduct,
} from "../../reducers/productFormSlice";

function useProductForm() {
  const dispatch = useDispatch();
  const productFormState = useSelector((state) => state.productForm);
  const isEditingProduct = useSelector(
    (state) => state.productForm.isEditingProduct
  );
  const isAddingProduct = useSelector(
    (state) => state.productForm.isAddingProduct
  );
  const editProduct = useSelector((state) => state.productForm.editProduct);
  const products = useSelector((state) => state.productForm.products);

  function toggleAddProductForm() {
    dispatch(toggleAddProduct());
  }

  function reset() {
    dispatch(resetProductForm());
  }

  function editProductOpen(payload) {
    dispatch(openEditProduct(payload));
  }

  return {
    productFormState,
    isEditingProduct,
    editProduct,
    isAddingProduct,
    products,
    toggleAddProductForm,
    reset,
    editProductOpen,
  };
}

export default useProductForm;
