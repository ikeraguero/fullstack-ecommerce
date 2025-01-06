import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import styles from "./PaymentError.module.css";

function PaymentError() {
  return (
    <section className={styles.mainContainer}>
      <div className={styles.errorCard}>
        <div className={styles.errorCardTop}>
          <ion-icon name="close-circle-outline"></ion-icon>
          <h1>Order Error!</h1>
        </div>
        <div className={styles.errorCardBody}>
          <p>
            We encountered an unexpected error while processing your payment.
          </p>
          <p>
            To try checking out again, please visit the Orders tab in your
            profile.
          </p>
        </div>
        <div className={styles.errorCardBottom}>
          <Link to={"/"}>
            <Button>Go to home</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PaymentError;
