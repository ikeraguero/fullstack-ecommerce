import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import CartItem from "../../components/CartItem/CartItem";

import styles from "./Cart.module.css";
import { useCreateOrder } from "../../api/order.api";
import { useCheckout } from "../../context/CheckoutContext";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../actions/OrderActions";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";

function Cart({ cartId, cartItems, refetch, openError }) {
  const id = useSelector((state) => state.auth.id);
  const itemsLength = cartItems?.length;
  const [totalPrice, setTotalPrice] = useState(
    cartItems?.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
  );
  const [shippingPrice, setShippingPrice] = useState(0);
  const { mutateAsync: createOrder } = useCreateOrder();
  const navigate = useNavigate();
  const { setItemsQuantity, setItemsPrice } = useCheckout();
  const dispatch = useDispatch();

  useEffect(
    function () {
      if (itemsLength === 0) {
        setShippingPrice(0);
        setTotalPrice(0);
      }
      setTotalPrice(totalPrice + shippingPrice);
    },
    [cartItems, shippingPrice, itemsLength, totalPrice]
  );

  async function handleCreateOrder() {
    if (itemsLength === 0) {
      <ErrorAlert />;
      openError();
      return;
    }
    const orderData = {
      userId: id,
      totalPrice,
      date: "2024-12-20T15:30:00",
      status: "pending",
      discount: 0,
      shippingAddress: "Rua",
      cartItemsList: cartItems.map((item) => {
        const itemObject = {
          productId: item.product_id,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
        };
        return itemObject;
      }),
    };
    const { orderId } = await createOrder(orderData);
    setItemsQuantity(itemsLength);
    setItemsPrice(totalPrice);
    dispatch(setOrder(orderData));
    navigate(`/checkout/${orderId}`);
  }

  return (
    <div className={styles.cartMainContainer}>
      <div className={styles.cartLeftSide}>
        <div className={styles.cartLeftSideList}>
          <div className={styles.cartLeftTitle}>
            <h1>Your Cart</h1>
            <div className="cartItemTotal">{itemsLength} items</div>
          </div>
          {cartItems?.length === 0 && "Cart is empty"}
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
          <Link to="/" className={styles.backToShop}>
            <ion-icon name="arrow-back-outline"></ion-icon>
            <span> Back to the shop</span>
          </Link>
        </div>
      </div>
      <form
        className={styles.cartRightSide}
        onSubmit={(e) => e.preventDefault()}
      >
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
      </form>
    </div>
  );
}

export default Cart;
