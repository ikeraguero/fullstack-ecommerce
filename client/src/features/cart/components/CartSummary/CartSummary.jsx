import styles from "./CartSummary.module.css";
function CartSummary({ itemsLength, totalPrice, handleCreateOrder }) {
  console.log(itemsLength, totalPrice);
  return (
    <>
      <div className={styles.cartSummaryTop}>
        <div className={styles.cartRightTitle}>
          <h1>Summary</h1>
        </div>
        <div className={styles.cartRightSummary}>
          <div className={styles.cartSummaryItem}>
            <div className="cartItemName">
              <h2>Items {itemsLength}</h2>
            </div>
            <div className="cartItemPrice">${totalPrice}</div>
          </div>
        </div>
      </div>
      <div className={styles.cartSummaryBottom}>
        <div className={styles.cartSummaryTotal}>
          <div className="cartItemName">
            <h2>TOTAL PRICE</h2>
          </div>
          <div className="cartItemPrice">R${totalPrice}</div>
        </div>
        <button className={styles.checkoutButton} onClick={handleCreateOrder}>
          CHECKOUT
        </button>
      </div>
    </>
  );
}

export default CartSummary;
