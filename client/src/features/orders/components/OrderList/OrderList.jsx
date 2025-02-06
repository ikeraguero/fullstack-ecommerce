import styles from "./OrderList.module.css";

const status = {
  PAID: "paid",
  PENDING: "pending",
};

function OrderList({ data }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.orderTable}>
        <thead>
          <tr className={styles.listHeader}>
            <th>Id</th>
            <th>Items</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody className={styles.orderTableBody}>
          {data.map((order) => (
            <tr className={styles.itemLine} key={order.orderId}>
              <td>#{order.orderId}</td>
              <td>
                {order.items} {order.items > 1 ? "items" : "item"}
              </td>
              <td>{order?.date?.split("T")[0]}</td>
              <td>
                <span
                  className={
                    order.status === status.PENDING
                      ? styles.statusPending
                      : styles.statusPaid
                  }
                >
                  {order.status}
                </span>
              </td>
              <td>${order.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
