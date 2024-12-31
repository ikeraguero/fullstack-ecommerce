import { useCountries } from "../../../api/countries.api";
import styles from "./ShippingForm.module.css";

function ShippingForm({
  values,
  handleChange,
  handleBack,
  handleCalculateShipping,
  errors,
  touched,
  handleBlur,
}) {
  const { data: countries } = useCountries();
  const POSTAL_CODE_MAX = 7;
  return (
    <form className={styles.cartLeftSideList}>
      <div className={styles.cartLeftTitle}>
        <h1>Shipping Address</h1>
      </div>

      <div className={styles.shippingForm}>
        <div className={styles.formItem}>
          <label htmlFor="address">Address</label>
          <input
            className={
              errors.address && touched.address ? styles.inputError : ""
            }
            type="text"
            name="address"
            onBlur={handleBlur}
            value={values.address}
            onChange={handleChange}
          />
          {errors.address && touched.address && (
            <p className={styles.error}>{errors.address}</p>
          )}
        </div>
        <div className={styles.formItem}>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            className={
              errors.postalCode && touched.postalCode ? styles.inputError : ""
            }
            type="text"
            name="postalCode"
            maxLength={POSTAL_CODE_MAX}
            onBlur={handleBlur}
            value={values.postalCode}
            onChange={handleChange}
          />

          {errors.postalCode && touched.postalCode && (
            <p className={styles.error}>{errors.postalCode}</p>
          )}
        </div>
        <div className={styles.formItem}>
          <label htmlFor="country">Country</label>
          <select
            name="country"
            id=""
            value={1}
            className={
              errors.country && touched.country ? styles.inputError : ""
            }
          >
            {countries?.map((country) => (
              <option key={country.flag}>{country.name.common}</option>
            ))}
          </select>
        </div>
        <div className={styles.formItem}>
          <label htmlFor="city">City</label>
          <input
            className={errors.city && touched.city ? styles.inputError : ""}
            type="text"
            name="city"
            onBlur={handleBlur}
            value={values.city}
            onChange={handleChange}
          />
          {errors.city && touched.city && (
            <p className={styles.error}>{errors.city}</p>
          )}
        </div>
        <div className={styles.formItem}>
          <label htmlFor="state">State (optional)</label>
          <input
            className={errors.state && touched.state ? styles.inputError : ""}
            type="text"
            name="state"
            value={values.state}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.calculateShippingAndBackButton}>
        <div className={styles.cartBackArrow} onClick={handleBack}>
          <ion-icon name="arrow-back-outline"></ion-icon> Back
        </div>
        <button
          className={styles.calculateShippingButton}
          type="button"
          onClick={handleCalculateShipping}
        >
          Calculate Shipping
        </button>
      </div>
    </form>
  );
}

export default ShippingForm;
