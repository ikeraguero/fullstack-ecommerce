import { useOrdersByUser } from "../../api/orders/order.api";
import Order from "../Order/Order";
import styles from "./OrderInformation.module.css";

function OrderInformation() {
  const { data: orders, isLoading } = useOrdersByUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Your Orders</h1>
      <div className={styles.ordersContainer}>
        {orders?.map((order) => (
          <Order key={order.id} {...order} />
        ))}
      </div>
    </div>
  );
}

export default OrderInformation;
