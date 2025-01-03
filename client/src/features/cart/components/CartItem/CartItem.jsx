import styles from "./CartItem.module.css";
import { useDeleteCartItem, useUpdateCartItem } from "@api/cart/cart.api";
import { useState } from "react";

function CartItem({
  refetch,
  product_id,
  id,
  product_name,
  category_name,
  price,
  quantity,
  image_data,
  image_type,
  cartId,
  cartItems,
  setTotalPrice,
  totalPrice,
}) {
  const { mutate: deleteItem } = useDeleteCartItem();
  const { mutate: updateItem } = useUpdateCartItem();
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const productPrice = price;

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
      cart_id: cartId,
      product_id: product_id,
      product_name,
      price,
      quantity: newQuantity,
      image_data,
      image_type,
    };
    setLocalQuantity(newQuantity);
    updateItem(putData);
    setTotalPrice((price) =>
      type === "increase" ? price + productPrice : price - productPrice
    );
  }

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemImgAndName}>
        <div className={styles.cartItemImg}>
          <img src={`data:${image_type};base64,${image_data}`} alt="" />
        </div>
        <div className={styles.cartItemNameAndCategory}>
          <div className={styles.cartCategoryName}>{category_name}</div>
          <div className={styles.cartItemName}>{product_name}</div>
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
      <div className={styles.totalPrice}>R${localQuantity * price}</div>
      <div className={styles.cartItemRemove}>
        <ion-icon name="close-circle-outline" onClick={handleDelete}></ion-icon>
      </div>
    </div>
  );
}

export default CartItem;
