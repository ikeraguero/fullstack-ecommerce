import { useSelector } from "react-redux";
import styles from "./OrderSummary.module.css";

function OrderSummary({
  order,
  isLoading,
  shippingPrice,
  totalPrice,
  checkoutStep,
  isProcessingPayment,
  handlePaymentSubmit,
  handleShippingSubmit,
}) {
  console.log(checkoutStep);
  const totalItemsPrice = useSelector(
    (state) => state.checkout.totalItemsPrice
  );
  return (
    <form className={styles.cartRightSide} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.cartSummaryTop}>
        <div className={styles.cartRightTitle}>
          <h1>Summary</h1>
        </div>
        <div className={styles.cartRightSummary}>
          <div className={styles.cartSummaryItem}>
            <div className="cartItemName">
              <h2>Items {order?.items}</h2>
            </div>
            <div className="cartItemPrice">${totalItemsPrice}</div>
          </div>
          <div className={styles.cartSummaryItem}>
            <div className="cartItemName">
              <h2>Shipping</h2>
            </div>
            <div className="cartItemPrice">
              {isLoading ? "Calculating..." : `$${shippingPrice}`}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cartSummaryBottom}>
        <div className={styles.cartSummaryTotal}>
          <div className="cartItemName">
            <h2>TOTAL PRICE</h2>
          </div>
          <div className="cartItemPrice">${totalPrice}</div>
        </div>
        <button
          className={styles.checkoutButton}
          type="submit"
          onClick={
            checkoutStep === "shipping"
              ? handleShippingSubmit
              : handlePaymentSubmit
          }
        >
          {checkoutStep === "shipping"
            ? "CONTINUE"
            : isProcessingPayment
            ? "PROCESSING PAYMENT..."
            : "PAY"}
        </button>
      </div>
    </form>
  );
}

export default OrderSummary;
