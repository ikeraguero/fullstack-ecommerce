import { useNavigate, useParams } from "react-router-dom";
import styles from "./CheckoutShipping.module.css";
import { useCountries } from "../../api/countries.api";
import { useEffect, useState } from "react";
import { useOrder, usePayOrder } from "../../api/order.api";
import { useSelector } from "react-redux";
import { useAlert } from "../../context/AlertContext";
import { useCalculateShipping } from "../../api/shipping.api";
// import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";

function CheckoutShipping({ cart, refetch }) {
  const { data: countries } = useCountries();
  const [checkoutStep, setCheckoutStep] = useState("shipping");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState();
  const [city, setCity] = useState();
  const [shippingPrice, setShippingPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { data: order } = useOrder(params.id);
  const { mutate: payOrder } = usePayOrder();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const updateOrder = useSelector((state) => state.order.order);
  const { openError, setErrorMessage } = useAlert();
  const { mutateAsync: calculateShipping } = useCalculateShipping();
  const POSTAL_CODE_MAX = 7;

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
    if (
      !paymentMethod ||
      !email ||
      !cardNumber ||
      !cardCvc ||
      !cardExpiration ||
      !cardholderName
    ) {
      displayError("Required fields can't be left empty");
      return;
    }
    if (!order && !updateOrder) {
      console.error("Order data is not available");
      return;
    }

    setIsProcessingPayment(true);

    const paymentRequest = {
      email,
      paymentMethod,
      cardNumber,
      expiration: cardExpiration,
      cvc: cardCvc,
      cardholderName,
    };

    const payData = {
      ...updateOrder,
      status: "paid",
      totalPrice,
    };


    payOrder({ orderData: payData, orderId: order?.orderId, paymentRequest });
  }

  function displayError(message) {
    setErrorMessage(message);
    openError();
  }

  function handleContinue() {
    if (checkoutStep === "shipping" && shippingPrice) {
      setCheckoutStep("payment");
      return;
    }
    if (!address || !postalCode || !city) {
      displayError("Fill the required fields");
      return;
    }
    displayError("Calculate Shipping");
  }

  function handleBack() {
    if (checkoutStep === "payment") setCheckoutStep("shipping");
    if (checkoutStep === "shipping") navigate("/cart");
  }

  async function handleCalculatePrice(e) {
    const formData = new FormData(e);
    const postalCode = formData.get("postalCode");
    const data = {
      postalCode,
    };

    if (!postalCode) {
      displayError("Postal code is required to calculate shipping");
      return;
    }
    setLoading(true);

    const { shippingPrice } = await calculateShipping(data);
    setShippingPrice(shippingPrice);
    setLoading(false);
  }

  return (
    <>
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
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className={styles.formItem}>
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    maxLength={POSTAL_CODE_MAX}
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
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
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className={styles.formItem}>
                  <label htmlFor="state">State (optional)</label>
                  <input type="text" />
                </div>
              </div>
              <div className={styles.calculateShippingAndBackButton}>
                <div className={styles.cartBackArrow} onClick={handleBack}>
                  <ion-icon name="arrow-back-outline"></ion-icon> Back
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
                    <input
                      type="radio"
                      name="card"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Card</span>
                  </label>
                </div>
                <div className={styles.formItem}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.formItem}>
                  <label htmlFor="cardInformation">Card Information</label>
                  <input
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    className={styles.cardInformation}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <div className={styles.formItemBottom}>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className={styles.cardDate}
                      value={cardExpiration}
                      onChange={(e) => setCardExpiration(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      className={styles.cardCvc}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.formItem}>
                  <label htmlFor="Cardholder Name">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                  />
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
          <div className={styles.cartSummaryTop}>
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
            </div>
          </div>
          <div className={styles.cartSummaryBottom}>
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
          </div>
        </form>
      </div>
    </>
  );
}

export default CheckoutShipping;
