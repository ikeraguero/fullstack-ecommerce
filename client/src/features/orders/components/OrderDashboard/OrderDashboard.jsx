import { useOrders } from "@api/orders/order.api";
import styles from "./OrderDashboard.module.css";
import LoadingState from "@features/shared/components/LoadingState/LoadingState";
import ErrorState from "@features/shared/components/ErrorState/ErrorState";
import OrderList from "../OrderList/OrderList";
import CountUp from "react-countup";
import { useEffect, useState } from "react";

function OrderDashboard() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [pendingContent, setPendingContent] = useState(null);

  const {
    data: ordersData,
    isLoading,
    error,
    refetch,
  } = useOrders(currentPage, pageSize);

  const totalPages = ordersData?.totalPages || 0;

  function handleNext() {
    if (ordersData && currentPage < totalPages - 1 && ordersData.nextContent) {
      setPendingContent(ordersData.nextContent);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  function handlePrevious() {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }

  useEffect(() => {
    if (!isLoading && ordersData && currentPage >= 0) {
      setPendingContent(null);
    }
  }, [isLoading, ordersData, currentPage]);

  if (isLoading && !pendingContent) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} retry={refetch} />;
  }

  const {
    totalOrders,
    totalRevenue,
    totalUniqueProducts,
    currentContent: currentOrders,
  } = ordersData || {};

  const displayedOrders = pendingContent || currentOrders;

  return (
    <div className={styles.orderDashboard}>
      <h2>Orders</h2>
      <div className={styles.dashboardTop}>
        <div className={styles.cardStats}>
          <span>Total Revenue</span>
          <span className={styles.cardValue}>
            $
            <CountUp
              end={totalRevenue}
              duration={1}
              separator=","
              decimals={2}
            />
          </span>
        </div>
        <div className={styles.cardStats}>
          <span>Total Orders</span>
          <span className={styles.cardValue}>
            <CountUp end={totalOrders} duration={1} separator="," />
          </span>
        </div>
        <div className={styles.cardStats}>
          <span>Total Products</span>
          <span className={styles.cardValue}>
            <CountUp end={totalUniqueProducts} duration={1} separator="," />
          </span>
        </div>
      </div>
      <div>
        <OrderList data={displayedOrders} />
      </div>
      <div className={styles.paginationButtons}>
        <button
          onClick={handlePrevious}
          className={currentPage <= 0 ? styles.hidden : styles.paginationButton}
        >
          <ion-icon name="chevron-back-outline"></ion-icon>
          Page {currentPage}
        </button>
        <button
          onClick={handleNext}
          className={
            currentPage >= totalPages - 1
              ? styles.hidden
              : styles.paginationButton
          }
        >
          Page {currentPage + 2}
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
}

export default OrderDashboard;
