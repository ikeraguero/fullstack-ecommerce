import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import CartItem from "@features/cart/components/CartItem/CartItem";
import CartSummary from "@features/cart/components/CartSummary/CartSummary";
import { useCreateOrder } from "@api/orders/order.api";
import styles from "./Cart.module.css";
import useCartData from "@hooks/cart/useCartData";
import useAuth from "@hooks/auth/useAuth";
import { useCheckout } from "@context/CheckoutContext";
import { useAlert } from "@context/AlertContext";

function Cart() {
  const { updateCheckoutState } = useCheckout();

  const { userId, isLoggedIn } = useAuth();
  const { cart, refetch } = useCartData();

  const { displayError } = useAlert();
  const { id, cartItems } = cart;
  const [totalPrice, setTotalPrice] = useState(0);

  const itemsLength = cartItems?.length;
  const [shippingPrice, setShippingPrice] = useState(0);
  const { mutateAsync: createOrder } = useCreateOrder();
  const navigate = useNavigate();
  const PENDING = "pending";

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  useEffect(
    function () {
      if (itemsLength === 0) {
        setShippingPrice(0);
        setTotalPrice(0);
      }
      setTotalPrice(
        cartItems?.reduce((acc, cur) => acc + cur.price * cur.quantity, 0) +
          shippingPrice
      );
    },
    [itemsLength, cartItems, shippingPrice]
  );

  function generateData() {
    return {
      userId,
      totalPrice,
      date: new Date().toISOString(),
      status: PENDING,
      discount: 0,
      shippingAddress: "",
      cartItemsList: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      })),
    };
  }

  async function handleCreateOrder() {
    if (itemsLength === 0) {
      displayError("Your cart is currently empty");
      return;
    }
    try {
      const orderData = generateData();
      const { orderId } = await createOrder(orderData);
      updateCheckoutState("order", orderData);
      navigate(`/checkout/${orderId}`, { replace: true });
    } catch (error) {
      displayError("Error creating order: ", error);
    }
  }

  function goBackToShop() {
    navigate("/");
  }

  return isLoggedIn ? (
    <div className={styles.cartMainContainer}>
      <div className={styles.cartLeftSide}>
        <div className={styles.cartLeftSideList}>
          <div className={styles.cartLeftTitle}>
            <h1>Your Cart</h1>
            <div className="cartItemTotal">
              {itemsLength} {itemsLength === 1 ? "item" : "items"}
            </div>
          </div>
          {cartItems?.length === 0 && "Your cart is currently empty."}
          <ul className={styles.cartList}>
            {cartItems?.map((product) => (
              <CartItem
                {...product}
                refetch={refetch}
                key={product.id}
                cartId={id}
                cartItems={cartItems}
                setTotalPrice={setTotalPrice}
                totalPrice={totalPrice}
                className={styles.cartItem}
              />
            ))}
          </ul>
        </div>
        <div className={styles.cartBackArrow}>
          <Link onClick={goBackToShop} className={styles.backToShop}>
            <ion-icon name="arrow-back-outline"></ion-icon>
            <span> Back to the shop</span>
          </Link>
        </div>
      </div>
      <form
        className={styles.cartRightSide}
        onSubmit={(e) => e.preventDefault()}
      >
        <CartSummary
          itemsLength={itemsLength}
          totalPrice={totalPrice}
          handleCreateOrder={handleCreateOrder}
        />
      </form>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default Cart;
