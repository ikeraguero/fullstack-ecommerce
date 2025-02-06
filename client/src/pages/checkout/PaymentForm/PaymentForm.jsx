import styles from "./PaymentForm.module.css";

const CARD_NUMBER_MAX = 19;
const CARD_CVC_MAX = 4;

function PaymentForm({
  values,
  handleChange,
  handleBack,
  handleBlur,
  errors,
  touched,
}) {

  const handleFormattedChange = (e) => {
    const { name, value } = e.target;

    //format cardexpiration
    if (name === "cardExpiration") {
      let formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 2) {
        formattedValue =
          formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
      }
      if (formattedValue.length > 5) {
        formattedValue = formattedValue.slice(0, 5);
      }
      e.target.value = formattedValue;
    }

    //format cardnumber
    if (name === "cardNumber") {
      let formattedValue = value.replace(/\D/g, "");
      formattedValue =
        formattedValue.match(/.{1,4}/g)?.join(" ") || formattedValue;
      const rawValue = value.replace(/\s/g, "");
      handleChange({
        ...e,
        target: {
          ...e.target,
          value: rawValue,
        },
      });

      e.target.value = formattedValue;
    }

    //formt cvc
    if (name === "cardCvc") {
      let formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 4) {
        formattedValue = formattedValue.slice(0, 4);
      }
      e.target.value = formattedValue;
    }
    handleChange(e);
  };
  return (
    <form className={styles.cartLeftSideList}>
      <div className={styles.cartLeftTitle}>
        <h1>Payment</h1>
      </div>
      <div className={styles.shippingForm}>
        <div className={styles.formItem}>
          <label className={styles.paymentMethod}>
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              onBlur={handleBlur}
              checked={values.paymentMethod === "card"}
              onChange={handleChange}
            />
            <span>Card</span>
          </label>
        </div>
        <div className={styles.formItem}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            className={errors.email && touched.email ? styles.inputError : ""}
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.email && touched.email && (
            <p className={styles.error}>{errors.email}</p>
          )}
        </div>
        <div className={styles.formItemCard}>
          <label htmlFor="cardNumber">Card Information</label>
          <input
            type="text"
            placeholder="1234 1234 1234 1234"
            name="cardNumber"
            className={
              errors.cardNumber && touched.cardNumber
                ? styles.cardNumberInputError
                : styles.cardNumber
            }
            maxLength={CARD_NUMBER_MAX}
            value={values.cardNumber}
            onBlur={handleBlur}
            onChange={(e) => handleFormattedChange(e)}
          />
          <div className={styles.formItemBottom}>
            <input
              type="text"
              placeholder="MM/YY"
              name="cardExpiration"
              className={
                errors.cardExpiration && touched.cardExpiration
                  ? styles.cardExpirationInputError
                  : styles.cardExpiration
              }
              value={values.cardExpiration}
              onBlur={handleBlur}
              onChange={(e) => handleFormattedChange(e)}
            />
            <input
              type="text"
              placeholder="CVC"
              name="cardCvc"
              className={
                errors.cardCvc && touched.cardCvc
                  ? styles.cardCvcInputError
                  : styles.cardCvc
              }
              maxLength={CARD_CVC_MAX}
              value={values.cardCvc}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          {(errors.cardNumber && touched.cardNumber) ||
            (errors.cardExpiration && touched.cardExpiration) ||
            (errors.cardCvc && touched.cardCvc && (
              <p className={styles.error}>Card information is required</p>
            ))}
          <div className={styles.cardFlags}>
            <img src="../../public/visaImg.png" />
            <img src="../../public/mastercardImg.png" />
          </div>
        </div>
        <div className={styles.formItem}>
          <label htmlFor="Cardholder Name">Cardholder Name</label>
          <input
            type="text"
            className={
              errors.cardholderName && touched.cardholderName
                ? styles.inputError
                : ""
            }
            name="cardholderName"
            value={values.cardholderName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.cardholderName && touched.cardholderName && (
            <p className={styles.error}>{errors.cardholderName}</p>
          )}
        </div>
        <div className={styles.cartBackArrow}>
          <ion-icon name="arrow-back-outline" onClick={handleBack}></ion-icon>{" "}
          Back
        </div>
      </div>
    </form>
  );
}

export default PaymentForm;
