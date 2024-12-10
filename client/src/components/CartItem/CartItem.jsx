import styles from "./CartItem.module.css";
import { deleteCartItem } from "../../api/cart.api";

function CartItem({
  refetch,
  id,
  product_name,
  category_name,
  price,
  quantity,
  image_data,
  image_type,
}) {
  const totalPrice = price * quantity;
  console.log(category_name);

  async function handleDelete() {
    await deleteCartItem(id);
    console.log("io");
    refetch();
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
        {quantity} {quantity > 1 ? "units" : "unit"}
      </div>
      <div className={styles.totalPrice}>R${totalPrice}</div>
      <div className={styles.cartItemRemove}>
        <ion-icon name="close-circle-outline" onClick={handleDelete}></ion-icon>
      </div>
    </div>
  );
}

export default CartItem;
