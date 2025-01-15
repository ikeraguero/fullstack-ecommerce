import { useOrdersByUser } from "@api/orders/order.api";
import Order from "../Order/Order";
import styles from "./OrderInformation.module.css";
import LoadingState from "@features/shared/components/LoadingState/LoadingState";

function OrderInformation() {
  const { data: orders, isLoading } = useOrdersByUser();

  if (isLoading) return <LoadingState />;

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        <div className={styles.ordersContainer}>
          {orders?.map((order) => (
            <Order key={order.id} {...order} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyMessage}>
          No orders available at the moment.
        </div>
      )}
    </div>
  );
}

export default OrderInformation;
