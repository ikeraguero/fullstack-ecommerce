import {
  useCreateProduct,
  useRemoveProduct,
  useUpdateProduct,
} from "../../api/products/products.api";
import { useProductFormContext } from "./useProductsFormContext";

export function useProductActions(editProduct, refetch) {
  const { state: productState, dispatch } = useProductFormContext();
  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useRemoveProduct();

  const formatProductData = (formData, editProduct) => ({
    name: formData.get("productName"),
    price: parseFloat(formData.get("productPrice")),
    stock_quantity: Number(formData.get("productStockQuantity")),
    category_id: Number(formData.get("productCategory")),
    product_description: formData.get("productDescription"),
    ...(editProduct && { id: editProduct.id }),
  });

  const create = (formData) => {
    const productData = formatProductData(formData);
    const sendData = new FormData();
    sendData.append("image", productState.image);
    sendData.append(
      "product",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );
    createProduct(sendData, {
      onSuccess: () => {
        dispatch({ type: "toggleAdd" });
        refetch();
      },
    });
  };

  const update = (formData) => {
    const productData = formatProductData(formData, editProduct);
    const sendData = new FormData();
    sendData.append("image", productState.image);
    sendData.append(
      "product",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );
    updateProduct(sendData, {
      onSuccess: () => {
        dispatch({ type: "closeEdit" });
        refetch();
      },
    });
  };

  const remove = (userId) => {
    deleteProduct(userId, {
      onSuccess: refetch,
    });
  };

  return { create, update, remove };
}

export default useProductActions;
