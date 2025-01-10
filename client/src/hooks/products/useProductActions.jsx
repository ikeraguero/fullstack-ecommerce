import useCartData from "@hooks/cart/useCartData";
import {
  useCreateProduct,
  useRemoveProduct,
  useUpdateProduct,
} from "../../api/products/products.api";
import { useSuccess } from "@context/SuccessContext";
import { useAddToCart } from "@api/cart/cart.api";

export function useProductActions() {
  const { displaySuccess } = useSuccess();
  const { cart } = useCartData();
  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: deleteProduct } = useRemoveProduct();
  const { mutate: addToCart } = useAddToCart();

  function create(sendData) {
    createProduct(sendData);
  }

  function update(sendData) {
    updateProduct(sendData);
  }

  function remove(productId) {
    deleteProduct(productId);
  }

  async function handleAddToCart(product, quantity) {
    const cartItem = {
      cartId: cart.id,
      productId: product.id,
      productName: product.name,
      quantity: Number(quantity),
      price: product.price,
      imageData: product.imageData,
      imageType: product.imageType,
    };
    addToCart(cartItem, {
      onSuccess: () => {
        displaySuccess("Product added to cart");
      },
      onError: (error) => {
        console.error("Failed to add to cart:", error);
      },
    });
  }

  return { create, update, remove, handleAddToCart };
}

export default useProductActions;
