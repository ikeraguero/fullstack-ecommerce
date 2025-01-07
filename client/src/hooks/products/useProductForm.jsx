import { useSelector } from "react-redux";

function useProductForm() {
  const productFormState = useSelector((state) => state.productForm);
  const isEditingProduct = useSelector(
    (state) => state.productForm.isEditingProduct
  );
  const isAddingProduct = useSelector(
    (state) => state.productForm.isAddingProduct
  );
  const editProduct = useSelector((state) => state.productForm.editProduct);
  const products = useSelector((state) => state.productForm.products);

  

  return {
    productFormState,
    isEditingProduct,
    editProduct,
    isAddingProduct,
    products,
  };
}

export default useProductForm;
