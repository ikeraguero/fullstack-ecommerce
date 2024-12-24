import styles from "./OrderItem.module.css";

function OrderItem({ productName, quantity, totalPrice }) {
  console.log(productName);
  return (
    <div className={styles.order}>
      <span>{productName}</span>
      <span>{quantity}</span>
      <span>${totalPrice}</span>
      <span>Status</span>
    </div>
  );
}

export default OrderItem;
