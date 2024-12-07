import styles from "./Cart.module.css";
import CartItem from "../../components/CartItem/CartItem";
import useCart from "../../api/cart.api";

function Cart() {
  const userId = 1;
  const { data: cart, error, isLoading } = useCart(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }
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
