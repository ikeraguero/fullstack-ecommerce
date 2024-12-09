import styles from "./Cart.module.css";
import CartItem from "../../components/CartItem/CartItem";
import { Link } from "react-router-dom";

function Cart({ cart, refetch }) {
  const itemsLength = cart.cartItems.length;
  const totalPrice = cart.cartItems.reduce(
    (acc, cur) => acc + cur.price * cur.quantity,
    0
  );

  console.log(cart.cartItems);

  return (
    <div className={styles.cartMainContainer}>
      <div className={styles.cartLeftSide}>
        <div className={styles.cartLeftSideList}>
          <div className={styles.cartLeftTitle}>
            <h1>Your Cart</h1>
            <div className="cartItemTotal">{itemsLength} items</div>
          </div>
          {cart.cartItems.length === 0 && "Cart is empty"}
          <ul className={styles.cartList}>
            {cart.cartItems.map(
              (product) => (
                console.log(product),
                (
                  <CartItem
                    {...product}
                    refetch={refetch}
                    key={product.id}
                    className={styles.cartItem}
                  />
                )
              )
            )}
          </ul>
        </div>
        <div className={styles.cartBackArrow}>
          <Link to="/">
            <ion-icon name="arrow-back-outline"></ion-icon> Back to the shop
          </Link>
        </div>
      </div>
      <div className={styles.cartRightSide}>
        <div className={styles.cartRightTitle}>
          <h1>Summary</h1>
        </div>
        <div className={styles.cartRightSummary}>
          <div className={styles.cartSummaryItem}>
            <div className="cartItemName">
              <h2>Items {itemsLength}</h2>
            </div>
            <div className="cartItemPrice">R${totalPrice}</div>
          </div>
          <div className={styles.cartSummaryItemShipping}>
            <div className="cartItemName">
              <h2>SHIPPING</h2>
            </div>
            <select name="shipping" id="">
              <option>Shipping 1 - R$5</option>
              <option>Shipping 2 - R$10</option>
              <option>Shipping 3 - R$15</option>
            </select>
          </div>
          <div className={styles.cartSummaryItemDiscount}>
            <div className="cartItemName">
              <h2>DISCOUNT CODE</h2>
            </div>
            <input type="text" placeholder="Enter your code" />
          </div>
        </div>
        <div className={styles.cartSummaryTotal}>
          <div className="cartItemName">
            <h2>TOTAL PRICE</h2>
          </div>
          <div className="cartItemPrice">R${totalPrice}</div>
        </div>
        <button className={styles.checkoutButton}>CHECKOUT</button>
      </div>
    </div>
  );
}

export default Cart;
