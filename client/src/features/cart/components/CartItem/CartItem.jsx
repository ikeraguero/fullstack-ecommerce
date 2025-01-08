import { useState } from "react";

import styles from "./CartItem.module.css";
import { useDeleteCartItem, useUpdateCartItem } from "@api/cart/cart.api";
import { useDebounce } from "@hooks/debounce/useDebounce";

function CartItem({
  refetch,
  productId,
  id,
  productName,
  categoryName,
  price,
  quantity,
  imageData,
  imageType,
  cartId,
  cartItems,
  setTotalPrice,
  totalPrice,
}) {
  const { mutate: deleteItem } = useDeleteCartItem(refetch);
  const { mutate: updateItem } = useUpdateCartItem();
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const productPrice = price;

  const debouncedUpdate = useDebounce((putData) => {
    updateItem(putData);
    refetch();
  }, 1000);

  function handleDelete() {
    deleteItem(id);
    setTotalPrice((price) => price - productPrice * localQuantity);
  }

  function handleQuantityUpdate(type) {
    const newQuantity =
      type === "increase" ? localQuantity + 1 : localQuantity - 1;

    if (newQuantity === 0) {
      deleteItem(id);
      setTotalPrice(0);
      return;
    }

    const putData = {
      cartId: cartId,
      productId: productId,
      productName,
      price,
      quantity: newQuantity,
      imageData,
      imageType,
    };
    setLocalQuantity(newQuantity);
    setTotalPrice((price) =>
      type === "increase" ? price + productPrice : price - productPrice
    );

    debouncedUpdate(putData);
  }

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemImgAndName}>
        <div className={styles.cartItemImg}>
          <img src={`data:${imageType};base64,${imageData}`} alt="" />
        </div>
        <div className={styles.cartItemNameAndCategory}>
          <div className={styles.cartCategoryName}>{categoryName}</div>
          <div className={styles.cartItemName}>{productName}</div>
        </div>
      </div>
      <div className={styles.quantity}>
        <ion-icon
          name="remove-circle-outline"
          onClick={() => handleQuantityUpdate("decrease")}
        ></ion-icon>
        {localQuantity < 10 ? "0" + localQuantity : localQuantity}
        <ion-icon
          name="add-circle-outline"
          onClick={() => handleQuantityUpdate("increase")}
        ></ion-icon>
      </div>
      <div className={styles.totalPrice}>${localQuantity * price}</div>
      <div className={styles.cartItemRemove}>
        <ion-icon name="close-circle-outline" onClick={handleDelete}></ion-icon>
      </div>
    </div>
  );
}

export default CartItem;
