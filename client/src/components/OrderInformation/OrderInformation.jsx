import { useSelector } from "react-redux";
import { useOrdersByUser } from "../../api/order.api";
import Order from "../Order/Order";
import styles from "./OrderInformation.module.css";

function OrderInformation() {
  const id = useSelector((state) => state.auth.id);
  const { data: orders, isLoading } = useOrdersByUser(id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Orders</h1>
      <div className={styles.ordersContainer}>
        {orders?.map((order) => (
          <Order key={order.id} {...order} />
        ))}
      </div>
    </div>
  );
}

export default OrderInformation;
