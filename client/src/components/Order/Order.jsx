import { useState } from "react";
import OrderItem from "../OrderItem/OrderItem";
import styles from "./Order.module.css";

function Order({ orderItems, orderId }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenOrder() {
    setIsOpen(!isOpen);
  }

  console.log(orderId);

  return (
    <div>
      <div
        className={isOpen ? styles.orderOpened : styles.orderClosed}
        onClick={handleOpenOrder}
      >
        <span>Order #{orderId}</span>
        <ion-icon name="chevron-down-outline"></ion-icon>
      </div>
      {isOpen && (
        <div className={styles.orderItem}>
          {orderItems?.map((item) => (
            <OrderItem
              key={item.id}
              productName={item.productName}
              quantity={item.quantity}
              totalPrice={item.totalPrice}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Order;
