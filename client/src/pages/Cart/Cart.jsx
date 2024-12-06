import styles from "./Cart.module.css";
import CartItem from "../../components/CartItem/CartItem";

function Cart({ cart, setCart }) {
  return (
    <div className={styles.mainContainer}>
      {cart.length === 0 && "Cart is empty"}
      {cart.length > 1 && "Your cart"}
      {cart.map((product) => (
        <CartItem {...product} key={product.id} />
      ))}
    </div>
  );
}

export default Cart;
