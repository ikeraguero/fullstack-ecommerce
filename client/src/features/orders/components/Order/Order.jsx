import { useState } from "react";
import OrderItem from "../OrderItem/OrderItem";
import styles from "./Order.module.css";
import { useNavigate } from "react-router-dom";
import useCheckout from "@hooks/cart/useCheckout";

function Order({ orderItems, orderId, date, totalPrice, status }) {
  const { setItemsTotalPrice } = useCheckout();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const items = orderItems
    .map((orderItem) => orderItem.quantity)
    .reduce((acc, cur) => acc + cur, 0);

  function handleOpenOrder() {
    setIsOpen(!isOpen);
  }

  function handleCheckout() {
    setItemsTotalPrice(totalPrice);
    navigate(`/checkout/${orderId}`);
  }

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

          {status === "paid" && <span className={styles.statusPaid}>Paid</span>}
          {status === "pending" && (
            <span className={styles.statusPending} onClick={handleCheckout}>
              Checkout
            </span>
          )}
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
              key={item}
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
