import styles from "./Cart.module.css";
import CartItem from "../../components/CartItem/CartItem";

function Cart({ cart }) {
  console.log(cart.cartItems);
  return (
    <div className={styles.mainContainer}>
      {cart.cartItems.length === 0 && "Cart is empty"}
      {cart.cartItems.length > 1 && "Your cart"}
      {cart.cartItems.map((product) => (
        <CartItem {...product} key={product.id} />
      ))}
    </div>
  );
}

export default Cart;
