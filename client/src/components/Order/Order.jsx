import { useState } from "react";
import OrderItem from "../OrderItem/OrderItem";
import styles from "./Order.module.css";

function Order({ orderItems, orderId, date, items, totalPrice, status }) {
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
        <div className={styles.orderGrid}>
          <span>Order #{orderId}</span>
          <span>{date.split("T")[0]}</span>
          <span>
            {items < 9 ? `0${items}` : items} {items > 1 ? "items" : "item"}
          </span>
          <span>${totalPrice}</span>
          <span
            className={
              status === "paid" ? styles.statusPaid : styles.statusPending
            }
          >
            {status}
          </span>
        </div>
        <span className={styles.orderIcon}>
          {isOpen && <ion-icon name="chevron-up-outline"></ion-icon>}
          {!isOpen && <ion-icon name="chevron-down-outline"></ion-icon>}
        </span>
      </div>
      {isOpen && (
        <div className={styles.orderItem}>
          {orderItems?.map((item) => (
            <OrderItem
              key={item.id}
              productName={item.productName}
              quantity={item.quantity}
              totalPrice={item.totalPrice}
              imageData={item.imageData}
              imageType={item.imageType}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Order;
