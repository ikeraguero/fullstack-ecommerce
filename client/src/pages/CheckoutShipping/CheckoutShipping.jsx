import { useNavigate, useParams } from "react-router-dom";
import styles from "./CheckoutShipping.module.css";
import { useCountries } from "../../api/countries.api";
import { useEffect, useState } from "react";
import { useOrder, usePayOrder } from "../../api/order.api";
import { useSelector } from "react-redux";

function CheckoutShipping({ cart, refetch }) {
  const { data: countries } = useCountries();
  const [checkoutStep, setCheckoutStep] = useState("shipping");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { data: order } = useOrder(params.id);
  const { mutate: payOrder } = usePayOrder();
  const [totalPrice, setTotalPrice] = useState(0);
  const SHIPPING_PRICE = 15;
  const navigate = useNavigate();
  const updateOrder = useSelector((state) => state.order.order);

  useEffect(() => {
    const storedShippingPrice = localStorage.getItem("shippingPrice");
    const storedTotalPrice = localStorage.getItem("totalPrice");

    if (storedShippingPrice && storedTotalPrice) {
      setShippingPrice(Number(storedShippingPrice));
      setTotalPrice(Number(storedTotalPrice));
    }
  }, []);

  useEffect(
    function () {
      if (order) {
        const updatedTotalPrice = order.totalPrice + shippingPrice;
        setTotalPrice(updatedTotalPrice);
        localStorage.setItem("shippingPrice", shippingPrice);
        localStorage.setItem("totalPrice", updatedTotalPrice);
      }
    },
    [order, shippingPrice]
  );

  if (!updateOrder) return "AAAAAAAAAAAAAAAAAAAAAAA";

  function handlePay() {
    setIsProcessingPayment(true);
    if (!order && !updateOrder) {
      console.error("Order data is not available");
      return;
    }

    const payData = {
      ...updateOrder,
      status: "paid",
      totalPrice,
    };

    console.log("Pay data:", payData);

    payOrder({ orderData: payData, orderId: order?.orderId });
  }

  function handleContinue() {
    if (checkoutStep === "shipping") setCheckoutStep("payment");
  }

  function handleBack() {
    if (checkoutStep === "payment") setCheckoutStep("shipping");
    if (checkoutStep === "shipping") navigate("/");
  }

  function handleCalculatePrice(e) {
    const formData = new FormData(e);
    const address = formData.get("address");
    const postalCode = formData.get("postalCode");

    if (!address || !postalCode) return;
    setLoading(true);

    setTimeout(() => {
      setShippingPrice(SHIPPING_PRICE);
      setLoading(false);
    }, 2000);
  }

  return (
    <div className={styles.cartMainContainer}>
      <div className={styles.cartLeftSide}>
        {checkoutStep === "shipping" && (
          <form
            className={styles.cartLeftSideList}
            onSubmit={(e) => {
              e.preventDefault();
              handleCalculatePrice(e.target);
            }}
          >
            <div className={styles.cartLeftTitle}>
              <h1>Shipping Address</h1>
            </div>

            <div className={styles.shippingFOrm}>
              <div className={styles.formItem}>
                <label htmlFor="address">Address</label>
                <input type="text" name="address" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="postalCode">Postal Code</label>
                <input type="text" name="postalCode" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="country">Country</label>
                <select name="country" id="">
                  {countries?.map((country) => (
                    <option key={country.flag}>{country.name.common}</option>
                  ))}
                </select>
              </div>
              <div className={styles.formItem}>
                <label htmlFor="city">City</label>
                <input type="text" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="state">State (optional)</label>
                <input type="text" />
              </div>
            </div>
            <div className={styles.calculateShippingAndBackButton}>
              <div className={styles.cartBackArrow}>
                <ion-icon
                  name="arrow-back-outline"
                  onClick={handleBack}
                ></ion-icon>{" "}
                Back
              </div>
              <button className={styles.calculateShippingButton}>
                Calculate Shipping
              </button>
            </div>
          </form>
        )}
        {checkoutStep === "payment" && (
          <div className={styles.cartLeftSideList}>
            <div className={styles.cartLeftTitle}>
              <h1>Payment</h1>
            </div>

            <div className={styles.shippingFOrm}>
              <div className={styles.formItem}>
                <label className={styles.paymentMethod}>
                  <input type="radio" name="card" value="card" selected />
                  <span>Card</span>
                </label>
              </div>
              <div className={styles.formItem}>
                <label htmlFor="email">Email</label>
                <input type="email" />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="cardInformation">Card Information</label>
                <input
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  className={styles.cardInformation}
                />
                <div className={styles.formItemBottom}>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className={styles.cardDate}
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className={styles.cardCvc}
                  />
                </div>
              </div>
              <div className={styles.formItem}>
                <label htmlFor="Cardholder Name">Cardholder Name</label>
                <input type="text" />
              </div>
              <div className={styles.cartBackArrow}>
                <ion-icon
                  name="arrow-back-outline"
                  onClick={handleBack}
                ></ion-icon>{" "}
                Back
              </div>
            </div>
          </div>
        )}
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
              <h2>Items {order?.items}</h2>
            </div>
            <div className="cartItemPrice">${order?.totalPrice}</div>
          </div>
          <div className={styles.cartSummaryItem}>
            <div className="cartItemName">
              <h2>Shipping</h2>
            </div>
            <div className="cartItemPrice">
              {loading ? "Calculating..." : `$${shippingPrice}`}
            </div>
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
          <div className="cartItemPrice">${totalPrice}</div>
        </div>
        <button
          className={styles.checkoutButton}
          onClick={checkoutStep === "shipping" ? handleContinue : handlePay}
        >
          {checkoutStep === "shipping"
            ? "CONTINUE"
            : isProcessingPayment
            ? "PROCESSING PAYMENT..."
            : "PAY"}
        </button>
      </form>
    </div>
  );
}

export default CheckoutShipping;
