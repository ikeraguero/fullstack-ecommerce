import styles from "./OrderList.module.css";

function OrderList({ data }) {
  const status = {
    PAID: "paid",
    PENDING: "pending",
  };
  return (
    <>
      <div className={styles.listHeader}>
        <span>Id</span>
        <span>Items</span>
        <span>Date</span>
        <span>Status</span>
        <span>Total Price</span>
      </div>
      <ul className={styles.orderList}>
        {data.map((order) => (
          <li className={styles.itemLine} key={order}>
            <div className={styles.itemName}>#{order.orderId}</div>
            <>
              <div className={styles.itemStatus}>
                {order.items} {order.items > 1 ? "items" : "item"}
              </div>
              <div className={styles.itemRole}>{order.date.split("T")[0]}</div>
              <div
                className={
                  order.status === status.PENDING
                    ? styles.statusPending
                    : styles.statusPaid
                }
              >
                {" "}
                {order.status}
              </div>
            </>
            <div className={styles.orderPrice}>${order.totalPrice}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default OrderList;
