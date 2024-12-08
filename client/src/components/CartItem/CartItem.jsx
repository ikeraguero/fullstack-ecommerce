import styles from "./CartItem.module.css";

function CartItem({ product_name, price, quantity, image_data, image_type }) {
  const totalPrice = price * quantity;

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemImg}>
        <img src={`data:${image_type};base64,${image_data}`} alt="" />
      </div>
      <div className="name">{product_name}</div>
      <div className="quantity">
        {quantity} {quantity > 1 ? "units" : "unit"}
      </div>
      <div className="totalPrice">R${totalPrice}</div>
    </div>
  );
}

export default CartItem;
