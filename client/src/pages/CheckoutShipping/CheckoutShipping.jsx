import { Link } from "react-router-dom";
import styles from "./CheckoutShipping.module.css";
import { useCountries } from "../../api/countries.api";
import { useState } from "react";
import { useCheckout } from "../../context/CheckoutContext";

function CheckoutShipping({ cart, refetch }) {
  const { data: countries, isLoading } = useCountries();
  const [checkoutStep, setCheckoutStep] = useState("shipping");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const { itemsQuantity, itemsPrice } = useCheckout();

  function handleContinue() {
    if (checkoutStep === "shipping") setCheckoutStep("payment");
  }

  function handleCalculatePrice(e) {
    const formData = new FormData(e);
    const address = formData.get("address");
    const postalCode = formData.get("postalCode");

    if (!address || !postalCode) return;
    setLoading(true);

    setTimeout(() => {
      setShippingPrice(15);
      setLoading(false);
    }, 2000);
  }

  if (isLoading) return <div>Loading...</div>;
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
                  {countries.map((country) => (
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
            <button className={styles.calculateShippingButton}>
              Calculate Shipping
            </button>
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
            </div>
          </div>
        )}

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
              <h2>Items {itemsQuantity}</h2>
            </div>
            <div className="cartItemPrice">${itemsPrice}</div>
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
          <div className="cartItemPrice">${itemsPrice}</div>
        </div>
        <button className={styles.checkoutButton} onClick={handleContinue}>
          {checkoutStep === "shipping" ? "CONTINUE" : "PAY"}
        </button>
      </form>
    </div>
  );
}

export default CheckoutShipping;
