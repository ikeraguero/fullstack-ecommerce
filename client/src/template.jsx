import { Link } from "react-router-dom";
import styles from "./CheckoutShipping.module.css";

function CheckoutShipping({ cart, refetch }) {
  return (
    <div className={styles.cartMainContainer}>
      <div className={styles.cartLeftSide}>
        <div className={styles.cartLeftSideList}>
          <div className={styles.cartLeftTitle}>
            <h1>Your Cart</h1>
            <div className="cartItemTotal">x items</div>
          </div>

          <ul className={styles.cartList}></ul>
        </div>
        <div className={styles.cartBackArrow}>
          <Link to="/">
            <ion-icon name="arrow-back-outline"></ion-icon> Back to the shop
          </Link>
        </div>
      </div>
      <form
        className={styles.cartRightSide}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={styles.cartRightTitle}>
          <h1>Summary</h1>
        </div>
        <div className={styles.cartRightSummary}>
          <div className={styles.cartSummaryItem}>
            <div className="cartItemName">
              <h2>Items x</h2>
            </div>
            <div className="cartItemPrice">$0</div>
          </div>

          {/* <div className={styles.cartSummaryItemShipping}>
            <div className="cartItemName">
              <h2>SHIPPING</h2>
            </div>
            <select
              name="shipping"
              id=""
              value={shippingPrice}
              onChange={(e) => {
                e.preventDefault();
                setTotalPrice((price) => price - shippingPrice);
                setShippingPrice(Number(e.target.value));
              }}
              disabled={itemsLength === 0}
              required
            >
              <option value={0}></option>
              <option value={5}>Shipping 1 - R$5</option>
              <option value={10}>Shipping 2 - R$10</option>
              <option value={15}>Shipping 3 - R$15</option>
            </select>
          </div> */}
        </div>
        <div className={styles.cartSummaryTotal}>
          <div className="cartItemName">
            <h2>TOTAL PRICE</h2>
          </div>
          <div className="cartItemPrice">R$0</div>
        </div>
        <button className={styles.checkoutButton}>zCHECKOUT</button>
      </form>
    </div>
  );
}

export default CheckoutShipping;
