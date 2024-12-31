import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import styles from "./PaymentSuccess.module.css";

function PaymentSuccess() {
  return (
    <section className={styles.mainContainer}>
      <div className={styles.successCard}>
        <div className={styles.successCardTop}>
          <ion-icon name="checkmark-circle-outline"></ion-icon>
          <h1>Order Success!</h1>
        </div>
        <div className={styles.successCardBody}>
          <span>
            Thank you for choosing our service, we appreciate your order!
          </span>
        </div>
        <div className={styles.successCardBottom}>
          <Link to={"/"}>
            <Button>Go to home</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PaymentSuccess;
