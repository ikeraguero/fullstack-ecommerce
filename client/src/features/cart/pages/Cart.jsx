import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "@features/cart/components/CartItem/CartItem";
import CartSummary from "@features/cart/components/CartSummary/CartSummary";
import ErrorAlert from "@features/shared/components/ErrorAlert/ErrorAlert";
import { useCreateOrder } from "@api/orders/order.api";
import styles from "./Cart.module.css";
import { useCheckout } from "@context/CheckoutContext";
import { useCartContext } from "@context/CartContext";
import { setOrder } from "../../../actions/OrderActions";

function Cart({ openError }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { cartId, cartItems, refetch } = useCartContext();
  const userId = useSelector((state) => state.auth.id);

  const itemsLength = cartItems?.length;
  const [totalPrice, setTotalPrice] = useState(
    cartItems?.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
  );
  const [shippingPrice, setShippingPrice] = useState(0);
  const { mutateAsync: createOrder } = useCreateOrder();
  const navigate = useNavigate();
  const { setItemsQuantity, setItemsPrice } = useCheckout();
  const dispatch = useDispatch();

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
    refetch();
    console.log(cartItems);
    return {
      userId,
      totalPrice,
      date: new Date().toISOString(),
      status: "pending",
      discount: 0,
      shippingAddress: "",
      cartItemsList: cartItems.map((item) => ({
        productId: item.product_id,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      })),
    };
  }

  async function handleCreateOrder() {
    if (itemsLength === 0) {
      <ErrorAlert />;
      openError();
      return;
    }
    try {
      const orderData = generateData();
      const { orderId } = await createOrder(orderData);
      setItemsQuantity(itemsLength);
      setItemsPrice(totalPrice);
      dispatch(setOrder(orderData));
      navigate(`/checkout/${orderId}`, { replace: true });
    } catch (error) {
      openError();
      console.log("Error creating order: ", error);
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
                cartId={cartId}
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
