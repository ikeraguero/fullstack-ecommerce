import styles from "./QuantityControl.module.css";
function QuantityControl({ quantity, onDecrease, onIncrease }) {
  return (
    <div className={styles.productQuantity}>
      <button className={styles.productQuantityDecrease} onClick={onDecrease}>
        -
      </button>
      <div className={styles.productQuantityDisplay}>
        {quantity < 10 ? "0" + quantity : quantity}
      </div>
      <button className={styles.productQuantityIncrease} onClick={onIncrease}>
        +
      </button>
    </div>
  );
}

export default QuantityControl;
