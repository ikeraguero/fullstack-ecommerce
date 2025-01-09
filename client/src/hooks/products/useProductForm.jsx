import { useDispatch, useSelector } from "react-redux";
import {
  openEditProduct,
  resetProductForm,
  toggleAddProduct,
  toggleDeleteProduct,
} from "../../slices/productFormSlice";

function useProductForm() {
  const dispatch = useDispatch();
  const productFormState = useSelector((state) => state.productForm);
  const isEditingProduct = useSelector(
    (state) => state.productForm.isEditingProduct
  );
  const isAddingProduct = useSelector(
    (state) => state.productForm.isAddingProduct
  );
  const isDeletingProduct = useSelector(
    (state) => state.productForm.isDeletingProduct
  );
  const deleteProductId = useSelector(
    (state) => state.productForm.deleteProductId
  );
  const editProduct = useSelector((state) => state.productForm.editProduct);
  const products = useSelector((state) => state.productForm.products);

  function toggleAddProductForm() {
    dispatch(toggleAddProduct());
  }

  function toggleDeleteProductForm(itemId) {
    dispatch(toggleDeleteProduct(itemId));
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
    isDeletingProduct,
    editProduct,
    isAddingProduct,
    products,
    toggleAddProductForm,
    reset,
    editProductOpen,
    deleteProductId,
    toggleDeleteProductForm,
  };
}

export default useProductForm;
