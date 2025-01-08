import useProductFormBase from "./useProductFormBase";
import useProductForm from "./useProductForm";

function useProductEditForm(onSubmitCallback) {
  const { isEditingProduct, editProduct } = useProductForm();

  const initialData = isEditingProduct
    ? {
        productName: editProduct?.name || "",
        productPrice: editProduct?.price || "",
        productStockQuantity: editProduct?.stockQuantity || "",
        productCategory: editProduct?.categoryId || 1,
        productDescription: editProduct?.productDescription || "",
        productImage: editProduct?.image || "",
      }
    : {};

  return useProductFormBase(onSubmitCallback, initialData);
}

export default useProductEditForm;
